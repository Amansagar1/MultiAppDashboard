// "use client";
// import React, { useState, useEffect, useRef } from 'react';
// import Cookies from 'js-cookie';
// import Pagination from './pagination';
// import { getHistorialData, getAllDataModels } from '../../WebServices/ApiControllers';
// import { Download, Filter, RefreshCw, ChevronDown, Check } from 'lucide-react';

// const ReportPage = () => {
//     const [filters, setFilters] = useState({
//         instanceId: '',
//         selectedVariables: [],
//         from: '',
//         to: '',
//         frequency: 'hour',
//     });

//     const [uiFilters, setUiFilters] = useState({
//         parameters: '',
//         shift: '',
//     });

//     const [isVariableDropdownOpen, setIsVariableDropdownOpen] = useState(false);
//     const dropdownRef = useRef(null);

//     const variableOptions = [
//         'LPG_LINE_A_PRESS', 'LPG_LINE_B_PRESS', 'VAP_PRIM_PRESS', 'LIQ_TRAP',
//         'P_GAS_LINE_A_HP', 'P_GAS_LINE_B_HP', 'GAS_FLW_RATE', 'BUNR_1_PRV_PRES',
//         'BUNR_2_PRV_PRES', 'BUNR_3_PRV_PRES', 'BUNR_4_PRV_PRES', 'AIR_FLOW_RPM',
//         'FUR_DOOR_STATUS', 'TRO_MOV', 'RTD_1_BTM_TEMP', 'RTD_2_BTM_TEMP',
//         'RTD_3_BTM_TEMP', 'RTD_4_BTM_TEMP', 'RTD_5_BTM_TEMP', 'RTD_6_BTM_TEMP',
//         'RTD_6_TOP_TEMP', 'RTD_5_TOP_TEMP', 'RTD_4_TOP_TEMP', 'RTD_3_TOP_TEMP',
//         'RTD_2_TOP_TEMP', 'RTD_1_TOP_TEMP'
//     ];

//     const frequencyOptions = [
//         { value: 'second', label: 'Second' },
//         { value: 'minute', label: 'Minute' },
//         { value: 'hour', label: 'Hour' },
//         { value: 'day', label: 'Day' }
//     ];

//     const [responseData, setResponseData] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const itemsPerPage = 100;

//     // Handle click outside dropdown
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setIsVariableDropdownOpen(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => document.removeEventListener('mousedown', handleClickOutside);
//     }, []);

//     const transformDataForTable = (data) => {
//         if (!Array.isArray(data) || data.length === 0) return { headers: [], rows: [] };

//         // Group data by timestamp
//         const groupedData = data.reduce((acc, item) => {
//             const timestamp = item.timestamp;
//             if (!acc[timestamp]) {
//                 acc[timestamp] = {};
//             }
//             acc[timestamp][item.variable] = item.value;
//             return acc;
//         }, {});

//         // Create headers (selected variables)
//         const headers = ['Timestamp', ...filters.selectedVariables];

//         // Create rows
//         const rows = Object.entries(groupedData).map(([timestamp, values]) => {
//             return [
//                 timestamp,
//                 ...filters.selectedVariables.map(variable => values[variable] || '-')
//             ];
//         });

//         // Sort rows by timestamp
//         rows.sort((a, b) => new Date(a[0]) - new Date(b[0]));

//         return { headers, rows };
//     };

//     const handleVariableSelection = (variable) => {
//         setFilters(prev => {
//             const selectedVariables = prev.selectedVariables.includes(variable)
//                 ? prev.selectedVariables.filter(v => v !== variable)
//                 : [...prev.selectedVariables, variable];
//             return { ...prev, selectedVariables };
//         });
//     };

//     const handleSelectAllVariables = () => {
//         setFilters(prev => ({
//             ...prev,
//             selectedVariables: prev.selectedVariables.length === variableOptions.length ? [] : [...variableOptions]
//         }));
//     };

//     const downloadCSV = () => {
//         if (!responseData || !responseData.rows.length) return;

//         const csvHeader = responseData.headers.join(',') + '\n';
//         const csvRows = responseData.rows.map(row =>
//             row.map(cell => {
//                 if (cell && cell.toString().includes(',')) {
//                     return `"${cell}"`;
//                 }
//                 return cell;
//             }).join(',')
//         ).join('\n');
//         const csvContent = csvHeader + csvRows;

//         const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//         const link = document.createElement('a');
//         const url = URL.createObjectURL(blob);

//         link.setAttribute('href', url);
//         link.setAttribute('download', 'data.csv');
//         link.style.visibility = 'hidden';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };

//     const handleSubmit = async () => {
//         if (filters.selectedVariables.length === 0) {
//             setError("Please select at least one variable");
//             return;
//         }

//         setLoading(true);
//         setError(null);
//         const tenantId = Cookies.get("tenantId");

//         if (!tenantId) {
//             setError("No tenantId found");
//             setLoading(false);
//             return;
//         }

//         try {
//             const promises = filters.selectedVariables.map(variable =>
//                 getHistorialData({
//                     tenantId,
//                     ...filters,
//                     variable,
//                     limit: 10000
//                 })
//             );

//             const results = await Promise.all(promises);
//             const flattenedData = results.flat();
//             const transformedData = transformDataForTable(flattenedData);

//             setResponseData(transformedData);
//             setTotalPages(Math.ceil(transformedData.rows.length / itemsPerPage));
//             setCurrentPage(1);
//         } catch (error) {
//             setError("Error fetching data");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const currentPageData = responseData ? {
//         headers: responseData.headers,
//         rows: responseData.rows.slice(
//             (currentPage - 1) * itemsPerPage,
//             currentPage * itemsPerPage
//         )
//     } : null;



//     return (
//         <div className="min-h-screen bg-gray-50">
//             <div className="bg-white shadow-lg rounded-lg">
//                 <div className="p-4">
//                     {error && (
//                         <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
//                             {error}
//                         </div>
//                     )}

//                     {/* Filters Section */}
//                     <div className="space-y-6">
//                         <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
//                             {/* Instance ID */}
//                             <div className="space-y-2">
//                                 <label className="block text-sm font-semibold text-gray-700">Instance ID</label>
//                                 <select
//                                     className="w-full p-3 bg-gray-100 border-b-2 border-blue-400 rounded-md"
//                                     value={filters.instanceId}
//                                     onChange={(e) => setFilters(prev => ({ ...prev, instanceId: e.target.value }))}
//                                 >
//                                     <option value="">Select instanceId</option>
//                                     <option value="40ce6095-84c2-49a5-b5aa-c2f37ebdd40c">Furnace 1</option>
//                                     <option value="047c3f09-2be1-4d39-bcd4-f2ac601d5ced">Furnace 2</option>
//                                     <option value="7e75bcf7-67c8-40db-a0fe-aac0b0470fa2">Furnace 3</option>
//                                     <option value="2eb825bd-b26c-4dc6-90fb-9b8e25bd6418">Furnace 4</option>
//                                 </select>
//                             </div>

//                             {/* Variable Selection Dropdown */}
//                             <div className="space-y-2 relative" ref={dropdownRef}>
//                                 <label className="block text-sm font-semibold text-gray-700">Select Variables</label>
//                                 <div className="relative">
//                                     <button
//                                         type="button"
//                                         className="w-full p-0.5 bg-gray-100 border-b-2 border-blue-400 rounded-md text-left flex justify-between items-center"
//                                         onClick={() => setIsVariableDropdownOpen(!isVariableDropdownOpen)}
//                                     >
//                                         <span className="truncate p-2">
//                                             {filters.selectedVariables.length
//                                                 ? `${filters.selectedVariables.length} variable${filters.selectedVariables.length === 1 ? '' : 's'} selected`
//                                                 : 'Select variables'}
//                                         </span>
//                                         <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isVariableDropdownOpen ? '' : ''}`} />
//                                     </button>

//                                     {isVariableDropdownOpen && (
//                                         <div className="absolute z-10 w-full bg-gray-100 border border-gray-400 rounded-md shadow-lg max-h-96 overflow-y-auto">
//                                             <div className="p-1 border-b border-gray-300">
//                                                 <label className="flex items-center p-2 hover:bg-gray-300 rounded cursor-pointer">
//                                                     <input
//                                                         type="checkbox"
//                                                         className="form-checkbox h-4 w-4 text-blue-600 rounded"
//                                                         checked={filters.selectedVariables.length === variableOptions.length}
//                                                         onChange={handleSelectAllVariables}
//                                                     />
//                                                     <span className="ml-2 text-sm font-medium text-gray-700">
//                                                         {filters.selectedVariables.length === variableOptions.length
//                                                             ? 'Deselect All'
//                                                             : 'Select All'}
//                                                     </span>
//                                                 </label>
//                                             </div>
//                                             <div className="py-1">
//                                                 {variableOptions.map(variable => (
//                                                     <label
//                                                         key={variable}
//                                                         className="flex items-center p-2 hover:bg-gray-300 cursor-pointer"
//                                                     >
//                                                         <input
//                                                             type="checkbox"
//                                                             checked={filters.selectedVariables.includes(variable)}
//                                                             onChange={() => handleVariableSelection(variable)}
//                                                             className="form-checkbox h-4 w-4 text-blue-600 rounded"
//                                                         />
//                                                         <span className="ml-2 text-sm text-gray-700">{variable}</span>
//                                                     </label>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Parameters */}
//                             <div className="space-y-2">
//                                 <label className="block text-sm font-semibold text-gray-700">Parameters</label>
//                                 <select
//                                     className="w-full p-3 bg-gray-100 border-b-2 border-blue-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                                     value={uiFilters.parameters}
//                                     onChange={(e) => handleFilterChange('parameters', e.target.value)}
//                                 >
//                                     <option value="">Select Parameters</option>
//                                     <option value="param1">Parameter 1</option>
//                                     <option value="param2">Parameter 2</option>
//                                 </select>
//                             </div>

//                             {/* Shift */}
//                             <div className="space-y-2">
//                                 <label className="block text-sm font-semibold text-gray-700">Shift</label>
//                                 <select
//                                     className="w-full p-3 bg-gray-100 border-b-2 border-blue-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                                     value={uiFilters.shift}
//                                     onChange={(e) => handleFilterChange('shift', e.target.value)}
//                                 >
//                                     <option value="">Select Shift</option>
//                                     <option value="Shift 1">Shift 1</option>
//                                     <option value="Shift 2">Shift 2</option>
//                                     <option value="Shift 3">Shift 3</option>
//                                 </select>
//                             </div>

//                             {/* Frequency */}
//                             <div className="space-y-2">
//                                 <label className="block text-sm font-semibold text-gray-700">Frequency</label>
//                                 <select
//                                     className="w-full p-3 bg-gray-100 border-b-2 border-blue-400 rounded-md"
//                                     value={filters.frequency}
//                                     onChange={(e) => setFilters(prev => ({ ...prev, frequency: e.target.value }))}
//                                 >
//                                     {frequencyOptions.map(option => (
//                                         <option key={option.value} value={option.value}>
//                                             {option.label}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>

//                             {/* Date Range */}
//                             <div className="space-y-2">
//                                 <label className="block text-sm font-semibold text-gray-700">Start Date</label>
//                                 <input
//                                     type="date"
//                                     className="w-full p-2.5 bg-gray-100 border-b-2 border-blue-400 rounded-md"
//                                     value={filters.from}
//                                     onChange={(e) => setFilters(prev => ({ ...prev, from: e.target.value }))}
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="block text-sm font-semibold text-gray-700">End Date</label>
//                                 <input
//                                     type="date"
//                                     className="w-full p-2.5 bg-gray-100 border-b-2 border-blue-400 rounded-md"
//                                     value={filters.to}
//                                     onChange={(e) => setFilters(prev => ({ ...prev, to: e.target.value }))}
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex justify-end gap-4 mt-6">
//                         <button
//                             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                             onClick={handleSubmit}
//                             disabled={loading}
//                         >
//                             {loading ? (
//                                 <RefreshCw className="h-4 w-4 animate-spin" />
//                             ) : (
//                                 <Filter className="h-4 w-4" />
//                             )}
//                             {loading ? "Loading..." : "Apply Filters"}
//                         </button>
//                         <button
//                             className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//                             onClick={downloadCSV}
//                             disabled={!responseData || responseData.rows.length === 0}
//                         >
//                             <Download className="h-4 w-4" />
//                             Download CSV
//                         </button>
//                     </div>

//                     {/* Table Section */}
//                     {currentPageData && (
//                         <div className="mt-6 overflow-x-auto">
//                             <div className="inline-block min-w-full align-middle">
//                                 <div className="overflow-hidden border border-gray-400">
//                                     <table className="min-w-screen divide-y divide-gray-400">
//                                         <thead className="bg-gray-200">
//                                             <tr className='divide-x divide-gray-400'>
//                                                 {currentPageData.headers.map((header, index) => (
//                                                     <th
//                                                         key={index}
//                                                         className="px-6 py-2 text-left text-xs font-bold text-black uppercase tracking-wider whitespace-nowrap"
//                                                     >
//                                                         {header}
//                                                     </th>
//                                                 ))}
//                                             </tr>
//                                         </thead>
//                                         <tbody className="bg-white divide-y divide-gray-400">
//                                             {currentPageData.rows.map((row, rowIndex) => (
//                                                 <tr key={rowIndex} className="hover:bg-gray-100 divide-x divide-gray-400 ">
//                                                     {row.map((cell, cellIndex) => (
//                                                         <td
//                                                             key={cellIndex}
//                                                             className="px-6 py-2 whitespace-nowrap font-medium text-xs text-black"
//                                                         >
//                                                             {typeof cell === 'number' ? cell.toFixed(2) : cell}
//                                                         </td>
//                                                     ))}
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* Pagination */}
//                     {responseData && responseData.rows.length > 0 && (
//                         <div className="mt-1">
//                             <Pagination
//                                 currentPage={currentPage}
//                                 totalPages={totalPages}
//                                 onPageChange={setCurrentPage}
//                                 dataToDownload={responseData.rows}
//                             />
//                         </div>
//                     )}

//                     {responseData && responseData.rows.length === 0 && (
//                         <div className="text-center py-8">
//                             <p className="text-gray-500">No data available.</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ReportPage;




"use client";
import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import Pagination from './pagination';
// import { getHistorialData, getAllDataModels } from '../../WebServices/ApiControllers';
import { Download, Filter, RefreshCw, ChevronDown } from 'lucide-react';

const ReportPage = () => {
    const [filters, setFilters] = useState({
        instanceId: '',
        selectedVariables: [],
        from: '',
        to: '',
        frequency: 'hour',
    });

    const [uiFilters, setUiFilters] = useState({
        parameters: '',
        shift: '',
    });

    const [variableOptions, setVariableOptions] = useState([]);
    const [isVariableDropdownOpen, setIsVariableDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const frequencyOptions = [
        { value: 'second', label: 'Second' },
        { value: 'minute', label: 'Minute' },
        { value: 'hour', label: 'Hour' },
        { value: 'day', label: 'Day' }
    ];

    const [responseData, setResponseData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 100;

    // Fetch variables from API
    useEffect(() => {
        const fetchVariables = async () => {
            try {
                const tenantId = Cookies.get("tenantId");
                if (!tenantId) {
                    setError("No tenantId found");
                    return;
                }

                const response = await getAllDataModels(tenantId);

                // Find the model with matching classModel
                const furnaceModel = response.find(
                    model => model.classModel === "digitalsybc.cm.furnace.datamodel"
                );

                if (furnaceModel && furnaceModel.configuration && furnaceModel.configuration.variables) {
                    // Extract variable names from the configuration
                    const variables = furnaceModel.configuration.variables
                        .map(v => v.variable)
                        .filter(Boolean); // Remove any undefined/null values

                    setVariableOptions(variables);
                }
            } catch (error) {
                setError("Error fetching variables");
                console.error("Error fetching variables:", error);
            }
        };

        fetchVariables();
    }, []);

    // Handle click outside dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsVariableDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const transformDataForTable = (data) => {
        if (!Array.isArray(data) || data.length === 0) return { headers: [], rows: [] };

        // Group data by timestamp
        const groupedData = data.reduce((acc, item) => {
            const timestamp = item.timestamp;
            if (!acc[timestamp]) {
                acc[timestamp] = {};
            }
            acc[timestamp][item.variable] = item.value;
            return acc;
        }, {});

        // Create headers (selected variables)
        const headers = ['Timestamp', ...filters.selectedVariables];

        // Create rows
        const rows = Object.entries(groupedData).map(([timestamp, values]) => {
            return [
                timestamp,
                ...filters.selectedVariables.map(variable => values[variable] || '-')
            ];
        });

        // Sort rows by timestamp
        rows.sort((a, b) => new Date(a[0]) - new Date(b[0]));

        return { headers, rows };
    };

    const handleVariableSelection = (variable) => {
        setFilters(prev => {
            const selectedVariables = prev.selectedVariables.includes(variable)
                ? prev.selectedVariables.filter(v => v !== variable)
                : [...prev.selectedVariables, variable];
            return { ...prev, selectedVariables };
        });
    };

    const handleSelectAllVariables = () => {
        setFilters(prev => ({
            ...prev,
            selectedVariables: prev.selectedVariables.length === variableOptions.length ? [] : [...variableOptions]
        }));
    };

    const handleFilterChange = (filterName, value) => {
        setUiFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
    };

    const downloadCSV = () => {
        if (!responseData || !responseData.rows.length) return;

        const csvHeader = responseData.headers.join(',') + '\n';
        const csvRows = responseData.rows.map(row =>
            row.map(cell => {
                if (cell && cell.toString().includes(',')) {
                    return `"${cell}"`;
                }
                return cell;
            }).join(',')
        ).join('\n');
        const csvContent = csvHeader + csvRows;

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', 'data.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleSubmit = async () => {
        if (filters.selectedVariables.length === 0) {
            setError("Please select at least one variable");
            return;
        }

        setLoading(true);
        setError(null);
        const tenantId = Cookies.get("tenantId");

        if (!tenantId) {
            setError("No tenantId found");
            setLoading(false);
            return;
        }

        try {
            const promises = filters.selectedVariables.map(variable =>
                getHistorialData({
                    tenantId,
                    ...filters,
                    variable,
                    limit: 10000
                })
            );

            const results = await Promise.all(promises);
            const flattenedData = results.flat();
            const transformedData = transformDataForTable(flattenedData);

            setResponseData(transformedData);
            setTotalPages(Math.ceil(transformedData.rows.length / itemsPerPage));
            setCurrentPage(1);
        } catch (error) {
            setError("Error fetching data");
        } finally {
            setLoading(false);
        }
    };

    const currentPageData = responseData ? {
        headers: responseData.headers,
        rows: responseData.rows.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        )
    } : null;

    return (
        <div className="min-h-screen min-w-screen">
            <div className="bg-white shadow-lg rounded-lg">
                <div className="p-4">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
                            {error}
                        </div>
                    )}

                    {/* Filters Section */}
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                            {/* Instance ID */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Instance ID</label>
                                <select
                                    className="w-full p-3 bg-gray-100 border-b-2 border-blue-400 rounded-md"
                                    value={filters.instanceId}
                                    onChange={(e) => setFilters(prev => ({ ...prev, instanceId: e.target.value }))}
                                >
                                    <option value="">Select instanceId</option>
                                    <option value="40ce6095-84c2-49a5-b5aa-c2f37ebdd40c">Furnace 1</option>
                                    <option value="047c3f09-2be1-4d39-bcd4-f2ac601d5ced">Furnace 2</option>
                                    <option value="7e75bcf7-67c8-40db-a0fe-aac0b0470fa2">Furnace 3</option>
                                    <option value="2eb825bd-b26c-4dc6-90fb-9b8e25bd6418">Furnace 4</option>
                                </select>
                            </div>

                            {/* Variable Selection Dropdown */}
                            <div className="space-y-2 relative" ref={dropdownRef}>
                                <label className="block text-sm font-semibold text-gray-700">Select Variables</label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        className="w-full p-0.5 bg-gray-100 border-b-2 border-blue-400 rounded-md text-left flex justify-between items-center"
                                        onClick={() => setIsVariableDropdownOpen(!isVariableDropdownOpen)}
                                    >
                                        <span className="truncate p-2">
                                            {filters.selectedVariables.length
                                                ? `${filters.selectedVariables.length} variable${filters.selectedVariables.length === 1 ? '' : 's'} selected`
                                                : 'Select variables'}
                                        </span>
                                        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isVariableDropdownOpen ? '' : ''}`} />
                                    </button>

                                    {isVariableDropdownOpen && (
                                        <div className="absolute z-10 w-full bg-gray-100 border border-gray-400 rounded-md shadow-lg max-h-96 overflow-y-auto">
                                            <div className="p-1 border-b border-gray-300">
                                                <label className="flex items-center p-2 hover:bg-gray-300 rounded cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox h-4 w-4 text-blue-600 rounded"
                                                        checked={filters.selectedVariables.length === variableOptions.length}
                                                        onChange={handleSelectAllVariables}
                                                    />
                                                    <span className="ml-2 text-sm font-medium text-gray-700">
                                                        {filters.selectedVariables.length === variableOptions.length
                                                            ? 'Deselect All'
                                                            : 'Select All'}
                                                    </span>
                                                </label>
                                            </div>
                                            <div className="py-1">
                                                {variableOptions.map(variable => (
                                                    <label
                                                        key={variable}
                                                        className="flex items-center p-2 hover:bg-gray-300 cursor-pointer"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={filters.selectedVariables.includes(variable)}
                                                            onChange={() => handleVariableSelection(variable)}
                                                            className="form-checkbox h-4 w-4 text-blue-600 rounded"
                                                        />
                                                        <span className="ml-2 text-sm text-gray-700">{variable}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Parameters */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Parameters</label>
                                <select
                                    className="w-full p-3 bg-gray-100 border-b-2 border-blue-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    value={uiFilters.parameters}
                                    onChange={(e) => handleFilterChange('parameters', e.target.value)}
                                >
                                    <option value="">Select Parameters</option>
                                    <option value="param1">Parameter 1</option>
                                    <option value="param2">Parameter 2</option>
                                </select>
                            </div>

                            {/* Shift */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Shift</label>
                                <select
                                    className="w-full p-3 bg-gray-100 border-b-2 border-blue-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    value={uiFilters.shift}
                                    onChange={(e) => handleFilterChange('shift', e.target.value)}
                                >
                                    <option value="">Select Shift</option>
                                    <option value="Shift 1">Shift 1</option>
                                    <option value="Shift 2">Shift 2</option>
                                    <option value="Shift 3">Shift 3</option>
                                </select>
                            </div>

                            {/* Frequency */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Frequency</label>
                                <select
                                    className="w-full p-3 bg-gray-100 border-b-2 border-blue-400 rounded-md"
                                    value={filters.frequency}
                                    onChange={(e) => setFilters(prev => ({ ...prev, frequency: e.target.value }))}
                                >
                                    {frequencyOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Date Range */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Start Date</label>
                                <input
                                    type="date"
                                    className="w-full p-2.5 bg-gray-100 border-b-2 border-blue-400 rounded-md"
                                    value={filters.from}
                                    onChange={(e) => setFilters(prev => ({ ...prev, from: e.target.value }))}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">End Date</label>
                                <input
                                    type="date"
                                    className="w-full p-2.5 bg-gray-100 border-b-2 border-blue-400 rounded-md"
                                    value={filters.to}
                                    onChange={(e) => setFilters(prev => ({ ...prev, to: e.target.value }))}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? (
                                <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                                <Filter className="h-4 w-4" />
                            )}
                            {loading ? "Loading..." : "Apply Filters"}
                        </button>
                        <button
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            onClick={downloadCSV}
                            disabled={!responseData || responseData.rows.length === 0}
                        >
                            <Download className="h-4 w-4" />
                            Download CSV
                        </button>
                    </div>

                    {/* Table Section */}
                    {currentPageData && (
                        <div className="mt-6 overflow-x-auto">
                            <div className="inline-block min-w-full align-middle">
                                <div className="overflow-hidden border border-gray-400">
                                    <table className="min-w-screen divide-y divide-gray-400">
                                        <thead className="bg-gray-200">
                                            <tr className='divide-x divide-gray-400'>
                                                {currentPageData.headers.map((header, index) => (
                                                    <th
                                                        key={index}
                                                        className="px-6 py-2 text-left text-xs font-bold text-black uppercase tracking-wider whitespace-nowrap"
                                                    >
                                                        {header}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-400">
                                            {currentPageData.rows.map((row, rowIndex) => (
                                                <tr key={rowIndex} className="hover:bg-gray-100 divide-x divide-gray-400">
                                                    {row.map((cell, cellIndex) => (
                                                        <td
                                                            key={cellIndex}
                                                            className="px-6 py-2 whitespace-nowrap font-medium text-xs text-black"
                                                        >
                                                            {typeof cell === 'number' ? cell.toFixed(2) : cell}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Pagination */}
                    {responseData && responseData.rows.length > 0 && (
                        <div className="mt-1">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                                dataToDownload={responseData.rows}
                            />
                        </div>
                    )}

                    {/* No Data Message */}
                    {responseData && responseData.rows.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-gray-500">No data available.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReportPage;