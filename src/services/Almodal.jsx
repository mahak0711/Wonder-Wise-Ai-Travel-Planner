import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const modal = genAI.getGenerativeModal({
  model: "gemini-1.5-flash",
});

const generationConfig = {
    temprature:1,
    topP:0.95,
    topK:64,
    maxOutputToken:8192,
    reponseMimeType
}
