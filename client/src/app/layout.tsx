import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./contexts/languageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jazba AI",
  description:
    "effortlessly record your screen activities and get beautifully designed notes for easy review and organization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
      <Analytics />
    </html>
  );
}
