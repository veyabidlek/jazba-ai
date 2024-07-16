import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-[#D34836] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-white font-bold text-xl">
              Capture AI
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-white hover:bg-[#B93C2B] px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-white text-[#D34836] hover:bg-opacity-90 px-4 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
