
"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";
import { decodeToken } from "../../webServices/UCIAPIController";
import navlogo from "../../../public/images/image.png";
import { IoNotificationsOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

const Breadcrumb = ({ clickedMenu1, clickedSubMenu, handleSignOut, toggleCollapse, collapsed }) => {
  const router = useRouter();
  const pathname = usePathname();
  const infoCardRef = useRef(null);

  const [breadcrumbState, setBreadcrumbState] = useState({ clickedMenu1: "", clickedSubMenu: "" });
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState({});
  const [licenseType, setLicenseType] = useState("Demo License");
  const [isMobile, setIsMobile] = useState(false);

  const getInitials = (firstName, lastName) =>
    `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase() || "A";

  // const currentDate = new Date().toLocaleDateString("en-GB", { timeZone: "UTC" });
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleString("en-GB", {
        timeZone: "America/Chicago",
        hour12: true,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      // Convert am/pm to AM/PM
      const formatted = now.replace(/(am|pm)/i, (match) => match.toUpperCase());

      setCurrentDateTime(formatted);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // const currentDateTime = new Date().toLocaleString("en-GB", {
  //   timeZone: "UTC",
  //   hour12: false,
  //   year: "numeric",
  //   month: "2-digit",
  //   day: "2-digit",
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   second: "2-digit",
  // });






  const isActive = (href) => router.asPath === href;

  useEffect(() => {
    const saved = localStorage.getItem("breadcrumb");
    if (saved) {
      const parsed = JSON.parse(saved);
      setBreadcrumbState({
        clickedMenu1: parsed.clickedMenu1 || "",
        clickedSubMenu: parsed.clickedSubMenu || "",
      });
    }
  }, []);

  useEffect(() => {
    if (clickedMenu1 || clickedSubMenu) {
      const newBreadcrumb = { clickedMenu1, clickedSubMenu };
      localStorage.setItem("breadcrumb", JSON.stringify(newBreadcrumb));
      setBreadcrumbState(newBreadcrumb);
    }
  }, [clickedMenu1, clickedSubMenu]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    const handleClickOutside = (e) => {
      if (infoCardRef.current && !infoCardRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    const token = Cookies.get("token");
    const licenseFromCookie = Cookies.get("licenseType");

    if (token) setUser(decodeToken(token));
    if (licenseFromCookie) {
      setLicenseType(licenseFromCookie);
      checkLicenseStatus(licenseFromCookie);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const checkLicenseStatus = (type) => {
    const end = Cookies.get("licenseEndDate");
    if (!end) return;

    const today = new Date(), expiry = new Date(end);
    const daysLeft = (expiry - today) / (1000 * 60 * 60 * 24);
    let message = "";

    if (today > expiry) {
      message = "Your License has expired. Please contact Admin.";
      setLicenseType("expired");
    } else if (type === "0" && daysLeft <= 60) {
      message = `Demo license expiring in ${Math.ceil(daysLeft)} days. Contact admin for renewal.`;
    } else if (["1", "2"].includes(type) && daysLeft <= 30) {
      message = `License expiring in ${Math.ceil(daysLeft)} days. Contact admin for renewal.`;
    }

    if (message && !notifications.some((n) => n.message === message)) {
      setNotifications((prev) => [...prev, { type: "warning", message }]);
    }
  };

  const toggleUserMenu = () => {
    setIsDrawerOpen(false);
    setIsMenuOpen((prev) => !prev);
  };

  const toggleDrawer = () => {
    setIsMenuOpen(false);
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <div className="breadcrumb-container bg-white text-black py-1 px-4 shadow-md flex justify-between items-center w-full">
      <div className="flex w-full justify-between items-center">
        {/* Logo & Sidebar Toggle */}
        <div className="flex items-center gap-2">
          <Image src={navlogo} alt="Logo" width={100} height={80} className="p-1" />

          <div className="flex items-center gap-4 pl-0 lg:pl-20">
            <button onClick={toggleCollapse} className="text-black p-1">
              <RxHamburgerMenu />
            </button>
            <div className="hidden lg:block text-sm font-bold text-center mx-auto">
              UCI Texas Plant - Real-Time Production Dashboard
            </div>
          </div>

        </div>



        {/* Right Controls */}
        <div className="flex items-center gap-4 relative">
          {/* Hamburger for Mobile */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-1 text-black">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Mobile Dropdown */}
          <div className={`lg:hidden absolute top-full right-0 mt-2 w-72 bg-white rounded-lg shadow-lg p-4 z-50 transition-all duration-300 ease-in-out ${menuOpen ? "opacity-100" : "opacity-0 translate-y-2 pointer-events-none"}`}>
            <h1 className="text-sm font-semibold mb-2">UCI Texas Plant - Real-Time Production Dashboard</h1>


            <h1 className="text-sm mb-4">{currentDateTime} UTC-5 </h1>
            {["gra", "gcs", "spc"].map((item) => (
              <Link key={item} href={`/automationline/${item}`} className="block py-2 border-b-2 border-b-green-400 hover:text-green-500">
                {item.toUpperCase()}
              </Link>
            ))}
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-4 ">

{/* 
            <div className=" text-red-500 ">
              <h2 className="text-xs  ">
                 <span className='' ><IoWarningOutline /></span> 
                <span className='font-bold ' >Reminder:</span> Your demo license will expire on 15-06-2025 at 11:00 PM.
              </h2>

            </div> */}



            {/* <h1 className="text-sm">Date: {currentDate}</h1> */}
            <h1 className="text-sm ">{currentDateTime} (UTC-5)</h1>
            {["gra", "gcs", "spc"].map((item) => (
              <Link key={item} href={`/automationline/${item}`} className={`text-sm border-b-2 border-b-green-400 hover:text-orange-500 hover:border-b-orange-500 ${isActive(`/texas/gra/${item === "gra" ? "" : item}`) ? "border-green-500" : ""}`}>
                {item.toUpperCase()}
              </Link>
            ))}
          </div>

          {/* Avatar */}
          <div className="pl-2">
            <div onClick={toggleUserMenu} className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:scale-105 transition">
              <span className="text-xs">{getInitials(user.firstName, user.lastName)}</span>
            </div>

            {/* User Menu */}
            {isMenuOpen && (
              <div ref={infoCardRef} className="absolute top-14 right-4 bg-white border shadow-lg rounded-lg z-10 p-4 w-64">
                <div className="flex items-center justify-between mb-4">
                  <Image src={navlogo} alt="Logo" className="w-20 h-auto" />
                  <button onClick={handleSignOut} className="text-sm text-red-600 hover:underline">Sign out</button>
                </div>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center">
                    <span className="text-lg">{getInitials(user.firstName, user.lastName)}</span>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{user.firstName} {user.lastName}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="text-sm">
                  <p><strong>Tenant ID: </strong>{user.tenantId || "N/A"}</p>
                  <p><strong>Role: </strong>{user.role || "N/A"}</p>
                </div>
              </div>
            )}

            {/* Notifications Drawer */}
            {isDrawerOpen && (
              <div className="absolute top-14 right-4 bg-white border shadow-lg rounded-lg z-10 w-80 p-4">
                <h2 className="text-lg font-semibold mb-2">Notifications</h2>
                {notifications.length ? notifications.map((n, i) => (
                  <div key={i} className={`p-2 mb-2 rounded ${n.type === "warning" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"}`}>
                    {n.message}
                  </div>
                )) : <p className="text-gray-500">No notifications</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
