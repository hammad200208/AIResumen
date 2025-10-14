import express from "express";
import { generateAIResume } from "../controllers/aiController.js";

const router = express.Router();

// POST /api/ai/generate
router.post("/generate", generateAIResume);

export default router;
