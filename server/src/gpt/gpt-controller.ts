import * as gptService from "./gpt-service";

export const summarizeText = async (req, res) => {
  try {
    const data = req.body.data;
    console.log("/api/summarize", JSON.stringify(data));
    const response = await gptService.generateText(data);
    res.json(response);
  } catch (error: any) {
    console.error("Error in /api/summarize:", error);
    res.status(400).json({ error: error.message });
  }
};

export const generateQuiz = async (req, res) => {
  try {
    const reqData = req.body;
    const response = await gptService.generateQuiz(
      reqData.noteData,
      reqData.numQuestions
    );
    res.json(response);
  } catch (error: any) {
    console.error("Error in /api/generatequiz:", error);
    res.status(400).json({ error: error.message });
  }
};
