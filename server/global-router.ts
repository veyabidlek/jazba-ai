import { Router } from "express";
import authRouter from "./auth/auth-router";
import noteRouter from "./notes/note-router";
// other routers can be imported here

const globalRouter = Router();

globalRouter.use(authRouter);
globalRouter.use(noteRouter);

// other routers can be added here

export default globalRouter;
