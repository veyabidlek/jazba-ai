/**
 * v0 by Vercel.
 * @see https://v0.dev/t/6E2hdcC4ddk
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Notes() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Note Title",
      content:
        "This is the content of the note. It can be up to two sentences long, and will be displayed as a preview.",
      date: "June 1, 2023",
    },
    {
      id: 2,
      title: "Another Note",
      content:
        "This is the content of another note. It can be up to two sentences long, and will be displayed as a preview.",
      date: "May 15, 2023",
    },
    {
      id: 3,
      title: "Third Note",
      content:
        "This is the content of the third note. It can be up to two sentences long, and will be displayed as a preview.",
      date: "April 20, 2023",
    },
    {
      id: 4,
      title: "Fourth Note",
      content:
        "This is the content of the fourth note. It can be up to two sentences long, and will be displayed as a preview.",
      date: "March 10, 2023",
    },
    {
      id: 5,
      title: "Fifth Note",
      content:
        "This is the content of the fifth note. It can be up to two sentences long, and will be displayed as a preview.",
      date: "February 1, 2023",
    },
    {
      id: 5,
      title: "Fifth Note",
      content:
        "This is the content of the fifth note. It can be up to two sentences long, and will be displayed as a preview.",
      date: "February 1, 2023",
    },
    {
      id: 5,
      title: "Fifth Note",
      content:
        "This is the content of the fifth note. It can be up to two sentences long, and will be displayed as a preview.",
      date: "February 1, 2023",
    },
  ]);
  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#244855]">
      <header className="bg-background shadow">
        <div className="container flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <MountainIcon className="h-6 w-6 text-[#D34836]" />
            <h1 className="text-2xl font-bold text-[#D34836]">Notes</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-full max-w-md">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search notes..."
                className="w-full rounded-md bg-muted pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D34836]"
              />
            </div>

            <Link
              href="/"
              className="rounded-full p-4 bg-[#D34836] text-white hover:bg-[#c03730]"
            >
              <PlusIcon className="h-4 w-4" />
              <span className="sr-only">Create new note</span>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="container grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="group relative rounded-lg bg-[#F5F5F5] p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="absolute top-2 right-2 flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-[#D34836] text-white hover:bg-[#c03730]"
                >
                  <PaletteIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-[#D34836] text-white hover:bg-[#c03730]"
                >
                  <FolderIcon className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-[#244855]">
                  {note.title}
                </h2>
                <p className="text-muted-foreground line-clamp-2">
                  {note.content}
                </p>
                <div className="text-xs text-muted-foreground">{note.date}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function FolderIcon(props: any) {
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
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  );
}

function MountainIcon(props: any) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function PaletteIcon(props: any) {
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
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
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
