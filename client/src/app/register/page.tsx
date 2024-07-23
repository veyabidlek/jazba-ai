"use client";
import Link from "next/link";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "dotenv/config";
import axios from "axios";
const urleke = process.env.BACKEND_URL;

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isPasswordSame(password, password2)) {
      alert("Passwords are not same");
      return;
    }
    try {
      await axios.post(`${urleke}/api/register`, {
        email,
        username,
        password,
      });
      alert("Successfull registration");
      router.push("/login");
    } catch (err) {
      console.error("Error sumbitting registration: ", err);
    }
  };

  const isPasswordSame = (password1: string, password2: string): boolean => {
    if (password1 === password2) {
      return true;
    }
    return false;
  };

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center custom-bg px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="space-y-4 text-center">
          <div className="flex justify-between items-center ">
            <Link
              href="/"
              className="p-2 rounded-full text-white hover:bg-muted p-2 rounded-md bg-black"
              prefetch={false}
            >
              <ArrowLeftIcon className="h-5 w-5 " />
              <span className="sr-only">Go back</span>
            </Link>
            <h1 className="text-3xl font-bold text-black ml-[-32px]">
              Sign Up
            </h1>
            <div />
          </div>
          <p className="text-muted-foreground">
            Already have an account?
            <Link href="/login" className="ml-2 underline" prefetch={false}>
              Sign in
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Username</Label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id="usernname"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="relative space-y-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div>
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              id="confirm-password"
              type="password"
              placeholder="Confirm your password"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-white hover:text-black  hover:border hover:border-black focus:ring-blue-500"
          >
            Sign Up
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-muted" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full border-black text-black hover:bg-black hover:text-white focus:ring-blue-500"
          >
            <ChromeIcon className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
        </form>
      </div>
    </div>
  );
}

function ArrowLeftIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function ChromeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}
