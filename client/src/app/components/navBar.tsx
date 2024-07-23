import Link from "next/link";

const NavBar = () => {
  return (
    <header className="flex justify-between items-center w-full p-4">
      <div className="text-white text-xl sm:text-2xl font-bold cursor-pointer">
        jazba ai
      </div>
      <div>
        <Link
          href="/login"
          className="mr-2 px-6 py-3 border border-white font-bold text-white rounded-lg hover:bg-white hover:text-black transition-all duration-300 hover:border-black"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="px-6 py-3 bg-white text-black font-bold rounded-lg border-black border-[1px] hover:bg-black hover:text-white transition-all duration-300"
        >
          Signup
        </Link>
      </div>
    </header>
  );
};

export default NavBar;
