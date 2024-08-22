"use client";
import { useAtom } from "jotai";
import { isHIWVisibleAtom } from "../atoms";
import { motion } from "framer-motion";
import { FaDesktop, FaFileAlt } from "react-icons/fa";
import { VscRecord } from "rocketicons/vsc";
import { getContent } from "../utils/languageUtils";
import { useLanguage } from "../contexts/languageContext";

export function HIW() {
  const { language } = useLanguage();
  const content = getContent(language);
  const [isVisible, setIsVisible] = useAtom(isHIWVisibleAtom);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  if (!isVisible) {
    return null;
  }

  const steps = [
    {
      title: content.howitworks.steps[0].title,
      description: content.howitworks.steps[0].description,
      icon: <VscRecord width="35px" height="35px" />,
    },
    {
      title: content.howitworks.steps[1].title,
      description: content.howitworks.steps[1].description,
      icon: <FaDesktop className="text-3xl" />,
    },
    {
      title: content.howitworks.steps[2].title,
      description: content.howitworks.steps[2].description,
      icon: <FaFileAlt className="text-3xl" />,
    },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="p-4 sm:p-8 rounded-lg max-w-full sm:max-w-2xl w-full bg-white shadow-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl text-black font-bold">
            {content.howitworks.mainTitle}
          </h2>
          <button
            onClick={toggleVisibility}
            className="bg-black text-white rounded-full p-2 shadow-md hover:bg-gray-800 transition duration-300 ease-in-out focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
        <div className="space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-100 p-4 rounded-lg shadow flex items-center space-x-4"
            >
              <div className="bg-black text-white rounded-full p-4 flex items-center justify-center">
                {step.icon}
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1 text-black">
                  {step.title}
                </h3>
                <p className="text-gray-700 text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
