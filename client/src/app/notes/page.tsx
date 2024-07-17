"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";

interface Note {
  id: number;
  title: string;
  content: string;
  date: Date;
}

const urleke = process.env.BACKEND_URL;

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

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await getNotes();
      setNotes(data);
    };
    fetchNotes();
  }, []);

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
  };

  const handleBackClick = () => {
    setSelectedNote(null);
  };

  return (
    <div className="flex min-h-[100dvh] px-12 flex-col bg-[#244855]">
      <header className="bg-background shadow">
        <div className="container mx-auto flex items-center justify-between px-12 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-white">
              <Link href="/">
                Capture <span className="text-[#D34836]">AI</span>
              </Link>
            </h1>
          </div>
          <div className="flex-1 ">
            <div className="relative w-full justify-center max-w-md mx-auto">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search notes..."
                className="w-full rounded-md bg-muted pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D34836]"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="rounded-md px-6 py-2 bg-[#D34836] text-md text-white hover:bg-[#c03730]"
            >
              <PlusIcon className="h-6 w-6 inline mr-2" />
              <span className="text-md">Create new note</span>
            </Link>
          </div>
        </div>
      </header>
      {selectedNote ? (
        <div className="flex-1 px-6 py-6 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="rounded-lg bg-[#F5F5F5] p-4 shadow-lg">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-[#D34836] text-white hover:bg-[#c03730]"
                    onClick={handleBackClick}
                    aria-label="Back"
                  >
                    <ArrowLeftIcon className="h-4 w-4" />
                  </Button>
                  <h2 className="text-2xl font-bold text-[#244855]">
                    {selectedNote.title}
                  </h2>
                  <Button className="rounded-md bg-[#D34836] text-white font-bold hover:bg-[#c03730]">
                    <span className="text-md">Take Quiz</span>
                  </Button>
                </div>
                <div className="prose text-[#244855] flex-1 max-h-[calc(100%-4rem)] overflow-auto whitespace-pre-wrap">
                  {selectedNote.content}
                </div>
                <div className="text-xs text-muted-foreground absolute bottom-4 w-full">
                  {selectedNote.date.toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <main className="flex-1 px-6 py-6 sm:px-6 lg:px-8">
          <div className="container mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {notes.map((note) => (
              <div
                key={note.id}
                className="group relative rounded-lg bg-[#F5F5F5] p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer w-full aspect-square"
                onClick={() => handleNoteClick(note)}
              >
                <div className="space-y-2 h-full flex flex-col">
                  <h2 className="text-lg font-bold text-[#244855]">
                    {note.title}
                  </h2>
                  <div className="prose text-[#244855] flex-1 max-h-[calc(100%-4rem)] overflow-hidden text-ellipsis whitespace-pre-wrap">
                    {note.content}
                  </div>
                  <div className="text-xs text-muted-foreground absolute bottom-4 w-full">
                    {note.date.toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}
    </div>
  );
}

function ArrowLeftIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
