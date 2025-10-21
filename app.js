import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { verifyToken } from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();

// ----------------- MIDDLEWARE -----------------
app.use(express.json());

// ----------------- CORS -----------------
const allowedOrigins = [
  "http://localhost:3000",
  "https://airesume-ruddy.vercel.app",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Respond to preflight request
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// ----------------- MONGODB CONNECTION -----------------
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("❌ MONGO_URI is not defined in your .env");
} else {
  mongoose
    .connect(mongoUri)
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
}

// ----------------- ROOT / HEALTH CHECK -----------------
app.get("/", (req, res) => {
  res.send("✅ Resume backend running with proper CORS");
});

// ----------------- ROUTES -----------------
app.use("/api/auth", authRoutes);
app.use("/api/ai", verifyToken, aiRoutes);

export default app;
