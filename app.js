import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Root route for Vercel / health check
app.get("/", (req, res) => {
  res.send("✅ Resume backend is running!");
});

// API routes
app.use("/api/ai", aiRoutes);

export default app;
