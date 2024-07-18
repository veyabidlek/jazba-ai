"use client";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
export default function Navbar() {
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
  });
  const logOut = () => {
    setUser("");
    localStorage.removeItem("token");
  };

  return (
    <nav className="shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex-shrink-0">
            <Link href="/" className="text-white font-bold text-xl">
              Capture <span className="text-[#D34836]">AI</span>
            </Link>
          </div>
          {!user ? (
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-white hover:bg-[#D34836] px-3 py-2 rounded-md text-md font-medium transition duration-300"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-[#D34836] text-[white] hover:bg-opacity-90 px-4 py-2 rounded-md text-md font-medium transition duration-300"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <p className="text-white text-md font-bold">{user}</p>
              <button
                onClick={logOut}
                className="text-white hover:bg-[#D34836] px-3 py-2 rounded-md text-md font-medium transition duration-300"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
