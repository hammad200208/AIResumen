import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HUGGINGFACE_API_KEY,
});

export async function generateResumeText(prompt) {
  try {
    const completion = await client.chat.completions.create({
      model: "meta-llama/Meta-Llama-3-8B-Instruct",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("❌ Hugging Face API error:", error.response?.data || error.message);
    throw new Error("Failed to generate resume text.");
  }
}
