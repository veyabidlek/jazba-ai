"use client";
import { useAtom } from "jotai";
import { NoteAtom, isVisibleAtom } from "../atoms";

export function Note() {
  const [noteText, setNoteText] = useAtom(NoteAtom);
  const [isVisible, setIsVisible] = useAtom(isVisibleAtom);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    window.location.reload();
  };

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white shadow-lg rounded-lg ml-[150px] p-6 w-[700px] h-[600px]">
            <button
              onClick={toggleVisibility}
              className="absolute top-4 right-4 bg-yellow-500 text-white rounded-full p-2 shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <textarea
              className="prose w-full h-full bg-gray-100 text-black p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Notes will appear here"
              onChange={(e) => setNoteText(e.target.value)}
              value={noteText}
            ></textarea>
          </div>
        </div>
      )}
    </>
  );
}
