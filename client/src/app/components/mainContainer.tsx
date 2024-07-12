"use client";
import { useState, useRef, useEffect } from "react";
import {
  videoFileAtom,
  uploadResultAtom,
  timestampTextAtom,
  isVisibleAtom,
  isLoadingAtom,
} from "../atoms";
import { useAtom } from "jotai";
import { FileMetadataResponse } from "@google/generative-ai/files";

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
  const [uploadResult, setUploadResult] = useAtom(uploadResultAtom);
  const [, setTimestampText] = useAtom(timestampTextAtom);
  const [, setIsVisible] = useAtom(isVisibleAtom);
  const [, SetIsLoading] = useAtom(isLoadingAtom);
  const [accumulatedNotes, setAccumulatedNotes] = useState<string>("");
  const chunkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const enum UploadState {
    Waiting = "",
    Recording = "Recording...",
    Uploading = "Uploading...",
    Processing = "Processing...",
    Processed = "Processed!",
    Failure = "Upload failed.",
  }
  const [state, setState] = useState<UploadState>(UploadState.Waiting);

  const DEFAULT_PROMPT = `ONLY return the notes and a 3-question multiple choice quiz based on the recording of the screen.`;

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

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
        const file = new File([blob], "recording.webm", { type: "video/webm" });
        setVideoFile(file);
        await uploadVideo(file);
      };

      mediaRecorderRef.current.start();
      setState(UploadState.Recording);
      startChunkProcessing();
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
    SetIsLoading(true);
    stopChunkProcessing();

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    processAccumulatedNotes();
  };

  const processAccumulatedNotes = async () => {
    try {
      const summaryResponse = await post(
        `${urleke}/api/prompt`,
        JSON.stringify({
          prompt: `Summarize the following notes:\n\n${accumulatedNotes}`,
          model: "gemini-1.5-flash-latest",
        })
      );
      const summary = summaryResponse.text.trim();
      SetIsLoading(false);
      setIsVisible(true);
      setTimestampText(summary);
    } catch (err) {
      console.error("Error summarizing notes", err);
      setState(UploadState.Failure);
    }
  };

  const sendChunkAndGetNotes = async (chunk: Blob) => {
    try {
      const formData = new FormData();
      formData.set(
        "video",
        new File([chunk], "chunk.webm", { type: "video/webm" })
      );
      const resp = await post(`${urleke}/api/upload`, formData);
      const uploadResult = resp.data;

      const notesResponse = await post(
        `${urleke}/api/prompt`,
        JSON.stringify({
          uploadResult,
          prompt: DEFAULT_PROMPT,
          model: "gemini-1.5-flash-latest",
        })
      );

      return notesResponse.text.trim();
    } catch (err) {
      console.error("Error processing chunk", err);
      return "";
    }
  };

  const startChunkProcessing = () => {
    chunkIntervalRef.current = setInterval(async () => {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === "recording"
      ) {
        mediaRecorderRef.current.requestData();
        const latestChunk = chunksRef.current[chunksRef.current.length - 1];
        if (latestChunk) {
          const notes = await sendChunkAndGetNotes(latestChunk);
          setAccumulatedNotes((prev) => prev + "\n\n" + notes);
        }
      }
    }, 60000); // Process every minute
  };

  const stopChunkProcessing = () => {
    if (chunkIntervalRef.current) {
      clearInterval(chunkIntervalRef.current);
    }
  };

  const uploadVideo = async (file: File) => {
    try {
      const formData = new FormData();
      formData.set("video", file);
      const resp = await post(`${urleke}/api/upload`, formData);
      console.log("uploadResult:", resp.data);
      setUploadResult(resp.data);
      setState(UploadState.Processing);
      checkProcessing(resp.data);
    } catch (err) {
      console.error("Error Uploading Video", err);
      setState(UploadState.Failure);
    }
  };

  const checkProcessing = async (result: FileMetadataResponse) => {
    setTimeout(async () => {
      const progressResult = await post(
        `${urleke}/api/progress`,
        JSON.stringify({ result })
      );
      const state = progressResult.progress.state;
      console.log("progress:", state);
      if (state === "ACTIVE") {
        setState(UploadState.Processed);
      } else if (state === "FAILED") {
        setState(UploadState.Failure);
      } else {
        setState(UploadState.Processing);
        checkProcessing(result);
      }
    }, 5000);
  };

  useEffect(() => {
    if (state === UploadState.Processed) {
      postNotesRequest();
    }
  }, [state]);

  const postNotesRequest = async () => {
    try {
      const response = await post(
        `${urleke}/api/prompt`,
        JSON.stringify({
          uploadResult,
          prompt: DEFAULT_PROMPT,
          model: "gemini-1.5-flash-latest",
        })
      );
      const modelResponse = response.text;
      SetIsLoading(false);
      setIsVisible(true);
      setTimestampText(modelResponse.trim());
    } catch (err) {
      console.error("Error getting notes", err);
      setState(UploadState.Failure);
    }
  };

  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const requestIdRef = useRef<number | null>(null);

  const updateTimer = () => {
    if (startTimeRef.current === null) return;

    const elapsedTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
    setTime(elapsedTime);

    if (elapsedTime >= 1800) {
      stopFunction();
    } else {
      requestIdRef.current = requestAnimationFrame(updateTimer);
    }
  };

  useEffect(() => {
    if (isActive) {
      startTimeRef.current = Date.now() - time * 1000;
      requestIdRef.current = requestAnimationFrame(updateTimer);
    } else {
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }
    }

    return () => {
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }
    };
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
    startTimeRef.current = null;
    if (requestIdRef.current) {
      cancelAnimationFrame(requestIdRef.current);
    }
  };

  const stopFunction = () => {
    handleReset();
    stopRecording();
  };

  return (
    <div className="bg-[#D34836]  rounded-2xl flex flex-col items-center justify-center  pt-8 pb-16 px-32 w-[700px]">
      <h1 className="text-white  whitespace-nowrap text-5xl font-bold mb-6 text-center ">
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
