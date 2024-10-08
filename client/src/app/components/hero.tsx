"use client";
import { useState, useRef, useEffect } from "react";
import {
  videoFileAtom,
  uploadResultAtom,
  isVisibleAtom,
  isLoadingAtom,
  noteContentAtom,
  noteDateAtom,
  noteTitleAtom,
} from "../atoms";
import { useAtom } from "jotai";
import { FileMetadataResponse } from "@google/generative-ai/files";
import axios from "axios";
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
import { VscRecord } from "rocketicons/vsc";
import { getContent } from "../utils/languageUtils";
import { useLanguage } from "../contexts/languageContext";
export function Hero() {
  const { language } = useLanguage();
  const content = getContent(language);
  const [, setVideoFile] = useAtom(videoFileAtom);
  const [, setUploadResult] = useAtom(uploadResultAtom);
  const [, setIsVisible] = useAtom(isVisibleAtom);
  const [, SetIsLoading] = useAtom(isLoadingAtom);
  const [, setContent] = useAtom(noteContentAtom);
  const [, setTitle] = useAtom(noteTitleAtom);
  const [, setDate] = useAtom(noteDateAtom);
  const enum UploadState {
    Waiting = "",
    Recording = "Recording...",
    Uploading = "Uploading...",
    Processing = "Processing...",
    Processed = "Processed!",
    Failure = "Upload failed.",
  }
  const [, setState] = useState<UploadState>(UploadState.Waiting);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const segmentIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const notesArrayRef = useRef<string[]>([]);
  const pendingRequestsRef = useRef<number>(0);
  const chunkInterval = 60000; //1 minute
  let uaqyt: Date;
  const startRecording = async () => {
    try {
      streamRef.current = await navigator.mediaDevices.getDisplayMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
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
        pendingRequestsRef.current += 1;
        await uploadVideo(file);
        chunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      uaqyt = new Date();
      setState(UploadState.Recording);

      segmentIntervalRef.current = setInterval(() => {
        mediaRecorderRef.current?.stop();
        uaqyt = new Date();
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
      waitForAllNotes().then(() => processAllNotes());
    }, 1000);
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
    } finally {
      pendingRequestsRef.current -= 1;
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
        })
      );
      if (response.error) {
        console.error("Error getting notes:", response.error);
        return;
      }
      const modelResponse = response.text;
      notesArrayRef.current.push(
        "Current time: " + uaqyt + modelResponse.trim()
      );
      console.log(notesArrayRef);
      console.log("Notes generated:", modelResponse.trim());
    } catch (err) {
      console.error("Error getting notes", err);
      setState(UploadState.Failure);
    }
  };

  const postNote = async (data: Array<JSON>) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      await axios.post(`${urleke}/api/notes`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error("Failed to post note, please try again later.");
      return null;
    }
  };

  const processAllNotes = async () => {
    console.log("processAllNotes is executed...");
    const combinedNotes = notesArrayRef.current.join("\n\n");
    console.log("Combined Notes: ", combinedNotes);
    try {
      const newNote = await post(
        `${urleke}/api/summarize`,
        JSON.stringify({
          data: combinedNotes,
        })
      );
      if (newNote.error) {
        console.error("Error summarizing notes:", newNote.error);
        return;
      }
      const token = localStorage.getItem("token");
      if (token) {
        postNote(newNote);
      }
      SetIsLoading(false);
      setTitle(newNote.title);
      setDate(newNote.date);
      setContent(newNote.content);
      setIsVisible(true);
    } catch (err) {
      console.error("Error summarizing notes", err);
      setState(UploadState.Failure);
    }
  };

  const waitForAllNotes = () => {
    return new Promise<void>((resolve) => {
      const checkPendingRequests = () => {
        if (pendingRequestsRef.current === 0) {
          resolve();
        } else {
          setTimeout(checkPendingRequests, 1000); // Check every second
        }
      };
      checkPendingRequests();
    });
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
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  const startFunction = () => {
    if (isMobile()) {
      alert(content.hero.mobileError);
    } else {
      handleStartPause();
      startRecording();
    }
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
    <div className="flex flex-col items-center justify-center text-center mt-16 px-4">
      {!isActive ? (
        <div className="flex flex-col items-center justify-center text-center mt-16 px-4">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 text-stroke">
            {content.hero.cta1}
          </h1>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-8 text-stroke">
            {content.hero.cta2}
          </h1>
          <button
            onClick={startFunction}
            className="flex gap-2 items-center w-full justify-center text-center sm:w-[200px] px-8 py-6 bg-white text-black rounded-[999px] font-bold text-lg hover:bg-black hover:text-white border-[1px] border-black transition-all duration-300"
          >
            <VscRecord width="40px" height="40px" />
            {content.hero.start}
          </button>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl sm:text-5xl font-bold text-white mb-8 text-stroke">
            {content.hero.recordingPhrase}
            {""}
          </h1>
          <div className="text-white text-8xl font-bold mb-8 text-stroke">
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
            className="flex gap-2 items-center w-full justify-center text-center sm:w-[200px] px-8 py-6 bg-black text-white rounded-[999px] font-bold text-lg hover:bg-red-600 hover:text-white border-[1px] border-black transition-all duration-300"
          >
            ⏹ {content.hero.stop}
          </button>
        </div>
      )}
    </div>
  );
}
