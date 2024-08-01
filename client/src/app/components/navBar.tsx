"use client";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LanguageSwitcher } from "./languageSwitcher";
import { useLanguage } from "../contexts/languageContext";
import { getContent } from "../utils/languageUtils";

export function NavBar() {
  const { language } = useLanguage();
  const content = getContent(language);
  const [user, setUser] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (decoded.exp < currentTime) {
          localStorage.removeItem("token");
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setUser(decoded.username);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const logOut = () => {
    if (confirm("Are you sure you want to log out?")) {
      setUser("");
      localStorage.removeItem("token");
      window.location.reload();
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-white text-xl sm:text-2xl font-bold cursor-pointer"
        >
          jazba ai
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <>
              <Link
                href="/login"
                className="text-white font-bold hover:text-black hover:underline"
              >
                {content.navBar.signIn}
              </Link>
              <Link
                href="/register"
                className="bg-white text-black p-2 rounded-lg border-black border font-bold hover:bg-black hover:text-white"
              >
                {content.navBar.signUp}
              </Link>
            </>
          ) : (
            <>
              <p className="text-white font-bold">{user}</p>
              <button onClick={logOut} className="text-white hover:underline">
                {content.navBar.leave}
              </button>
            </>
          )}
          <LanguageSwitcher />
        </div>
        <button onClick={toggleMenu} className="md:hidden text-white">
          {isMenuOpen ? "X" : "☰"}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-black bg-opacity-50 rounded-lg p-4">
          <div className="flex flex-col space-y-4 items-start">
            {user ? (
              <>
                <p className="text-white font-bold">{user}</p>
                <button onClick={logOut} className="text-white hover:underline">
                  {content.navBar.leave}
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-white hover:underline">
                  {content.navBar.signIn}
                </Link>
                <Link href="/register" className="text-white hover:underline">
                  {content.navBar.signUp}
                </Link>
              </>
            )}
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}
