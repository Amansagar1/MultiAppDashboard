
import React, { useState, useEffect, useRef } from "react";
import navlogo from "../../Components/Assets/Dashboard1.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
// import { decodeToken } from "../../webServices/UCIAPIController";
import Cookies from "js-cookie";
import { IoNotificationsOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
const Navbar = ({ handleSignOut, toggleCollapse }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState({});
  const [licenseType, setLicenseType] = useState("Demo License");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const pathname = usePathname();
  const infoCardRef = useRef(null);

  // Utility to get user initials
  const getInitials = (firstName, lastName) => {
    let initials = "";
    if (firstName) initials += firstName.charAt(0).toUpperCase();
    if (lastName) initials += lastName.charAt(0).toUpperCase();
    return initials || "A";
  };




  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    const handleClickOutside = (event) => {
      if (infoCardRef.current && !infoCardRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    // Initial setup
    handleResize();
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    // const token = Cookies.get("token");
    // if (token) {
    //   const decoded = decodeToken(token);
    //   if (decoded) setUser(decoded);
    // }

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

    let notificationMessage = "";
    if (currentDate > expiryDate) {
      notificationMessage = "Your License has expired. Please contact Admin.";
      setLicenseType("expired");
    } else if (licenseType === "0" && daysRemaining <= 60) {
      notificationMessage = `Demo license expiring in ${Math.ceil(daysRemaining)} days. Contact admin for renewal.`;
    } else if (licenseType === "1" && daysRemaining <= 30) {
      notificationMessage = `Developer license expiring in ${Math.ceil(daysRemaining)} days. Contact admin for renewal.`;
    } else if (licenseType === "2" && daysRemaining <= 30) {
      notificationMessage = `Production license expires on ${expiryDate.toDateString()}. Contact admin for renewal.`;
    }

    if (notificationMessage) {
      setNotifications((prev) => {
        const uniqueMessages = new Set(prev.map((notif) => notif.message));
        if (!uniqueMessages.has(notificationMessage)) {
          return [...prev, { type: "warning", message: notificationMessage }];
        }
        return prev;
      });
    }
  };



  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      if (!prev) setIsDrawerOpen(false);
      return !prev;
    });
  };

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => {
      if (!prev) setIsMenuOpen(false);
      return !prev;
    });
  };



  return (
    <div className="w-full border-b border-gray-200 relative p-2 bg-white shadow-md">
      <div className="flex justify-between items-center px-4">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src={navlogo} alt="Logo" width={50} height={50} />
          <button onClick={toggleCollapse} className="pt-8"> <RxHamburgerMenu /></button>

        </div>

        {/* Right Section */}
        <div className="flex gap-5 items-center">
          <div className="text-sm text-red-600 italic px-2 py-1 rounded-lg">
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


          {/* User Menu */}
          <div
            onClick={toggleMenu}
            className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:scale-105 transition"
          >
            <span className="text-sm">{getInitials(user.firstName, user.lastName)}</span>
          </div>
        </div>
      </div>
      {/* User Card */}
      {isMenuOpen && (
        <div
          ref={infoCardRef}
          className="absolute top-14 right-4 bg-white border border-gray-200 shadow-lg rounded-lg z-10 p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <Image src={navlogo} alt="Logo" className="w-20 h-auto" />
            <button
              onClick={handleSignOut}
              className="text-sm text-red-600 hover:underline"
            >
              Sign out
            </button>
          </div>
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center">
              <span className="text-lg">{getInitials(user.firstName, user.lastName)}</span>
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
      {/* Notifications Drawer */}
      {isDrawerOpen && (
        <div className="absolute top-14 right-4 bg-white border border-gray-200 shadow-lg rounded-lg z-10 w-80 p-4">
          <h2 className="text-lg font-semibold mb-2">Notifications</h2>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div
                key={index}
                className={`p-2 mb-2 rounded ${notification.type === "warning"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
                  }`}
              >
                {notification.message}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No notifications</p>
          )}

        </div>
      )}
    </div>
  );
};

export default Navbar;
