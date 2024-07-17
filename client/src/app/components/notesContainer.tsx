"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface NoteProps {
  title: string;
  content: string;
}

const Note: React.FC<NoteProps> = ({ title, content }) => (
  <div className="bg-[#F6DAD7] rounded-lg overflow-hidden mb-4 w-full h-[120px]">
    {" "}
    {/* Fixed height */}
    <div className="p-4 h-full">
      <h3 className="font-bold text-sm lg:text-md tracking-wider ">{title}</h3>
      <p className="text-xs lg:text-sm tracking-wider ">{content}</p>
    </div>
  </div>
);

interface Note {
  id: number;
  title: string;
  content: string;
  date: Date;
}

const urleke = process.env.BACKEND_URL;

export default function NotesContainer() {
  const getNotes = async (): Promise<Note[]> => {
    try {
      const response = await axios.get(`${urleke}/api/notes`);
      const notes = response.data.map((note: any) => ({
        ...note,
        date: new Date(note.date),
      }));
      return notes;
    } catch (err) {
      console.error("Notes ala almai kadym bez obid");
      return [];
    }
  };

  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await getNotes();
      setNotes(data.slice(0, 4)); // Limit to 4 notes
    };
    fetchNotes();
  }, []);

  return (
    <div className="bg-[#D34836] p-6 rounded-2xl flex flex-col h-[700px] w-full lg:w-[500px]">
      <h1 className="text-center text-white text-xl font-bold mb-4">
        Recent notes
      </h1>
      <div className="space-y-3 flex-grow">
        {notes.map((note, index) => (
          <Note key={index} title={note.title} content={note.content} />
        ))}
      </div>

      <Link
        href="/notes"
        className="bg-[#244855] px-24 py-4 rounded-md text-white text-center text-lg font-bold mt-8 w-full hover:bg-[#1D3A44] "
      >
        See all notes
      </Link>
    </div>
  );
}
