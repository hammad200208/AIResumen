// controllers/aiController.js
import { generateResumeText } from "../services/huggingFaceService.js";

export async function generateResume(req, res) {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    const aiResponse = await generateResumeText(prompt);
    res.status(200).json({ success: true, text: aiResponse });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
