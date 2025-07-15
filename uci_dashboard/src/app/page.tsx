"use client"
import Link from "next/link";


export default function Home() {
  return (
    <div className="w-full h-screen">
      <Link href="/dashboardoverview"></Link>
      <Link href="/texas"></Link>
      <Link href="/texas/gra_p1"></Link>
      <Link href="/texas/gra_p2"></Link>
      <Link href="/texas/gra_p3"></Link>
      <Link href="/underconstruction"></Link>
      <Link href="/sessionexpierd"></Link>
      <Link href="/login"></Link>
    </div>
  );
}
