"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

export default function Component() {
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-custom bg-cover">
      <header className="text-white py-4 px-6 flex items-center justify-between ">
        <div className="flex bitems-center gap-4">
          <Link href="#" className="text-xl font-semibold" prefetch={false}>
            <div className="flex items-center gap-2">
              <span className="text-stroke">Capture AI</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            className="px-4 py-2 bg-[#6b7280] text-white hover:bg-[#4b5563] transition-colors duration-300 rounded-full shadow-lg"
          >
            Sign In
          </Button>
          <Button className="px-4 py-2 bg-[#00B050] text-white hover:bg-[#00A651] transition-colors duration-300 rounded-full shadow-lg">
            Sign Up
          </Button>
          <Button
            onClick={() => setShowHowItWorks(true)}
            className="p-2 bg-[#6b7280] text-white hover:bg-[#4b5563] transition-colors duration-300 rounded-full shadow-lg"
          >
            <QuestionMarkIcon className="w-6 h-6" />
          </Button>
        </div>
      </header>
      <main className="flex-1 relative ">
        <div className="absolute inset-0 bg-cover bg-center z-0" />
        <div className="relative max-w-3xl mx-auto flex flex-col items-center gap-8 p-6 md:p-10 rounded-lg shadow-2xl">
          <div className="rounded-lg p-6 w-full flex flex-col items-center gap-4 animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="flex flex-col justify-center items-center text-center">
                <h2 className="text-5xl font-bold text-white text-stroke">
                  <span className="text-green-500">Запиши</span> свой экран
                </h2>

                <h2 className="text-5xl font-bold text-white text-stroke">
                  Получи крутые <span className="text-purple-500">заметки</span>
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                className="px-16 py-8 bg-[#00B050] text-white text-lg hover:bg-[#00A651] transition-colors duration-300 rounded-full shadow-2xl"
                id="start-button"
              >
                Let's go
              </Button>
              <Button
                className="px-6 py-3 bg-[#00B050] text-white hover:bg-[#00A651] transition-colors duration-300 rounded-full shadow-2xl hidden"
                id="stop-button"
              >
                Stop
              </Button>
            </div>
          </div>
          <div className="rounded-lg shadow-2xl p-6 w-full animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white text-stroke">
                Recent Notes
              </h3>
              <div className="flex gap-4">
                <Button
                  variant="secondary"
                  className="px-4 py-2 bg-[#6b7280] text-white hover:bg-[#4b5563] transition-colors duration-300 rounded-full shadow-lg"
                >
                  See All Notes
                </Button>
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4">
              <Card className="flex-shrink-0 p-4 bg-yellow-400 w-64 text-black hover:shadow-lg transition-shadow duration-300 rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="rounded-full w-8 h-8 flex items-center justify-center">
                      <CalendarIcon className="w-5 h-5 text-black animate-pulse" />
                    </div>
                    <div className="text-sm text-black">Aug 24, 2023</div>
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-black">
                    Recorded screen session
                  </h4>
                  <p className="text-sm text-black">
                    Recorded a 15-minute screen session and took notes on the
                    key points.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex-shrink-0 bg-yellow-400 w-64 text-black hover:shadow-lg transition-shadow duration-300 rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="rounded-full w-8 h-8 flex items-center justify-center">
                      <CalendarIcon className="w-5 h-5 text-black animate-pulse" />
                    </div>
                    <div className="text-sm text-black">Aug 24, 2023</div>
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-black">
                    Recorded screen session
                  </h4>
                  <p className="text-sm text-black">
                    Recorded a 15-minute screen session and took notes on the
                    key points.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex-shrink-0 bg-yellow-400 w-64 text-black hover:shadow-lg transition-shadow duration-300 rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="rounded-full w-8 h-8 flex items-center justify-center">
                      <CalendarIcon className="w-5 h-5 text-black animate-pulse" />
                    </div>
                    <div className="text-sm text-black">Aug 24, 2023</div>
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-black">
                    Recorded screen session
                  </h4>
                  <p className="text-sm text-black">
                    Recorded a 15-minute screen session and took notes on the
                    key points.
                  </p>
                </CardContent>
              </Card>

              <Card className="flex-shrink-0 bg-yellow-400 w-64 text-black hover:shadow-lg transition-shadow duration-300 rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="rounded-full w-8 h-8 flex items-center justify-center">
                      <CalendarIcon className="w-5 h-5 text-black animate-pulse" />
                    </div>
                    <div className="text-sm text-black">Aug 24, 2023</div>
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-black">
                    Recorded screen session
                  </h4>
                  <p className="text-sm text-black">
                    Recorded a 15-minute screen session and took notes on the
                    key points.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      {showHowItWorks && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowHowItWorks(false)}
        >
          <div
            className="rounded-lg p-6 max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#475569]/80 rounded-lg p-4 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-gradient-to-br from-[#374151] to-[#4b5563] rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                    <VideoIcon className="w-6 h-6 text-white animate-pulse" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Record</h4>
                </div>
                <p className="text-sm text-[#b9c2d0]">
                  Click the "Start" button to begin recording your screen.
                </p>
              </div>
              <div className="bg-[#475569]/80 rounded-lg p-4 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-gradient-to-br from-[#374151] to-[#4b5563] rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                    <StickyNoteIcon className="w-6 h-6 text-white animate-pulse" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Take Notes</h4>
                </div>
                <p className="text-sm text-[#b9c2d0]">
                  While recording, you can take notes on the key points of your
                  session.
                </p>
              </div>
              <div className="bg-[#475569]/80 rounded-lg p-4 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-gradient-to-br from-[#374151] to-[#4b5563] rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                    <SaveIcon className="w-6 h-6 text-white animate-pulse" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Save</h4>
                </div>
                <p className="text-sm text-[#b9c2d0]">
                  When you're done, click the "Stop" button to save your
                  recording and notes.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CalendarIcon(props) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function SaveIcon(props) {
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
      <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
      <path d="M7 3v4a1 1 0 0 0 1 1h7" />
    </svg>
  );
}

function StickyNoteIcon(props) {
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
      <path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z" />
      <path d="M15 3v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

function VideoIcon(props) {
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
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  );
}

function QuestionMarkIcon(props) {
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
      <path d="M9 9c0-1.1.9-2 2-2s2 .9 2 2c0 .55-.22 1.05-.58 1.42-.27.27-.6.5-.92.58-.46.13-.78.52-.78.98v1" />
      <path d="M12 17h.01" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
