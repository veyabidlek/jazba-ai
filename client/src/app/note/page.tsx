import dynamic from "next/dynamic";

const Editor = dynamic(() => import("../components/editor"), { ssr: false });
import x from "./x.json";
export default function Page() {
  return <Editor content={x} />;
}
