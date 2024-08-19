import * as geminiService from "./gemini-service";

export const uploadVideo = async (req, res) => {
  try {
    const file = req.file;
    const resp = await geminiService.uploadVideo(file);
    console.log(resp);
    res.json({ data: resp });
  } catch (error: any) {
    res.status(500).json({ error });
  }
};

export const checkProgress = async (req, res) => {
  try {
    const result = req.body.result;
    const progress = await geminiService.checkProgress(result);
    res.json({ progress });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const promptVideo = async (req, res) => {
  try {
    const reqData = req.body;
    console.log("/api/prompt", JSON.stringify(reqData));
    let response;
    if (reqData.uploadResult) {
      response = await geminiService.promptVideo(reqData.uploadResult);
    }
    res.json(response);
  } catch (error: any) {
    console.error("Error in /api/prompt:", error);
    res.status(400).json({ error: error.message });
  }
};
