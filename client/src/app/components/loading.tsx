"use client";
import React from "react";
import { useAtom } from "jotai";
import { isLoadingAtom } from "../atoms";
import WritingAnimation from "./writingAnimation";

enum UploadState {
  Waiting = "",
  Recording = "Recording...",
  Uploading = "Processing notes...",
  Processing = "Generating notes...",
  Processed = "Processed!",
  Failure = "Upload failed.",
}

export function Loading() {
  const [isLoading] = useAtom(isLoadingAtom);
  const [currentState, setCurrentState] = React.useState<UploadState>(
    UploadState.Processing
  );

  React.useEffect(() => {
    if (isLoading) {
      const states = [UploadState.Uploading, UploadState.Processing];
      let currentIndex = 0;
      const interval = setInterval(() => {
        setCurrentState(states[currentIndex]);
        currentIndex = (currentIndex + 1) % states.length;
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className=" p-8 rounded-lg shadow-lg text-center">
        <WritingAnimation width={200} height={200} />
        <p className="text-white">{currentState}</p>
      </div>
    </div>
  );
}
