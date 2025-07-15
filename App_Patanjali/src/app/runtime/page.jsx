"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/Components/Sidebar/Sidebar';
import RuntimeDashboard from '../../Components/HomePage/RuntimeDashboard';
import Production from '../../Components/Production/Production';
import Alarms from '../../Components/AlarmsPage/AlarmPage';
import Reports from '../../Components/ReportsPage/ReportsPage';
import Navbar from "@/Components/Header/Navbar";
import Cookies from 'js-cookie';

const DashboardPage = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('home');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const handleSignOut = () => {
        Cookies.remove("token");
        Cookies.remove("tenantId");
        router.push(`/login`);
    };

    return (
        <div className="flex flex-col h-screen bg-white">
            <Navbar onSignOut={handleSignOut} />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                    isCollapsed={isSidebarCollapsed}
                    toggleSidebar={toggleSidebar}
                />
                <main className={`flex-1 overflow-auto transition-all duration-300 ease-in-out `}>
                    <div className="">
                        {activeTab === 'home' ? (
                            <RuntimeDashboard />
                        ) : activeTab === 'mixer' ? (
                            <Production />
                        ) : activeTab === 'alarms' ? (
                            <Alarms />
                        ) : (
                            <Reports />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;





// // "use client"
// // import React, { useState } from 'react';
// // import { useRouter } from 'next/navigation';
// // import Sidebar from '@/Components/Sidebar/Sidebar';
// // import RuntimeDashboard from '../../../Components/Dashboard/RuntimeDashboard';
// // import ProductionA from '../../../Components/Production/ProdA';
// // import ProductionB from '../../../Components/Production/ProdB';
// // import ProductionC from '../../../Components/Production/ProdC';
// // import Alarms from '../../../Components/AlarmsPage/AlarmPage';
// // import Reports from '../../../Components/ReportsPage/ReportsPage';
// // import Navbar from "@/Components/Header/Navbar";
// // import Cookies from 'js-cookie';

// // const DashboardPage = () => {
// //     const router = useRouter();
// //     const [activeTab, setActiveTab] = useState('home');
// //     const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

// //     const handleTabChange = (tab) => {
// //         setActiveTab(tab);
// //     };

// //     const toggleSidebar = () => {
// //         setIsSidebarCollapsed(!isSidebarCollapsed);
// //     };

// //     const handleSignOut = () => {
// //         Cookies.remove("token");
// //         Cookies.remove("tenantId");
// //         router.push(`/login`);
// //     };

// //     const renderContent = () => {
// //         switch (activeTab) {
// //             case 'home':
// //                 return <RuntimeDashboard />;
// //             case 'production-a':
// //                 return <ProductionA />;
// //             case 'production-b':
// //                 return <ProductionB />;
// //             case 'production-c':
// //                 return <ProductionC />;
// //             case 'alarms':
// //                 return <Alarms />;
// //             case 'reports':
// //                 return <Reports />;
// //             default:
// //                 return <RuntimeDashboard />;
// //         }
// //     };

// //     return (
// //         <div className="flex flex-col h-screen bg-white">
// //             <Navbar onSignOut={handleSignOut} />
// //             <div className="flex flex-1 overflow-hidden">
// //                 <Sidebar
// //                     activeTab={activeTab}
// //                     onTabChange={handleTabChange}
// //                     isCollapsed={isSidebarCollapsed}
// //                     toggleSidebar={toggleSidebar}
// //                 />
// //                 <main className={`flex-1 overflow-auto transition-all duration-300 ease-in-out`}>
// //                     <div className="">
// //                         {renderContent()}
// //                     </div>
// //                 </main>
// //             </div>
// //         </div>
// //     );
// // };

// // export default DashboardPage;



// "use client"
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Sidebar from '@/Components/Sidebar/Sidebar';
// import RuntimeDashboard from '../../Components/Dashboard/RuntimeDashboard';
// import Production from '../../Components/Production/Production';
// import Alarms from '../../Components/AlarmsPage/AlarmPage';
// import Reports from '../../Components/ReportsPage/ReportsPage';
// import Navbar from "@/Components/Header/Navbar";
// import Cookies from 'js-cookie';

// const DashboardPage = () => {
//     const router = useRouter();
//     const [activeTab, setActiveTab] = useState('home');
//     const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
//     const [expandedMenus, setExpandedMenus] = useState({});

//     const handleTabChange = (tab) => {
//         setActiveTab(tab);
//     };

//     const toggleSidebar = () => {
//         setIsSidebarCollapsed(!isSidebarCollapsed);
//     };

//     const toggleMenu = (menuId) => {
//         setExpandedMenus(prev => ({
//             ...prev,
//             [menuId]: !prev[menuId]
//         }));
//     };

//     const handleSignOut = () => {
//         Cookies.remove("token");
//         Cookies.remove("tenantId");
//         router.push(`/login`);
//     };

//     // Menu configuration with nested items
//     const menuOptions = [
//         {
//             id: 'home',
//             label: 'Home',
//         },
//         {
//             id: 'production',
//             label: 'Production',
//             subItems: [
//                 { id: 'production-a', label: 'Production A' },
//                 { id: 'production-b', label: 'Production B' },
//                 { id: 'production-c', label: 'Production C' }
//             ]
//         },
//         {
//             id: 'alarms',
//             label: 'Alarms',
//         },
//         {
//             id: 'reports',
//             label: 'Reports',
//         }
//     ];

//     const renderContent = () => {
//         // Handle production views
//         if (activeTab.startsWith('production')) {
//             return <Production activeTab={activeTab} />;
//         }

//         // Handle other views
//         switch (activeTab) {
//             case 'home':
//                 return <RuntimeDashboard />;
//             case 'alarms':
//                 return <Alarms />;
//             case 'reports':
//                 return <Reports />;
//             default:
//                 return <RuntimeDashboard />;
//         }
//     };

//     return (
//         <div className="flex flex-col h-screen bg-white">
//             <Navbar onSignOut={handleSignOut} />
//             <div className="flex flex-1 overflow-hidden">
//                 <Sidebar
//                     activeTab={activeTab}
//                     onTabChange={handleTabChange}
//                     isCollapsed={isSidebarCollapsed}
//                     toggleSidebar={toggleSidebar}
//                     menuOptions={menuOptions}
//                     expandedMenus={expandedMenus}
//                     toggleMenu={toggleMenu}
//                 />
//                 <main className={`flex-1 overflow-auto transition-all duration-300 ease-in-out bg-gray-50`}>
//                     {renderContent()}
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default DashboardPage;