"use client";
import { CogIcon, QuestionMarkCircleIcon } from "@heroicons/react/outline";
import { useAtom } from "jotai";
import { isHIWVisibleAtom } from "../atoms";

export function QuestionButton() {
  const [, setIsVisible] = useAtom(isHIWVisibleAtom);
  const handleClick = () => {
    setIsVisible(true);
  };
  return (
    <div className="fixed bottom-4 right-4 flex flex-col space-y-2 ">
      <QuestionMarkCircleIcon
        onClick={handleClick}
        className="h-10 w-10 text-white hover:scale-105 hover:shadow-x cursor-pointer transition-all duration-300 hover:text-black "
      />
      {/* <CogIcon className="h-10 w-10 text-white hover:scale-105 hover:shadow-x cursor-pointer transition-all duration-300 hover:text-black" /> */}
    </div>
  );
}
