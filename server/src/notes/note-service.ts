import { CreateNoteDto } from "./dtos/createNote.dto";
import NoteModel, { INote } from "./models/Note";

// this event service instance shows how to create a event, get a event by id, and get all events with in-memory data
class NoteService {
  async getNoteById(id: string): Promise<INote | null> {
    return await NoteModel.findById(id).exec();
  }

  async getNotes(): Promise<INote[]> {
    return await NoteModel.find().exec();
  }

  async createNote(createNoteDto: CreateNoteDto): Promise<INote> {
    const { title, content, date } = createNoteDto;
    const newNote = new NoteModel({
      title,
      content,
      date: new Date(date),
    });

    await newNote.save();
    return newNote;
  }
}

export default NoteService;
