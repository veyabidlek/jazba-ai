import { Note } from "./generated-note";

// import { Gemini } from "./Gemini";
import Sidebar from "./Sidebar";
import { Timer } from "./Timer";
import LearnMore from "./how-it-works-btn";
import { Loading } from "./loading";
function App() {
  return (
    <div className="">
      <div className="">
        <Sidebar />
        <Timer />
        <LearnMore />
        <Loading />
      </div>
      <Note />
    </div>
  );
}

export default App;
