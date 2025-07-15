"use client";
import React, { useState, useEffect, useRef } from "react";
import navlogo from "@/Components/Assets/yunoMeta.png";
import { FiMoon, FiSun } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";
import Link from "next/link";
import { useTitle } from '../Context/TitleContext';
import { useTheme } from '../Context/ThemeContext';
import { decodeToken } from "@/WebServices/ApiControllers";
import Cookies from "js-cookie";
import ErrorNotification from "@/WebServices/ErrorNotification";

const Navbar = ({ onSignOut, propTitle }) => {
  const { title } = useTitle();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHamMenuOpen, setIsHamMenuOpen] = useState(false);
  const [user, setUser] = useState({});
  const infoCardRef = useRef(null);
  const [licenseType, setLicenseType] = useState("Demo License");
  const [notification, setNotification] = useState({ type: "", message: "" });
  // const [currentLogo, setCurrentLogo] = useState(navlogo);

  // const tenantId = Cookies.get("tenantId");
  // console.log("tenantID navbar:", tenantId);
  // if (tenantId === "16bdaab1-b43e-40a7-b070-60bfeb3611cc") {
  //   setCurrentLogo(YonoMetaLogo);
  // } else {
  //   setCurrentLogo(navlogo);
  // }

  const getInitials = (firstName, lastName) => {
    let initials = "";
    if (firstName) {
      initials += firstName.charAt(0).toUpperCase();
    }
    if (lastName) {
      initials += lastName.charAt(0).toUpperCase();
    }
    return initials || "A";
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    const handleClickOutside = (event) => {
      if (infoCardRef.current && !infoCardRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    // Get token and user info
    const token = Cookies.get("token");
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) setUser(decoded);
    }

    // Get licenseType from cookies
    const licenseFromCookie = Cookies.get("licenseType");
    if (licenseFromCookie) {
      setLicenseType(licenseFromCookie);
      checkLicenseStatus(licenseFromCookie);
    }


    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const checkLicenseStatus = (licenseType) => {
    const endDate = Cookies.get("licenseEndDate");
    if (!endDate) return;

    const currentDate = new Date();
    const expiryDate = new Date(endDate);
    const daysRemaining = (expiryDate - currentDate) / (1000 * 60 * 60 * 24);

    if (currentDate > expiryDate) {
      setNotification({
        type: "warning",
        message: "Your License has expired. Please contact to Admin..",
      });
      setLicenseType("expired"); // Mark license as expired
    } else if (licenseType === "0" && daysRemaining <= 60) {
      setNotification({
        type: "warning",
        message: `Demo license expiring in ${Math.ceil(daysRemaining)} days. Contact admin for renewal.`,
      });
    } else if (licenseType === "1" && daysRemaining <= 30) {
      setNotification({
        type: "warning",
        message: `Developer license expiring in ${Math.ceil(daysRemaining)} days. Contact admin for renewal.`,
      });
    } else if (licenseType === "2" && daysRemaining <= 30) {
      setNotification({
        type: "warning",
        message: `Production license expires on ${expiryDate.toDateString()}. Contact admin for renewal.`,
      });
    }
  };
  const toggleHamMenu = () => {
    setIsHamMenuOpen(!isHamMenuOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    onSignOut();
    setIsMenuOpen(false);
  };
  const handleCloseNotification = () => setNotification({ type: "", message: "" });

  // const getBaseUrl = () => {
  //   if (typeof window !== 'undefined') {
  //     console.log("Window defined", `${window.location.protocol}//${window.location.host}`);
  //     return `${window.location.protocol}//${window.location.host}`;
  //   }
  //   console.log("Window not defined");

  //   return ''; // Or any fallback URL you want to provide for non-browser environments
  // };

  // const BASE_URL = getBaseUrl();

  return (
    <div className={`w-full border ${isDarkMode ? 'border-dark bg-gray-800  text-dark' : 'border-gray-200 bg-white text-black'} relative p-1`}>
      <div className="w-full flex  justify-between items-center px-4">
        <Link href={`/landingpage`} className="flex  items-center">
          <Image src={navlogo} alt="Logo" className="w-40 h-full " />
          {/* <Image src={currentLogo} alt="Logo" className="w-48 h-full" /> */}
        </Link>
        <h1
          className={`font-bold text-[20px] ${isDarkMode ? 'text-sky-500' : 'text-sky-600'} ${isMobile ? "hidden md:inline-block" : ""}`}
        >
          {title || propTitle}
        </h1>

        <div className="flex gap-5 items-center">
          <div className="text-md  text-red-600 italic px-2 py-1 rounded-lg">
            {licenseType !== "expired" && licenseType !== "2" ? (
              <div className=" text-red-600 italic px-2 py-1 rounded-lg text-[12px]">
                {licenseType === "0"
                  ? "(Demo License not for Production usage)"
                  : licenseType === "1"
                    ? "(Development License, internal use only)"
                    : null}
              </div>
            ) : licenseType === "expired" ? (
              <div className="text-[12px]  text-red-600 italic px-2 py-1 rounded-lg">
                License Expired
              </div>
            ) : null}
          </div>
          {/* <button onClick={handleToggleBreadcrumb} className="relative">
      <IoMdArrowDropup className={`transition-transform duration-300 text-xl ${isClicked ? 'rotate-180' : ''}`} />
    </button> */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-dark-light hover:bg-white text-yellow-300 hover:text-yellow-400' : 'bg-gray-200 hover:bg-gray-500 text-gray-700 hover:text-white'}`}
          >
            {isDarkMode ? <FiSun className="" /> : <FiMoon className="" />}
          </button>
          <GiHamburgerMenu
            className={`text-xl md:hidden hover:text-blue-900 hover:scale-105 ${isDarkMode ? 'text-dark' : 'text-black'}`}
            onClick={toggleHamMenu}
          />
          <div
            onClick={toggleMenu}
            className={`rounded-full w-8 h-8 flex items-center justify-center mr-5 hover:text-blue-900 hover:scale-105 cursor-pointer ${isDarkMode ? 'bg-sky-600' : 'bg-sky-500'}`}
          >
            <h1 className="text-[12px] text-white ">
              {getInitials(user.firstName, user.lastName)}
            </h1>
          </div>
          {isMenuOpen && (
            <div
              ref={infoCardRef}
              className="absolute top-14 right-4  bg-white border border-gray-200 shadow-lg rounded-lg z-50 p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <Image src={navlogo} alt="Logo" className="w-40 h-6" />
                <button
                  onClick={handleSignOut}
                  className="text-xs text-red-600 hover:underline"
                >
                  Sign out
                </button>
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-sky-500 text-white rounded-full w-12 h-12 flex items-center justify-center">
                  <span className="text-lg">
                    {user.firstName ? user.firstName[0] : "A"}
                  </span>
                </div>
                <div>
                  <p className="text-lg font-semibold">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="text-sm">
                <p className="mb-1">
                  <strong>Tenant ID: </strong>
                  {user.tenantId || "N/A"}
                </p>
                <p>
                  <strong>Role: </strong>
                  {user.role || "N/A"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {notification.message && (
        <ErrorNotification
          type={notification.type}
          message={notification.message}
          onClose={handleCloseNotification}
        />
      )}
    </div>
  );
};

export default Navbar;
