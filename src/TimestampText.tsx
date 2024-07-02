import { useAtom } from "jotai";
import { timestampTextAtom } from "./atoms";

export function TimestampText() {
  const [timestampText, setTimestampText] = useAtom(timestampTextAtom);
  return (
    <textarea
      className="w-full h-48 bg-neutral-800 p-2 focus:outline-none"
      placeholder="Notes will appear here"
      onChange={(e) => {
        const text = e.target.value;
        setTimestampText(text);
      }}
      value={timestampText}
    ></textarea>
  );
}
