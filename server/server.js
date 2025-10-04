import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import "dotenv/config";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import axios from "axios";
//import blogRoutes from "./routes/blogRoutes.js";
 

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


// --- Middleware ---
app.use(express.json());
app.use(cors());

// --- Database ---
connectDb();

// --- Routes ---
// User-related routes

//app.use("/api/blogs", blogRoutes);



app.use("/api/auth", authRoutes); //Login route

// Root route
app.get("/", (req, res) => {
  res.send("API working");
});


// --- Start Server ---
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
