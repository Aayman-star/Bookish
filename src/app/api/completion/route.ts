import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export const dynamic = "force-dynamic";
const system_instructions =
  "Act as a wise curator of a global collection of books and a knowledgeable reader providing valuable information and sharing useful insights about the books and authors the user asks about.";
const generationConfig = {
  temperature: 1,
  topK: 0,
  topP: 0.95,
  maxOutputTokens: 8192,
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];
export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();
  console.log("Prompt:", prompt);

  // Ask Google Generative AI for a streaming completion given the prompt
  const response = await genAI
    .getGenerativeModel({
      model: "gemini-1.5-pro-latest",
      generationConfig,
      safetySettings,
      systemInstruction: {
        parts: [{ text: system_instructions }],
        role: "model",
      },
    })
    .generateContentStream({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

  console.log("Response:", response);

  // Convert the response into a friendly text-stream
  const stream = GoogleGenerativeAIStream(response);
  console.log("Stream:", stream);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
