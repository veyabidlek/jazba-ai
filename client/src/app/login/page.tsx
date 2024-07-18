"use client";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import "dotenv/config";
import axios from "axios";

const urleke = process.env.BACKEND_URL;

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${urleke}/api/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.accessToken);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("not logged in");
      }
      const user = jwtDecode(token);
      if (!response) {
        alert("Wrong email or password");
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      alert(`Welcome ${user.username}`);
      router.push("/");
    } catch (err) {
      console.error("Error logging in the user: ", err);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-[#244855] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md rounded-lg bg-white p-16 shadow-lg">
        <div className="space-y-4 text-center">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="p-2 rounded-full text-white hover:bg-muted p-2 rounded-md bg-[#D34836]"
              prefetch={false}
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <span className="sr-only">Go back</span>
            </Link>
            <h1 className="text-3xl font-bold text-[#D34836] ml-[-36px]">
              Login
            </h1>
            <div />
          </div>
          <p className="text-muted-foreground">
            Enter your email and password to login.{" "}
          </p>
          <p className="inline">
            Don't have an account?{" "}
            <Link prefetch={false} href="/register" className="underline">
              Sign up
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Enter your password"
              required
            />
            <Button
              type="button"
              onClick={togglePasswordVisibility}
              variant="ghost"
              size="icon"
              className="absolute bottom-1 right-1 h-7 w-7"
            >
              <EyeIcon className="h-4 w-4" />
              <span className="sr-only">Toggle password visibility</span>
            </Button>
          </div>
          <Button
            type="submit"
            className="w-full bg-[#D34836] text-white hover:bg-[#c03730] focus:ring-[#D34836]"
          >
            Login
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
            className="w-full border-[#D34836] text-[#D34836] hover:bg-[#D34836] hover:text-white focus:ring-[#D34836]"
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

function EyeIcon(props: any) {
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
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
