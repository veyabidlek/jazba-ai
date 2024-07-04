import mongoose, { Document, Schema } from "mongoose";

export interface INote extends Document {
  title: string;
  content: string;
  date: Date;
}

const NoteSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String },
  date: { type: Date, default: Date.now },
});

const Note = mongoose.model<INote>("Note", NoteSchema);

export default Note;
