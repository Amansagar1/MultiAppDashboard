// "use client"
// import React, { useState } from 'react';
// import Navbar from '@/Components/Header/Navbar';
// import Sidebar from '@/Components/Sidebar/Sidebar';
// import { Activity, Power, Pause, Settings, AlertCircle } from 'lucide-react';

// const HomePage = () => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//     const [isCollapsed, setIsCollapsed] = useState(false);

//     const handleCollapse = () => {
//         setIsCollapsed(!isCollapsed);
//     };

//     const toggleSidebar = () => {
//         setIsSidebarOpen(!isSidebarOpen);
//     };

//     const data = [
//         {
//             id: '560111',
//             name: 'CNC Gantry Milling-1',
//             status: 'Running',
//             product: 'Product - Not Selected',
//             statusBars: ['green', 'red', 'green', 'red'],
//             ar: 100.0, pr: 9.5, qr: 100.0, oee: 8.5,
//             runTime: "00 hr 30 min",
//             downTime: "00 hr 48 min"
//         },
//         {
//             id: '560112',
//             name: 'CNC Gantry Milling-2',
//             status: 'Stop',
//             product: 'Product - Not Selected',
//             statusBars: ['green', 'red', 'green', 'green'],
//             ar: 100.0, pr: 0.0, qr: 100.0, oee: 0.0,
//             runTime: "00 hr 00 min",
//             downTime: "01 hr 25 min"
//         },
//         {
//             id: '560101',
//             name: 'CNC Press Brake-1',
//             status: 'Stop',
//             product: 'Product - Not Selected',
//             statusBars: ['green', 'red', 'red', 'red'],
//             ar: 100.0, pr: 3.6, qr: 100.0, oee: 3.6,
//             runTime: "00 hr 19 min",
//             downTime: "00 hr 42 min"
//         },
//         {
//             id: '560102',
//             name: 'CNC Press Brake-2',
//             status: 'Power Off',
//             product: 'Product - Not Selected',
//             statusBars: ['green', 'red'],
//             ar: 100.0, pr: 0.0, qr: 100.0, oee: 0.0,
//             runTime: "00 hr 00 min",
//             downTime: "00 hr 28 min"
//         },
//         {
//             id: '560103',
//             name: 'Radial Drilling-1',
//             status: 'Power Off',
//             product: 'Product - Not Selected',
//             statusBars: ['green', 'red', 'red'],
//             ar: 100.0, pr: 0.0, qr: 100.0, oee: 0.0,
//             runTime: "00 hr 00 min",
//             downTime: "00 hr 00 min"
//         },
//     ];

//     const statusIndicators = [
//         {
//             label: 'Running',
//             count: '3/16',
//             icon: () => (
//                 <div className="w-20 h-20 bg-white rounded-lg border-2 border-green-500 p-1">
//                     <div className="w-full h-full bg-green-100 rounded flex items-center justify-center">
//                         <Activity className="w-10 h-10 text-green-600" />
//                     </div>
//                 </div>
//             ),
//             bgColor: 'bg-white',
//             borderColor: 'border-green-500',
//             textColor: 'text-green-600'
//         },
//         {
//             label: 'Power Off',
//             count: '7/16',
//             icon: () => (
//                 <div className="w-20 h-20 bg-white rounded-lg border-2 border-sky-500 p-1">
//                     <div className="w-full h-full bg-sky-100 rounded flex items-center justify-center">
//                         <Power className="w-10 h-10 text-sky-600" />
//                     </div>
//                 </div>
//             ),
//             bgColor: 'bg-white',
//             borderColor: 'border-sky-500',
//             textColor: 'text-sky-600'
//         },
//         {
//             label: 'Stop',
//             count: '6/16',
//             icon: () => (
//                 <div className="w-20 h-20 bg-white rounded-lg border-2 border-red-500 p-1">
//                     <div className="w-full h-full bg-red-100 rounded flex items-center justify-center">
//                         <Pause className="w-10 h-10 text-red-600" />
//                     </div>
//                 </div>
//             ),
//             bgColor: 'bg-white',
//             borderColor: 'border-red-500',
//             textColor: 'text-red-600'
//         },
//         {
//             label: 'Setup',
//             count: '1/6',
//             icon: () => (
//                 <div className="w-20 h-20 bg-white rounded-lg border-2 border-yellow-500 p-1">
//                     <div className="w-full h-full bg-yellow-100 rounded flex items-center justify-center">
//                         <Settings className="w-10 h-10 text-yellow-600" />
//                     </div>
//                 </div>
//             ),
//             bgColor: 'bg-white',
//             borderColor: 'border-yellow-500',
//             textColor: 'text-yellow-600'
//         },
//         {
//             label: 'M/C Breakdown',
//             count: '0/6',
//             icon: () => (
//                 <div className="w-20 h-20 bg-white rounded-lg border-2 border-teal-500 p-1">
//                     <div className="w-full h-full bg-teal-100 rounded flex items-center justify-center">
//                         <AlertCircle className="w-10 h-10 text-teal-600" />
//                     </div>
//                 </div>
//             ),
//             bgColor: 'bg-white',
//             borderColor: 'border-teal-500',
//             textColor: 'text-teal-600'
//         },
//     ];

//     const getStatusIcon = (status) => {
//         switch (status) {
//             case 'Running':
//                 return <Activity className="w-6 h-6 text-green-500" />;
//             case 'Power Off':
//                 return <Power className="w-6 h-6 text-sky-500" />;
//             case 'Stop':
//                 return <Pause className="w-6 h-6 text-red-500" />;
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <div className="p-6">

//                 {/* Status Indicators */}
//                 {/* <div className="grid grid-cols-5 gap-4 mb-6">
//                         {statusIndicators.map((indicator, index) => (
//                             <div key={index} className="bg-white p-3 rounded-lg shadow-sm flex items-center space-x-4">
//                                 {indicator.icon()}
//                                 <div className="flex flex-col">
//                                     <span className={`text-xl font-semibold ${indicator.textColor}`}>
//                                         {indicator.count}
//                                     </span>
//                                     <span className="text-md font-bold">
//                                         {indicator.label}
//                                     </span>
//                                 </div>
//                             </div>
//                         ))}
//                     </div> */}
//                 {/* Overview Cards */}
//                 <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
//                     {[
//                         { label: "Overall OEE", value: "94%", color: "green", change: "increase" },
//                         { label: "Running Production", value: "85.60%", color: "orange", change: "decrease" },
//                         { label: "Quality", value: "100%", color: "green", change: "increase" },
//                         { label: "Performance", value: "94%", color: "orange", change: "decrease" },
//                         { label: "Downtime", value: "10%", color: "orange", change: "decrease" }
//                     ].map((item, index) => (
//                         <div
//                             key={index}
//                             className={`p-3 flex items-center justify-center text-[16px] rounded-lg shadow bg-white border-l-4 ${item.color === "green" ? "border-[#00DD6E]" : "border-orange-500"
//                                 } flex flex-col justify-between h-40 w-full`}
//                         >
//                             <div className="flex justify-between items-center">
//                                 <h2 className="text-gray-500 text-[18px]">{item.label}</h2>
//                             </div>
//                             <div className="mt-2 text-[32px] font-bold text-gray-800">
//                                 {item.value}
//                             </div>

//                             {/* Green/Red border arrow button */}
//                             <div className="mt-4 flex justify-end items-center space-x-2">
//                                 <button
//                                     className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${item.change === "increase" ? "border-green-500" : "border-red-500"
//                                         } bg-white text-${item.change === "increase" ? "green" : "red"
//                                         }-500`}
//                                     aria-label={item.change === "increase" ? "Increase" : "Decrease"}
//                                 >
//                                     {item.change === "increase" ? (
//                                         <span className="text-sm p-1">↑</span>
//                                     ) : (
//                                         <span className="text-sm p-1">↓</span>
//                                     )}
//                                 </button>
//                                 <div
//                                     className={`text-sm text-gray-400 ${item.change === "increase" ? "text-green-500" : "text-red-500"
//                                         }`}
//                                 >
//                                     {/* Adjust the change text to show +5% or -5% */}
//                                     {item.change === "increase" ? "+5%" : "-5%"}
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Machine Table */}
//                 <div className="bg-white rounded shadow-sm overflow-hidden border border-gray-400">
//                     <table className="w-full divide-y divide-gray-400">
//                         <thead className="bg-gray-200 divide-y divide-gray-400">
//                             <tr className='divide-x divide-gray-400'>
//                                 <th className="px-4 py-3 text-left text-sm font-bold">S.No</th>
//                                 <th className="px-4 py-3 text-left text-sm font-bold">Machine Name</th>
//                                 <th className="px-4 py-3 text-center text-sm font-bold">AR</th>
//                                 <th className="px-4 py-3 text-center text-sm font-bold">PR</th>
//                                 <th className="px-4 py-3 text-center text-sm font-bold">QR</th>
//                                 <th className="px-4 py-3 text-center text-sm font-bold">OEE</th>
//                                 <th className="px-4 py-3 text-left text-sm font-bold">Run Time</th>
//                                 <th className="px-4 py-3 text-left text-sm font-bold">Down Time</th>
//                             </tr>
//                         </thead>
//                         <tbody className='divide-y divide-gray-400'>
//                             {data.map((item, index) => (
//                                 <tr key={item.id} className="divide-x divide-gray-400 hover:bg-gray-50">
//                                     <td className="px-4 py-4">{index + 1}</td>
//                                     <td className="px-4 py-4">
//                                         <div className="flex items-center space-x-2">
//                                             {getStatusIcon(item.status)}
//                                             <div>
//                                                 <p className="text-xl text-blue-500">{item.id}</p>
//                                                 <p className="text-sm text-blue-600">{item.name}</p>
//                                                 <p className="text-sm text-gray-600">{item.product}</p>
//                                             </div>
//                                         </div>
//                                     </td>
//                                     {['ar', 'pr', 'qr', 'oee'].map((metric) => (
//                                         <td key={metric} className="px-4 py-4">
//                                             <div className="flex justify-center">
//                                                 <div className="relative w-12 h-12">
//                                                     <svg className="w-12 h-12 transform -rotate-90">
//                                                         <circle
//                                                             className="text-gray-200"
//                                                             strokeWidth="2"
//                                                             stroke="currentColor"
//                                                             fill="transparent"
//                                                             r="20"
//                                                             cx="24"
//                                                             cy="24"
//                                                         />
//                                                         <circle
//                                                             className="text-blue-500"
//                                                             strokeWidth="2"
//                                                             strokeDasharray={`${item[metric] * 1.256}, 126`}
//                                                             strokeLinecap="round"
//                                                             stroke="currentColor"
//                                                             fill="transparent"
//                                                             r="20"
//                                                             cx="24"
//                                                             cy="24"
//                                                         />
//                                                     </svg>
//                                                     <div className="absolute inset-0 flex items-center justify-center">
//                                                         <span className="text-sm font-medium">
//                                                             {item[metric].toFixed(1)}
//                                                         </span>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </td>
//                                     ))}
//                                     <td className="px-4 py-4 text-sm text-gray-600">{item.runTime}</td>
//                                     <td className="px-4 py-4 text-sm text-gray-600">{item.downTime}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//             {/* </main> */}
//         </div>
//     );
// };

// export default HomePage;



"use client"
import React, { useState } from 'react';
import { Activity, Power, Pause, Settings, AlertCircle, Factory } from 'lucide-react';
import { useRouter } from 'next/navigation';

const OverViewPage = () => {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleRowClick = (furnaceName) => {
        // Convert furnace name to URL-friendly format and navigate
        const formattedName = furnaceName.toLowerCase().replace(/\s+/g, '');
        router.push(`/plant/${formattedName}`);
    };

    const data = [
        {
            id: '1',
            name: 'Furnace 1',
            status: 'Running',
            product: 'Product - Not Selected',
            statusBars: ['green', 'red', 'green', 'red'],
            ar: 100.0, pr: 9.5, qr: 100.0, oee: 8.5,
            runTime: "00 hr 30 min",
            downTime: "00 hr 48 min"
        },
        {
            id: '2',
            name: 'Furnace 2',
            status: 'Stop',
            product: 'Product - Not Selected',
            statusBars: ['green', 'red', 'green', 'green'],
            ar: 100.0, pr: 0.0, qr: 100.0, oee: 0.0,
            runTime: "00 hr 00 min",
            downTime: "01 hr 25 min"
        },
        {
            id: '3',
            name: 'Furnace 3',
            status: 'Stop',
            product: 'Product - Not Selected',
            statusBars: ['green', 'red', 'red', 'red'],
            ar: 100.0, pr: 3.6, qr: 100.0, oee: 3.6,
            runTime: "00 hr 19 min",
            downTime: "00 hr 42 min"
        },
        {
            id: '4',
            name: 'Furnace 4',
            status: 'Power Off',
            product: 'Product - Not Selected',
            statusBars: ['green', 'red'],
            ar: 100.0, pr: 0.0, qr: 100.0, oee: 0.0,
            runTime: "00 hr 00 min",
            downTime: "00 hr 28 min"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="p-6">
                {/* Overview Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                    {[
                        { label: "Overall OEE", value: "94%", color: "green", change: "increase" },
                        { label: "Running Production", value: "85.60%", color: "orange", change: "decrease" },
                        { label: "Quality", value: "100%", color: "green", change: "increase" },
                        { label: "Performance", value: "94%", color: "orange", change: "decrease" },
                        { label: "Downtime", value: "10%", color: "orange", change: "decrease" }
                    ].map((item, index) => (
                        <div
                            key={index}
                            className={`p-3 flex items-center justify-center text-[16px] rounded-lg shadow bg-white border-l-4 ${item.color === "green" ? "border-[#00DD6E]" : "border-orange-500"
                                } flex flex-col justify-between h-40 w-full`}
                        >
                            <div className="flex justify-between items-center">
                                <h2 className="text-gray-500 text-[18px]">{item.label}</h2>
                            </div>
                            <div className="mt-2 text-[32px] font-bold text-gray-800">
                                {item.value}
                            </div>
                            <div className="mt-4 flex justify-end items-center space-x-2">
                                <button
                                    className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${item.change === "increase" ? "border-green-500" : "border-red-500"
                                        } bg-white text-${item.change === "increase" ? "green" : "red"}-500`}
                                    aria-label={item.change === "increase" ? "Increase" : "Decrease"}
                                >
                                    {item.change === "increase" ? (
                                        <span className="text-sm p-1">↑</span>
                                    ) : (
                                        <span className="text-sm p-1">↓</span>
                                    )}
                                </button>
                                <div className={`text-sm text-gray-400 ${item.change === "increase" ? "text-green-500" : "text-red-500"
                                    }`}>
                                    {item.change === "increase" ? "+5%" : "-5%"}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Machine Table */}
                <div className="bg-white rounded shadow-sm overflow-hidden border border-gray-400">
                    <table className="w-full divide-y divide-gray-400">
                        <thead className="bg-gray-200 divide-y divide-gray-400">
                            <tr className='divide-x divide-gray-400'>
                                <th className="px-4 py-3 text-left text-sm font-bold">S.No</th>
                                <th className="px-4 py-3 text-left text-sm font-bold">Machine Name</th>
                                <th className="px-4 py-3 text-center text-sm font-bold">AR</th>
                                <th className="px-4 py-3 text-center text-sm font-bold">PR</th>
                                <th className="px-4 py-3 text-center text-sm font-bold">QR</th>
                                <th className="px-4 py-3 text-center text-sm font-bold">OEE</th>
                                <th className="px-4 py-3 text-left text-sm font-bold">Run Time</th>
                                <th className="px-4 py-3 text-left text-sm font-bold">Down Time</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-400'>
                            {data.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className="divide-x divide-gray-400 hover:bg-gray-100 cursor-pointer transition-colors duration-150"
                                    onClick={() => handleRowClick(item.name)}
                                >
                                    <td className="px-4 py-4">{index + 1}</td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center space-x-2">
                                            <Factory size={18} className='fill-green-400' />
                                            <div>
                                                <p className="text-xl text-blue-600">{item.name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    {['ar', 'pr', 'qr', 'oee'].map((metric) => (
                                        <td key={metric} className="px-4 py-4">
                                            <div className="flex justify-center">
                                                <div className="relative w-12 h-12">
                                                    <svg className="w-12 h-12 transform -rotate-90">
                                                        <circle
                                                            className="text-gray-200"
                                                            strokeWidth="2"
                                                            stroke="currentColor"
                                                            fill="transparent"
                                                            r="20"
                                                            cx="24"
                                                            cy="24"
                                                        />
                                                        <circle
                                                            className="text-blue-500"
                                                            strokeWidth="2"
                                                            strokeDasharray={`${item[metric] * 1.256}, 126`}
                                                            strokeLinecap="round"
                                                            stroke="currentColor"
                                                            fill="transparent"
                                                            r="20"
                                                            cx="24"
                                                            cy="24"
                                                        />
                                                    </svg>
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <span className="text-sm font-medium">
                                                            {item[metric].toFixed(1)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    ))}
                                    <td className="px-4 py-4 text-sm text-gray-600">{item.runTime}</td>
                                    <td className="px-4 py-4 text-sm text-gray-600">{item.downTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OverViewPage;