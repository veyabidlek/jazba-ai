import MainContainer from "./components/mainContainer";
import NotesContainer from "./components/notesContainer";
import { Loading } from "./components/loading";
import { Note } from "./components/generated-note";
import Navbar from "./components/navBar";

export default function Home() {
  return (
    <div className="bg-[#244855] min-h-screen">
      <Navbar />
      <div className="container mx-auto px-8 py-8">
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-8">
          <MainContainer />
          <NotesContainer />
        </div>
      </div>
      <Loading />
      <Note />
    </div>
  );
}
