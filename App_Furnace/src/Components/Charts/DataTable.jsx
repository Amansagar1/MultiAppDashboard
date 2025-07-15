// "use client";

// import React from 'react';
// import { Download } from 'lucide-react';

// const DataTable = ({ data }) => {
//     const exportData = () => {
//         const headers = ['Title', 'Created Time', 'Duration', 'Type', 'Severity', 'Status'];
//         const csvContent = [
//             headers.join(','),
//             ...data.map(row => [
//                 row.title,
//                 row.createdTime,
//                 row.duration,
//                 row.type,
//                 row.severity,
//                 row.status
//             ].join(','))
//         ].join('\n');

//         const blob = new Blob([csvContent], { type: 'text/csv' });
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'alarms.csv';
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//         window.URL.revokeObjectURL(url);
//     };

//     return (
//         <div className="bg-white rounded-lg shadow-md p-4">
//             <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-lg font-semibold">Data Table</h2>
//                 <button
//                     onClick={exportData}
//                     className="flex items-center border p-2 bg-blue-500 text-white rounded-lg text-sm"
//                 >
//                     <Download className="w-4 h-4 mr-1" />
//                     Export
//                 </button>
//             </div>
//             <div className="overflow-x-auto">
//                 <table className="min-w-full border">
//                     <thead>
//                         <tr className="bg-gray-100 border-b">
//                             <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Title</th>
//                             <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Created Time</th>
//                             <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Duration</th>
//                             <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Type</th>
//                             <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Severity</th>
//                             <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data.map((row, index) => (
//                             <tr key={index} className="border-b">
//                                 <td className="px-6 py-4 text-sm">{row.title}</td>
//                                 <td className="px-6 py-4 text-sm">{row.createdTime}</td>
//                                 <td className="px-6 py-4 text-sm">{row.duration}</td>
//                                 <td className="px-6 py-4 text-sm">{row.type}</td>
//                                 <td className="px-6 py-4 text-sm">
//                                     <span className={`px-2 py-1 rounded-full text-xs ${row.severity === 'CRITICAL' ? 'bg-red-100 text-red-800' :
//                                         row.severity === 'WARNING' ? 'bg-yellow-100 text-yellow-800' :
//                                             'bg-sky-100 text-green-800'
//                                         }`}>
//                                         {row.severity}
//                                     </span>
//                                 </td>
//                                 <td className="px-6 py-4 text-sm">{row.status}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default DataTable;




"use client";
import React from 'react';
import { Download } from 'lucide-react';

const DataTable = ({ data }) => {
    const tableHeaders = [
        { key: 'instanceid', label: 'Instance ID' },
        { key: 'alarmtypeid', label: 'Alarm Type ID' },
        { key: 'alarmlabel', label: 'Alarm Label' },
        { key: 'isactive', label: 'Is Active' },
        { key: 'duration', label: 'Duration' },
        { key: 'starttime', label: 'Start Time' },
        { key: 'endtime', label: 'End Time' },
        { key: 'serverity', label: 'Severity' },
    ];

    const formatDateTime = (dateTimeStr) => {
        if (!dateTimeStr || dateTimeStr.startsWith('0001-01-01')) {
            return '';
        }
        return new Date(dateTimeStr).toLocaleString();
    };

    const exportData = () => {
        const headers = tableHeaders.map(header => header.label);
        const csvContent = [
            headers.join(','),
            ...data.map(row => tableHeaders.map(header =>
                header.key === 'starttime' || header.key === 'endtime'
                    ? formatDateTime(row[header.key])
                    : row[header.key]
            ).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'alarms.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Recent Alarms</h2>
                <button
                    onClick={exportData}
                    className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                    <Download className="w-4 h-4" />
                    Export
                </button>
            </div>
            <div style={{ maxHeight: '400px' }} className="max-h-[20px] overflow-auto rounded shadow-md border border-gray-400">
                <table className="min-w-full divide-y divide-gray-400">
                    <thead className="bg-gray-300">
                        <tr className="divide-x divide-gray-400">
                            {tableHeaders.map((header) => (
                                <th
                                    key={header.key}
                                    className="px-4 py-2 text-left text-xs font-extrabold text-black uppercase tracking-wider"
                                >
                                    {header.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-400">
                        {data.map((row, index) => (
                            <tr
                                key={index}
                                className={`divide-x divide-gray-400 ${row.isactive ? 'bg-red-300 hover:bg-red-400' : 'bg-gray-200 hover:bg-gray-300'
                                    }`}
                            >
                                <td className="px-4 py-2 text-xs text-gray-900">{row.instanceid}</td>
                                <td className="px-4 py-2 text-xs text-gray-900">{row.alarmtypeid}</td>
                                <td className="px-4 py-2 text-xs text-gray-900">{row.alarmlabel}</td>
                                <td className="px-4 py-2 text-xs text-gray-900">{row.isactive ? 'True' : 'False'}</td>
                                <td className="px-4 py-2 text-xs text-gray-900">{row.duration}</td>
                                <td className="px-4 py-2 text-xs text-gray-900">{formatDateTime(row.starttime)}</td>
                                <td className="px-4 py-2 text-xs text-gray-900">{formatDateTime(row.endtime)}</td>
                                <td className="px-4 py-2 text-xs text-gray-900">{row.serverity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTable;