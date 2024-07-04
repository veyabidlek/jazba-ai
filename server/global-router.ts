import { Router } from "express";
import authRouter from "./auth/auth-router";
// import eventRouter from "./events/event-router";
// other routers can be imported here

const globalRouter = Router();

globalRouter.use(authRouter);
// globalRouter.use(eventRouter);

// other routers can be added here

export default globalRouter;
