// "use client"
// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
// import { getAlarmsData } from '../../WebServices/ApiControllers';

// const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// const AlarmPage = () => {
//     const [currentYear, setCurrentYear] = useState(2025);
//     const [alarms, setAlarms] = useState([]);
//     const [calendarData, setCalendarData] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [selectedInstance, setSelectedInstance] = useState('40ce6095-84c2-49a5-b5aa-c2f37ebdd40c');

//     const fetchAlarms = async () => {
//         setLoading(true);
//         try {
//             const params = {
//                 tenantId: 'ff0d9ff0-2bec-4085-b084-59f9af315f89',
//                 instanceId: selectedInstance,
//                 limit: 1000
//             };

//             const data = await getAlarmsData(params);
//             setAlarms(data);
//             processCalendarData(data);
//         } catch (error) {
//             console.error('Error fetching alarms:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const processCalendarData = (data) => {
//         const calData = {};
//         for (let month = 0; month < 12; month++) {
//             const daysInMonth = new Date(currentYear, month + 1, 0).getDate();
//             calData[MONTHS[month]] = Array(daysInMonth).fill().map(() => ({
//                 high: 0,
//                 medium: 0,
//                 low: 0
//             }));
//         }

//         data.forEach(alarm => {
//             const date = new Date(alarm.timestamp);
//             if (date.getFullYear() === currentYear) {
//                 const month = MONTHS[date.getMonth()];
//                 const day = date.getDate() - 1;

//                 if (calData[month] && calData[month][day]) {
//                     if (alarm.serverity === "HIGH") {
//                         calData[month][day].high++;
//                     } else if (alarm.serverity === "MEDIUM") {
//                         calData[month][day].medium++;
//                     } else {
//                         calData[month][day].low++;
//                     }
//                 }
//             }
//         });

//         setCalendarData(calData);
//     };

//     const formatDateTime = (dateTimeStr) => {
//         if (!dateTimeStr || dateTimeStr.startsWith('0001-01-01')) {
//             return '';
//         }
//         return new Date(dateTimeStr).toLocaleString();
//     };

//     useEffect(() => {
//         fetchAlarms();
//     }, [currentYear, selectedInstance]);

//     const getStatusColor = (counts) => {
//         if (counts.high > 0) return 'bg-red-700';
//         if (counts.medium > 0) return 'bg-red-500';
//         if (counts.low > 0) return 'bg-red-400';
//         return 'bg-gray-200';
//     };

//     const tableHeaders = [
//         { key: 'timestamp', label: 'Timestamp' },
//         { key: 'instanceid', label: 'Instance ID' },
//         { key: 'alarmtypeid', label: 'Alarm Type ID' },
//         { key: 'alarmlabel', label: 'Alarm Label' },
//         { key: 'isactive', label: 'Is Active' },
//         { key: 'duration', label: 'Duration' },
//         { key: 'starttime', label: 'Start Time' },
//         { key: 'endtime', label: 'End Time' },
//         { key: 'serverity', label: 'Severity' },
//         { key: 'uuid', label: 'Alarm InstanceId' }
//     ];

//     return (
//         <div className="p-4 bg-gray-50 overflow-auto">
//             {/* Header Section */}
//             <div className="mb-8">
//                 <div className="flex justify-between items-center mb-2">
//                     <h1 className="text-2xl px-4 font-semibold">Alarms in {currentYear}</h1>
//                     <div className="flex gap-2">
//                         <button
//                             onClick={() => setCurrentYear(prev => prev - 1)}
//                             className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//                         >
//                             <ChevronLeft size={16} />
//                         </button>
//                         <button
//                             onClick={() => setCurrentYear(prev => prev + 1)}
//                             className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//                         >
//                             <ChevronRight size={16} />
//                         </button>
//                     </div>
//                 </div>

//                 {/* Calendar View */}
//                 <div className="border rounded-lg bg-white p-4 shadow-sm">
//                     <div className="grid grid-cols-12 gap-2">
//                         {MONTHS.map(month => (
//                             <div key={month} className="space-y-1">
//                                 <div className="text-sm font-semibold text-center text-gray-600">{month}</div>
//                                 <div className="grid grid-cols-7 gap-1">
//                                     {calendarData[month]?.map((day, index) => (
//                                         <div
//                                             key={index}
//                                             className={`${getStatusColor(day)} w-full aspect-square rounded-sm`}
//                                             title={`High: ${day.high}, Medium: ${day.medium}, Low: ${day.low}`}
//                                         />
//                                     ))}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Legend */}
//                 <div className="flex justify-end items-center gap-2 mt-2 text-sm">
//                     <span className='text-xs font-semibold'>Less</span>
//                     <div className="flex gap-1">
//                         <div className="w-4 h-4 bg-gray-200 rounded"></div>
//                         <div className="w-4 h-4 bg-red-400 rounded"></div>
//                         <div className="w-4 h-4 bg-red-600 rounded"></div>
//                         <div className="w-4 h-4 bg-red-800 rounded"></div>
//                     </div>
//                     <span className='text-xs font-semibold'>More</span>
//                 </div>
//             </div>

//             {/* Alarm Controls */}
//             <div className="flex justify-between items-center mb-6">
//                 <div className="flex items-center gap-8">
//                     <h2 className="font-bold text-lg">Alarm Instance:</h2>
//                     <select
//                         className="w-56 p-3 bg-gray-100 border-b-2 border-blue-400 rounded-md"
//                         value={selectedInstance}
//                         onChange={(e) => setSelectedInstance(e.target.value)}
//                     >
//                         <option value="40ce6095-84c2-49a5-b5aa-c2f37ebdd40c">Furnace 1</option>
//                         <option value="047c3f09-2be1-4d39-bcd4-f2ac601d5ced">Furnace 2</option>
//                         <option value="7e75bcf7-67c8-40db-a0fe-aac0b0470fa2">Furnace 3</option>
//                         <option value="2eb825bd-b26c-4dc6-90fb-9b8e25bd6418">Furnace 4</option>
//                     </select>
//                 </div>
//                 <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
//                     <Download size={20} />
//                     Export
//                 </button>
//             </div>

//             {/* Alarms Table */}
//             <div className="rounded overflow-x-auto bg-white shadow-sm border border-gray-400">
//                 <table className="min-w-full divide-y divide-gray-400">
//                     <thead className="bg-gray-200">
//                         <tr className='divide-x divide-gray-400'>
//                             {tableHeaders.map((header) => (
//                                 <th
//                                     key={header.key}
//                                     className="px-4 py-2 text-left text-xs font-bold text-black uppercase tracking-wider"
//                                 >
//                                     {header.label}
//                                 </th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-400">
//                         {loading ? (
//                             <tr>
//                                 <td colSpan={tableHeaders.length} className="text-center py-4 ">
//                                     Loading...
//                                 </td>
//                             </tr>
//                         ) : (
//                             alarms.map((alarm, index) => (
//                                 <tr key={index} className="hover:bg-gray-100 divide-x divide-gray-400">
//                                     <td className="px-4 py-2 text-xs text-gray-900">{formatDateTime(alarm.timestamp)}</td>
//                                     <td className="px-4 py-2 text-xs text-gray-900">{alarm.instanceid}</td>
//                                     <td className="px-4 py-2 text-xs text-gray-900">{alarm.alarmtypeid}</td>
//                                     <td className="px-4 py-2 text-xs text-gray-900">{alarm.alarmlabel}</td>
//                                     <td className="px-4 py-2 text-xs text-gray-900">{alarm.isactive ? 'True' : 'False'}</td>
//                                     <td className="px-4 py-2 text-xs text-gray-900">{alarm.duration}</td>
//                                     <td className="px-4 py-2 text-xs text-gray-900">{formatDateTime(alarm.starttime)}</td>
//                                     <td className="px-4 py-2 text-xs text-gray-900">{formatDateTime(alarm.endtime)}</td>
//                                     <td className="px-4 py-2 text-xs text-gray-900">{alarm.serverity}</td>
//                                     <td className="px-4 py-2 text-xs text-gray-900">{alarm.uuid}</td>
//                                 </tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default AlarmPage;




// "use client"
// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
// import { getAlarmsData } from '../../WebServices/ApiControllers';

// const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// const AlarmPage = () => {
//     const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
//     const [alarms, setAlarms] = useState([]);
//     const [calendarData, setCalendarData] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [selectedInstance, setSelectedInstance] = useState('40ce6095-84c2-49a5-b5aa-c2f37ebdd40c');

//     const fetchAlarms = async () => {
//         setLoading(true);
//         try {
//             const params = {
//                 tenantId: 'ff0d9ff0-2bec-4085-b084-59f9af315f89',
//                 instanceId: selectedInstance,
//                 limit: 1000
//             };

//             const data = await getAlarmsData(params);
//             setAlarms(data);
//             processCalendarData(data);
//         } catch (error) {
//             console.error('Error fetching alarms:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const processCalendarData = (data) => {
//         const calData = {};
//         for (let month = 0; month < 12; month++) {
//             const daysInMonth = new Date(currentYear, month + 1, 0).getDate();
//             calData[MONTHS[month]] = Array(daysInMonth).fill().map(() => ({
//                 high: 0,
//                 medium: 0,
//                 low: 0,
//                 date: new Date(currentYear, month, 0).getDate()
//             }));
//         }

//         data.forEach(alarm => {
//             const date = new Date(alarm.timestamp);
//             if (date.getFullYear() === currentYear) {
//                 const month = MONTHS[date.getMonth()];
//                 const day = date.getDate() - 1;

//                 if (calData[month] && calData[month][day]) {
//                     if (alarm.serverity === "HIGH") {
//                         calData[month][day].high++;
//                     } else if (alarm.serverity === "MEDIUM") {
//                         calData[month][day].medium++;
//                     } else {
//                         calData[month][day].low++;
//                     }
//                     calData[month][day].date = date;
//                 }
//             }
//         });

//         setCalendarData(calData);
//     };

//     const formatDateTime = (dateTimeStr) => {
//         if (!dateTimeStr || dateTimeStr.startsWith('0001-01-01')) {
//             return '';
//         }
//         return new Date(dateTimeStr).toLocaleString();
//     };

//     const formatDate = (date) => {
//         return date instanceof Date ? date.toLocaleDateString() : '';
//     };

//     useEffect(() => {
//         fetchAlarms();
//     }, [currentYear, selectedInstance]);

//     const getStatusColor = (counts) => {
//         if (counts.high > 0) return 'bg-red-700';
//         if (counts.medium > 0) return 'bg-red-500';
//         if (counts.low > 0) return 'bg-red-400';
//         return 'bg-gray-200';
//     };

//     const tableHeaders = [
//         { key: 'timestamp', label: 'Timestamp' },
//         { key: 'instanceid', label: 'Instance ID' },
//         { key: 'alarmtypeid', label: 'Alarm Type ID' },
//         { key: 'alarmlabel', label: 'Alarm Label' },
//         { key: 'isactive', label: 'Is Active' },
//         { key: 'duration', label: 'Duration' },
//         { key: 'starttime', label: 'Start Time' },
//         { key: 'endtime', label: 'End Time' },
//         { key: 'serverity', label: 'Severity' },
//         { key: 'uuid', label: 'Alarm InstanceId' }
//     ];

//     return (
//         <div className="p-4 bg-gray-50 overflow-auto">
//             {/* Header Section */}
//             <div className="mb-8">
//                 <div className="flex justify-between items-center mb-2">
//                     <h1 className="text-2xl px-4 font-semibold">Alarms in {currentYear}</h1>
//                     <div className="flex gap-2">
//                         <button
//                             onClick={() => setCurrentYear(prev => prev - 1)}
//                             className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//                         >
//                             <ChevronLeft size={16} />
//                         </button>
//                         <button
//                             onClick={() => setCurrentYear(prev => prev + 1)}
//                             className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//                         >
//                             <ChevronRight size={16} />
//                         </button>
//                     </div>
//                 </div>

//                 {/* Calendar View */}
//                 <div className="border rounded-lg bg-white p-4 shadow-sm">
//                     <div className="grid grid-cols-12 gap-2">
//                         {MONTHS.map(month => (
//                             <div key={month} className="space-y-1">
//                                 <div className="text-sm font-semibold text-center text-gray-600">{month}</div>
//                                 <div className="grid grid-cols-7 gap-1">
//                                     {calendarData[month]?.map((day, index) => (
//                                         <div
//                                             key={index}
//                                             className={`${getStatusColor(day)} w-full aspect-square rounded-sm`}
//                                             title={`Date: ${formatDate(day.date)}
// High: ${day.high}
// Medium: ${day.medium}
// Low: ${day.low}`}
//                                         />
//                                     ))}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Legend */}
//                 <div className="flex justify-end items-center gap-2 mt-2 text-sm">
//                     <span className='text-xs font-semibold'>Less</span>
//                     <div className="flex gap-1">
//                         <div className="w-4 h-4 bg-gray-200 rounded"></div>
//                         <div className="w-4 h-4 bg-red-400 rounded"></div>
//                         <div className="w-4 h-4 bg-red-600 rounded"></div>
//                         <div className="w-4 h-4 bg-red-800 rounded"></div>
//                     </div>
//                     <span className='text-xs font-semibold'>More</span>
//                 </div>
//             </div>

//             {/* Rest of the component remains the same */}
//             {/* Alarm Controls */}
//             <div className="flex justify-between items-center mb-6">
//                 <div className="flex items-center gap-8">
//                     <h2 className="font-bold text-lg">Alarm Instance:</h2>
//                     <select
//                         className="w-56 p-3 bg-gray-100 border-b-2 border-blue-400 rounded-md"
//                         value={selectedInstance}
//                         onChange={(e) => setSelectedInstance(e.target.value)}
//                     >
//                         <option value="40ce6095-84c2-49a5-b5aa-c2f37ebdd40c">Furnace 1</option>
//                         <option value="047c3f09-2be1-4d39-bcd4-f2ac601d5ced">Furnace 2</option>
//                         <option value="7e75bcf7-67c8-40db-a0fe-aac0b0470fa2">Furnace 3</option>
//                         <option value="2eb825bd-b26c-4dc6-90fb-9b8e25bd6418">Furnace 4</option>
//                     </select>
//                 </div>
//                 <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
//                     <Download size={20} />
//                     Export
//                 </button>
//             </div>

//             {/* Alarms Table */}
//             <div className="rounded overflow-x-auto bg-white shadow-sm border border-gray-400">
//                 <table className="min-w-full divide-y divide-gray-400">
//                     <thead className="bg-gray-300">
//                         <tr className='divide-x divide-gray-400'>
//                             {tableHeaders.map((header) => (
//                                 <th
//                                     key={header.key}
//                                     className="px-4 py-2 text-left text-xs font-bold text-black uppercase tracking-wider"
//                                 >
//                                     {header.label}
//                                 </th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-400">
//                         {loading ? (
//                             <tr>
//                                 <td colSpan={tableHeaders.length} className="text-center py-4 ">
//                                     Loading...
//                                 </td>
//                             </tr>
//                         ) : (
//                             alarms.map((alarm, index) => (
//                                 <tr key={index}
//                                     // className="hover:bg-gray-100 divide-x divide-gray-400"
//                                     className={`divide-x divide-gray-400 ${alarm.isactive ? 'bg-green-300 hover:bg-green-400' : 'bg-red-400 hover:bg-red-500'
//                                         }`}>
//                                     <td className="px-4 py-2 text-xs text-gray-900">{formatDateTime(alarm.timestamp)}</td>
//                                     <td className="px-4 py-2 text-xs text-gray-900">{alarm.instanceid}</td>
//                                     <td className="px-4 py-2 text-xs text-gray-900">{alarm.alarmtypeid}</td>
//                                     <td className="px-4 py-2 text-xs text-gray-900">{alarm.alarmlabel}</td>
//                                     <td className="px-4 py-2 text-xs text-gray-900">{alarm.isactive ? 'True' : 'False'}</td>
//                                     <td className="px-4 py-2 text-xs text-gray-900">{alarm.duration}</td>
//                                     <td className="px-4 py-2 text-xs text-gray-900">{formatDateTime(alarm.starttime)}</td>
//                                     <td className="px-4 py-2 text-xs text-gray-900">{formatDateTime(alarm.endtime)}</td>
//                                     <td className="px-4 py-2 text-xs text-gray-900">{alarm.serverity}</td>
//                                     <td className="px-4 py-2 text-xs text-gray-900">{alarm.uuid}</td>
//                                 </tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default AlarmPage;



"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { getAlarmsData } from '../../WebServices/ApiControllers';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Mapping of instance IDs to furnace names
const INSTANCE_MAPPING = {
    '40ce6095-84c2-49a5-b5aa-c2f37ebdd40c': 'Furnace 1',
    '047c3f09-2be1-4d39-bcd4-f2ac601d5ced': 'Furnace 2',
    '7e75bcf7-67c8-40db-a0fe-aac0b0470fa2': 'Furnace 3',
    '2eb825bd-b26c-4dc6-90fb-9b8e25bd6418': 'Furnace 4'
};

const AlarmPage = () => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [alarms, setAlarms] = useState([]);
    const [calendarData, setCalendarData] = useState({});
    const [loading, setLoading] = useState(false);
    const [selectedInstance, setSelectedInstance] = useState('40ce6095-84c2-49a5-b5aa-c2f37ebdd40c');

    const calendarYear = new Date().getFullYear();

    const processAlarms = (data) => {
        // Group alarms by UUID
        const alarmGroups = data.reduce((acc, alarm) => {
            if (!acc[alarm.uuid]) {
                acc[alarm.uuid] = [];
            }
            acc[alarm.uuid].push(alarm);
            return acc;
        }, {});

        // Filter alarms based on the requirements
        const filteredAlarms = [];
        Object.values(alarmGroups).forEach(group => {
            if (group.length === 2) {
                // If there are two alarms with the same UUID
                const activeAlarm = group.find(a => a.isactive === true);
                const inactiveAlarm = group.find(a => a.isactive === false);
                if (activeAlarm && inactiveAlarm) {
                    // If one is active and one is inactive, show only the inactive one
                    filteredAlarms.push(inactiveAlarm);
                }
            } else if (group.length === 1 && group[0].isactive === true) {
                // If there's only one alarm and it's active, show it
                filteredAlarms.push(group[0]);
            }
        });

        return filteredAlarms;
    };

    const fetchAlarms = async () => {
        setLoading(true);
        try {
            const params = {
                tenantId: 'ff0d9ff0-2bec-4085-b084-59f9af315f89',
                instanceId: selectedInstance,
                limit: 1000
            };
            const data = await getAlarmsData(params);
            const filteredData = processAlarms(data);
            setAlarms(filteredData);
            processCalendarData(filteredData);
        } catch (error) {
            console.error('Error fetching alarms:', error);
        } finally {
            setLoading(false);
        }
    };

    const processCalendarData = (data) => {
        const calData = {};
        for (let month = 0; month < 12; month++) {
            const daysInMonth = new Date(currentYear, month + 1, 0).getDate();
            calData[MONTHS[month]] = Array(daysInMonth).fill().map(() => ({
                high: 0,
                medium: 0,
                low: 0,
                date: new Date(currentYear, month, 0).getDate()
            }));
        }

        data.forEach(alarm => {
            const date = new Date(alarm.timestamp);
            if (date.getFullYear() === currentYear) {
                const month = MONTHS[date.getMonth()];
                const day = date.getDate() - 1;
                if (calData[month] && calData[month][day]) {
                    if (alarm.serverity === "HIGH") {
                        calData[month][day].high++;
                    } else if (alarm.serverity === "MEDIUM") {
                        calData[month][day].medium++;
                    } else {
                        calData[month][day].low++;
                    }
                    calData[month][day].date = date;
                }
            }
        });
        setCalendarData(calData);
    };

    const formatDateTime = (dateTimeStr) => {
        if (!dateTimeStr || dateTimeStr.startsWith('0001-01-01')) {
            return '';
        }
        return new Date(dateTimeStr).toLocaleString();
    };

    const formatDate = (date) => {
        return date instanceof Date ? date.toLocaleDateString() : '';
    };

    useEffect(() => {
        fetchAlarms();
    }, [currentYear, selectedInstance]);

    const getStatusColor = (counts) => {
        if (counts.high > 0) return 'bg-red-700';
        if (counts.medium > 0) return 'bg-red-500';
        if (counts.low > 0) return 'bg-red-400';
        return 'bg-gray-200';
    };

    const tableHeaders = [
        // { key: 'timestamp', label: 'Timestamp' },
        { key: 'instanceid', label: 'Instance ID' },
        { key: 'alarmtypeid', label: 'Alarm Type ID' },
        { key: 'alarmlabel', label: 'Alarm Label' },
        { key: 'isactive', label: 'Is Active' },
        { key: 'duration', label: 'Duration' },
        { key: 'starttime', label: 'Start Time' },
        { key: 'endtime', label: 'End Time' },
        { key: 'serverity', label: 'Severity' },
        // { key: 'uuid', label: 'Alarm InstanceId' }
    ];

    const exportToCSV = () => {
        const headers = tableHeaders.map((header) => header.label).join(',');
        const rows = alarms.map(alarm =>
            tableHeaders.map(header => `"${alarm[header.key] || ''}"`).join(',')
        );
        const csvContent = [headers, ...rows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `alarms_data.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="p-4 bg-gray-50 overflow-auto">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-2xl px-4 font-semibold">Alarms in {currentYear}</h1>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentYear(prev => prev - 1)}
                            className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            onClick={() => setCurrentYear(prev => prev + 1)}
                            disabled={currentYear >= calendarYear}
                            // className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                            className={`p-1 rounded transition-colors ${currentYear >= calendarYear
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600 text-white'
                                }`}
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
                {/* Calendar View */}
                <div className="border rounded-lg bg-white p-4 shadow-sm">
                    <div className="grid grid-cols-12 gap-2">
                        {MONTHS.map(month => (
                            <div key={month} className="space-y-1">
                                <div className="text-sm font-semibold text-center text-gray-600">{month}</div>
                                <div className="grid grid-cols-7 gap-1">
                                    {calendarData[month]?.map((day, index) => (
                                        <div
                                            key={index}
                                            className={`${getStatusColor(day)} w-full aspect-square rounded-sm`}
                                            title={`Date: ${formatDate(day.date)}
High: ${day.high}
Medium: ${day.medium}
Low: ${day.low}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Legend */}
                <div className="flex justify-end items-center gap-2 mt-2 text-sm">
                    <span className="text-xs font-semibold">Less</span>
                    <div className="flex gap-1">
                        <div className="w-4 h-4 bg-gray-200 rounded"></div>
                        <div className="w-4 h-4 bg-red-400 rounded"></div>
                        <div className="w-4 h-4 bg-red-600 rounded"></div>
                        <div className="w-4 h-4 bg-red-800 rounded"></div>
                    </div>
                    <span className="text-xs font-semibold">More</span>
                </div>
            </div>

            {/* Alarm Controls */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-8">
                    <h2 className="font-bold text-lg">Alarm Instance:</h2>
                    <select
                        className="w-56 p-3 bg-gray-100 border-b-2 border-blue-400 rounded-md"
                        value={selectedInstance}
                        onChange={(e) => setSelectedInstance(e.target.value)}
                    >
                        {/* <option value="40ce6095-84c2-49a5-b5aa-c2f37ebdd40c">Furnace 1</option>
                        <option value="047c3f09-2be1-4d39-bcd4-f2ac601d5ced">Furnace 2</option>
                        <option value="7e75bcf7-67c8-40db-a0fe-aac0b0470fa2">Furnace 3</option>
                        <option value="2eb825bd-b26c-4dc6-90fb-9b8e25bd6418">Furnace 4</option> */}
                        {Object.entries(INSTANCE_MAPPING).map(([id, name]) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>
                <button onClick={exportToCSV} className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                    <Download size={20} />
                    Export
                </button>
            </div>

            {/* Alarms Table */}
            <div className="rounded overflow-x-auto bg-white shadow-sm border border-gray-400">
                <table className="min-w-full divide-y divide-gray-400">
                    <thead className="bg-gray-300">
                        <tr className="divide-x divide-gray-400">
                            {tableHeaders.map((header) => (
                                <th
                                    key={header.key}
                                    className="px-4 py-2 text-left text-xs font-bold text-black uppercase tracking-wider"
                                >
                                    {header.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-400">
                        {loading ? (
                            <tr>
                                <td colSpan={tableHeaders.length} className="text-center py-4">
                                    Loading...
                                </td>
                            </tr>
                        ) : (
                            alarms.map((alarm, index) => (
                                <tr key={index} className={`divide-x divide-gray-400 ${alarm.isactive ? 'bg-red-300 hover:bg-red-400' : 'bg-gray-200 hover:bg-gray-300'}`}>
                                    {/* <td className="px-4 py-2 text-xs text-gray-900">{formatDateTime(alarm.timestamp)}</td> */}
                                    {/* <td className="px-4 py-2 text-xs text-gray-900">{alarm.timestamp}</td> */}
                                    <td className="px-4 py-2 text-xs text-gray-900">{INSTANCE_MAPPING[alarm.instanceid] || alarm.instanceid}</td>
                                    <td className="px-4 py-2 text-xs text-gray-900">{alarm.alarmtypeid}</td>
                                    <td className="px-4 py-2 text-xs text-gray-900">{alarm.alarmlabel}</td>
                                    <td className="px-4 py-2 text-xs text-gray-900">{alarm.isactive ? 'True' : 'False'}</td>
                                    <td className="px-4 py-2 text-xs text-gray-900">{alarm.duration}</td>
                                    <td className="px-4 py-2 text-xs text-gray-900">{formatDateTime(alarm.starttime)}</td>
                                    <td className="px-4 py-2 text-xs text-gray-900">{formatDateTime(alarm.endtime)}</td>
                                    <td className="px-4 py-2 text-xs text-gray-900">{alarm.serverity}</td>
                                    {/* <td className="px-4 py-2 text-xs text-gray-900">{alarm.uuid}</td> */}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AlarmPage;