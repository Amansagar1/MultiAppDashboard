// "use client"
// import React, { useState } from 'react';
// import { LayoutDashboard, Factory, ChevronLeft, ChevronRight, Bell, Text, ChevronDown, ChevronUp } from 'lucide-react';

// const Sidebar = ({ activeTab, activeSubTab, onTabChange, isCollapsed, toggleSidebar }) => {
//     const [expandedMenus, setExpandedMenus] = useState({ production: true });

//     const dashboardOptions = [
//         {
//             id: 'home',
//             label: 'Home',
//             icon: LayoutDashboard
//         },
//         {
//             id: 'production',
//             label: 'Production',
//             icon: Factory,
//             subMenus: [
//                 { id: 'amla-line-6', label: 'Amla Line 6' },
//                 { id: 'amla-line-4', label: 'Amla Line 4' }
//             ]
//         },
//         {
//             id: 'alarms',
//             label: 'Alarms',
//             icon: Bell
//         },
//         {
//             id: 'reports',
//             label: 'Reports',
//             icon: Text
//         }
//     ];

//     const toggleExpand = (menuId) => {
//         setExpandedMenus(prev => ({
//             ...prev,
//             [menuId]: !prev[menuId]
//         }));
//     };

//     return (
//         <div className={`bg-white h-full relative border-r border-gray-400 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-56'}`}>
//             <div className="flex flex-col h-full">
//                 {/* Navigation Items */}
//                 <nav className="flex-1 p-2">
//                     {dashboardOptions.map((option) => {
//                         const Icon = option.icon;
//                         const hasSubMenus = option.subMenus && option.subMenus.length > 0;
//                         const isExpanded = expandedMenus[option.id];

//                         return (
//                             <div key={option.id}>
//                                 <button
//                                     onClick={() => {
//                                         if (hasSubMenus) {
//                                             // Only toggle expanded state for items with submenus
//                                             toggleExpand(option.id);
//                                         } else {
//                                             // For items without submenus, change tab directly
//                                             onTabChange(option.id);
//                                         }
//                                     }}
//                                     className={`w-full flex items-center mb-1 rounded-md transition-colors ${isCollapsed ? 'justify-center p-2' : 'justify-start px-4 py-2'
//                                         } ${activeTab === option.id && (!hasSubMenus || !activeSubTab)
//                                             ? 'bg-blue-500 text-white font-bold'
//                                             : 'text-gray-800 hover:bg-gray-300'
//                                         }`}
//                                 >
//                                     <Icon size={20} />
//                                     {!isCollapsed && (
//                                         <>
//                                             <span className="ml-3">{option.label}</span>
//                                             {hasSubMenus && (
//                                                 <span className="ml-auto">
//                                                     {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                                                 </span>
//                                             )}
//                                         </>
//                                     )}
//                                 </button>

//                                 {/* Render submenus if expanded and not collapsed */}
//                                 {hasSubMenus && isExpanded && !isCollapsed && (
//                                     <div className="ml-8 mb-2">
//                                         {option.subMenus.map(subMenu => (
//                                             <button
//                                                 key={subMenu.id}
//                                                 onClick={() => onTabChange(option.id, subMenu.id)}
//                                                 className={`w-full text-left py-1 px-2 mb-1 rounded-md transition-colors ${activeTab === option.id && activeSubTab === subMenu.id
//                                                     ? 'bg-blue-500 text-white'
//                                                     : 'text-gray-800 hover:bg-gray-300'
//                                                     }`}
//                                             >
//                                                 {subMenu.label}
//                                             </button>
//                                         ))}
//                                     </div>
//                                 )}
//                             </div>
//                         );
//                     })}
//                 </nav>
//                 {/* Collapse Button */}
//                 <div className="absolute bottom-4 right-4">
//                     <button
//                         onClick={toggleSidebar}
//                         className="p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition">
//                         {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Sidebar;



// "use client"
// import React, { useState, useEffect } from 'react';
// import { LayoutDashboard, Factory, ChevronLeft, ChevronRight, Bell, Text, ChevronDown, ChevronUp, Menu, SquareChartGantt } from 'lucide-react';

// const Sidebar = ({ activeTab, activeSubTab, onTabChange, isCollapsed, toggleSidebar }) => {
//     const [expandedMenus, setExpandedMenus] = useState({ production: true });
//     const [isMobile, setIsMobile] = useState(false);
//     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//     useEffect(() => {
//         const checkScreenSize = () => {
//             setIsMobile(window.innerWidth < 768);
//             if (window.innerWidth < 768 && !isCollapsed) {
//                 toggleSidebar(); // Auto-collapse on small screens
//             }
//         };

//         // Check on initial load
//         checkScreenSize();

//         // Add event listener for resize
//         window.addEventListener('resize', checkScreenSize);

//         // Cleanup
//         return () => window.removeEventListener('resize', checkScreenSize);
//     }, [isCollapsed, toggleSidebar]);

//     const dashboardOptions = [
//         {
//             id: 'home',
//             label: 'Home',
//             icon: LayoutDashboard
//         },
//         {
//             id: 'production',
//             label: 'Production',
//             icon: Factory,
//             subMenus: [
//                 { id: 'amla-line-6', label: 'Amla Line 6' },
//                 { id: 'amla-line-4', label: 'Amla Line 4' }
//             ]
//         },
//         {
//             id: 'count',
//             label: 'Production Count',
//             icon: SquareChartGantt
//         },
//         {
//             id: 'alarms',
//             label: 'Alarms',
//             icon: Bell
//         },
//         {
//             id: 'reports',
//             label: 'Reports',
//             icon: Text
//         }
//     ];

//     const toggleExpand = (menuId) => {
//         setExpandedMenus(prev => ({
//             ...prev,
//             [menuId]: !prev[menuId]
//         }));
//     };

//     const toggleMobileMenu = () => {
//         setMobileMenuOpen(!mobileMenuOpen);
//     };

//     // Handle mobile menu item click
//     const handleMobileItemClick = (optionId, subMenuId = '') => {
//         onTabChange(optionId, subMenuId);
//         setMobileMenuOpen(false);
//     };

//     // Render for mobile view
//     if (isMobile) {
//         return (
//             <>
//                 {/* Mobile trigger button */}
//                 <button
//                     onClick={toggleMobileMenu}
//                     className="md:hidden fixed top-16 left-4 z-30 p-2 rounded-md bg-blue-500 text-white shadow-lg"
//                     aria-label="Toggle menu"
//                 >
//                     <Menu size={24} />
//                 </button>

//                 {/* Mobile sidebar overlay */}
//                 {mobileMenuOpen && (
//                     <div
//                         className="fixed inset-0 bg-black bg-opacity-50 z-40"
//                         onClick={toggleMobileMenu}
//                     ></div>
//                 )}

//                 {/* Mobile sidebar */}
//                 <div className={`fixed top-0 left-0 h-full bg-white z-50 w-64 shadow-xl transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
//                     }`}>
//                     <div className="flex flex-col h-full">
//                         <div className="py-2 px-4 bg-[#246232] text-white">
//                             <h2 className="text-xl font-bold">Dabur</h2>
//                         </div>
//                         <nav className="flex-1 p-2 overflow-y-auto">
//                             {dashboardOptions.map((option) => {
//                                 const Icon = option.icon;
//                                 const hasSubMenus = option.subMenus && option.subMenus.length > 0;
//                                 const isExpanded = expandedMenus[option.id];

//                                 return (
//                                     <div key={option.id} className="mb-2">
//                                         <button
//                                             onClick={() => {
//                                                 if (hasSubMenus) {
//                                                     toggleExpand(option.id);
//                                                 } else {
//                                                     handleMobileItemClick(option.id);
//                                                 }
//                                             }}
//                                             className={`w-full flex items-center justify-between rounded-md px-2 py-1.5 transition-colors ${activeTab === option.id && (!hasSubMenus || !activeSubTab)
//                                                 ? 'bg-blue-400 text-white font-semibold'
//                                                 : 'text-gray-700 hover:bg-gray-100'
//                                                 }`}
//                                         >
//                                             <div className="flex items-center">
//                                                 <Icon size={20} />
//                                                 <span className="ml-3">{option.label}</span>
//                                             </div>
//                                             {hasSubMenus && (
//                                                 <span>
//                                                     {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                                                 </span>
//                                             )}
//                                         </button>

//                                         {hasSubMenus && isExpanded && (
//                                             <div className="ml-6 space-y-1">
//                                                 {option.subMenus.map(subMenu => (
//                                                     <button
//                                                         key={subMenu.id}
//                                                         onClick={() => handleMobileItemClick(option.id, subMenu.id)}
//                                                         className={`w-full text-left py-2 px-3 rounded-md transition-colors ${activeTab === option.id && activeSubTab === subMenu.id
//                                                             ? 'bg-blue-100 text-blue-700 font-semibold'
//                                                             : 'text-gray-600 hover:bg-gray-50'
//                                                             }`}
//                                                     >
//                                                         {subMenu.label}
//                                                     </button>
//                                                 ))}
//                                             </div>
//                                         )}
//                                     </div>
//                                 );
//                             })}
//                         </nav>
//                     </div>
//                 </div>
//             </>
//         );
//     }

//     // Desktop sidebar
//     return (
//         <div className={`hidden md:block bg-[#C7DFC7] h-full relative border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-56'}`}>
//             <div className="flex flex-col h-full">
//                 {/* Navigation Items */}
//                 <nav className="flex-1 p-2">
//                     {dashboardOptions.map((option) => {
//                         const Icon = option.icon;
//                         const hasSubMenus = option.subMenus && option.subMenus.length > 0;
//                         const isExpanded = expandedMenus[option.id];

//                         return (
//                             <div key={option.id} className="mb-1">
//                                 <button
//                                     onClick={() => {
//                                         if (hasSubMenus) {
//                                             toggleExpand(option.id);
//                                         } else {
//                                             onTabChange(option.id);
//                                         }
//                                     }}
//                                     className={`w-full text-md flex items-center rounded-md transition-colors ${isCollapsed ? 'justify-center p-2' : 'justify-start px-4 py-2'
//                                         } ${activeTab === option.id && (!hasSubMenus || !activeSubTab)
//                                             ? 'bg-blue-500 text-white font-bold'
//                                             : 'text-gray-700 hover:bg-gray-100'
//                                         }`}
//                                 >
//                                     <Icon size={20} className="flex-shrink-0" />
//                                     {!isCollapsed && (
//                                         <>
//                                             <span className="ml-3 text-md">{option.label}</span>
//                                             {hasSubMenus && (
//                                                 <span className="ml-auto">
//                                                     {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                                                 </span>
//                                             )}
//                                         </>
//                                     )}
//                                 </button>

//                                 {/* Render submenus if expanded and not collapsed */}
//                                 {hasSubMenus && isExpanded && !isCollapsed && (
//                                     <div className="ml-6 space-y-1">
//                                         {option.subMenus.map(subMenu => (
//                                             <button
//                                                 key={subMenu.id}
//                                                 onClick={() => onTabChange(option.id, subMenu.id)}
//                                                 className={`w-full text-md text-left py-1.5 px-3 rounded-md transition-colors ${activeTab === option.id && activeSubTab === subMenu.id
//                                                     ? 'bg-blue-500 text-white font-bold'
//                                                     : 'text-gray-700 hover:bg-gray-100'
//                                                     }`}
//                                             >
//                                                 {subMenu.label}
//                                             </button>
//                                         ))}
//                                     </div>
//                                 )}
//                             </div>
//                         );
//                     })}
//                 </nav>
//                 {/* Collapse Button */}
//                 <div className="absolute bottom-4 right-4">
//                     <button
//                         onClick={toggleSidebar}
//                         className="p-2 rounded-full bg-gray-200 hover:bg-gray-400 transition">
//                         {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Sidebar;


"use client"
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Factory, ChevronLeft, ChevronRight, Bell, Text, ChevronDown, ChevronUp, Menu, SquareChartGantt } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
    const [expandedMenus, setExpandedMenus] = useState({ production: true });
    const [isMobile, setIsMobile] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768 && !isCollapsed) {
                toggleSidebar(); // Auto-collapse on small screens
            }
        };

        // Check on initial load
        checkScreenSize();

        // Add event listener for resize
        window.addEventListener('resize', checkScreenSize);

        // Cleanup
        return () => window.removeEventListener('resize', checkScreenSize);
    }, [isCollapsed, toggleSidebar]);

    const dashboardOptions = [
        {
            id: 'home',
            label: 'Home',
            icon: LayoutDashboard,
            path: '/home'
        },
        {
            id: 'production',
            label: 'Production',
            icon: Factory,
            path: '/production',
            subMenus: [
                { id: 'amla-line-4', label: 'Amla Line 4', path: '/production/amla-line-4' },
                { id: 'amla-line-6', label: 'Amla Line 6', path: '/production/amla-line-6' }
            ]
        },
        {
            id: 'count',
            label: 'Production Count',
            icon: SquareChartGantt,
            path: '/production-count'
        },
        {
            id: 'alarms',
            label: 'Alarms',
            icon: Bell,
            path: '/alarms'
        },
        {
            id: 'reports',
            label: 'Reports',
            icon: Text,
            path: '/reports'
        }
    ];

    const toggleExpand = (menuId, e) => {
        e.preventDefault();
        setExpandedMenus(prev => ({
            ...prev,
            [menuId]: !prev[menuId]
        }));
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    // Check if a path is active
    const isActive = (path) => {
        if (path === '/home' && pathname === '/') {
            return true;
        }
        return pathname === path || pathname.startsWith(path + '/');
    };

    // Check if a submenu is active
    const isSubMenuActive = (path) => {
        return pathname === path;
    };

    // Handle mobile menu closure after navigation
    const handleMobileItemClick = () => {
        setMobileMenuOpen(false);
    };

    // Render for mobile view
    if (isMobile) {
        return (
            <>
                {/* Mobile trigger button */}
                <button
                    onClick={toggleMobileMenu}
                    className="md:hidden fixed top-16 left-4 z-30 p-2 rounded-md bg-blue-500 text-white shadow-lg"
                    aria-label="Toggle menu"
                >
                    <Menu size={24} />
                </button>

                {/* Mobile sidebar overlay */}
                {mobileMenuOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={toggleMobileMenu}
                    ></div>
                )}

                {/* Mobile sidebar */}
                <div className={`fixed top-0 left-0 h-full bg-white z-50 w-64 shadow-xl transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}>
                    <div className="flex flex-col h-full">
                        <div className="py-2 px-4 bg-[#246232] text-white">
                            <h2 className="text-xl font-bold">Dabur</h2>
                        </div>
                        <nav className="flex-1 p-2 overflow-y-auto">
                            {dashboardOptions.map((option) => {
                                const Icon = option.icon;
                                const hasSubMenus = option.subMenus && option.subMenus.length > 0;
                                const isExpanded = expandedMenus[option.id];
                                const active = isActive(option.path);

                                return (
                                    <div key={option.id} className="mb-2">
                                        <Link
                                            href={hasSubMenus ? '#' : option.path}
                                            onClick={(e) => {
                                                if (hasSubMenus) {
                                                    toggleExpand(option.id, e);
                                                } else {
                                                    handleMobileItemClick();
                                                }
                                            }}
                                            className={`w-full flex items-center justify-between rounded-md px-2 py-1.5 transition-colors ${active && (!hasSubMenus)
                                                ? 'bg-blue-400 text-white font-semibold'
                                                : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            <div className="flex items-center">
                                                <Icon size={20} />
                                                <span className="ml-3">{option.label}</span>
                                            </div>
                                            {hasSubMenus && (
                                                <span>
                                                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                </span>
                                            )}
                                        </Link>

                                        {hasSubMenus && isExpanded && (
                                            <div className="ml-6 space-y-1">
                                                {option.subMenus.map(subMenu => (
                                                    <Link
                                                        key={subMenu.id}
                                                        href={subMenu.path}
                                                        onClick={handleMobileItemClick}
                                                        className={`block w-full text-left py-2 px-3 rounded-md transition-colors ${isSubMenuActive(subMenu.path)
                                                            ? 'bg-blue-100 text-blue-700 font-semibold'
                                                            : 'text-gray-600 hover:bg-gray-50'
                                                            }`}
                                                    >
                                                        {subMenu.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            </>
        );
    }

    // Desktop sidebar
    return (
        <div className={`hidden md:block bg-[#C7DFC7] h-full relative border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-56'}`}>
            <div className="flex flex-col h-full">
                {/* Navigation Items */}
                <nav className="flex-1 p-2">
                    {dashboardOptions.map((option) => {
                        const Icon = option.icon;
                        const hasSubMenus = option.subMenus && option.subMenus.length > 0;
                        const isExpanded = expandedMenus[option.id];
                        const active = isActive(option.path);

                        return (
                            <div key={option.id} className="mb-1">
                                <Link
                                    href={hasSubMenus ? '#' : option.path}
                                    onClick={(e) => {
                                        if (hasSubMenus) {
                                            toggleExpand(option.id, e);
                                        }
                                    }}
                                    className={`w-full text-md flex items-center rounded-md transition-colors ${isCollapsed ? 'justify-center p-2' : 'justify-start px-4 py-2'
                                        } ${active && (!hasSubMenus)
                                            ? 'bg-blue-500 text-white font-bold'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <Icon size={20} className="flex-shrink-0" />
                                    {!isCollapsed && (
                                        <>
                                            <span className="ml-3 text-md">{option.label}</span>
                                            {hasSubMenus && (
                                                <span className="ml-auto">
                                                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                </span>
                                            )}
                                        </>
                                    )}
                                </Link>

                                {/* Render submenus if expanded and not collapsed */}
                                {hasSubMenus && isExpanded && !isCollapsed && (
                                    <div className="ml-6 space-y-1">
                                        {option.subMenus.map(subMenu => (
                                            <Link
                                                key={subMenu.id}
                                                href={subMenu.path}
                                                className={`block w-full text-md text-left py-1.5 px-3 rounded-md transition-colors ${isSubMenuActive(subMenu.path)
                                                    ? 'bg-blue-500 text-white font-bold'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                                    }`}
                                            >
                                                {subMenu.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>
                {/* Collapse Button */}
                <div className="absolute bottom-4 right-4">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-full bg-gray-200 hover:bg-gray-400 transition">
                        {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;