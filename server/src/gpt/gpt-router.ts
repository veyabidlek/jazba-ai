import { Router } from "express";
import * as gptController from "./gpt-controller";

const router = Router();

router.post("/summarize", gptController.summarizeText);
router.post("/generatequiz", gptController.generateQuiz);

export default router;
