interface NoteCardProps {
  title: string;
  date: string;
  content: string;
}

const NoteCard = ({ title, date, content }: NoteCardProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full sm:w-64 hover:scale-105 hover:shadow-x cursor-pointer transition-all duration-300 border border-black w-full h-[250px] overflow-hidden">
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-2 truncate">{date}</p>
      <p className="text-gray-800">{content}</p>
    </div>
  );
};

export default NoteCard;
