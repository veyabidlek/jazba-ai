import { FileMetadataResponse } from "@google/generative-ai/files";
import { atom } from "jotai";

export const videoFileAtom = atom<File | null>(null);
export const uploadResultAtom = atom<FileMetadataResponse | null>(null);
export const promptAtom = atom<string>("");
export const timestampTextAtom = atom("");
export const isVisibleAtom = atom(false);
export const isLoadingAtom = atom(false);
