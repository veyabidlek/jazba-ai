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
    const result = await genAI.getGenerativeModel({
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
      .generateContent(`You are a helpful assistant that summarizes the  notes. Summarize and organize the following collection of study notes from a screen recording session. Please format the summary in Markdown, creating a well-structured, easy-to-review document:
            - Begin with a brief overview of the main topics covered
            - Organize the content into logical sections and subsections
            - Use appropriate Markdown headings (# for main sections, ## for subsections, etc.)
            - Utilize bullet points and numbered lists for clarity
            - Include any important formulas, equations, or code snippets in appropriate code blocks
            - Create tables if they would help organize related information
            - Bold key terms or important concepts
            - Use italics for emphasis where appropriate
            - If applicable, include a brief "Key Takeaways" section at the end
        Aim to create a comprehensive yet concise summary that captures the essence of the study session. The final document should be well-organized, visually appealing, and effective for review purposes.
        If you notice any gaps in the information or areas that seem to lack context, please note these at the end of the summary as "Potential areas for further study".:
        ALWAYS return in JSON fromat
        {
          "title": "title generated by gemini",
          "content": "notes generated by gemini"
        }
        here are the notes to summarize: ${prompt}`);

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
