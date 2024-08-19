import { Router } from "express";
import multer from "multer";
import * as geminiController from "./gemini-controller";

const router = Router();
const upload = multer({ dest: "/tmp/" });

router.post("/upload", upload.single("video"), geminiController.uploadVideo);
router.post("/progress", geminiController.checkProgress);
router.post("/prompt", geminiController.promptVideo);

export default router;
