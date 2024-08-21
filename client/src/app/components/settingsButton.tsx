"use client";
import { CogIcon } from "@heroicons/react/outline";
import { useAtom } from "jotai";
import { isSettingsVisibleAtom } from "../atoms";

export function SettingsButton() {
  const [, setIsVisible] = useAtom(isSettingsVisibleAtom);
  const handleClick = () => {
    setIsVisible(true);
  };

  return (
    <CogIcon
      onClick={handleClick}
      className="h-10 w-10 text-white hover:scale-105 hover:shadow-x cursor-pointer transition-all duration-300 hover:text-black"
    />
  );
}
