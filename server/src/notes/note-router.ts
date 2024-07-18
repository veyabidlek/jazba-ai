import { Router } from "express";
import NoteController from "./note-controller";
import NoteService from "./note-service";
import { authMiddleware } from "../middlewares/auth-middleware";

//in order to provide our frontend with the user data, we need to specify user routes

const noteRouter = Router();

const noteService = new NoteService();
const noteController = new NoteController(noteService);

noteRouter.get("/notes/", authMiddleware, noteController.getNotes);
noteRouter.post("/notes/", authMiddleware, noteController.createNote);
noteRouter.get("/notes/:id", authMiddleware, noteController.getNoteById);

export default noteRouter;
