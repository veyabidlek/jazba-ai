import { TimestampText } from "./Note";

// import { Gemini } from "./Gemini";
import Sidebar from "./Sidebar";
import { Timer } from "./Timer";
function App() {
  return (
    <div className="grid grid-cols-2">
      <div className="w-full">
        <Sidebar />
        <Timer />
        <TimestampText />
      </div>
    </div>
  );
}

export default App;
