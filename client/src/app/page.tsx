import Head from "next/head";
import { NavBar } from "./components/navBar";
import { Hero } from "./components/Hero";
import { RecentNotes } from "./components/recentNotes";
import { FloatingButtons } from "./components/floatingButtons";
import { Loading } from "./components/loading";
import { Note } from "./components/generated-note";
const Home = () => {
  return (
    <div>
      <div className="min-h-screen relative flex flex-col items-center justify-center custom-bg px-4 sm:px-8 md:px-16 pb-16">
        <Head>
          <title>jazba AI</title>
        </Head>
        <NavBar />
        <Hero />

        <RecentNotes />
      </div>
      <FloatingButtons />
      <Loading />
      <Note />
    </div>
  );
};

export default Home;
