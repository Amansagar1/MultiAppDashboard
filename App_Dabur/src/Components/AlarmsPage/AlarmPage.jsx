"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { getAlarmsData } from '@/WebServices/ApiControllers';
import Cookies from 'js-cookie';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const ROWS_PER_PAGE = 14;

const INSTANCE_MAPPING = {
    '39ff4795-63f7-4c3c-afe5-90d5133115d7': 'Amla line-4 main line',
    '27ab18b6-152b-4382-8801-dd87b4726418': 'Amla line-4 shrinking line',
    '2e1cc646-e595-4ccc-9638-c5a14a1c98c0': 'Amla line-6 main line',
    'bea95977-dba1-4d88-8ef2-b787102f379e': 'Amla line-6 shrinking line'
};

const AlarmPage = () => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [alarms, setAlarms] = useState([]);
    const [calendarData, setCalendarData] = useState({});
    const [loading, setLoading] = useState(false);
    const [selectedInstance, setSelectedInstance] = useState('39ff4795-63f7-4c3c-afe5-90d5133115d7');
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredAlarms, setFilteredAlarms] = useState([]);

    const calendarYear = new Date().getFullYear();

    const processAlarms = (data) => {
        const alarmGroups = data.reduce((acc, alarm) => {
            if (!acc[alarm.uuid]) {
                acc[alarm.uuid] = [];
            }
            acc[alarm.uuid].push(alarm);
            return acc;
        }, {});

        const processedAlarms = [];
        Object.values(alarmGroups).forEach(group => {
            if (group.length === 2) {
                const activeAlarm = group.find(a => a.isactive === true);
                const inactiveAlarm = group.find(a => a.isactive === false);
                if (activeAlarm && inactiveAlarm) {
                    processedAlarms.push(inactiveAlarm);
                }
            } else if (group.length === 1 && group[0].isactive === true) {
                processedAlarms.push(group[0]);
            }
        });

        return processedAlarms;
    };

    const formatDateTime = (dateTimeStr) => {
        if (!dateTimeStr || dateTimeStr.startsWith('0001-01-01')) {
            return '';
        }

        try {
            const utcDate = new Date(dateTimeStr);

            return utcDate.toLocaleString('en-US', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true,
                // timeZoneName: 'short'
            }).replace(/\s(AM|PM)/, ' $1');
        } catch (error) {
            console.error('Error formatting date:', error);
            return '';
        }
    };

    const formatDate = (date) => {
        if (!date) return '';
        try {
            return date instanceof Date
                ? date.toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour12: true,
                    timeZoneName: 'short'
                }).split(',')[0]
                : '';
        } catch (error) {
            console.error('Error formatting date:', error);
            return '';
        }
    };

    const fetchAlarms = async () => {
        setLoading(true);
        try {
            const tenantId = Cookies.get("tenantId");
            const params = {
                tenantId: tenantId,
                instanceId: selectedInstance,
                limit: 1000
            };
            const data = await getAlarmsData(params);
            const processedData = processAlarms(data);
            setAlarms(processedData);
            setFilteredAlarms(processedData.filter(alarm => alarm.instanceid === selectedInstance));
            processCalendarData(processedData);
            setCurrentPage(1);
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
                date: new Date(currentYear, month, 0)
            }));
        }

        data.forEach(alarm => {
            const date = new Date(alarm.timestamp);
            const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

            if (localDate.getFullYear() === currentYear) {
                const month = MONTHS[localDate.getMonth()];
                const day = localDate.getDate() - 1;
                if (calData[month] && calData[month][day]) {
                    if (alarm.serverity === "HIGH") {
                        calData[month][day].high++;
                    } else if (alarm.serverity === "MEDIUM") {
                        calData[month][day].medium++;
                    } else {
                        calData[month][day].low++;
                    }
                    calData[month][day].date = localDate;
                }
            }
        });
        setCalendarData(calData);
    };

    const formatDuration = (minutes) => {
        if (!minutes) return '';
        const totalMinutes = Math.floor(Number(minutes));
        const hours = Math.floor(totalMinutes / 60);
        const remainingMinutes = totalMinutes % 60;
        return `${hours} : ${remainingMinutes.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        fetchAlarms();
    }, [currentYear, selectedInstance]);

    const totalPages = Math.ceil(filteredAlarms.length / ROWS_PER_PAGE);
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;
    const currentAlarms = filteredAlarms.slice(startIndex, endIndex);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const getStatusColor = (counts) => {
        if (counts.high > 0) return 'bg-red-700';
        if (counts.medium > 0) return 'bg-red-500';
        if (counts.low > 0) return 'bg-red-400';
        return 'bg-gray-200';
    };

    const tableHeaders = [
        { key: 'timestamp', label: 'Timestamp' },
        { key: 'instanceid', label: 'Instance ID' },
        { key: 'alarmtypeid', label: 'Alarm Type ID' },
        { key: 'alarmlabel', label: 'Alarm Label' },
        { key: 'isactive', label: 'Is Active' },
        { key: 'duration', label: 'Duration (HH:MM)' },
        { key: 'starttime', label: 'Start Time' },
        { key: 'endtime', label: 'End Time' },
        { key: 'serverity', label: 'Severity' },
    ];

    const exportToCSV = () => {
        const headers = tableHeaders.map((header) => header.label).join(',');
        const rows = filteredAlarms.map(alarm =>
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
        <div className=" w-full h-full p-2 bg-gradient-to-br from-blue-50 to-gray-100 overflow-auto">
            {/* Header Section */}
            <div className="mb-4">
                <div className="flex justify-between items-center px-4 mb-2">
                    <h1 className="text-2xl text-gray-700 font-semibold">Alarms in {currentYear}</h1>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentYear(prev => prev - 1)}
                            className="p-1  bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            onClick={() => setCurrentYear(prev => prev + 1)}
                            disabled={currentYear >= calendarYear}
                            className={`p-1 text-gray-700  rounded transition-colors ${currentYear >= calendarYear
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
                    <span className="text-xs text-gray-700  font-semibold">Less</span>
                    <div className="flex gap-1">
                        <div className="w-4 h-4 bg-gray-200 rounded"></div>
                        <div className="w-4 h-4 bg-red-400 rounded"></div>
                        <div className="w-4 h-4 bg-red-600 rounded"></div>
                        <div className="w-4 h-4 bg-red-800 rounded"></div>
                    </div>
                    <span className="text-xs text-gray-700  font-semibold">More</span>
                </div>
            </div>

            {/* Alarm Controls */}
            <div className="flex justify-between items-center px-4 mb-2">
                <div className="flex items-center gap-8">
                    <h2 className="font-bold text-gray-700 text-lg">Production Line:</h2>
                    <select
                        className="w-56 p-3 text-gray-700 bg-gray-200 border-b-2 border-blue-400 rounded-md"
                        value={selectedInstance}
                        onChange={(e) => setSelectedInstance(e.target.value)}
                    >
                        {Object.entries(INSTANCE_MAPPING).map(([id, name]) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>
                <button onClick={exportToCSV} className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-600 transition-colors">
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
                                    <div className="flex justify-center items-center p-4">
                                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            currentAlarms.map((alarm, index) => (
                                <tr key={index} className={`divide-x divide-gray-400 ${alarm.isactive ? 'bg-red-300 hover:bg-red-400' : 'bg-gray-200 hover:bg-gray-300'}`}>
                                    <td className="px-4 py-2 text-xs text-gray-900">{formatDateTime(alarm.timestamp)}</td>
                                    <td className="px-4 py-2 text-xs text-gray-900">{INSTANCE_MAPPING[alarm.instanceid] || alarm.instanceid}</td>
                                    <td className="px-4 py-2 text-xs text-gray-900">{alarm.alarmtypeid}</td>
                                    <td className="px-4 py-2 text-xs text-gray-900">{alarm.alarmlabel}</td>
                                    <td className="px-4 py-2 text-xs text-gray-900">{alarm.isactive ? 'True' : 'False'}</td>
                                    <td className="px-4 py-2 text-xs text-gray-900">{formatDuration(alarm.duration)}</td>
                                    <td className="px-4 py-2 text-xs text-gray-900">{formatDateTime(alarm.starttime)}</td>
                                    <td className="px-4 py-2 text-xs text-gray-900">{formatDateTime(alarm.endtime)}</td>
                                    <td className="px-4 py-2 text-xs text-gray-900">{alarm.serverity}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="flex justify-center items-center p-2 border-t border-gray-400">
                    <div className="flex gap-2 items-center">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className={`p-1 text-gray-700  rounded transition-colors ${currentPage === 1
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600 text-white'
                                }`}
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <span className="text-sm text-gray-600">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage >= totalPages}
                            className={`p-1 text-gray-700  rounded transition-colors ${currentPage >= totalPages
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600 text-white'
                                }`}
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlarmPage;