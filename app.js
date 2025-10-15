import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();

// ----------------- CORS -----------------
app.use(
  cors({
    origin: ["http://localhost:3000", "https://your-frontend.vercel.app"], // add your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

// Root route for health check
app.get("/", (req, res) => {
  res.send("✅ Resume backend is running!");
});

// API routes
app.use("/api/ai", aiRoutes);

export default app;
