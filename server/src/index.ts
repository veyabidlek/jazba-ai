import express from "express";
import cors from "cors";
import multer from "multer";
import { checkProgress, promptVideo, uploadVideo } from "./services/gemini";
// import globalRouter from "./global-router.js";
// import connectDB from "./db.js";
// import { logger } from "./logger.ts";
const app = express();
// app.use(logger);
app.use(cors());
app.use(express.json());
// app.use("/api/", globalRouter);
// connectDB();
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

app.post("/api/prompt", async (req, res) => {
  try {
    const reqData = req.body;
    console.log("/api/prompt", reqData);
    const videoResponse = await promptVideo(
      reqData.uploadResult,
      reqData.prompt,
      reqData.model
    );
    res.json(videoResponse);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    res.json({ error }, { status: 400 });
  }
});

const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
if (isNaN(port)) {
  throw new Error("Invalid port number");
}

app.listen(port, () => console.log("Server is listening on port: ", port));
