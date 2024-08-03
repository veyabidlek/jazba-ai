import Head from "next/head";
import { NavBar } from "./components/navBar";
import { Hero } from "./components/hero";
import { RecentNotes } from "./components/recentNotes";
import { QuestionButton } from "./components/questionButton";
import { Loading } from "./components/loading";
import { Note } from "./components/generated-note";
import { HIW } from "./components/howitworks";

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
      <QuestionButton />
      <Note />
      <Loading />
      <HIW />
    </div>
  );
};

export default Home;
