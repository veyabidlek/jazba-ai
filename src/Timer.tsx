import { useState, useRef, useEffect } from "react";
import {
  videoFileAtom,
  uploadResultAtom,
  timestampTextAtom,
  isVisibleAtom,
  isLoadingAtom,
} from "./atoms";
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

export function Timer() {
  const [, setVideoFile] = useAtom(videoFileAtom);
  const [uploadResult, setUploadResult] = useAtom(uploadResultAtom);
  const [, setTimestampText] = useAtom(timestampTextAtom);
  const [, setIsVisible] = useAtom(isVisibleAtom);
  const [, SetIsLoading] = useAtom(isLoadingAtom);

  const enum UploadState {
    Waiting = "",
    Recording = "Recording...",
    Uploading = "Uploading...",
    Processing = "Processing...",
    Processed = "Processed!",
    Failure = "Upload failed, please try again.",
  }
  const [state, setState] = useState<UploadState>(UploadState.Waiting);

  const CONCISE_PROMPT =
    "ONLY return the quiz based on the recording of the screen. Create notes in language of the content";

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  let stream: MediaStream;

  const startRecording = async () => {
    try {
      stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
      mediaRecorderRef.current = new MediaRecorder(stream);
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
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      setState(UploadState.Uploading);
    }
    SetIsLoading(true);
  };

  const uploadVideo = async (file: File) => {
    try {
      const formData = new FormData();
      formData.set("video", file);
      const resp = await post("/api/upload", formData);
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
        "/api/progress",
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
        "/api/prompt",
        JSON.stringify({
          uploadResult,
          prompt: CONCISE_PROMPT,
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

  const [time, setTime] = useState(1800); // 1 minute in seconds
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer: any;
    if (isActive && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isActive, time]);

  const formatTime = (time: any) => {
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
    setTime(60);
  };

  const stopFunction = () => {
    handleReset();
    stopRecording();
  };

  return (
    <div className="w-[1200px] h-full bg-[url('https://statemag.state.gov/wp-content/uploads/2019/06/POM-Kazakhstan-3.jpg')] flex flex-col ml-[300px] items-center justify-center h-screen bg-gray-100 bg-no-repeat	bg-cover">
      <div className=" bg-[rgba(239,68,68,.8)] p-10 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl text-white font-bold mb-4">Timer</h1>
        <div className="text-6xl text-white font-mono mb-4">
          {formatTime(time)}
        </div>
        <div className="space-x-4">
          {isActive ? (
            <button
              onClick={stopFunction}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
            >
              Stop
            </button>
          ) : (
            <button
              onClick={startFunction}
              className="bg-[rgba(255,255,255)] text-red-500 px-4 py-2 rounded hover:bg-red-700 hover:text-white transition duration-200 font-bold"
            >
              Let's go!
            </button>
          )}
        </div>
      </div>
      <span>{state}</span>
    </div>
  );
}
