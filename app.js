import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { verifyToken } from "./middleware/authMiddleware.js"; // for protected routes

dotenv.config();

const app = express();

// ----------------- CORS CONFIG -----------------
app.use(
  cors({
    origin: [
      "http://localhost:3000",          // local development
      "https://airesume-ruddy.vercel.app", // your deployed frontend
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// ----------------- MIDDLEWARE -----------------
app.use(express.json());

// ----------------- ROOT / HEALTH CHECK -----------------
app.get("/", (req, res) => {
  res.send("✅ Resume backend is running!");
});

// ----------------- ROUTES -----------------
// Auth routes (signup, login)
app.use("/api/auth", authRoutes);

// AI routes (protected, requires JWT)
app.use("/api/ai", verifyToken, aiRoutes);

export default app;
