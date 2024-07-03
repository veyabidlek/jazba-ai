import { Note } from "./generated-note";

// import { Gemini } from "./Gemini";
import Sidebar from "./Sidebar";
import { Timer } from "./Timer";
import LearnMore from "./how-it-works-btn";
import { Loading } from "./loading";
function App() {
  return (
    <div className="">
      <Sidebar />
      <Timer />
      <LearnMore />
      <Loading />
      <Note />
    </div>
  );
}

export default App;
