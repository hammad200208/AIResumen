import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { verifyToken } from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();

// ----------------- CORS CONFIG -----------------
app.use(
  cors({
    origin: [
      "http://localhost:3000", // local dev
      "https://airesume-ruddy.vercel.app", // ✅ removed trailing slash
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ✅ Handle preflight requests globally
app.options("*", cors());

// ----------------- MIDDLEWARE -----------------
app.use(express.json());

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
