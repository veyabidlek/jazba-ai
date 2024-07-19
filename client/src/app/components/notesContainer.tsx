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
const exampleNote = {
  id: 0,
  title: "Example Note:  Calculus Midterm Notes",
  content: `"1. Limits and Continuity Definition: The limit of a function 𝑓(𝑥)f(x) as 𝑥x approaches 𝑎a is the value that 𝑓(𝑥)f(x) gets closer to as 𝑥x gets closer to 𝑎 a. lim𝑥→𝑎𝑓(𝑥)=𝐿x→alimf(x)=LContinuity: A function is continuous at a point 𝑥=𝑎
`,
  date: "3 February 2005",
};
export default function NotesContainer() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const getNotes = async (): Promise<Note[]> => {
    try {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
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
      return notes;
    } catch (err) {
      console.error("Notes ala almai kadym bez obid");
      return [];
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await getNotes();
      setNotes(data.slice(Math.max(data.length - 4, 0))); // Limit to 4 notes
    };
    fetchNotes();
  }, []);

  return (
    <>
      {isLoggedIn ? (
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
            className="bg-[#244855] px-24 py-4 rounded-md text-white text-center text-lg font-bold mt-8 w-full hover:bg-[#1D3A44]"
          >
            See all notes
          </Link>
        </div>
      ) : (
        <div className="bg-[#D34836] p-6 rounded-2xl flex flex-col h-[700px] w-full lg:w-[500px] relative overflow-hidden">
          <h1 className="text-center text-white text-xl font-bold mb-4">
            Recent notes
          </h1>
          <div className="space-y-3 flex-grow">
            <Note
              key={exampleNote.id}
              title={exampleNote.title}
              content={exampleNote.content}
            />
            <div className=" mt-8 text-center">
              <div className="py-48  relative">
                <div className="absolute inset-0 bg-white opacity-10 blur-md   "></div>
                <p className="relative text-white text-lg font-light italic px-6 py-4">
                  <span className="font-medium hover:font-bold hover:cursor-pointer">
                    Log in
                  </span>{" "}
                  to save and view your notes
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center items-center space-x-2">
            <div className="w-16 h-[1px] bg-white opacity-50"></div>
            <svg
              className="w-6 h-6 text-white opacity-70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              ></path>
            </svg>
            <div className="w-16 h-[1px] bg-white opacity-50"></div>
          </div>
        </div>
      )}
    </>
  );
}
