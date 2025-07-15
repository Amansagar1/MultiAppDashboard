// import React, { useState } from 'react';
// import { Download, Filter, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
// import { reportData } from '../../WebServices/ApiControllers';

// const ROWS_PER_PAGE = 15;

// const ReportPage = () => {
//     const [filters, setFilters] = useState({
//         productionLine: '',
//         parameter: '',
//         startDate: '',
//         endDate: ''
//     });

//     const [responseData, setResponseData] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [downloading, setDownloading] = useState(false);
//     const [error, setError] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);

//     // Production line and parameter mapping data remain the same
//     const productionLines = [
//         { id: '39ff4795-63f7-4c3c-afe5-90d5133115d7', name: 'Amla Line-4 Main Line' },
//         { id: '27ab18b6-152b-4382-8801-dd87b4726418', name: 'Amla Line-4 Shrinking Line' },
//         { id: '2e1cc646-e595-4ccc-9638-c5a14a1c98c0', name: 'Amla Line-6 Main Line' },
//         { id: 'bea95977-dba1-4d88-8ef2-b787102f379e', name: 'Amla Line-6 Shrinking Line' }
//     ];

//     const parameters = {
// 'Amla Line-4 Main Line': [
//     { id: '529a2b50-725e-4f24-80b1-63d0f860f0f4', name: 'Voltage' },
//     { id: '39ff4795-63f7-4c3c-afe5-90d5133115d7', name: 'Current' },
//     { id: 'a7571dcd-45f1-4c39-966e-edb9f602d1b1', name: 'Active Power' },
//     { id: '4e1dd090-4331-401c-b7a3-c08b4dad38aa', name: 'Power Factor' },
//     { id: 'dec146e7-295c-40d4-903a-6a61a913d824', name: 'Energy Consumption' }
// ],
// 'Amla Line-4 Shrinking Line': [
//     { id: 'ad4d9f65-c957-4e79-a542-d3168c3b98ac', name: 'Voltage' },
//     { id: '27ab18b6-152b-4382-8801-dd87b4726418', name: 'Current' },
//     { id: '5ca2d8b5-92a9-45c1-954a-21be4e6c71fa', name: 'Active Power' },
//     { id: 'e1c04f10-d794-432e-820c-ccd1150340cd', name: 'Power Factor' },
//     { id: '16cf3cdd-ef34-4450-a7ee-2e8222074613', name: 'Energy Consumption' }
// ],
// 'Amla Line-6 Main Line': [
//     { id: 'da3d1725-1dd6-43c2-ba80-c1fdbcf48803', name: 'Voltage' },
//     { id: '2e1cc646-e595-4ccc-9638-c5a14a1c98c0', name: 'Current' },
//     { id: 'f4ea26be-9005-46ac-acd8-351dd64b262e', name: 'Active Power' },
//     { id: '1315ba67-957e-4a81-86ec-375450c090ce', name: 'Power Factor' },
//     { id: '9e2283dd-81e4-47fd-9e37-8aa2db631bac', name: 'Energy Consumption' }
// ],
// 'Amla Line-6 Shrinking Line': [
//     { id: '0cea029d-68fa-4dfa-8faa-586459ae8ea2', name: 'Voltage' },
//     { id: 'bea95977-dba1-4d88-8ef2-b787102f379e', name: 'Current' },
//     { id: '9d62d645-415e-4117-aafc-93eb9a621929', name: 'Active Power' },
//     { id: 'bd7fa5c7-3648-4755-bcc8-df3cb17e0f3c', name: 'Power Factor' },
//     { id: '5bab2ed3-77f2-458e-84a3-3875286154a3', name: 'Energy Consumption' }
// ]
//     };

//     const handleFilterChange = (name, value) => {
//         setFilters(prev => ({
//             ...prev,
//             [name]: value,
//             ...(name === 'productionLine' && { parameter: '' }) // Reset parameter when production line changes
//         }));
//     };

//     const parseCSVResponse = (response) => {
//         const lines = response.split('\n');
//         const headers = lines[0].split(',');

//         return lines.slice(1).map(line => {
//             const values = line.split(',');
//             const row = {};
//             headers.forEach((header, index) => {
//                 row[header.trim()] = values[index] ? values[index].trim() : '';
//             });
//             return row;
//         });
//     };

//     const handleSubmit = async () => {
//         if (!filters.productionLine || !filters.parameter || !filters.startDate || !filters.endDate) {
//             setError("Please fill in all filters");
//             return;
//         }

//         setLoading(true);
//         setError(null);
//         setCurrentPage(1);

//         try {
//             const parameterData = {
//                 instanceId: [filters.parameter]
//             };

//             const response = await reportData(filters.startDate, filters.endDate, parameterData);

//             // Parse the CSV response
//             const parsedData = parseCSVResponse(response);

//             if (parsedData.length > 0) {
//                 const columns = Object.keys(parsedData[0]);
//                 setResponseData({
//                     data: parsedData,
//                     columns: columns
//                 });
//             } else {
//                 throw new Error('No data available');
//             }
//         } catch (error) {
//             setError(error.message || "Error fetching data");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const downloadCSV = async () => {
//         if (!filters.productionLine || !filters.parameter || !filters.startDate || !filters.endDate) {
//             setError("Please fill in all filters");
//             return;
//         }

//         setDownloading(true);
//         setError(null);

//         try {
//             const parameterData = {
//                 instanceId: [filters.parameter]
//             };

//             const response = await reportData(filters.startDate, filters.endDate, parameterData);

//             // Generate filename
//             const selectedLine = productionLines.find(line => line.id === filters.productionLine)?.name;
//             const selectedParameter = parameters[selectedLine]?.find(p => p.id === filters.parameter)?.name;
//             const formattedStartDate = filters.startDate.replace(/-/g, '');
//             const formattedEndDate = filters.endDate.replace(/-/g, '');
//             const filename = `${selectedLine}_${selectedParameter}_${formattedStartDate}_${formattedEndDate}.csv`;

//             // Create and download file
//             const blob = new Blob([response], { type: 'text/csv;charset=utf-8;' });
//             const url = URL.createObjectURL(blob);
//             const link = document.createElement('a');
//             link.setAttribute('href', url);
//             link.setAttribute('download', filename);
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
//             URL.revokeObjectURL(url);

//         } catch (error) {
//             setError(error.message || "Error downloading data");
//         } finally {
//             setDownloading(false);
//         }
//     };

//     // Pagination logic
//     const totalPages = responseData?.data ? Math.ceil(responseData.data.length / ROWS_PER_PAGE) : 0;
//     const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
//     const endIndex = startIndex + ROWS_PER_PAGE;
//     const currentPageData = responseData?.data ? responseData.data.slice(startIndex, endIndex) : [];

//     const handleNextPage = () => {
//         if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
//     };

//     const handlePrevPage = () => {
//         if (currentPage > 1) setCurrentPage(prev => prev - 1);
//     };

//     const selectedLine = productionLines.find(line => line.id === filters.productionLine)?.name;
//     const availableParameters = selectedLine ? parameters[selectedLine] : [];

//     return (
//         <div className="h-full w-full p-4 bg-gradient-to-br from-blue-50 to-gray-100">
//             {error && (
//                 <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
//                     {error}
//                 </div>
//             )}

//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//                 {/* Filter inputs remain the same */}
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Production Line
//                     </label>
//                     <select
//                         className="w-full p-3 bg-gray-200 border-b-2 text-gray-800 border-blue-400 rounded-md"
//                         value={filters.productionLine}
//                         onChange={(e) => handleFilterChange('productionLine', e.target.value)}
//                     >
//                         <option value="">Select Production Line</option>
//                         {productionLines.map(line => (
//                             <option key={line.id} value={line.id}>
//                                 {line.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Parameter
//                     </label>
//                     <select
//                         className="w-full p-3 bg-gray-200 border-b-2 text-gray-800 border-blue-400 rounded-md"
//                         value={filters.parameter}
//                         onChange={(e) => handleFilterChange('parameter', e.target.value)}
//                     >
//                         <option value="">Select Parameter</option>
//                         {availableParameters.map(param => (
//                             <option key={param.id} value={param.id}>
//                                 {param.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Start Date
//                     </label>
//                     <input
//                         type="date"
//                         className="w-full p-2.5 bg-gray-200 border-b-2 text-gray-800 border-blue-400 rounded-md"
//                         value={filters.startDate}
//                         onChange={(e) => handleFilterChange('startDate', e.target.value)}
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                         End Date
//                     </label>
//                     <input
//                         type="date"
//                         className="w-full p-2.5 bg-gray-200 border-b-2 text-gray-800 border-blue-400 rounded-md"
//                         value={filters.endDate}
//                         onChange={(e) => handleFilterChange('endDate', e.target.value)}
//                     />
//                 </div>
//             </div>

//             <div className="flex justify-end gap-4 mb-6">
//                 <button
//                     className="flex items-center gap-2 px-4 py-2 shadow-lg bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
//                     onClick={handleSubmit}
//                     disabled={loading}
//                 >
//                     {loading ? (
//                         <RefreshCw className="h-4 w-4 animate-spin" />
//                     ) : (
//                         <Filter className="h-4 w-4" />
//                     )}
//                     {loading ? "Loading..." : "Apply Filters"}
//                 </button>
//                 <button
//                     className="flex items-center gap-2 px-4 py-2 shadow-lg bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
//                     onClick={downloadCSV}
//                     disabled={downloading || !filters.parameter}
//                 >
//                     {downloading ? (
//                         <RefreshCw className="h-4 w-4 animate-spin" />
//                     ) : (
//                         <Download className="h-4 w-4" />
//                     )}
//                     {downloading ? "Downloading..." : "Download CSV"}
//                 </button>
//             </div>

//             {responseData?.data.length > 0 && (
//                 <div className="overflow-x-auto border border-gray-400 rounded">
//                     <table className="min-w-full divide-y divide-gray-400">
//                         <thead className="bg-gray-200">
//                             <tr className="divide-x divide-gray-400">
//                                 {responseData.columns.map((column) => (
//                                     <th
//                                         key={column}
//                                         className="px-4 py-2 text-left text-xs font-bold text-gray-800 uppercase tracking-wider"
//                                     >
//                                         {column}
//                                     </th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-400">
//                             {currentPageData.map((row, rowIndex) => (
//                                 <tr key={rowIndex} className="hover:bg-gray-100 divide-x divide-gray-400">
//                                     {responseData.columns.map((column) => (
//                                         <td
//                                             key={`${rowIndex}-${column}`}
//                                             className="px-4 py-2 whitespace-nowrap text-sm text-gray-700"
//                                         >
//                                             {row[column]}
//                                         </td>
//                                     ))}
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>

//                     <div className="flex justify-center items-center p-2 border-t border-gray-400">
//                         <div className="flex gap-2 items-center">
//                             <button
//                                 onClick={handlePrevPage}
//                                 disabled={currentPage === 1}
//                                 className={`p-1 text-gray-700 rounded transition-colors ${currentPage === 1
//                                     ? 'bg-gray-300 cursor-not-allowed'
//                                     : 'bg-blue-500 hover:bg-blue-600 text-white'
//                                     }`}
//                             >
//                                 <ChevronLeft size={16} />
//                             </button>
//                             <span className="text-sm text-gray-600">
//                                 Page {currentPage} of {totalPages}
//                             </span>
//                             <button
//                                 onClick={handleNextPage}
//                                 disabled={currentPage >= totalPages}
//                                 className={`p-1 text-gray-700 rounded transition-colors ${currentPage >= totalPages
//                                     ? 'bg-gray-300 cursor-not-allowed'
//                                     : 'bg-blue-500 hover:bg-blue-600 text-white'
//                                     }`}
//                             >
//                                 <ChevronRight size={16} />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {(!responseData?.data || responseData.data.length === 0) && (
//                 <div className="text-center py-8">
//                     <p className="text-gray-500">No data available for the selected filters.</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ReportPage;



import React, { useState, useRef } from 'react';
import { Download, RefreshCw, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
// import { reportData } from '../../WebServices/ApiControllers';

const ROWS_PER_PAGE = 15;

const ReportPage = () => {
    const [filters, setFilters] = useState({
        productionLine: '',
        parameters: [],
        startDate: '',
        endDate: ''
    });

    const [responseData, setResponseData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showParameterDropdown, setShowParameterDropdown] = useState(false);
    const parameterDropdownRef = useRef(null);

    // Production line and parameter mapping data remain the same
    const productionLines = [
        { id: '39ff4795-63f7-4c3c-afe5-90d5133115d7', name: 'Amla Line-4 Main Line' },
        { id: '27ab18b6-152b-4382-8801-dd87b4726418', name: 'Amla Line-4 Shrinking Line' },
        { id: '2e1cc646-e595-4ccc-9638-c5a14a1c98c0', name: 'Amla Line-6 Main Line' },
        { id: 'bea95977-dba1-4d88-8ef2-b787102f379e', name: 'Amla Line-6 Shrinking Line' }
    ];

    const parameters = {
        'Amla Line-4 Main Line': [
            { id: '529a2b50-725e-4f24-80b1-63d0f860f0f4', name: 'Voltage' },
            { id: '39ff4795-63f7-4c3c-afe5-90d5133115d7', name: 'Current' },
            { id: 'a7571dcd-45f1-4c39-966e-edb9f602d1b1', name: 'Active Power' },
            { id: '4e1dd090-4331-401c-b7a3-c08b4dad38aa', name: 'Power Factor' },
            { id: 'dec146e7-295c-40d4-903a-6a61a913d824', name: 'Energy Consumption' }
        ],
        'Amla Line-4 Shrinking Line': [
            { id: 'ad4d9f65-c957-4e79-a542-d3168c3b98ac', name: 'Voltage' },
            { id: '27ab18b6-152b-4382-8801-dd87b4726418', name: 'Current' },
            { id: '5ca2d8b5-92a9-45c1-954a-21be4e6c71fa', name: 'Active Power' },
            { id: 'e1c04f10-d794-432e-820c-ccd1150340cd', name: 'Power Factor' },
            { id: '16cf3cdd-ef34-4450-a7ee-2e8222074613', name: 'Energy Consumption' }
        ],
        'Amla Line-6 Main Line': [
            { id: 'da3d1725-1dd6-43c2-ba80-c1fdbcf48803', name: 'Voltage' },
            { id: '2e1cc646-e595-4ccc-9638-c5a14a1c98c0', name: 'Current' },
            { id: 'f4ea26be-9005-46ac-acd8-351dd64b262e', name: 'Active Power' },
            { id: '1315ba67-957e-4a81-86ec-375450c090ce', name: 'Power Factor' },
            { id: '9e2283dd-81e4-47fd-9e37-8aa2db631bac', name: 'Energy Consumption' }
        ],
        'Amla Line-6 Shrinking Line': [
            { id: '0cea029d-68fa-4dfa-8faa-586459ae8ea2', name: 'Voltage' },
            { id: 'bea95977-dba1-4d88-8ef2-b787102f379e', name: 'Current' },
            { id: '9d62d645-415e-4117-aafc-93eb9a621929', name: 'Active Power' },
            { id: 'bd7fa5c7-3648-4755-bcc8-df3cb17e0f3c', name: 'Power Factor' },
            { id: '5bab2ed3-77f2-458e-84a3-3875286154a3', name: 'Energy Consumption' }
        ]
    };

    const handleFilterChange = (name, value) => {
        setFilters(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'productionLine' && { parameters: [] }) // Reset parameters when production line changes
        }));
    };

    const handleParameterToggle = (parameterId) => {
        setFilters(prev => ({
            ...prev,
            parameters: prev.parameters.includes(parameterId)
                ? prev.parameters.filter(id => id !== parameterId)
                : [...prev.parameters, parameterId]
        }));
    };

    const parseCSVResponse = (response) => {
        const lines = response.split('\n');
        const headers = lines[0].split(',');

        return lines.slice(1).map(line => {
            const values = line.split(',');
            const row = {};
            headers.forEach((header, index) => {
                row[header.trim()] = values[index] ? values[index].trim() : '';
            });
            return row;
        });
    };

    const downloadAndDisplayData = async () => {
        if (!filters.productionLine || filters.parameters.length === 0 || !filters.startDate || !filters.endDate) {
            setError("Please fill in all filters and select at least one parameter");
            return;
        }

        setLoading(true);
        setError(null);
        setCurrentPage(1);

        try {
            const parameterData = {
                instanceId: filters.parameters
            };

            const response = await reportData(filters.startDate, filters.endDate, parameterData);

            // Parse the CSV response
            const parsedData = parseCSVResponse(response);

            if (parsedData.length > 0) {
                // Display first 100 data points in the table
                const columns = Object.keys(parsedData[0]);
                setResponseData({
                    data: parsedData.slice(0, 100),
                    columns: columns
                });

                // Download the complete CSV
                const selectedLine = productionLines.find(line => line.id === filters.productionLine)?.name;
                const selectedParameterNames = filters.parameters
                    .map(paramId => {
                        const param = parameters[selectedLine]?.find(p => p.id === paramId);
                        return param ? param.name.replace(/\s+/g, '') : '';
                    })
                    .filter(Boolean)
                    .join('_');
                const formattedStartDate = filters.startDate.replace(/-/g, '');
                const formattedEndDate = filters.endDate.replace(/-/g, '');
                // const filename = `${selectedLine}_${formattedStartDate}_${formattedEndDate}.csv`;
                const filename = `${selectedLine.replace(/\s+/g, '')}_${selectedParameterNames}_${formattedStartDate}_${formattedEndDate}.csv`;

                const blob = new Blob([response], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.setAttribute('href', url);
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            } else {
                throw new Error('No data available');
            }
        } catch (error) {
            // setError(error.message || "Error fetching data");
            if (error.message?.includes('500')) {
                setError("Huge Data, Please get data between in Months!");
            } else {
                setError(error.message || " Huge data, Please try again within Months!");
            }
        } finally {
            setLoading(false);
        }
    };

    // Pagination logic
    const totalPages = responseData?.data ? Math.ceil(responseData.data.length / ROWS_PER_PAGE) : 0;
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;
    const currentPageData = responseData?.data ? responseData.data.slice(startIndex, endIndex) : [];

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const selectedLine = productionLines.find(line => line.id === filters.productionLine)?.name;
    const availableParameters = selectedLine ? parameters[selectedLine] : [];

    // Close parameter dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (parameterDropdownRef.current && !parameterDropdownRef.current.contains(event.target)) {
                setShowParameterDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="h-full w-full p-2 bg-gradient-to-br from-blue-50 to-gray-100">
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 px-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Production Line
                    </label>
                    <select
                        className="w-full p-3 bg-gray-200 border-b-2 text-gray-800 border-blue-400 rounded-md"
                        value={filters.productionLine}
                        onChange={(e) => handleFilterChange('productionLine', e.target.value)}
                    >
                        <option value="">Select Production Line</option>
                        {productionLines.map(line => (
                            <option key={line.id} value={line.id}>
                                {line.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="relative" ref={parameterDropdownRef}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Parameters
                    </label>
                    <button
                        className="w-full p-2.5 bg-gray-200 border-b-2 text-gray-800 border-blue-400 rounded-md text-left flex justify-between items-center"
                        onClick={() => setShowParameterDropdown(!showParameterDropdown)}
                        type="button"
                    >
                        <span>
                            {filters.parameters.length
                                ? `${filters.parameters.length} parameter${filters.parameters.length > 1 ? 's' : ''} selected`
                                : 'Select Parameters'}
                        </span>
                        <span className="transform transition-transform duration-200">
                            <ChevronDown className='w-4 h-4 -mr-2' />
                        </span>
                    </button>
                    {showParameterDropdown && (
                        <div className="absolute z-10 w-full mt-1 bg-gray-200 border border-gray-300 rounded-md shadow-lg">
                            <div className="max-h-60 overflow-y-auto">
                                {availableParameters.map(param => (
                                    <label
                                        key={param.id}
                                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={filters.parameters.includes(param.id)}
                                            onChange={() => handleParameterToggle(param.id)}
                                            className="mr-2"
                                        />
                                        {param.name}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                    </label>
                    <input
                        type="date"
                        className="w-full p-2.5 bg-gray-200 border-b-2 text-gray-800 border-blue-400 rounded-md"
                        value={filters.startDate}
                        onChange={(e) => handleFilterChange('startDate', e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                    </label>
                    <input
                        type="date"
                        className="w-full p-2.5 bg-gray-200 border-b-2 text-gray-800 border-blue-400 rounded-md"
                        value={filters.endDate}
                        onChange={(e) => handleFilterChange('endDate', e.target.value)}
                    />
                </div>
            </div>

            <div className="flex justify-end mb-6">
                <button
                    className="flex items-center gap-2 px-4 py-2 shadow-lg bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                    onClick={downloadAndDisplayData}
                    disabled={loading || !filters.productionLine || filters.parameters.length === 0}
                >
                    {loading ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                        <Download className="h-4 w-4" />
                    )}
                    {loading ? "Downloading..." : "Download Data"}
                </button>
            </div>

            {responseData?.data.length > 0 && (
                <div className="overflow-x-auto border border-gray-400 rounded">
                    <table className="min-w-full divide-y divide-gray-400">
                        <thead className="bg-gray-200">
                            <tr className="divide-x divide-gray-400">
                                {responseData.columns.map((column) => (
                                    <th
                                        key={column}
                                        className="px-4 py-2 text-left text-xs font-bold text-gray-800 uppercase tracking-wider"
                                    >
                                        {column}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-400">
                            {currentPageData.map((row, rowIndex) => (
                                <tr key={rowIndex} className="hover:bg-gray-100 divide-x divide-gray-400">
                                    {responseData.columns.map((column) => (
                                        <td
                                            key={`${rowIndex}-${column}`}
                                            className="px-4 py-2 whitespace-nowrap text-sm text-gray-700"
                                        >
                                            {row[column]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-center items-center p-2 border-t border-gray-400">
                        <div className="flex gap-2 items-center">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className={`p-1 rounded transition-colors ${currentPage === 1
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
                                className={`p-1 rounded transition-colors ${currentPage >= totalPages
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                                    }`}
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {(!responseData?.data || responseData.data.length === 0) && (
                <div className="text-center py-8">
                    <p className="text-gray-500">No data available. Select filters and click Download Data to begin.</p>
                </div>
            )}
        </div>
    );
};

export default ReportPage;