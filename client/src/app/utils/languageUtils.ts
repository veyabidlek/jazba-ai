import enContent from "../../../languages/en/content.json";
import kzContent from "../../../languages/kz/content.json";
import ruContent from "../../../languages/ru/content.json";

export const getContent = (language: "en" | "kz" | "ru") => {
  switch (language) {
    case "en":
      return enContent;
    case "kz":
      return kzContent;
    case "ru":
      return ruContent;
    default:
      return enContent;
  }
};
