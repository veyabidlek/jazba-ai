import { Router } from "express";
import authRouter from "./auth/auth-router";
import eventRouter from "./notes/note-router";
import geminiRouter from "./gemini/gemini-router";
import gptRouter from "./gpt/gpt-router";

const globalRouter = Router();

globalRouter.use(authRouter);
globalRouter.use(eventRouter);
globalRouter.use(geminiRouter);
globalRouter.use(gptRouter);

export default globalRouter;
