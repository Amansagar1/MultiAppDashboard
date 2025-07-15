"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { TitleProvider } from '../Components/Context/TitleContext';
import { ThemeProvider } from '../Components/Context/ThemeContext';
// import { usePathname } from "next/navigation";
import { BreadcrumbProvider } from '../Components/Context/BreadcrumbProvider';
import Sidebar from '@/Components/Sidebar/Sidebar';
import Navbar from "@/Components/Header/Navbar";
import ToastContainer from '@/Components/ToasterMessage/ToastContainer';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  // const pathname = usePathname();

  const toggleSidebar = useCallback(() => {
    setIsSidebarCollapsed(prev => !prev);
  }, []);

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    const checkMobileView = () => {
      if (window.innerWidth < 768) {
        setIsSidebarCollapsed(true);
      }
    };

    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          <TitleProvider>
            <BreadcrumbProvider >
              <ToastContainer />
              <div className="flex flex-col h-screen bg-gray-50">
                <Navbar onSignOut={undefined} propTitle={undefined} lastUpdated={undefined} />
                <div className="flex flex-1 overflow-hidden">
                  <Sidebar
                    isCollapsed={isSidebarCollapsed}
                    toggleSidebar={toggleSidebar}
                  />
                  <div className="flex-1 overflow-auto transition-all duration-300 ease-in-out">
                    <div className="h-full mx-auto bg-white rounded-lg shadow-sm">
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            </BreadcrumbProvider>
          </TitleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
