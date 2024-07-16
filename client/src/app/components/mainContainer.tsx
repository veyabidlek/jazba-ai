"use client";
import { useState, useRef, useEffect } from "react";
import {
  videoFileAtom,
  uploadResultAtom,
  NoteAtom,
  isVisibleAtom,
  isLoadingAtom,
} from "../atoms";
import { useAtom } from "jotai";
import { FileMetadataResponse } from "@google/generative-ai/files";
import { parse } from "path";

const post = async (url: string, body: string | FormData) => {
  const opts: RequestInit = {
    method: "POST",
    body,
  };
  if (typeof body === "string") {
    opts.headers = {
      "Content-Type": "application/json",
    };
  }
  const response = await fetch(url, opts);
  return await response.json();
};

const urleke = process.env.BACKEND_URL;
if (!urleke) {
  throw new Error("Backend does not exist.");
}
console.log(urleke);

export default function MainContainer() {
  const [, setVideoFile] = useAtom(videoFileAtom);
  const [, setUploadResult] = useAtom(uploadResultAtom);
  const [, setNote] = useAtom(NoteAtom);
  const [, setIsVisible] = useAtom(isVisibleAtom);
  const [, SetIsLoading] = useAtom(isLoadingAtom);

  const enum UploadState {
    Waiting = "",
    Recording = "Recording...",
    Uploading = "Uploading...",
    Processing = "Processing...",
    Processed = "Processed!",
    Failure = "Upload failed.",
  }
  const [, setState] = useState<UploadState>(UploadState.Waiting);

  const DEFAULT_PROMPT = `ONLY return the notes based on the recording of the screen.`;

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const segmentIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const notesArrayRef = useRef<string[]>([]);
  const chunkInterval = 60000; //1 minute
  const startRecording = async () => {
    try {
      streamRef.current = await navigator.mediaDevices.getDisplayMedia({
        video: {
          width: { ideal: 854 },
          height: { ideal: 480 },
        },
        audio: true,
      });

      const options = {
        mimeType: "video/webm; codecs=vp8",
        videoBitsPerSecond: 1500000, // bitrate = 1.5 Mbps
      };

      mediaRecorderRef.current = new MediaRecorder(streamRef.current, options);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const file = new File([blob], `recording-${Date.now()}.webm`, {
          type: "video/webm",
        });
        setVideoFile(file);
        await uploadVideo(file);
        chunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setState(UploadState.Recording);

      segmentIntervalRef.current = setInterval(() => {
        mediaRecorderRef.current?.stop();
        mediaRecorderRef.current?.start();
      }, chunkInterval);
    } catch (err) {
      console.error("Error starting screen recording", err);
      setState(UploadState.Failure);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setState(UploadState.Uploading);
    }
    if (segmentIntervalRef.current) {
      clearInterval(segmentIntervalRef.current);
      segmentIntervalRef.current = null;
    }
    SetIsLoading(true);

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setTimeout(() => {
      {
        processAllNotes();
      }
    }, 20000);
  };

  const uploadVideo = async (file: File) => {
    try {
      const formData = new FormData();
      formData.set("video", file);
      const resp = await post(`${urleke}/api/upload`, formData);
      console.log("uploadResult:", resp.data);
      setUploadResult(resp.data);
      setState(UploadState.Processing);
      await checkProcessing(resp.data);
      await postNotesRequest(resp.data); // Generate notes for this segment
    } catch (err) {
      console.error("Error Uploading Video", err);
      setState(UploadState.Failure);
    }
  };

  const checkProcessing = async (result: FileMetadataResponse) => {
    return new Promise<void>((resolve) => {
      setTimeout(async () => {
        const progressResult = await post(
          `${urleke}/api/progress`,
          JSON.stringify({ result })
        );
        const state = progressResult.progress.state;
        console.log("progress:", state);
        if (state === "ACTIVE") {
          setState(UploadState.Processed);
          resolve();
        } else if (state === "FAILED") {
          setState(UploadState.Failure);
          resolve();
        } else {
          setState(UploadState.Processing);
          await checkProcessing(result);
          resolve();
        }
      }, 5000);
    });
  };

  const postNotesRequest = async (uploadResult: FileMetadataResponse) => {
    try {
      const response = await post(
        `${urleke}/api/prompt`,
        JSON.stringify({
          uploadResult,
          prompt: DEFAULT_PROMPT,
          model: "gemini-1.5-flash-latest",
        })
      );
      if (response.error) {
        console.error("Error getting notes:", response.error);
        return;
      }
      const modelResponse = response.text;
      notesArrayRef.current.push(modelResponse.trim());
      console.log("Notes generated:", modelResponse.trim());
    } catch (err) {
      console.error("Error getting notes", err);
      setState(UploadState.Failure);
    }
  };

  // const postGeneratedNote = async (note: JSON) => {
  //   try {
  //     const response = await post(
  //       `${urleke}/api/notes`,
  //       JSON.stringify({ note })
  //     );
  //     console.log("NOTE TO MONGO DONE");
  //   } catch (err) {
  //     console.error("Note not posted to server");
  //   }
  // };

  const processAllNotes = async () => {
    const combinedNotes = notesArrayRef.current.join("\n\n");
    const summaryPrompt = `Summarize the following notes:\n\n${combinedNotes} 
    Return the answer in the following JSON format: 
    {
       "title": "title generated by gemini",
       "content": "lorem ipsum"
    }
     ALWAYS RETURN ONLY JSON FORMAT without any formatting or additional text
      `;

    try {
      const response = await post(
        `${urleke}/api/prompt`,
        JSON.stringify({
          prompt: summaryPrompt,
          model: "gemini-1.5-flash-latest",
          generationConfig: { responseMimeType: "application/json" },
        })
      );
      if (response.error) {
        console.error("Error summarizing notes:", response.error);
        return;
      }

      const modelResponse = response.text;
      const parsedObject = JSON.parse(modelResponse);
      parsedObject.date = new Date();
      console.log(parsedObject);
      SetIsLoading(false);
      setIsVisible(true);
      setNote(modelResponse);
      console.log("Final summary:", modelResponse);
    } catch (err) {
      console.error("Error summarizing notes", err);
      setState(UploadState.Failure);
    }
  };

  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const startDateTimeRef = useRef<Date | null>(null);

  const tick = () => {
    if (startDateTimeRef.current) {
      const datediffInms =
        new Date().getTime() - startDateTimeRef.current.getTime();
      setTime(Math.round(datediffInms / 1000));
    }
  };

  const countup = () => {
    setTimeout(function () {
      if (!isActive) return; // stop the loop
      tick();
      countup(); // this is the "loop"
    }, 1000);
  };

  useEffect(() => {
    if (isActive) {
      startDateTimeRef.current = new Date();
      countup();
    }
  }, [isActive]);

  const formatTime = (time: number) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const startFunction = () => {
    handleStartPause();
    startRecording();
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  const stopFunction = () => {
    handleReset();
    stopRecording();
  };

  return (
    <div className="bg-[#D34836] rounded-2xl flex flex-col items-center justify-center pt-8 pb-16 px-32 w-[700px]">
      <h1 className="text-white whitespace-nowrap text-5xl font-bold mb-6 text-center">
        Экраныңды түсіріп
        <br />
        Әдемі жазбалар ал
      </h1>

      {!isActive ? (
        <button
          onClick={startFunction}
          className="bg-green-500 text-white px-24 py-4 rounded-md text-lg hover:bg-green-600"
        >
          ▶ Бастау
        </button>
      ) : (
        <div>
          <div className="text-white text-8xl font-bold mb-8">
            {formatTime(time)}
          </div>
          <div className="w-full max-w-md bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 mb-8">
            <div
              className="bg-green-600 h-1.5 rounded-full"
              style={{ width: `${(time / 1800) * 100}%` }}
            ></div>
          </div>
          <button
            onClick={stopFunction}
            className="bg-red-500 text-white px-24 py-4 rounded-md text-lg hover:bg-red-600"
          >
            ⏹ Бітіру
          </button>
        </div>
      )}
    </div>
  );
}
