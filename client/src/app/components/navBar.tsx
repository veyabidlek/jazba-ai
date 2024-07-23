"use client";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Link from "next/link";

const NavBar = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // in seconds
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        if (decoded.exp < currentTime) {
          localStorage.removeItem("token");
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          setUser(decoded.username);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []); // Add empty dependency array to run effect only once

  const logOut = () => {
    if (confirm("Are you sure you want to log out?")) {
      setUser("");
      localStorage.removeItem("token");
      window.location.reload();
    }
  };
  return (
    <header className="flex justify-between items-center w-full p-4">
      <Link
        href="/"
        className="text-white text-xl sm:text-2xl font-bold cursor-pointer"
      >
        jazba ai
      </Link>
      {!user ? (
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
      ) : (
        <div className="flex items-center space-x-4">
          <p className="text-white text-md font-bold">{user}</p>
          <button
            onClick={logOut}
            className="text-white hover:bg-black px-3 py-2 rounded-md text-md font-medium transition duration-300"
          >
            Log out
          </button>
        </div>
      )}
    </header>
  );
};

export default NavBar;
