interface NoteCardProps {
  title: string;
  content: Array<JSON>;
  date: string;
}

export function NoteCard({ title, content, date }: NoteCardProps) {
  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md w-full sm:w-64 hover:scale-105 
    hover:shadow-xl cursor-pointer transition-all duration-300 border border-black 
    w-full h-[250px] overflow-hidden"
    >
      <h3 className="font-bold text-2xl mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-2 truncate">{date}</p>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <p className="text-gray-800">{content[1].content[0].text}</p>
    </div>
  );
}
