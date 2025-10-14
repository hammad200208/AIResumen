import { generateFromHuggingFace } from "../services/huggingFaceService.js";

export const generateAIResume = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, message: "Prompt is required" });
    }

    const aiResponse = await generateFromHuggingFace(prompt);
    res.status(200).json({ success: true, data: aiResponse });
  } catch (error) {
    console.error("AI generation error:", error.message);
    res.status(500).json({ success: false, message: "AI generation failed" });
  }
};
