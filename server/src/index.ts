import express from "express";
import cors from "cors";
import multer from "multer";
import { generateText } from "./services/openai";
import {
  checkProgress,
  promptVideo,
  uploadVideo,
  summarizeNotes,
} from "./services/gemini";
import globalRouter from "./global-router";
import connectDB from "./db";
import { logger } from "./logger";
const app = express();
app.use(logger);
const urleke = process.env.FRONTEND_URL;
if (!urleke) {
  throw new Error("Frontend url kaida");
}
console.log("frontend:", urleke);
app.use(cors({ origin: `${process.env.FRONTEND_URL}` }));
app.use(express.json());
app.use("/api/", globalRouter);
connectDB();
const upload = multer({ dest: "/tmp/" });
app.post("/api/upload", upload.single("video"), async (req, res) => {
  try {
    const file = req.file;
    const resp = await uploadVideo(file);
    console.log(resp);
    res.json({ data: resp });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post("/api/progress", async (req, res) => {
  try {
    console.log("/api/progress request", req.body);
    const result = req.body.result;
    const progress = await checkProgress(result);
    console.log("/api/progress", progress);
    res.json({ progress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

app.post("/api/summarize", async (req, res) => {
  try {
    const data = req.body.data;
    console.log("/api/sumarize", JSON.stringify(data));
    const response = await generateText(data);
    res.json(response);
  } catch (error: any) {
    console.error("Error in /api/summarize:", error);
    res.status(400).json({ error: error.message });
  }
});

app.post("/api/prompt", async (req, res) => {
  try {
    const reqData = req.body;
    console.log("/api/prompt", JSON.stringify(reqData));
    let response;
    if (reqData.uploadResult) {
      response = await promptVideo(reqData.uploadResult);
    }
    res.json(response);
  } catch (error: any) {
    console.error("Error in /api/prompt:", error);
    res.status(400).json({ error: error.message });
  }
});

const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
if (isNaN(port)) {
  throw new Error("Invalid port number");
}

app.listen(port, () => console.log("Server is listening on port: ", port));
