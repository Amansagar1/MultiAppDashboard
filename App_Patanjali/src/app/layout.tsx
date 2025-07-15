"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { TitleProvider } from '../Components/Context/TitleContext';
import { ThemeProvider } from '../Components/Context/ThemeContext';
import { BreadcrumbProvider } from '../Components/Context/BreadcrumbProvider';
import { usePathname } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          <TitleProvider>
            <BreadcrumbProvider title={undefined}>
              <main className="w-full">
                {children}
              </main>
            </BreadcrumbProvider>
          </TitleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
