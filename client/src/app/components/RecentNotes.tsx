import Link from "next/link";
import NoteCard from "./NoteCard";

const notes = [
  {
    title: "Tree Data Structure",
    date: "12 Там, 19:41",
    content:
      "Trees are common in Computer science. While roots of trees in real life are on the bottom, in programming, they are on the top.",
  },
  {
    title: "Абай Жолы",
    date: "12 Қыр, 12:21",
    content:
      "Абай Құнанбай 1845 жылы дүниеге келген, оның өмірі туралы Мұхтар Әуезов жазған Ол ақпарат қайдан алды",
  },
  {
    title: "Biology 101",
    date: "29 Sep, 19:41",
    content:
      "Trees are common in Computer science. While roots of trees in real life are on the bottom, in programming, they are on the top.",
  },
];

const RecentNotes = () => {
  return (
    <div className="mt-8 sm:mt-16 md:mt-32 px-4">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-8">
        <div className="w-full sm:w-1/4 hidden sm:block">
          {/* Empty div for spacing on larger screens */}
        </div>
        <h3 className="text-2xl font-bold text-white text-stroke mb-4 sm:mb-0 w-full sm:w-2/4 text-center">
          Recent notes
        </h3>
        <div className="w-full sm:w-1/4 hidden sm:flex justify-end">
          {/* <Link
            href="/notes"
            className="px-4 py-2 bg-white text-black font-bold rounded-xl hover:bg-black hover:text-white border-[1px] border-black transition-all duration-300"
          >
            See all notes
          </Link> */}
          <Link
            href="/notes"
            className="px-4 py-2 bg-white text-black font-bold rounded-xl hover:bg-black hover:text-white border-[1px] border-black transition-all duration-300"
          >
            See all notes
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {notes.map((note, index) => (
          <NoteCard
            key={index}
            title={note.title}
            date={note.date}
            content={note.content}
          />
        ))}
      </div>
      <div className="sm:hidden flex justify-center mt-6">
        <Link
          href="/notes"
          className="px-4 py-3 bg-white text-black font-bold rounded-xl hover:bg-black hover:text-white border-[1px] border-black transition-all duration-300"
        >
          See all notes
        </Link>
      </div>
    </div>
  );
};

export default RecentNotes;
