interface NoteProps {
  title: string;
  content: string;
}

const Note: React.FC<NoteProps> = ({ title, content }) => (
  <div className="bg-[#F6DAD7] rounded-lg overflow-hidden mb-4  flex items-center w-[450px]">
    <div className="pl-2 pr-8">
      <h3 className="font-bold text-md tracking-wider">{title}</h3>
      <p className="text-sm tracking-wider	">{content}</p>
    </div>
    <img
      className="w-28 h-28 bg-gray-600 rounded-lg  object-cover "
      src="https://images.unsplash.com/photo-1455390582262-044cdead277a?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d3JpdGluZ3xlbnwwfHwwfHx8MA%3D%3D"
      alt=""
    ></img>
  </div>
);

export default function NotesContainer() {
  const notes = [
    {
      title: "Calculus Midterm",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius eget lorem et efficitur.",
    },
    {
      title: "Calculus Midterm",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius eget lorem et efficitur.",
    },
    {
      title: "Calculus Midterm",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius eget lorem et efficitur.",
    },
    {
      title: "Calculus Midterm",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius eget lorem et efficitur.",
    },
  ];

  return (
    <div className="bg-[#D34836] px-6 pt-4 pb-4 rounded-2xl flex flex-col h-full justify-between w-[500px]">
      <h1 className="text-center text-white text-xl font-bold mb-4">
        Жақындағы жазбалар
      </h1>
      <div className="space-y-3">
        {notes.map((note, index) => (
          <Note key={index} title={note.title} content={note.content} />
        ))}
      </div>

      <button className="bg-[#244855] px-24 py-4 rounded-md text-white text-center text-lg font-bold mt-8 w-full hover:bg-[#1D3A44] ">
        Барлық жазбаларды көру
      </button>
    </div>
  );
}
