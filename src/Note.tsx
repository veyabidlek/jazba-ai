import { useAtom } from "jotai";
import { timestampTextAtom } from "./atoms";

export function TimestampText() {
  const [timestampText, setTimestampText] = useAtom(timestampTextAtom);
  return (
    <textarea
      className="ml-[320px] w-[1200px] bg-gray-300 text-black h-48  p-2 focus:outline-none "
      placeholder="Notes will appear here"
      onChange={(e) => setTimestampText(e.target.value)}
      value={timestampText}
    ></textarea>
  );
}
