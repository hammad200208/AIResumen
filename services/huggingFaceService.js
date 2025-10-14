import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_URL = `https://api-inference.huggingface.co/models/${process.env.HUGGINGFACE_MODEL}`;

export const generateFromHuggingFace = async (prompt) => {
  try {
    const response = await axios.post(
      API_URL,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
      }
    );

    const output =
      response.data[0]?.generated_text || JSON.stringify(response.data);

    return output;
  } catch (err) {
    console.error("Error from Hugging Face API:", err.response?.data || err.message);
    throw new Error("Failed to generate response from Hugging Face");
  }
};
