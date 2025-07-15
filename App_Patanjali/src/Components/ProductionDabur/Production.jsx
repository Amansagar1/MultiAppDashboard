// import React, { useState, useEffect } from "react";
// import * as echarts from "echarts";
// import { IoChevronForward, IoChevronBack } from "react-icons/io5";
// import ProductionDataTable from './ProductionDataTable';
// import { GetProductionData, SetProductionData } from '../../WebServices/ApiControllers';

// const Production = () => {
//     const [currentDate, setCurrentDate] = useState(() => {
//         const now = new Date();
//         return {
//             month: now.getMonth(),
//             year: now.getFullYear()
//         };
//     });
//     const [productionData, setProductionData] = useState([]);
//     const [activeShift, setActiveShift] = useState("A");
//     const [showPopups, setShowPopups] = useState(Array(4).fill(false));
//     const [isLoading, setIsLoading] = useState(false);

//     const lineTypes = [
//         "line-4 Main line",
//         "line-4 Shrinking line",
//         "line-6 Main line",
//         "line-6 Shrinking line"
//     ];

//     const instanceIds = [
//         "3b32116b-3290-494c-9a0b-e1f36fa6c01c",
//         "d73f97d4-ed10-487a-84a3-ee161ed94735",
//         "ad0a5f54-03b9-4a35-80c5-ea1b7cd912e2",
//         "6b7c4da6-ed14-47c3-955c-3aa7434a1942"
//     ];

//     const fetchProductionData = async () => {
//         setIsLoading(true);
//         try {
//             const formattedMonth = (currentDate.month + 1).toString().padStart(2, '0');
//             const data = await Promise.all(instanceIds.map((id) =>
//                 GetProductionData(id, currentDate.year, formattedMonth)
//             ));

//             const formattedData = data.flatMap((monthData, index) =>
//                 Object.entries(monthData).map(([date, shifts]) => ({
//                     date: date,
//                     shifts: {
//                         A: shifts.Shift_A || 0,
//                         B: shifts.Shift_B || 0,
//                         C: shifts.Shift_C || 0
//                     },
//                     instanceId: instanceIds[index]
//                 }))
//             );

//             setProductionData(formattedData);
//         } catch (error) {
//             console.error('Error fetching production data:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchProductionData();
//     }, [currentDate]);

//     const renderCharts = () => {
//         lineTypes.forEach((lineType, index) => {
//             const chartDom = document.getElementById(`chart-${instanceIds[index]}`);
//             if (!chartDom) return;

//             const myChart = echarts.init(chartDom);
//             const chartData = productionData.filter(item => item.instanceId === instanceIds[index]);
//             const dates = chartData.map(item => item.date);
//             const lineData = chartData.map(item => item.shifts[activeShift] || 0);

//             myChart.setOption({
//                 title: { text: `${lineType} - Shift ${activeShift}` },
//                 tooltip: {},
//                 xAxis: { type: "category", data: dates, axisLabel: { rotate: 45 } },
//                 yAxis: { type: "value" },
//                 series: [{ name: "Production", type: "bar", data: lineData }]
//             });
//         });
//     };

//     useEffect(() => {
//         renderCharts();
//     }, [activeShift, productionData]);

//     const togglePopup = (index) => {
//         setShowPopups(popups => {
//             const newPopups = [...popups];
//             newPopups[index] = !newPopups[index];
//             return newPopups;
//         });
//     };

//     const handleSaveData = async (index, rawTableData) => {
//         try {
//             const formattedMonth = (currentDate.month + 1).toString().padStart(2, '0');
//             await SetProductionData(
//                 instanceIds[index],
//                 currentDate.year,
//                 formattedMonth,
//                 rawTableData
//             );

//             await fetchProductionData();
//             togglePopup(index);
//         } catch (error) {
//             console.error('Error saving production data:', error);
//             alert('Failed to save production data. Please try again.');
//         }
//     };

//     const handleMonthChange = (increment) => {
//         setCurrentDate(prev => {
//             const newMonth = prev.month + increment;
//             if (newMonth > 11) {
//                 return {
//                     month: 0,
//                     year: prev.year + 1
//                 };
//             }
//             if (newMonth < 0) {
//                 return {
//                     month: 11,
//                     year: prev.year - 1
//                 };
//             }
//             return {
//                 ...prev,
//                 month: newMonth
//             };
//         });
//     };

//     const isCurrentMonth = () => {
//         const now = new Date();
//         return currentDate.month === now.getMonth() &&
//             currentDate.year === now.getFullYear();
//     };

//     const formattedDate = new Date(currentDate.year, currentDate.month)
//         .toLocaleString('default', { month: 'long', year: 'numeric' });

//     return (
//         <div className="w-full h-full p-4 bg-white">
//             <div className="flex justify-between items-center mb-4">
//                 <div>
//                     {["A", "B", "C"].map((shift) => (
//                         <button
//                             key={shift}
//                             className={`px-4 py-2 mr-2 ${activeShift === shift ? "bg-blue-500 text-white" : "bg-gray-300"
//                                 } rounded`}
//                             onClick={() => setActiveShift(shift)}
//                         >
//                             Shift {shift}
//                         </button>
//                     ))}
//                 </div>
//                 <div className="flex items-center gap-2">
//                     <button
//                         onClick={() => handleMonthChange(-1)}
//                         className="p-2 hover:bg-gray-100 rounded transition-colors"
//                     >
//                         <IoChevronBack className="w-5 h-5" />
//                     </button>
//                     <span className="text-lg font-medium min-w-[200px] text-center">
//                         {formattedDate}
//                     </span>
//                     <button
//                         onClick={() => handleMonthChange(1)}
//                         className="p-2 hover:bg-gray-100 rounded transition-colors"
//                         disabled={isCurrentMonth()}
//                     >
//                         <IoChevronForward className="w-5 h-5" />
//                     </button>
//                 </div>
//             </div>

//             {isLoading ? (
//                 <div className="flex justify-center items-center h-64">
//                     <div className="text-lg">Loading production data...</div>
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 gap-4">
//                     {lineTypes.map((lineType, index) => (
//                         <div key={lineType} className="relative">
//                             <div
//                                 id={`chart-${instanceIds[index]}`}
//                                 style={{ width: "100%", height: "300px" }}
//                             />
//                             <button
//                                 className="absolute top-2 right-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
//                                 onClick={() => togglePopup(index)}
//                             >
//                                 Update Product Count
//                             </button>
//                             {showPopups[index] && (
//                                 <div className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
//                                     <div className="bg-white rounded-lg shadow-lg w-3/4 h-[90vh] flex flex-col">
//                                         <ProductionDataTable
//                                             productionData={productionData}
//                                             currentMonth={currentDate.month}
//                                             currentYear={currentDate.year}
//                                             onSaveData={(tableData) => handleSaveData(index, tableData)}
//                                             instanceId={instanceIds[index]}
//                                             lineType={lineType}
//                                             onClose={() => togglePopup(index)}
//                                         />
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Production;


import React, { useState, useEffect } from "react";
import * as echarts from "echarts";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import ProductionDataTable from './ProductionDataTable';
import { GetProductionData, SetProductionData } from '../../WebServices/ApiControllers';

const Production = () => {
    const [currentDate, setCurrentDate] = useState(() => {
        const now = new Date();
        return {
            month: now.getMonth(),
            year: now.getFullYear()
        };
    });
    const [productionData, setProductionData] = useState([]);
    const [activeShift, setActiveShift] = useState("A");
    const [showPopups, setShowPopups] = useState(Array(4).fill(false));
    const [isLoading, setIsLoading] = useState(false);

    const lineTypes = [
        "line-4 Main line",
        "line-4 Shrinking line",
        "line-6 Main line",
        "line-6 Shrinking line"
    ];

    const instanceIds = [
        "3b32116b-3290-494c-9a0b-e1f36fa6c01c",
        "d73f97d4-ed10-487a-84a3-ee161ed94735",
        "ad0a5f54-03b9-4a35-80c5-ea1b7cd912e2",
        "6b7c4da6-ed14-47c3-955c-3aa7434a1942"
    ];

    const formatDate = (day, month, year) => {
        const date = new Date(year, month, parseInt(day));
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short'
        });
    };

    const processChartData = (monthData, instanceId) => {
        // Create an array of all days in the month
        const daysInMonth = new Date(currentDate.year, currentDate.month + 1, 0).getDate();
        const processedData = [];

        for (let day = 1; day <= daysInMonth; day++) {
            const dayStr = day.toString().padStart(2, '0');
            const formattedDate = formatDate(day, currentDate.month, currentDate.year);

            // Get shift data for this day, or use zeros if no data exists
            const dayData = monthData[dayStr] || {
                Shift_A: 0,
                Shift_B: 0,
                Shift_C: 0
            };

            processedData.push({
                date: formattedDate,
                rawDate: dayStr,
                shifts: {
                    A: dayData.Shift_A || 0,
                    B: dayData.Shift_B || 0,
                    C: dayData.Shift_C || 0
                },
                instanceId: instanceId
            });
        }

        return processedData;
    };

    const fetchProductionData = async () => {
        setIsLoading(true);
        try {
            const formattedMonth = (currentDate.month + 1).toString().padStart(2, '0');
            const data = await Promise.all(instanceIds.map((id) =>
                GetProductionData(id, currentDate.year, formattedMonth)
            ));

            const formattedData = data.flatMap((monthData, index) =>
                processChartData(monthData, instanceIds[index])
            );

            setProductionData(formattedData);
        } catch (error) {
            console.error('Error fetching production data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProductionData();
    }, [currentDate]);

    const renderCharts = () => {
        lineTypes.forEach((lineType, index) => {
            const chartDom = document.getElementById(`chart-${instanceIds[index]}`);
            if (!chartDom) return;

            const myChart = echarts.init(chartDom);
            const chartData = productionData.filter(item => item.instanceId === instanceIds[index]);
            const dates = chartData.map(item => item.date);
            const lineData = chartData.map(item => item.shifts[activeShift] || 0);

            myChart.setOption({
                title: {
                    text: `${lineType} - Shift ${activeShift}`,
                    left: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: function (params) {
                        return `${params[0].name}<br/>${params[0].seriesName}: ${params[0].value}`;
                    }
                },
                grid: {
                    left: '3%',
                    right: '1%',
                    bottom: '10%',
                    top: '20%',
                    containLabel: true
                },
                xAxis: {
                    type: "category",
                    data: dates,
                    axisLabel: {
                        rotate: 45,
                        fontSize: 11,
                        interval: 0
                    }
                },
                yAxis: {
                    type: "value",
                    name: 'Product Count',
                    nameLocation: 'middle',
                    nameGap: 50,
                    nameTextStyle: {
                        fontWeight: 'bold'
                    }
                },
                series: [{
                    name: "Production",
                    type: "bar",
                    data: lineData,
                    itemStyle: {
                        color: '#1890ff'
                    },
                    emphasis: {
                        itemStyle: {
                            color: '#40a9ff'
                        }
                    }
                }]
            });
        });
    };

    useEffect(() => {
        renderCharts();

        const handleResize = () => {
            lineTypes.forEach((_, index) => {
                const chartDom = document.getElementById(`chart-${instanceIds[index]}`);
                if (chartDom) {
                    const chart = echarts.getInstanceByDom(chartDom);
                    chart?.resize();
                }
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [activeShift, productionData]);

    const togglePopup = (index) => {
        setShowPopups(popups => {
            const newPopups = [...popups];
            newPopups[index] = !newPopups[index];
            return newPopups;
        });
    };

    const handleSaveData = async (index, rawTableData) => {
        try {
            const formattedMonth = (currentDate.month + 1).toString().padStart(2, '0');
            await SetProductionData(
                instanceIds[index],
                currentDate.year,
                formattedMonth,
                rawTableData
            );

            await fetchProductionData();
            togglePopup(index);
        } catch (error) {
            console.error('Error saving production data:', error);
            alert('Failed to save production data. Please try again.');
        }
    };

    const handleMonthChange = (increment) => {
        setCurrentDate(prev => {
            const newMonth = prev.month + increment;
            if (newMonth > 11) {
                return {
                    month: 0,
                    year: prev.year + 1
                };
            }
            if (newMonth < 0) {
                return {
                    month: 11,
                    year: prev.year - 1
                };
            }
            return {
                ...prev,
                month: newMonth
            };
        });
    };

    const isCurrentMonth = () => {
        const now = new Date();
        return currentDate.month === now.getMonth() &&
            currentDate.year === now.getFullYear();
    };

    const formattedDate = new Date(currentDate.year, currentDate.month)
        .toLocaleString('default', { month: 'long', year: 'numeric' });

    return (
        <div className="w-full h-full p-4 bg-white">
            <div className="flex justify-between items-center mb-4">
                <div>
                    {["A", "B", "C"].map((shift) => (
                        <button
                            key={shift}
                            className={`px-4 py-2 mr-2 ${activeShift === shift
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300 hover:bg-gray-400"
                                } rounded transition-colors`}
                            onClick={() => setActiveShift(shift)}
                        >
                            Shift {shift}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleMonthChange(-1)}
                        className="p-2 hover:bg-gray-100 rounded transition-colors"
                    >
                        <IoChevronBack className="w-5 h-5" />
                    </button>
                    <span className="text-lg font-medium min-w-[200px] text-center">
                        {formattedDate}
                    </span>
                    <button
                        onClick={() => handleMonthChange(1)}
                        className="p-2 hover:bg-gray-100 rounded transition-colors"
                        disabled={isCurrentMonth()}
                    >
                        <IoChevronForward className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center p-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-2">
                    {lineTypes.map((lineType, index) => (
                        <div key={lineType} className="relative">
                            <div
                                id={`chart-${instanceIds[index]}`}
                                style={{ width: "100%", height: "300px" }}
                                className="border rounded-lg p-4"
                            />
                            <button
                                className="absolute top-2 right-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                onClick={() => togglePopup(index)}
                            >
                                Update Product Count
                            </button>
                            {showPopups[index] && (
                                <div className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                                    <div className="bg-white rounded-lg shadow-lg w-3/4 h-[90vh] flex flex-col">
                                        <ProductionDataTable
                                            productionData={productionData}
                                            currentMonth={currentDate.month}
                                            currentYear={currentDate.year}
                                            onSaveData={(tableData) => handleSaveData(index, tableData)}
                                            instanceId={instanceIds[index]}
                                            lineType={lineType}
                                            onClose={() => togglePopup(index)}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Production;