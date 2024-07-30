export interface CreateNoteDto {
  title: string;
  content: Array<JSON>;
  date: Date;
  userId: string;
}
