import { FileMetadataResponse } from "@google/generative-ai/files";
import { atom } from "jotai";

export const videoFileAtom = atom<File | null>(null);
export const uploadResultAtom = atom<FileMetadataResponse | null>(null);
export const promptAtom = atom<string>("");
export const isVisibleAtom = atom(false);
export const isLoadingAtom = atom(false);
export const isHIWVisibleAtom = atom(false);
export const noteTitleAtom = atom("Title");
export const noteDateAtom = atom("July 1");
export const noteContentAtom = atom([
  {
    type: "paragraph",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "justify",
    },
    content: [
      {
        type: "text",
        text: "notes will be here",
      },
    ],
  },
]);
