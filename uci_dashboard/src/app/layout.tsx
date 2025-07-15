"use client";
import React, { useState, useEffect, Suspense } from "react";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../Components/Navigation/Navbar";
import LeftSidebar from "../Components/Navigation/LeftSideMenue/LeftSidebar";
import Breadcrumb from "../Components/Breadcrumb/BreadCrumb";
import Footer from "../Components/Footer";
import { metadata } from "./metadata";
import { useScaleFactor } from "../utils/useScaleFactor";

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
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(true);
  const [clickedMenu1, setClickedMenu1] = useState(null);
  const [clickedSubMenu, setClickedSubMenu] = useState(null);

  const scale = useScaleFactor();

  return (
    <html lang="en">
      <head>
        <title>{String(metadata.title ?? "")}</title>
        <meta name="description" content={metadata.description ?? ""} />
      </head>
      <body
        style={{ "--scale-factor": scale } as React.CSSProperties}
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-[100vw] h-screen fixed bg-gray-100`}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Breadcrumb
            toggleCollapse={() => setCollapsed((prev) => !prev)}
            collapsed={collapsed}
            clickedMenu1={clickedMenu1}
            clickedSubMenu={clickedSubMenu}
            handleSignOut={() => {}} // Optional: provide actual sign-out logic if needed
          />
          <div className="flex w-full h-screen">
            <div className="flex">
              <LeftSidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                setClickedMenu1={setClickedMenu1}
                setClickedSubMenu={setClickedSubMenu}
                toggleCollapse={undefined}
              />
            </div>
            <main className="w-full">
              <div className="flex-1 overflow-auto bg-gray-100 p-2 ">
                {children}
              </div>
              <Footer />
            </main>
          </div>
        </Suspense>
      </body>
    </html>
  );
}
