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
      const createNoteDto: CreateNoteDto = req.body;
      const note = await this.noteService.createNote(createNoteDto);
      res.status(201).json(note);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };

  getNotes = async (req: Request, res: Response): Promise<void> => {
    try {
      const notes = await this.noteService.getNotes();
      res.status(200).json(notes);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };

  getNoteById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const note = await this.noteService.getNoteById(id);
      if (!note) {
        res.status(404).json({ message: "Event not found" });
        return;
      }
      res.status(200).json(note);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };
}

export default NoteController;
