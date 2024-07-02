import { useState, useRef } from "react";
import { videoFileAtom, uploadResultAtom, timestampTextAtom } from "./atoms";
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

export function Gemini() {
  const [, setVideoFile] = useAtom(videoFileAtom);
  const [uploadResult, setUploadResult] = useAtom(uploadResultAtom);
  const [, setTimestampText] = useAtom(timestampTextAtom);

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
    "ONLY return the detailed study notes based on the recording of the screen.";
  const [sendingPrompt, setSendingPrompt] = useState(false);

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

  const getTheNotes = async () => {
    if (state === UploadState.Processed && !sendingPrompt) {
      setSendingPrompt(true);

      const response = await post(
        "/api/prompt",
        JSON.stringify({
          uploadResult,
          prompt: CONCISE_PROMPT,
          model: "gemini-1.5-flash-latest",
        })
      );
      setSendingPrompt(false);
      const modelResponse = response.text;
      setTimestampText(modelResponse.trim());
    }
  };

  return (
    <div className="mt-4">
      <button
        disabled={
          state === UploadState.Recording || state === UploadState.Uploading
        }
        className="bg-gray-500 enabled:hover:bg-gray-800 disabled:opacity-25 mr-4 font-bold py-2 px-4 rounded mb-4"
        onClick={startRecording}
      >
        Start Recording
      </button>
      <button
        disabled={state !== UploadState.Recording}
        className="bg-gray-500 enabled:hover:bg-gray-800 disabled:opacity-25 mr-4 font-bold py-2 px-4 rounded mb-4"
        onClick={stopRecording}
      >
        Stop Recording
      </button>
      <span>{state}</span>
      <div className="flex mb-4">
        <button
          className="bg-gray-500 enabled:hover:bg-gray-800 disabled:opacity-25 font-bold py-2 px-4 rounded"
          disabled={state !== UploadState.Processed || sendingPrompt}
          onClick={getTheNotes}
        >
          Get the Notes
        </button>
      </div>
    </div>
  );
}
