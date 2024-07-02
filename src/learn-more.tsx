export default function LearnMore() {
  return (
    <div className="px-5 py-3  bg-[rgba(239,68,68,.8)] flex items-center text-lg shadow-lg rounded-lg fixed bottom-0 right-0 gap-4 text-white transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <button className="bg-white text-red-500 rounded-full p-2 shadow-md hover:bg-red-100 transition duration-300 ease-in-out focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <h1 className="font-semibold">How it works?</h1>
    </div>
  );
}
