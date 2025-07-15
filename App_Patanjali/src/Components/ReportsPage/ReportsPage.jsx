
import React, { useState } from 'react';
import { Download, Filter, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { getDataValues } from '../../WebServices/ApiControllers';

const ROWS_PER_PAGE = 15; // Same as AlarmsPage

const ReportPage = () => {
    const [filters, setFilters] = useState({
        productionLine: '',
        parameter: '',
        startDate: '',
        endDate: ''
    });

    const [responseData, setResponseData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Production line and parameter mapping data
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
            ...(name === 'productionLine' && { parameter: '' })
        }));
    };

    const handleSubmit = async () => {
        if (!filters.productionLine || !filters.parameter || !filters.startDate || !filters.endDate) {
            setError("Please fill in all filters");
            return;
        }

        setLoading(true);
        setError(null);
        setCurrentPage(1); // Reset to first page when new data is fetched

        try {
            const response = await getDataValues({
                instanceId: filters.parameter,
                from: filters.startDate,
                to: filters.endDate
            });
            console.log("data", response)

            if (Array.isArray(response)) {
                const uniqueTimestamps = [...new Set(response.map(item => item.timestamp.split('.')[0]))];
                const uniqueVariables = [...new Set(response.map(item => item.variable))];

                const processedData = uniqueTimestamps.map(timestamp => {
                    const rowData = { timestamp };
                    response
                        .filter(item => item.timestamp.startsWith(timestamp))
                        .forEach(item => {
                            rowData[item.variable] = item.value;
                        });
                    return rowData;
                });

                setResponseData({
                    data: processedData,
                    variables: uniqueVariables
                });
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            setError(error.message || "Error fetching data");
        } finally {
            setLoading(false);
        }
    };

    const downloadCSV = () => {
        if (!responseData?.data.length) return;

        // Get the selected parameter name from the filters
        const selectedParameter = availableParameters.find(param => param.id === filters.parameter)?.name || 'Data';
        // Format the dates for the filename
        const formattedStartDate = filters.startDate.replace(/-/g, '');
        const formattedEndDate = filters.endDate.replace(/-/g, '');

        const { data, variables } = responseData;
        const headers = ['Date', 'Time', ...variables];
        const csvContent = [
            headers.join(','),
            ...data.map(row => [
                new Date(row.timestamp).toLocaleString(),
                ...variables.map(variable => row[variable] || '')
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `report_${selectedParameter}_${formattedStartDate}_to_${formattedEndDate}.csv`;
        link.click();
    };

    // Pagination handlers
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

    const selectedLine = productionLines.find(line => line.id === filters.productionLine)?.name;
    const availableParameters = selectedLine ? parameters[selectedLine] : [];

    // Pagination calculations
    const totalPages = responseData?.data ? Math.ceil(responseData.data.length / ROWS_PER_PAGE) : 0;
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;
    const currentPageData = responseData?.data ? responseData.data.slice(startIndex, endIndex) : [];

    return (
        <div className="h-full w-full">
            <div className="bg-white p-4">
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Production Line
                        </label>
                        <select
                            className="w-full p-3 bg-gray-100 border-b-2 border-blue-400 rounded-md"
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

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Parameter
                        </label>
                        <select
                            className="w-full p-3 bg-gray-100 border-b-2 border-blue-400 rounded-md"
                            value={filters.parameter}
                            onChange={(e) => handleFilterChange('parameter', e.target.value)}
                        >
                            <option value="">Select Parameter</option>
                            {availableParameters.map(param => (
                                <option key={param.id} value={param.id}>
                                    {param.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Start Date
                        </label>
                        <input
                            type="date"
                            className="w-full p-2.5 bg-gray-100 border-b-2 border-blue-400 rounded-md"
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
                            className="w-full p-2.5 bg-gray-100 border-b-2 border-blue-400 rounded-md"
                            value={filters.endDate}
                            onChange={(e) => handleFilterChange('endDate', e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4 mb-6">
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
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
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                        onClick={downloadCSV}
                        disabled={!responseData?.data.length}
                    >
                        <Download className="h-4 w-4" />
                        Download CSV
                    </button>
                </div>

                {responseData?.data.length > 0 && (
                    <div className="overflow-x-auto border border-gray-400 rounded">
                        <table className="min-w-full divide-y divide-gray-400">
                            <thead className="bg-gray-200">
                                <tr className='divide-x divide-gray-400'>
                                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                                        Timestamp
                                    </th>
                                    {responseData.variables.map(variable => (
                                        <th
                                            key={variable}
                                            className="px-4 py-2 text-left text-xs font-bold text-gray-800 uppercase tracking-wider"
                                        >
                                            {variable}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-400">
                                {currentPageData.map((row, index) => (
                                    <tr key={index} className="hover:bg-gray-100 divide-x divide-gray-400">
                                        <td className="px-4 py-1 whitespace-nowrap text-sm text-gray-700">
                                            {new Date(row.timestamp).toLocaleString()}
                                        </td>
                                        {responseData.variables.map(variable => (
                                            <td key={variable} className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                                                {typeof row[variable] === 'number' ? row[variable].toFixed(2) : row[variable]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination Controls */}
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
                        <p className="text-gray-500">No data available for the selected filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportPage;