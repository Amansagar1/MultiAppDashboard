'use client'

import { useState } from 'react';
import Navbar from '@/Components/Header/Navbar';
import Sidebar from '@/Components/Sidebar/Sidebar';

const Settings = ({ params }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isSidebarOpen} />
            <main className={`pt-16 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
                <div>Settings</div>
            </main>
        </div>
    );
}

export default Settings;