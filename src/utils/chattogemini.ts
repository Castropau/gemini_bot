import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatHistory, GenerationConfig, ChatSettings } from "@/types";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error(
    "GEMINI_API_KEY is not defined in the environment variables."
  );
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function chattogemini(
  userMessage: string,
  history: ChatHistory,
  settings: ChatSettings
): Promise<string> {
  try {
    console.log(settings)
    const model = genAI.getGenerativeModel({
        model: settings.model || "gemini-1.5-flash",
        systemInstruction:
          settings.systemInstruction || "can you respond in japanese",
      });
    
      const generationConfig: GenerationConfig = {
        temperature: settings.temperature || 1,
        topP: 0.95,
        responseMimeType: "text/plain",
      };
    
      const chatSession = model.startChat({
        generationConfig,
        history: history,
      });

      console.log(generationConfig)
    const result = await chatSession.sendMessage(userMessage);
    return result.response.text();
  } catch (error) {
    console.error("Error interacting with the model:", error);
    throw error;
  }
}
