"use client";
import Head from "next/head";
import { NavBar } from "./components/navBar";
import { Hero } from "./components/hero";
import { RecentNotes } from "./components/recentNotes";
import { Loading } from "./components/loading";
import { Note } from "./components/generated-note";
import { HIW } from "./components/howitworks";
import { FloatingButtons } from "./components/floatingButtons";
import { Settings } from "./components/settings";
import { CustomBackground } from "./components/background";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const isFirstVisit = localStorage.getItem("firstVisit");
    if (!isFirstVisit) {
      localStorage.setItem("firstVisit", "true");
      localStorage.setItem(
        "wallpaper",
        "https://images5.alphacoders.com/135/thumb-1920-1357320.jpeg"
      );

      console.log("This is the user's first visit");
    }
  }, []);
  return (
    <div>
      <CustomBackground />

      <div className="min-h-screen relative flex flex-col items-center justify-center custom-bg px-4 sm:px-8 md:px-16 pb-16">
        <Head>
          <title>jazba AI</title>
        </Head>
        <NavBar />
        <Hero />
        <RecentNotes />
      </div>
      <FloatingButtons />
      <Note />
      <Loading />
      <HIW />
      <Settings />
    </div>
  );
};

export default Home;
