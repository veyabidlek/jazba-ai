"use client";
import { useAtom } from "jotai";
import { isVisibleAtom } from "../atoms";
import Editor from "./editor";
import { noteContentAtom, noteTitleAtom, noteDateAtom } from "../atoms";

export function Note() {
  const [isVisible, setIsVisible] = useAtom(isVisibleAtom);
  const [noteTitle] = useAtom(noteTitleAtom);
  const [noteDate] = useAtom(noteDateAtom);
  const [noteContent] = useAtom(noteContentAtom);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  if (!isVisible) {
    return null;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const formatDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white shadow-lg rounded-lg p-6 w-3/4 h-3/4 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold">{noteTitle}</h2>
          <button
            onClick={toggleVisibility}
            className="bg-white text-black rounded-full p-2 shadow-md hover:bg-black hover:text-white transition duration-300 ease-in-out focus:outline-none"
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
        </div>

        <p className="text-sm italic text-gray-500 mb-4">
          {formatDate(noteDate)}
        </p>

        <div className="flex-grow overflow-auto">
          <Editor content={noteContent} />
        </div>
      </div>
    </div>
  );
}
