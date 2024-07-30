/* eslint-disable @typescript-eslint/no-non-null-assertion */
"use client";
import { useEffect, useState } from "react";
import { Button } from "@/vcomponents/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

import { NavBar } from "../components/navBar";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("../components/editor"), { ssr: false });

interface Note {
  id: number;
  title: string;
  content: Array<JSON>;
  date: Date;
}

interface QuizData {
  questions: {
    id: number;
    question: string;
    choices: string[];
    answer: string;
    explanation: string;
  }[];
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
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isQuizGenerating, setIsQuizGenerating] = useState(false);
  const [, setQuizData] = useState<QuizData | null>(null);

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
      const quizData = response.data;
      setQuizData(quizData);
      localStorage.setItem("quizData", JSON.stringify(quizData)); // Store quiz data in localStorage

      const noteTitleSlug = selectedNote!.title
        .toLowerCase()
        .replace(/ /g, "-");
      router.push(`/notes/${noteTitleSlug}`);
    } catch (err) {
      console.error("Could not generate notes");
    }
  };

  const handleGenerateQuizClick = async () => {
    setIsQuizGenerating(true);
    const string = JSON.stringify(selectedNote?.content);
    await generateQuiz(string, 5);
    setIsQuizGenerating(false);
  };

  return (
    <div className="flex min-h-[100dvh] px-12 flex-col custom-bg">
      <NavBar />
      {selectedNote ? (
        <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="rounded-lg bg-[white] p-4 shadow-lg">
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-4 mb-4 sm:mb-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-md bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black"
                      onClick={handleBackClick}
                      aria-label="Back"
                      disabled={isQuizGenerating}
                    >
                      <ArrowLeftIcon className="ml-3 h-4 w-4" />
                    </Button>
                    <p className="mt-2 text-gray-500 text-md">
                      {new Intl.DateTimeFormat("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }).format(selectedNote.date)}
                    </p>
                  </div>
                  <h2 className="text-2xl font-bold text-[#244855] text-center sm:text-left">
                    {selectedNote.title}
                  </h2>
                  <Button
                    onClick={handleGenerateQuizClick}
                    className="mt-4 sm:mt-0 rounded-md bg-black text-white font-bold hover:bg-white hover:text-black hover:border hover:border-black"
                    disabled={isQuizGenerating}
                  >
                    <span className="text-md">Take Quiz</span>
                  </Button>
                </div>
                <Editor content={selectedNote.content} />
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
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    {note.content[1].content[0].text}
                    <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#F5F5F5] to-transparent"></div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-auto">
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
