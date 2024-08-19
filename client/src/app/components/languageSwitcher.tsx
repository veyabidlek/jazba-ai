import React from "react";
import { useLanguage } from "../contexts/languageContext";

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as "en" | "kz" | "ru")}
      className="bg-white bg-opacity-0 text-white  p-1 rounded-lg outline-none hover:cursor-pointer"
    >
      <option value="en">ENG</option>
      <option value="kz">ҚАЗ</option>
      <option value="ru">РУC</option>
    </select>
  );
};
