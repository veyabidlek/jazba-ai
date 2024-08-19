"use client";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { NoteCard } from "./noteCard";
import { useLanguage } from "../contexts/languageContext";
import { getContent } from "../utils/languageUtils";

interface NoteProps {
  title: string;
  content: Array<JSON>;
  date: string;
}

const urleke = process.env.BACKEND_URL;

// Skeleton loader component adjusted for mobile
function SkeletonNoteCard() {
  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md w-full sm:w-64 h-[250px] border border-gray-300 animate-pulse flex flex-col justify-between">
      <div className="w-full h-6 bg-gray-300 rounded-md mb-2"></div>
      <div className="w-full h-4 bg-gray-300 rounded-md mb-2"></div>
      <div className="flex-1 bg-gray-300 rounded-md"></div>
    </div>
  );
}

export function RecentNotes() {
  const { language } = useLanguage();
  const content = getContent(language);
  const [notes, setNotes] = useState<NoteProps[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const getNotes = async (): Promise<NoteProps[]> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      setIsLoggedIn(!!token);

      const response = await axios.get(`${urleke}/api/notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const notes = response.data.map((note: any) => ({
        id: note._id,
        title: note.title,
        content: note.content,
        date: new Date(note.date).toLocaleDateString(),
      }));
      return notes.slice(Math.max(notes.length - 3, 0));
    } catch (err) {
      console.error("Error fetching notes", err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await getNotes();
      setNotes(data);
    };
    fetchNotes();
  }, []);

  return (
    <div className="mt-8 sm:mt-16 md:mt-32 px-4">
      {isLoggedIn ? (
        <>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-8">
            <div className="w-full sm:w-1/4 hidden sm:block"></div>
            <h3 className="text-2xl font-bold text-white text-stroke mb-4 sm:mb-0 w-full sm:w-2/4 text-center">
              {content.recentNotes.recentNotes}{" "}
            </h3>
            <div className="w-full sm:w-1/4 hidden sm:flex justify-end">
              <Link
                href="/notes"
                className="px-4 py-2 bg-white text-black font-bold rounded-xl hover:bg-black hover:text-white border-[1px] border-black transition-all duration-300"
              >
                {content.recentNotes.allNotes}
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {loading
              ? Array(3)
                  .fill(0)
                  .map((_, index) => <SkeletonNoteCard key={index} />)
              : notes.map((note, index) => (
                  <NoteCard
                    key={index}
                    title={note.title}
                    content={note.content}
                    date={note.date}
                  />
                ))}
          </div>
          <div className="sm:hidden flex justify-center mt-6">
            <Link
              href="/notes"
              className="px-4 py-3 bg-white text-black font-bold rounded-xl hover:bg-black hover:text-white border-[1px] border-black transition-all duration-300"
            >
              {content.recentNotes.allNotes}{" "}
            </Link>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <h3 className="text-2xl font-bold text-white text-stroke mb-4 text-center">
            {content.recentNotes.prompt}{" "}
          </h3>
          <div className="h-[150px]"></div>
        </div>
      )}
    </div>
  );
}
