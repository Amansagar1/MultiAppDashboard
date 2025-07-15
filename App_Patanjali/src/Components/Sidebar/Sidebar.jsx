"use client"
import React from 'react';
import { LayoutDashboard, Factory, ChevronLeft, ChevronRight, Bell, Text } from 'lucide-react';

const Sidebar = ({ activeTab, onTabChange, isCollapsed, toggleSidebar }) => {
    const dashboardOptions = [
        {
            id: 'home',
            label: 'Home',
            icon: LayoutDashboard
        },
        {
            id: 'mixer',
            label: 'Mixer',
            icon: Factory
        },
        {
            id: 'alarms',
            label: 'Alarms',
            icon: Bell
        },
        {
            id: 'reports',
            label: 'Reports',
            icon: Text
        }
    ];

    return (
        <div className={`bg-white h-full relative border-r border-gray-400 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-56'}`}>
            <div className="flex flex-col h-full">

                {/* Navigation Items */}
                <nav className="flex-1 p-2">
                    {dashboardOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                            <button
                                key={option.id}
                                onClick={() => onTabChange(option.id)}
                                className={`w-full flex items-center mb-1 rounded-md transition-colors ${isCollapsed ? 'justify-center p-2' : 'justify-start px-4 py-2'
                                    } ${activeTab === option.id
                                        ? 'bg-blue-500 text-white font-bold'
                                        : 'text-gray-800 hover:bg-gray-300'
                                    }`}
                            >
                                <Icon size={20} />
                                {!isCollapsed && (
                                    <span className="ml-3">{option.label}</span>
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* Collapse Button */}
                <div className="absolute bottom-4 right-4">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition">
                        {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;


// // "use client"
// // import React, { useState } from 'react';
// // import { LayoutDashboard, Factory, ChevronLeft, ChevronRight, Bell, Text, ChevronDown, ChevronUp } from 'lucide-react';

// // const Sidebar = ({ activeTab, onTabChange, isCollapsed, toggleSidebar }) => {
// //     const [expandedMenus, setExpandedMenus] = useState({});

// //     const dashboardOptions = [
// //         {
// //             id: 'home',
// //             label: 'Home',
// //             icon: LayoutDashboard
// //         },
// //         {
// //             id: 'production',
// //             label: 'Production',
// //             icon: Factory,
// //             subItems: [
// //                 { id: 'production-a', label: 'Production A' },
// //                 { id: 'production-b', label: 'Production B' },
// //                 { id: 'production-c', label: 'Production C' }
// //             ]
// //         },
// //         {
// //             id: 'alarms',
// //             label: 'Alarms',
// //             icon: Bell
// //         },
// //         {
// //             id: 'reports',
// //             label: 'Reports',
// //             icon: Text
// //         }
// //     ];

// //     const toggleMenu = (menuId) => {
// //         setExpandedMenus(prev => ({
// //             ...prev,
// //             [menuId]: !prev[menuId]
// //         }));
// //     };

// //     const renderMenuItem = (option) => {
// //         const Icon = option.icon;
// //         const isExpanded = expandedMenus[option.id];
// //         const hasSubItems = option.subItems && option.subItems.length > 0;

// //         return (
// //             <div key={option.id} className="mb-1">
// //                 <button
// //                     onClick={() => {
// //                         if (hasSubItems) {
// //                             toggleMenu(option.id);
// //                         } else {
// //                             onTabChange(option.id);
// //                         }
// //                     }}
// //                     className={`w-full flex items-center justify-between rounded-md transition-colors px-4 py-2
// //                         ${activeTab === option.id
// //                             ? 'bg-blue-500 text-white'
// //                             : 'text-gray-700 hover:bg-gray-200'
// //                         }`}
// //                 >
// //                     <div className='flex'>
// //                         <div className="min-w-[24px]">
// //                             <Icon size={18} />
// //                         </div>
// //                         <span className="ml-3 text-left flex-grow">{option.label}</span>
// //                     </div>
// //                     {hasSubItems && !isCollapsed && (
// //                         <ChevronDown size={16} className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
// //                     )}
// //                 </button>

// //                 {!isCollapsed && hasSubItems && isExpanded && (
// //                     <div className="ml-10 mt-1 space-y-1">
// //                         {option.subItems.map((subItem) => (
// //                             <button
// //                                 key={subItem.id}
// //                                 onClick={() => onTabChange(subItem.id)}
// //                                 className={`w-full p-2 rounded-md transition-colors ${activeTab === subItem.id
// //                                     ? 'bg-blue-500 text-white'
// //                                     : 'text-gray-700 hover:bg-gray-200'
// //                                     }`}
// //                             >
// //                                 {subItem.label}
// //                             </button>
// //                         ))}
// //                     </div>
// //                 )}
// //             </div>
// //         );
// //     };

// //     return (
// //         <div className={`bg-gray-100 h-full relative border-r border-gray-200 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-56'}`}>
// //             <div className="flex flex-col h-full">
// //                 <nav className="flex-1 p-2 space-y-1">
// //                     {dashboardOptions.map(renderMenuItem)}
// //                 </nav>

// //                 {/* Weather and Toggle Section */}
// //                 <div className="border-t border-gray-200 p-4">
// //                     <div className="flex items-center justify-between">
// //                         <div className="flex items-center space-x-2">
// //                             {/* Weather icon and temperature */}
// //                             <div className="text-sm text-gray-600">48°F</div>
// //                             <div className="text-sm text-gray-500">Mostly clear</div>
// //                         </div>
// //                         <button
// //                             onClick={toggleSidebar}
// //                             className="p-2 rounded-full hover:bg-gray-200 transition-colors"
// //                         >
// //                             {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
// //                         </button>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default Sidebar;



// "use client"
// import React from 'react';
// import { LayoutDashboard, Factory, Bell, FileText, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

// const Sidebar = ({
//     activeTab,
//     onTabChange,
//     isCollapsed,
//     toggleSidebar,
//     menuOptions,
//     expandedMenus,
//     toggleMenu
// }) => {
//     const getIcon = (id) => {
//         switch (id) {
//             case 'home':
//                 return LayoutDashboard;
//             case 'production':
//                 return Factory;
//             case 'alarms':
//                 return Bell;
//             case 'reports':
//                 return FileText;
//             default:
//                 return LayoutDashboard;
//         }
//     };

//     const renderMenuItem = (option) => {
//         const Icon = getIcon(option.id);
//         const isExpanded = expandedMenus[option.id];
//         const hasSubItems = option.subItems && option.subItems.length > 0;

//         return (
//             <div key={option.id} className="mb-1">
//                 <button
//                     onClick={() => {
//                         if (hasSubItems) {
//                             toggleMenu(option.id);
//                         } else {
//                             onTabChange(option.id);
//                         }
//                     }}
//                     className={`w-full flex items-center rounded-md transition-colors px-4 py-2
//                         ${activeTab === option.id ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
//                 >
//                     <div className="min-w-[24px]">
//                         <Icon size={18} />
//                     </div>
//                     {!isCollapsed && (
//                         <>
//                             <span className="ml-3 text-left flex-grow">{option.label}</span>
//                             {hasSubItems && (
//                                 <ChevronDown
//                                     size={16}
//                                     className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
//                                 />
//                             )}
//                         </>
//                     )}
//                 </button>

//                 {!isCollapsed && hasSubItems && isExpanded && (
//                     <div className="ml-10 mt-1 space-y-1">
//                         {option.subItems.map((subItem) => (
//                             <button
//                                 key={subItem.id}
//                                 onClick={() => onTabChange(subItem.id)}
//                                 className={`w-full text-left px-4 py-2 rounded-md transition-colors
//                                     ${activeTab === subItem.id ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
//                             >
//                                 {subItem.label}
//                             </button>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         );
//     };

//     return (
//         <div className={`bg-white h-full relative border-r border-gray-200 transition-all duration-300 ease-in-out
//             ${isCollapsed ? 'w-16' : 'w-56'}`}
//         >
//             <div className="flex flex-col h-full">
//                 <nav className="flex-1 p-2 space-y-1">
//                     {menuOptions.map(renderMenuItem)}
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