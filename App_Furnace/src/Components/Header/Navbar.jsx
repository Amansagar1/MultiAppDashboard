'use client';
import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import navlogo from "../Assets/Logo.png";
import Image from "next/image";
import { IoNotificationsOutline } from "react-icons/io5";
const Navbar = ({ toggleSidebar }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [user, setUser] = useState({});
    const toggleDrawer = () => {
        setIsDrawerOpen((prev) => {
            if (!prev) setIsMenuOpen(false);
            return !prev;
        });
    };
    const toggleMenu = () => {
        setIsMenuOpen((prev) => {
            if (!prev) setIsDrawerOpen(false);
            return !prev;
        });
    };


    const getInitials = (firstName, lastName) => {
        let initials = "";
        if (firstName) initials += firstName.charAt(0).toUpperCase();
        if (lastName) initials += lastName.charAt(0).toUpperCase();
        return initials || "A";
    };



    return (
        <nav className="bg-white shadow-md px-4 py-2 flex items-center justify-between fixed w-full top-0 z-50">
            <div className="flex items-center space-x-4">
                <Image src={navlogo} alt="Logo" className="w-48 h-full" />
                <button
                    onClick={toggleSidebar}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
                >
                    <Menu className="h-6 w-6" />
                </button>
                <div className="flex justify-center items-center space-x-2">
                    <span className="text-xl font-semibold">Furnace Monitoring</span>
                </div>

              
            </div>
            <div className="flex gap-4">
            <div
                    onClick={toggleDrawer}
                    className="relative cursor-pointer hover:scale-105 transition"
                >
                    <IoNotificationsOutline size={24} className="text-white bg-sky-500 w-10 h-10 rounded-full p-2 hover:bg-sky-600" />
                    {notifications.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                            {notifications.length}
                        </span>
                    )}
                </div>

                <div
                    onClick={toggleMenu}
                    className="bg-sky-500 text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:scale-105 transition"
                >
                    <span className="text-sm">{getInitials(user.firstName, user.lastName)}</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;