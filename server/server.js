import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import "dotenv/config";
import dotenv from "dotenv";
import authRoutes from "./routes/user-route.js";
import axios from "axios";
// import blogRoutes from "./routes/blogRoutes.js";
import chatRoutes from "./routes/chat-route.js";
import { Server } from "socket.io";
import http from "http";

// import accoutRoute from "./routes/account-route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const API_KEY = process.env.YOUTUBE_API_KEY;

// --- Middleware ---
app.use(express.json());
app.use(cors());

// --- Database ---
connectDb();

// --- Routes ---
// User-related routes
// app.use("/api/blogs", blogRoutes);
// app.use("/api/sos", accoutRoute);
app.use("/api/users", authRoutes); 
app.use("/api/chat", chatRoutes); 

// Root route
app.get("/", (req, res) => {
  res.send("API working");
});

// --- YouTube Video Tutorials API ---
app.get("/api/videos", async (req, res) => {
  try {
    const query = req.query.q || "Women Safety Self Defense";
    const filter = req.query.filter || "relevance";

    let orderParam = "relevance";
    if (filter === "Newest") orderParam = "date";
    if (filter === "Most Viewed") orderParam = "viewCount";

    // Search videos
    const searchResp = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: query,
          type: "video",
          order: orderParam,
          maxResults: 10,
          key: API_KEY,
        },
      }
    );

    const videoItems = searchResp.data.items;
    if (!videoItems || videoItems.length === 0) return res.json([]);

    // Get video statistics
    const videoIds = videoItems.map((item) => item.id.videoId).join(",");
    const statsResp = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "statistics,contentDetails",
          id: videoIds,
          key: API_KEY,
        },
      }
    );

    const statsItems = statsResp.data.items;

    // Merge snippet and stats
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

// --- Create HTTP server and integrate Socket.io ---
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // allow frontend connections
    methods: ["GET", "POST"],
  },
});

// --- Chat feature with reply support ---
let messages = []; // in-memory store

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);

  // Send chat history to new users
  socket.emit("chat message", messages);

  // Listen for incoming messages
  socket.on("chat message", (msg) => {
    /*
      msg = {
        text: "Hello",
        replyTo: "messageId or null",
        user: "Alice" (optional)
      }
    */

    const messageWithId = {
      id: generateId(),          // unique id for this message
      text: msg.text,
      replyTo: msg.replyTo || null,
      user: msg.user || "User",
    };

    // Save message
    messages.push(messageWithId);

    // Broadcast to all clients
    io.emit("chat message", messageWithId);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

// --- Utility function to generate unique ID ---
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

// --- Start Server ---
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
