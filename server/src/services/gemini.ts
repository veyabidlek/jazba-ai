import { GoogleGenerativeAI } from "@google/generative-ai";
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

export const promptVideo = async (uploadResult, prompt, model) => {
  try {
    const req = [
      { text: prompt },
      {
        fileData: {
          mimeType: uploadResult.mimeType,
          fileUri: uploadResult.uri,
        },
      },
    ];
    console.log(`promptVideo with ${model}`, JSON.stringify(req));
    const result = await genAI
      .getGenerativeModel({ model })
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

export const summarizeNotes = async (prompt, model) => {
  try {
    const result = await genAI
      .getGenerativeModel({ model })
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
