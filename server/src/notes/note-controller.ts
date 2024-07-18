import { Request, Response } from "express";
import { CreateNoteDto } from "./dtos/createNote.dto";
import NoteService from "./note-service";

class NoteController {
  private noteService: NoteService;

  constructor(noteService: NoteService) {
    this.noteService = noteService;
  }

  createNote = async (req: Request, res: Response): Promise<void> => {
    try {
      const createNoteDto: CreateNoteDto = {
        ...req.body,
        userId: (req as any).user.id,
      };
      const note = await this.noteService.createNote(createNoteDto);
      res.status(201).json(note);
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  };

  getNotes = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user.id;
      const notes = await this.noteService.getNotes(userId);
      res.status(200).json(notes);
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  };

  getNoteById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = (req as any).user_id;
      const note = await this.noteService.getNoteById(id, userId);
      if (!note) {
        res.status(404).json({ message: "Event not found" });
        return;
      }
      res.status(200).json(note);
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  };
}

export default NoteController;
