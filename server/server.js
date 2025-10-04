import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import "dotenv/config";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import chatRoutes from "./routes/chat-route.js";
import axios from "axios";
import { Server } from "socket.io";
import http from "http";
import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const GEOAPIFY_API_KEY = process.env.GEOAPIFY_API_KEY;

// Serve assets folder
app.use("/asset", express.static(path.join(path.resolve(), "asset")));

// Middleware
app.use(express.json());
app.use(cors());

// Database
connectDb();

// --- Routes ---
app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("API working");
});

// --- Places & Weather API ---
// Map categories/amenities
const geoapifyCategoryMap = { hotel: "accommodation.hotel" };
const overpassAmenityMap = { hospital: "hospital", police: "police" };

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Places endpoint
app.get("/api/places", async (req, res) => {
  const { type, lat, lng } = req.query;
  if (!type || !lat || !lng)
    return res.status(400).json({ error: "Missing type, lat or lng" });

  try {
    if (type === "hotel") {
      // Geoapify hotels
      const category = geoapifyCategoryMap[type];
      const url = `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${lng},${lat},3000&limit=50&apiKey=${GEOAPIFY_API_KEY}`;
      const response = await axios.get(url);
      const places = response.data.features.map((f) => ({
        id: f.properties.place_id,
        lat: f.geometry.coordinates[1],
        lng: f.geometry.coordinates[0],
        name: f.properties.name || "Hotel",
        address: f.properties.formatted || "",
      }));
      return res.json(places);
    }

    if (type === "hospital" || type === "police") {
      const amenity = overpassAmenityMap[type];
      const query = `[out:json]; node(around:3000,${lat},${lng})[amenity=${amenity}]; out;`;
      const OVERPASS_API_URL = "https://lz4.overpass-api.de/api/interpreter";

      async function fetchOverpass() {
        try {
          return await axios.post(OVERPASS_API_URL, query, {
            headers: { "Content-Type": "text/plain" },
            timeout: 20000,
          });
        } catch (err) {
          if (err.response?.status === 429) {
            await delay(1000);
            return axios.post(OVERPASS_API_URL, query, {
              headers: { "Content-Type": "text/plain" },
              timeout: 20000,
            });
          }
          if (err.code === "ECONNABORTED" || err.response?.status === 504)
            throw new Error("Overpass API timeout");
          throw err;
        }
      }

      const response = await fetchOverpass();
      const elements = response.data?.elements || [];
      const places = elements.map((el) => ({
        id: el.id,
        lat: el.lat,
        lng: el.lon,
        name: el.tags?.name || amenity.charAt(0).toUpperCase() + amenity.slice(1),
        address:
          el.tags?.["addr:street"] ||
          el.tags?.["addr:housename"] ||
          el.tags?.["addr:full"] ||
          "",
      }));
      return res.json(places);
    }

    return res.status(400).json({ error: "Unsupported place type" });
  } catch (err) {
    console.error("Places API error:", err.message);
    return res.status(500).json({ error: "Failed to fetch places", details: err.message });
  }
});

// Weather endpoint
app.get("/api/weather", async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) return res.status(400).json({ error: "Missing lat or lng" });

  try {
    const url = "https://api.openweathermap.org/data/2.5/weather";
    const response = await axios.get(url, {
      params: { lat, lon: lng, appid: OPENWEATHER_API_KEY, units: "metric" },
    });
    const { temp } = response.data.main;
    const desc = response.data.weather[0].description;
    res.json({ temp, desc });
  } catch (err) {
    console.error("Weather API error:", err.message);
    res.status(500).json({ error: "Failed to fetch weather", details: err.message });
  }
});

// --- YouTube Video API ---
app.get("/api/videos", async (req, res) => {
  try {
    const query = req.query.q || "Women Safety Self Defense";
    const filter = req.query.filter || "relevance";
    const API_KEY = process.env.YOUTUBE_API_KEY;
    let orderParam = "relevance";
    if (filter === "Newest") orderParam = "date";
    if (filter === "Most Viewed") orderParam = "viewCount";

    const searchResp = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      { params: { part: "snippet", q: query, type: "video", order: orderParam, maxResults: 10, key: API_KEY } }
    );

    const videoItems = searchResp.data.items || [];
    const videoIds = videoItems.map((item) => item.id.videoId).join(",");
    const statsResp = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      { params: { part: "statistics,contentDetails", id: videoIds, key: API_KEY } }
    );

    const statsItems = statsResp.data.items || [];
    const videos = videoItems.map((item, idx) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnails: item.snippet.thumbnails,
      statistics: statsItems[idx]?.statistics || {},
    }));

    res.json(videos);
  } catch (err) {
    console.error("YouTube API error:", err.message);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

// --- HTTP Server + Socket.io ---
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } });

// In-memory chat messages
let messages = [];

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.emit("chat message", messages);

  socket.on("chat message", (msg) => {
    const messageWithId = { id: Math.random().toString(36).substr(2, 9), text: msg.text, replyTo: msg.replyTo || null, user: msg.user || "User" };
    messages.push(messageWithId);
    io.emit("chat message", messageWithId);
  });

  socket.on("disconnect", () => console.log("User disconnected:", socket.id));
});

// --- Start server ---
server.listen(port, () => console.log(`Server running on http://localhost:${port}`));
