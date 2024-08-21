"use client";
import { useAtom } from "jotai";
import { isSettingsVisibleAtom, wallpaperAtom } from "../atoms";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";
import wallpapers from "../../../public/wallpapers.json";
import { getContent } from "../utils/languageUtils";
import { useLanguage } from "../contexts/languageContext";

export function Settings() {
  const { language } = useLanguage();
  const content = getContent(language);
  const [isVisible, setIsVisible] = useAtom(isSettingsVisibleAtom);
  const [wallpaper, setWallpaper] = useAtom(wallpaperAtom);
  const [tempWallpaper, setTempWallpaper] = useState(wallpaper);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedWallpaper = localStorage.getItem("wallpaper");
      if (storedWallpaper) {
        setWallpaper(storedWallpaper);
        setTempWallpaper(storedWallpaper);
      }
    }
  }, [setWallpaper]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage && wallpaper) {
      localStorage.setItem("wallpaper", wallpaper);
    }
  }, [wallpaper]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleWallpaperChange = (wallpaper: string) => {
    setTempWallpaper(wallpaper);
  };

  const applyWallpaper = () => {
    setWallpaper(tempWallpaper);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="bg-white p-4 rounded-lg max-w-full w-full sm:max-w-2xl max-h-full overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl sm:text-3xl text-black font-bold">
            {content.settings.mainTitle}
          </h2>
          <button
            onClick={toggleVisibility}
            className="bg-black text-white rounded-full p-2 shadow-md hover:bg-gray-800 transition duration-300 ease-in-out focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
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
        <div className="text-center grid grid-cols-2 gap-4 mb-6 sm:grid-cols-3">
          {wallpapers.map((wp, index) => (
            <div
              key={index}
              className={`cursor-pointer p-2 rounded-lg ${
                tempWallpaper === wp.url ? "border-4 border-black" : ""
              }`}
              onClick={() => handleWallpaperChange(wp.url)}
            >
              <img
                src={`${wp.url}`}
                alt={`Wallpaper ${index + 1}`}
                className="rounded-lg object-cover w-full h-24 sm:h-32"
              />
              <label className="font-bold text-sm sm:text-md block mt-2">
                {wp.title}
              </label>
            </div>
          ))}
        </div>
        <button
          onClick={applyWallpaper}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors w-full"
        >
          {content.settings.apply}
        </button>
      </motion.div>
    </div>
  );
}
