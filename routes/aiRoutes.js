// routes/aiRoutes.js
import express from "express";
import { generateResume } from "../controllers/aiController.js";

const router = express.Router();

router.post("/generate", generateResume);

export default router;