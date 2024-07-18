import { CreateNoteDto } from "./dtos/createNote.dto";
import NoteModel, { INote } from "./models/Note";

class NoteService {
  async getNoteById(id: string, userId: string): Promise<INote | null> {
    return await NoteModel.findOne({ _id: id, user: userId }).exec();
  }

  async getNotes(userId: string): Promise<INote[]> {
    return await NoteModel.find({ user: userId }).exec();
  }

  async createNote(createNoteDto: CreateNoteDto): Promise<INote> {
    const { title, content, date, userId } = createNoteDto;
    const newNote = new NoteModel({
      title,
      content,
      date: new Date(date),
      user: userId,
    });

    await newNote.save();
    return newNote;
  }
}

export default NoteService;
