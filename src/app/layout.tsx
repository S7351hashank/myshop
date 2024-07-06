'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import AppWrappers from "./AppWrappers";

import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [active, setactive] = useState("");
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="min-h-screen bg-gray-500">
        <NextTopLoader
          color="#165799"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          easing="ease"
          speed={200}
          zIndex={1600}
          showAtBottom={false}
          showSpinner={false}
        />
        <AppWrappers>
          <Navbar active={active} setactive={setactive} />
            {children}
          <Toaster />
        </AppWrappers>
      </body>
    </html>
  );
}
