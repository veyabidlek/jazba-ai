import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex-shrink-0">
            <Link href="/" className="text-white font-bold text-xl">
              Capture <span className="text-[#D34836]">AI</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-white hover:bg-[#D34836] px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-[#D34836] text-[white] hover:bg-opacity-90 px-4 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
