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
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.get(`${urleke}/api/notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const notes = response.data.map((note: any) => ({
      id: note._id,
      title: note.title,
      content: note.content,
      user: note.user,
      date: new Date(note.date),
    }));
    notes.reverse();
    return notes;
  } catch (err) {
    console.error("Notes ala almai kadym bez obid");
    return [];
  }
};

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isQuizGenerating, setIsQuizGenerating] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await getNotes();
      setNotes(data);
    };
    fetchNotes();
  }, []);

  const handleNoteClick = (note: Note) => {
    if (!isQuizGenerating) {
      setSelectedNote(note);
    }
  };

  const handleBackClick = () => {
    setSelectedNote(null);
  };

  const generateQuiz = async (noteData: string, numQuestions: number) => {
    try {
      const response = await axios.post(`${urleke}/api/generatequiz`, {
        noteData: noteData,
        numQuestions: numQuestions,
      });
      console.log(response);
    } catch (err) {
      console.error("Could not generate notes");
    }
  };

  const handleGenerateQuizClick = async () => {
    setIsQuizGenerating(true);
    await generateQuiz(selectedNote!.content, 5);
    setIsQuizGenerating(false);
  };

  return (
    <div className="flex min-h-[100dvh] px-12 flex-col bg-[#244855]">
      <header className="bg-background shadow">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                <Link
                  href="/"
                  className={` ${
                    isQuizGenerating
                      ? "pointer-events-none cursor-not-allowed"
                      : ""
                  } `}
                >
                  Capture <span className="text-[#D34836]">AI</span>
                </Link>
              </h1>
            </div>
            <div className="w-full sm:w-auto sm:flex-1 mb-4 sm:mb-0 sm:mx-4">
              <div className="relative w-full max-w-md mx-auto">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search notes..."
                  className="w-full rounded-md bg-muted pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D34836]"
                  disabled={isQuizGenerating}
                />
              </div>
            </div>
            <div className="flex items-center">
              <Link
                href="/"
                className={`rounded-md px-4 sm:px-6 py-2 text-sm sm:text-md text-white hover:bg-[#c03730] whitespace-nowrap ${
                  isQuizGenerating
                    ? "bg-gray-400 pointer-events-none cursor-not-allowed"
                    : "bg-[#D34836]"
                } `}
                aria-disabled={isQuizGenerating}
              >
                <PlusIcon className="h-5 w-5 sm:h-6 sm:w-6 inline mr-2" />
                <span className="hidden sm:inline">Create new note</span>
                <span className="sm:hidden">New</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
      {selectedNote ? (
        <div className="flex-1 px-6 py-6 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="rounded-lg bg-[#F5F5F5] p-4 shadow-lg">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    {" "}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-md bg-[#D34836] text-white hover:bg-[#c03730]"
                      onClick={handleBackClick}
                      aria-label="Back"
                      disabled={isQuizGenerating}
                    >
                      <ArrowLeftIcon className="h-4 w-4" />
                    </Button>
                    <p className="mt-2 text-gray-500 text-md ">
                      {new Intl.DateTimeFormat("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }).format(selectedNote.date)}
                    </p>
                  </div>
                  <h2 className="text-2xl  font-bold text-[#244855]">
                    {selectedNote.title}
                  </h2>
                  <Button
                    onClick={handleGenerateQuizClick}
                    className="rounded-md bg-[#D34836] text-white font-bold hover:bg-[#c03730]"
                    disabled={isQuizGenerating}
                  >
                    <span className="text-md">Take Quiz</span>
                  </Button>
                </div>
                <div className="prose text-[#244855] flex-1 max-h-[calc(100%-4rem)] overflow-auto whitespace-pre-wrap truncate">
                  {selectedNote.content}
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
                  <h2 className="text-lg font-bold text-[#244855] mb-2">
                    {note.title}
                  </h2>
                  <div className="prose text-[#244855] flex-1 relative overflow-hidden">
                    <p className="line-clamp-8 text-sm">{note.content}</p>
                    <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#F5F5F5] to-transparent"></div>
                  </div>
                  <div className="text-xs  text-muted-foreground mt-auto">
                    {new Intl.DateTimeFormat("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }).format(note.date)}
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
