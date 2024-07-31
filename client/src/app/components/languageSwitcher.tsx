import React from "react";
import { useLanguage } from "../contexts/languageContext";

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as "en" | "kz" | "ru")}
      className="ml-2 bg-white text-black  p-1 rounded-lg"
    >
      <option value="en">ENG</option>
      <option value="kz">ҚАЗ</option>
      <option value="ru">РУ</option>
    </select>
  );
};
