import { Router } from "express";
import NoteController from "./note-controller";
import NoteService from "./note-service";

//in order to provide our frontend with the user data, we need to specify user routes

const noteRouter = Router();

const noteService = new NoteService();
const noteController = new NoteController(noteService);

noteRouter.get("/notes/", noteController.getNotes);
noteRouter.post("/notes/", noteController.createNote);
noteRouter.get("/notes/:id", noteController.getNoteById);

export default noteRouter;
