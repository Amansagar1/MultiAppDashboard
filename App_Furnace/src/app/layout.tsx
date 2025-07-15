"use client";

import React, { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/Components/Navigation/Navbar';
import Sidebar from '@/Components/Sidebar/Sidebar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapse = () => setIsCollapsed(!isCollapsed);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    // Collapse sidebar by default on mobile
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="h-screen w-full">
          <Navbar toggleSidebar={toggleSidebar} />
          <div className="flex">
            <Sidebar
              isOpen={isSidebarOpen}
              isCollapsed={isCollapsed}
              handleCollapse={handleCollapse}
            />
            <main
              className={`pt-16 transition-all duration-300 w-screen ${
                isSidebarOpen ? (isCollapsed ? "ml-16" : "ml-64") : "ml-0"
              }`}
            >
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
