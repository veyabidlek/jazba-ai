"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Note {
  id: number;
  title: string;
  content: string;
  date: Date;
}

export default function Notes() {
  const initialNotes: Note[] = [
    {
      id: 1,
      title: "Note Title",
      content: `Cristiano Ronaldo dos Santos Aveiro GOIH ComM (Portuguese pronunciation: [kɾiʃˈtjɐnu ʁɔˈnaldu]; born 5 February 1985) is a Portuguese professional footballer who plays as a forward for and captains both Saudi Pro League club Al Nassr and the Portugal national team. Widely regarded as one of the greatest players of all time, Ronaldo has won five Ballon d'Or awards,[note 3] a record three UEFA Men's Player of the Year Awards, and four European Golden Shoes, the most by a European player. He has won 33 trophies in his career, including seven league titles, five UEFA Champions Leagues, the UEFA European Championship and the UEFA Nations League. Ronaldo holds the records for most appearances (183), goals (140) and assists (42) in the Champions League, most appearances (30), assists (8), goals in the European Championship (14), international goals (130) and international appearances (212). He is one of the few players to have made over 1,200 professional career appearances, the most by an outfield player, and has scored over 890 official senior career goals for club and country, making him the top goalscorer of all time.

Ronaldo began his senior career with Sporting CP, before signing with Manchester United in 2003, winning the FA Cup in his first season. He would also go on to win three consecutive Premier League titles, the Champions League and the FIFA Club World Cup; at age 23, he won his first Ballon d'Or. Ronaldo was the subject of the then-most expensive association football transfer when he signed for Real Madrid in 2009 in a transfer worth €94 million (£80 million). He became a key contributor and formed an attacking trio with Karim Benzema and Gareth Bale which was integral to the team winning four Champions Leagues from 2014 to 2018, including La Décima. During this period, he won back-to-back Ballons d'Or in 2013 and 2014, and again in 2016 and 2017, and was runner-up three times behind Lionel Messi, his perceived career rival. He also became the club's all-time top goalscorer and the all-time top scorer in the Champions League, and finished as the competition's top scorer for six consecutive seasons between 2012 and 2018. With Real, Ronaldo won four Champions Leagues, two La Liga titles, two Copas del Rey, two UEFA Super Cups and three Club World Cups. In 2018, he signed for Juventus in a transfer worth an initial €100 million (£88 million), the most expensive transfer for an Italian club and for a player over 30 years old. He won two Serie A titles, two Supercoppa Italiana trophies and a Coppa Italia, became the inaugural Serie A Most Valuable Player and became the first footballer to finish as top scorer in the English, Spanish and Italian leagues. He returned to Manchester United in 2021, finishing his only full season as the club's top scorer, before his contract was terminated in 2022. In 2023, he signed for Al Nassr.

Ronaldo made his international debut for Portugal in 2003 at the age of 18 and has earned more than 200 caps, making him history's most-capped male player.[10] With 130 international goals, he is also the all-time top male goalscorer. Ronaldo has played in and scored at eleven major tournaments; he scored his first international goal at Euro 2004, where he helped Portugal reach the final. He assumed captaincy of the national team in July 2008. In 2015, Ronaldo was named the best Portuguese player of all time by the Portuguese Football Federation. The following year, he led Portugal to their first major tournament title at Euro 2016, and received the Silver Boot as the second-highest goalscorer of the tournament. This achievement would see him receive his fourth Ballon d'Or. He also led them to victory in the inaugural UEFA Nations League in 2019, receiving the top scorer award in the finals, and later received the Golden Boot as top scorer of Euro 2020.

One of the world's most marketable and famous athletes, Ronaldo was ranked the world's highest-paid athlete by Forbes in 2016, 2017, and 2023, and the world's most famous athlete by ESPN from 2016 to 2019. Time included him on their list of the 100 most influential people in the world in 2014. He is the first footballer and the third sportsman to earn US$1 billion in his career.`,
      date: new Date("June 1, 2023"),
    },
    {
      id: 2,
      title: "Another Note",
      content:
        "This is the content of another note. It can be up to two sentences long, and will be displayed as a preview.",
      date: new Date("May 15, 2023"),
    },
    {
      id: 3,
      title: "Third Note",
      content:
        "This is the content of the third note. It can be up to two sentences long, and will be displayed as a preview.",
      date: new Date("April 20, 2023"),
    },
    {
      id: 4,
      title: "Fourth Note",
      content:
        "This is the content of the fourth note. It can be up to two sentences long, and will be displayed as a preview.",
      date: new Date("March 10, 2023"),
    },
    {
      id: 5,
      title: "Fifth Note",
      content:
        "This is the content of the fifth note. It can be up to two sentences long, and will be displayed as a preview.",
      date: new Date("February 1, 2023"),
    },
  ];

  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
  };

  const handleBackClick = () => {
    setSelectedNote(null);
  };

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#244855]">
      <header className="bg-background shadow">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-white">
              <Link href="/">
                Capture <span className="text-[#D34836]">AI</span>
              </Link>
            </h1>
          </div>
          <div className="flex-1 ">
            <div className="relative w-full justify-center max-w-md mx-auto">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search notes..."
                className="w-full rounded-md bg-muted pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D34836]"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="rounded-md px-6 py-2 bg-[#D34836] text-md text-white hover:bg-[#c03730]"
            >
              <PlusIcon className="h-6 w-6 inline mr-2" />
              <span className="text-md">Create new note</span>
            </Link>
          </div>
        </div>
      </header>
      {selectedNote ? (
        <div className="flex-1 px-6 py-6 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="rounded-lg bg-[#F5F5F5] p-4 shadow-lg">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-[#D34836] text-white hover:bg-[#c03730]"
                    onClick={handleBackClick}
                    aria-label="Back"
                  >
                    <ArrowLeftIcon className="h-4 w-4" />
                  </Button>
                  <h2 className="text-2xl font-bold text-[#244855]">
                    {selectedNote.title}
                  </h2>
                  <Button className="rounded-md bg-[#D34836] text-white font-bold hover:bg-[#c03730]">
                    <span className="text-md">Take Quiz</span>
                  </Button>
                </div>
                <div className="prose text-[#244855] flex-1 max-h-[calc(100%-4rem)] overflow-auto whitespace-pre-wrap">
                  {selectedNote.content}
                </div>
                <div className="text-xs text-muted-foreground absolute bottom-4 w-full">
                  {selectedNote.date.toDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <main className="flex-1 px-6 py-6 sm:px-6 lg:px-8">
          <div className="container mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {notes.map((note) => (
              <div
                key={note.id}
                className="group relative rounded-lg bg-[#F5F5F5] p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer w-full aspect-square"
                onClick={() => handleNoteClick(note)}
              >
                <div className="space-y-2 h-full flex flex-col">
                  <h2 className="text-lg font-bold text-[#244855]">
                    {note.title}
                  </h2>
                  <div className="prose text-[#244855] flex-1 max-h-[calc(100%-4rem)] overflow-hidden text-ellipsis whitespace-pre-wrap">
                    {note.content}
                  </div>
                  <div className="text-xs text-muted-foreground absolute bottom-4 w-full">
                    {note.date.toDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}
    </div>
  );
}

function ArrowLeftIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
