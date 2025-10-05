import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import dotenv from "dotenv";
import userRoutes  from "./routes/user-route.js";
import blogRoutes from "./routes/blogRoutes.js";
import chatRoutes from "./routes/chat-route.js";
import accountRoutes from "./routes/account-route.js";
import videoRoutes from "./routes/videoRoutes.js";
import axios from "axios";
import { Server } from "socket.io";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const GEOAPIFY_API_KEY = process.env.GEOAPIFY_API_KEY;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve assets folder (if present)
app.use("/asset", express.static(path.join(path.resolve(), "asset")));

// Database
connectDb();

// --- Routes ---
app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/sos", accountRoutes);
app.use("/api/videos", videoRoutes);

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

// --- HTTP Server + Socket.io ---
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } });

// In-memory chat messages
let messages = [];

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.emit("chat message", messages);

  socket.on("chat message", (msg) => {
    const messageWithId = {
      id: Math.random().toString(36).substr(2, 9),
      text: msg.text,
      replyTo: msg.replyTo || null,
      user: msg.user || "User",
    };
    messages.push(messageWithId);
    io.emit("chat message", messageWithId);
  });

  socket.on("disconnect", () => console.log("User disconnected:", socket.id));
});

// --- Start server ---
server.listen(port, () => console.log(`Server running on http://localhost:${port}`));