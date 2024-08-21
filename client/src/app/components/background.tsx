"use client";
import { useAtom } from "jotai";
import { wallpaperAtom } from "../atoms";
import { useEffect } from "react";

export function CustomBackground() {
  const [wallpaper, setWallpaper] = useAtom(wallpaperAtom);
  useEffect(() => {
    const curWallpaper = localStorage.getItem("wallpaper");
    if (curWallpaper) {
      setWallpaper(curWallpaper);
    }
  }, []);
  return (
    <div
      className="custom-bg"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: wallpaper ? `url(${wallpaper})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(85%)",
        zIndex: -1,
      }}
    ></div>
  );
}
