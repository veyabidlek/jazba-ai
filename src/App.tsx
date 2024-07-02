import { Note } from "./Note";

// import { Gemini } from "./Gemini";
import Sidebar from "./Sidebar";
import { Timer } from "./Timer";
import LearnMore from "./learn-more";
function App() {
  return (
    <div className="">
      <div className="">
        <Sidebar />
        <Timer />
        <LearnMore />
      </div>
      <Note />
    </div>
  );
}

export default App;
