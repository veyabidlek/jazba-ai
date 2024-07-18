import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
//@ts-ignore
import { GoogleAIFileManager } from "@google/generative-ai/files";
import "dotenv/config";

const KEY = process.env["GEMINI_API_KEY"];

if (!KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set");
}

const fileManager = new GoogleAIFileManager(KEY);
const genAI = new GoogleGenerativeAI(KEY);

export const uploadVideo = async (file) => {
  try {
    const uploadResult = await fileManager.uploadFile(file.path, {
      displayName: file.originalname,
      mimeType: file.mimetype,
    });
    console.log(`uploadComplete: ${JSON.stringify(uploadResult.file)}`);
    return uploadResult.file;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const checkProgress = async (uploadResult) => {
  try {
    const result = await fileManager.getFile(uploadResult.name);
    return result;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const promptVideo = async (uploadResult) => {
  try {
    const req = [
      {
        text: `Analyze the following screen recording and provide concise, study-worthy notes: 
        - Focus on key information visible for at least 20 seconds
        - Ignore brief glimpses or rapidly changing content
        - Capture main ideas, definitions, and important details
        - Use bullet points for clarity
        - Include relevant formulas, equations, or code snippets if present
        - Note any diagrams or visual aids, describing their key elements
        - Highlight any emphasized points or repeated information
        - If the content is part of a larger topic, provide context
        - Limit the response to 3-5 bullet points unless the content is particularly dense
      Remember, these notes should be useful for review and study purposes. Prioritize quality and relevance over quantity.`,
      },
      {
        fileData: {
          mimeType: uploadResult.mimeType,
          fileUri: uploadResult.uri,
        },
      },
    ];
    console.log(`promptVideo with`, JSON.stringify(req));
    const result = await genAI
      .getGenerativeModel({
        model: "gemini-1.5-flash",
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
        ],
      })
      .generateContent(req);
    console.log(`promptVideo response`, result.response.text());
    return {
      text: result.response.text(),
      candidates: result.response.candidates,
      feedback: result.response.promptFeedback,
    };
  } catch (error: any) {
    console.error("Error in promptVideo:", error);
    return { error: error.message };
  }
};

export const summarizeNotes = async (prompt) => {
  try {
    const result = await genAI
      .getGenerativeModel({
        model: "gemini-1.5-pro",
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
        ],
        generationConfig: { responseMimeType: "application/json" },
      })
      .generateContent(prompt);

    console.log(`summarizeNotes response`, result.response.text());
    return {
      text: result.response.text(),
      candidates: result.response.candidates,
      feedback: result.response.promptFeedback,
    };
  } catch (error: any) {
    console.error("Error in summarizeNotes:", error);
    return { error: error.message };
  }
};
