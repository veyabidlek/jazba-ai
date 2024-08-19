import express from "express";
import cors from "cors";
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

app.use(cors({ origin: `${urleke}` }));
app.use(express.json());
app.use("/api/", globalRouter);

connectDB();

const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
if (isNaN(port)) {
  throw new Error("Invalid port number");
}

app.listen(port, () => console.log("Server is listening on port: ", port));
