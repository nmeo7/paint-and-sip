'use client';

import localFont from "next/font/local";
import "./globals.css";
import { Dispatch, SetStateAction, createContext, useState } from "react";

interface ContextType {
  opened: Boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

// Create the context with `null` as the initial value
const MyContext = createContext<ContextType | null>(null);

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [opened, setOpened] = useState(false)

  const handleToggle = () => setOpened(!!opened)

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
