// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { usePathname } from 'next/navigation';
// import { Home, Gauge, Settings, ChevronDown, ChevronLeft, ChevronRight, Flame } from 'lucide-react';

// const Sidebar = ({ isOpen, isCollapsed, handleCollapse }) => {
//     const router = useRouter();
//     const pathname = usePathname();
//     const [isDashboardOpen, setIsDashboardOpen] = useState(false);

//     // Auto-open dashboard menu if we're on a furnace page
//     useEffect(() => {
//         if (pathname?.includes('/dashboard')) {
//             setIsDashboardOpen(true);
//         }
//     }, [pathname]);

//     const handleNavigation = (path) => {
//         router.push(path);
//     };

//     // Only show sidebar if it's open
//     if (!isOpen) return null;

//     return (
//         <div className={`fixed left-0 top-0 h-full bg-white border-r-2 shadow-lg transition-all duration-300 z-40 pt-16
//             ${isCollapsed ? 'w-16' : 'w-64'}`}>
//             <div className="p-4 flex flex-col justify-between h-full">
//                 <div className="space-y-2">
//                     <button
//                         onClick={() => handleNavigation('/home')}
//                         className={`w-full flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg
//                             ${pathname === '/home' ? 'bg-gray-100' : ''}`}
//                     >
//                         <Home className="h-5 w-5" />
//                         {!isCollapsed && <span>Home</span>}
//                     </button>

//                     <div>
//                         <button
//                             onClick={() => !isCollapsed && setIsDashboardOpen(!isDashboardOpen)}
//                             className={`w-full flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg
//                                 ${pathname?.startsWith('/dashboard') ? 'bg-gray-100' : ''}`}
//                         >
//                             <div className="flex items-center space-x-2">
//                                 <Gauge className="h-5 w-5" />
//                                 {!isCollapsed && <span>Dashboards</span>}
//                             </div>
//                             {!isCollapsed && (
//                                 <ChevronDown
//                                     className={`h-4 w-4 transition-transform ${isDashboardOpen ? 'rotate-180' : ''}`}
//                                 />
//                             )}
//                         </button>

//                         {/* Show furnace items if dashboard is open and sidebar isn't collapsed */}
//                         {((isDashboardOpen && !isCollapsed) || pathname?.includes('/dashboard')) && (
//                             <div className={`ml-6 mt-2 space-y-2 ${isCollapsed ? 'ml-0' : ''}`}>
//                                 {['Furnace 1', 'Furnace 2', 'Furnace 3'].map((furnace, index) => (
//                                     <button
//                                         key={furnace}
//                                         onClick={() => handleNavigation(`/dashboard/furnace${index + 1}`)}
//                                         className={`w-full flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg
//                                             ${pathname === `/dashboard/furnace${index + 1}` ? 'bg-gray-100' : ''}`}
//                                     >
//                                         <Flame className="h-5 w-5" />
//                                         {!isCollapsed && <span>{furnace}</span>}
//                                     </button>
//                                 ))}
//                             </div>
//                         )}
//                     </div>

//                     <button
//                         onClick={() => handleNavigation('/settings')}
//                         className={`w-full flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg
//                             ${pathname === '/settings' ? 'bg-gray-100' : ''}`}
//                     >
//                         <Settings className="h-5 w-5" />
//                         {!isCollapsed && <span>Settings</span>}
//                     </button>
//                 </div>

//                 {/* Collapse button */}
//                 <div className="absolute bottom-4 right-4">
//                     <button
//                         onClick={handleCollapse}
//                         className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition">
//                         {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Sidebar;




'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { PanelsTopLeft, LayoutDashboard, Settings, ChevronDown, ChevronLeft, ChevronRight, Flame, BellRing, Text } from 'lucide-react';

// Define menu structure
const MENU_ITEMS = [
    {
        id: 'overview',
        title: 'Overview',
        path: '/overview',
        icon: PanelsTopLeft
    },
    {
        id: 'plant',
        title: 'Plants',
        icon: LayoutDashboard,
        path: '/plant/furnace1',
        subItems: [
            { id: 'furnace1', title: 'Furnace 1', path: '/plant/furnace1', icon: Flame },
            { id: 'furnace2', title: 'Furnace 2', path: '/plant/furnace2', icon: Flame },
            { id: 'furnace3', title: 'Furnace 3', path: '/plant/furnace3', icon: Flame },
            { id: 'furnace4', title: 'Furnace 4', path: '/plant/furnace4', icon: Flame }
        ]
    },
    {
        id: 'report',
        title: 'Report',
        path: '/report',
        icon: Text
    },
    {
        id: 'alarm',
        title: 'Alarms',
        path: '/alarm',
        icon: BellRing
    },
    {
        id: 'settings',
        title: 'Settings',
        path: '/settings/alarms',
        icon: Settings,
        subItems: [
            { id: 'alarm', title: 'Alarm Settings', path: '/settings/alarms', icon: BellRing },
            { id: 'production', title: 'Production Settings', path: '/settings/production', icon: Text },
        ]
    }
];

const MenuItem = ({ item, isCollapsed, isActive, onClick, isOpen, onToggle, pathname }) => {
    const hasSubItems = item.subItems?.length > 0;

    return (
        <div>
            <button
                onClick={() => hasSubItems ? onToggle?.() : onClick(item.path)}
                className={`w-full flex items-center justify-between p-1 hover:bg-gray-100 rounded-lg
                ${isActive ? 'bg-gray-100' : ''}`}
            >
                <div className="flex items-center space-x-2 text-lg">
                    <item.icon className="h-5 w-5" />
                    {!isCollapsed && <span>{item.title}</span>}
                </div>
                {hasSubItems && !isCollapsed && (
                    <ChevronDown
                        className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                )}
            </button>

            {hasSubItems && ((isOpen && !isCollapsed) || isActive) && (
                <div className={`ml-6 mt-1 text-lg ${isCollapsed ? 'ml-0' : ''}`}>
                    {item.subItems.map((subItem) => (
                        <button
                            key={subItem.id}
                            onClick={() => onClick(subItem.path)}
                            className={`w-full flex items-center space-x-2 p-1 hover:bg-gray-100 rounded-lg
                ${pathname === subItem.path ? 'bg-gray-100' : ''}`}
                        >
                            <subItem.icon className="h-5 w-5" />
                            {!isCollapsed && <span>{subItem.title}</span>}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

const Sidebar = ({ isOpen, isCollapsed, handleCollapse }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [openMenus, setOpenMenus] = useState(new Set());

    // Auto-open dashboard menu if we're on a furnace page
    useEffect(() => {
        if (pathname?.includes('/dashboard')) {
            setOpenMenus(prev => new Set([...prev, 'dashboards']));
        }
    }, [pathname]);

    const handleNavigation = (path) => {
        router.push(path);
    };

    const toggleMenu = (menuId) => {
        setOpenMenus(prev => {
            const newSet = new Set(prev);
            if (newSet.has(menuId)) {
                newSet.delete(menuId);
            } else {
                newSet.add(menuId);
            }
            return newSet;
        });
    };

    if (!isOpen) return null;

    return (
        <div className={`fixed left-0 top-0 h-full bg-white border-r-2 shadow-lg transition-all duration-300 z-40 pt-16
            ${isCollapsed ? 'w-16' : 'w-64'}`}>
            <div className="p-4 flex flex-col justify-between h-full">
                <div className="space-y-2">
                    {MENU_ITEMS.map((item) => (
                        <MenuItem
                            key={item.id}
                            item={item}
                            isCollapsed={isCollapsed}
                            isActive={pathname?.startsWith(item.path) ||
                                (item.subItems?.some(sub => pathname?.startsWith(sub.path)))}
                            onClick={handleNavigation}
                            isOpen={openMenus.has(item.id)}
                            onToggle={() => toggleMenu(item.id)}
                            pathname={pathname}
                        />
                    ))}
                </div>

                <div className="absolute bottom-4 right-4">
                    <button
                        onClick={handleCollapse}
                        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition">
                        {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;