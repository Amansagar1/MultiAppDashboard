import React, { useState, useEffect } from "react";
import * as echarts from "echarts";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import ProductionDataTable from './ProductionDataTable';

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
    const [showPopups, setShowPopups] = useState(Array(2).fill(false));
    const [isLoading, setIsLoading] = useState(false);

    const lineTypes = ["line-4", "line-6"];
    const instanceIds = [
        "line-4-instance-id",
        "line-6-instance-id"
    ];
    const energyInstanceIds = {
        main: ["main-energy-line-4", "main-energy-line-6"],
        shrink: ["shrink-energy-line-4", "shrink-energy-line-6"]
    };

    const formatDate = (day, month, year) => {
        const date = new Date(year, month, parseInt(day));
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short'
        });
    };

    const generateMockDayData = () => {
        const count = Math.floor(Math.random() * 500);
        const mainEnergy = +(Math.random() * 1000).toFixed(2);
        const shrinkEnergy = +(Math.random() * 800).toFixed(2);
        const totalEnergy = count > 0 ? +((mainEnergy + shrinkEnergy) / count).toFixed(2) : 0;

        return {
            Product_Count: count,
            Main_Energy_Consume: mainEnergy,
            Shrink_Energy_Consume: shrinkEnergy,
            EnergyPerProduct: totalEnergy
        };
    };

    const processChartData = (monthData, instanceId, index) => {
        const daysInMonth = new Date(currentDate.year, currentDate.month + 1, 0).getDate();
        const processedData = [];

        for (let day = 1; day <= daysInMonth; day++) {
            const dayStr = day.toString().padStart(2, '0');
            const formattedDate = formatDate(day, currentDate.month, currentDate.year);
            const dayData = monthData[dayStr];

            processedData.push({
                date: formattedDate,
                rawDate: dayStr,
                shifts: {
                    A: {
                        count: dayData.Shift_A.Product_Count,
                        mainEnergy: dayData.Shift_A.Main_Energy_Consume,
                        shrinkEnergy: dayData.Shift_A.Shrink_Energy_Consume,
                        totalEnergyConsume: dayData.Shift_A.EnergyPerProduct,
                        energy: dayData.Shift_A.Main_Energy_Consume + dayData.Shift_A.Shrink_Energy_Consume
                    },
                    B: {
                        count: dayData.Shift_B.Product_Count,
                        mainEnergy: dayData.Shift_B.Main_Energy_Consume,
                        shrinkEnergy: dayData.Shift_B.Shrink_Energy_Consume,
                        totalEnergyConsume: dayData.Shift_B.EnergyPerProduct,
                        energy: dayData.Shift_B.Main_Energy_Consume + dayData.Shift_B.Shrink_Energy_Consume
                    },
                    C: {
                        count: dayData.Shift_C.Product_Count,
                        mainEnergy: dayData.Shift_C.Main_Energy_Consume,
                        shrinkEnergy: dayData.Shift_C.Shrink_Energy_Consume,
                        totalEnergyConsume: dayData.Shift_C.EnergyPerProduct,
                        energy: dayData.Shift_C.Main_Energy_Consume + dayData.Shift_C.Shrink_Energy_Consume
                    }
                },
                instanceId,
                mainEnergyInstanceId: energyInstanceIds.main[index],
                shrinkEnergyInstanceId: energyInstanceIds.shrink[index],
                lineIndex: index
            });
        }

        return processedData;
    };

    const fetchProductionData = async () => {
        setIsLoading(true);
        try {
            const daysInMonth = new Date(currentDate.year, currentDate.month + 1, 0).getDate();
            const mockData = instanceIds.map((instanceId, index) => {
                const dayWiseData = {};
                for (let day = 1; day <= daysInMonth; day++) {
                    const dayStr = day.toString().padStart(2, '0');
                    dayWiseData[dayStr] = {
                        Shift_A: generateMockDayData(),
                        Shift_B: generateMockDayData(),
                        Shift_C: generateMockDayData(),
                    };
                }
                return processChartData(dayWiseData, instanceId, index);
            });

            const mergedData = mockData.flat();
            setProductionData(mergedData);
        } catch (error) {
            console.error("Mock data generation failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchEnergyData = async () => {
        const mainEnergy = +(Math.random() * 1000).toFixed(2);
        const shrinkEnergy = +(Math.random() * 800).toFixed(2);
        const totalEnergy = +(mainEnergy + shrinkEnergy).toFixed(2);
        return { mainEnergy, shrinkEnergy, totalEnergy };
    };

    const handleSaveData = async (index, rawTableData) => {
        try {
            console.log("Saving mock data:", rawTableData);
            await new Promise(res => setTimeout(res, 500)); // simulate delay
            alert("Mock data saved locally!");
            togglePopup(index);
            fetchProductionData(); // refresh mock
        } catch (error) {
            console.error("Error saving mock data:", error);
            alert("Failed to save mock data.");
        }
    };

    useEffect(() => {
        fetchProductionData();
    }, [currentDate]);

    const renderCharts = () => {
        lineTypes.forEach((lineType, index) => {
            const chartDomCount = document.getElementById(`chart-count-${instanceIds[index]}`);
            const chartDomEnergy = document.getElementById(`chart-energy-${instanceIds[index]}`);
            if (!chartDomCount || !chartDomEnergy) return;

            const myChartCount = echarts.init(chartDomCount);
            const myChartEnergy = echarts.init(chartDomEnergy);
            const chartData = productionData.filter(item => item.instanceId === instanceIds[index]);
            const dates = chartData.map(item => item.date);
            const countData = chartData.map(item => item.shifts[activeShift]?.count || 0);
            const energyConsumeData = chartData.map(item => item.shifts[activeShift]?.totalEnergyConsume || 0);

            const commonOptions = {
                tooltip: { trigger: 'axis' },
                grid: {
                    left: '5%', right: '4%', bottom: '5%', top: '20%',
                    containLabel: true
                },
                xAxis: {
                    type: "category",
                    data: dates,
                    axisLabel: {
                        rotate: 45, fontSize: 11, interval: 0
                    }
                }
            };

            myChartCount.setOption({
                ...commonOptions,
                title: { text: `${lineType} - Shift ${activeShift} - Count`, left: 'center' },
                yAxis: {
                    type: "value",
                    name: 'Count',
                    nameLocation: 'middle',
                    nameGap: 50
                },
                series: [{
                    name: "Production Count",
                    type: "bar",
                    data: countData,
                    itemStyle: { color: '#1890ff' }
                }]
            });

            myChartEnergy.setOption({
                ...commonOptions,
                title: { text: `${lineType} - Shift ${activeShift} - Energy`, left: 'center' },
                yAxis: {
                    type: "value",
                    name: 'Energy',
                    nameLocation: 'middle',
                    nameGap: 60
                },
                series: [{
                    name: "Energy Per Product",
                    type: "line",
                    data: energyConsumeData,
                    symbol: 'circle',
                    symbolSize: 6,
                    lineStyle: { width: 3, color: '#ff7a45' },
                    itemStyle: { color: '#ff7a45' }
                }]
            });
        });
    };

    useEffect(() => {
        renderCharts();
        const handleResize = () => {
            lineTypes.forEach((_, index) => {
                const countChart = echarts.getInstanceByDom(document.getElementById(`chart-count-${instanceIds[index]}`));
                const energyChart = echarts.getInstanceByDom(document.getElementById(`chart-energy-${instanceIds[index]}`));
                countChart?.resize();
                energyChart?.resize();
            });
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [productionData, activeShift]);

    const togglePopup = (index) => {
        setShowPopups(prev => {
            const updated = [...prev];
            updated[index] = !updated[index];
            return updated;
        });
    };

    const handleMonthChange = (inc) => {
        setCurrentDate(prev => {
            const newMonth = prev.month + inc;
            if (newMonth > 11) return { month: 0, year: prev.year + 1 };
            if (newMonth < 0) return { month: 11, year: prev.year - 1 };
            return { ...prev, month: newMonth };
        });
    };

    const isCurrentMonth = () => {
        const now = new Date();
        return currentDate.month === now.getMonth() && currentDate.year === now.getFullYear();
    };

    const formattedDate = new Date(currentDate.year, currentDate.month)
        .toLocaleString('default', { month: 'long', year: 'numeric' });

    return (
        <div className="w-full h-full p-4 bg-gradient-to-br from-blue-50 to-gray-100 overflow-auto">
            <div className="flex justify-between items-center mb-4">
                <div>
                    {["A", "B", "C"].map((shift) => (
                        <button
                            key={shift}
                            className={`px-4 py-2 mr-2 rounded ${activeShift === shift ? "bg-blue-500 text-white" : "bg-gray-300 hover:bg-gray-400"}`}
                            onClick={() => setActiveShift(shift)}
                        >
                            Shift {shift}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => handleMonthChange(-1)} className="p-2 hover:bg-gray-200 rounded">
                        <IoChevronBack />
                    </button>
                    <span className="text-lg font-medium min-w-[200px] text-center">
                        {formattedDate}
                    </span>
                    <button
                        onClick={() => handleMonthChange(1)}
                        disabled={isCurrentMonth()}
                        className="p-2 hover:bg-gray-200 rounded"
                    >
                        <IoChevronForward />
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center p-4">
                    <div className="animate-spin h-8 w-8 border-2 border-t-blue-500 border-b-blue-500 rounded-full"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {lineTypes.map((lineType, index) => (
                        <div key={lineType} className="relative flex flex-col items-center">
                            <div className="flex gap-2 w-full">
                                <div id={`chart-energy-${instanceIds[index]}`} className="w-1/2 h-[300px] bg-white rounded p-4" />
                                <div id={`chart-count-${instanceIds[index]}`} className="w-1/2 h-[300px] bg-white rounded p-4" />
                            </div>
                            <button
                                className="absolute top-2 right-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={() => togglePopup(index)}
                            >
                                Update Product Count
                            </button>
                            {showPopups[index] && (
                                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
                                    <div className="bg-white w-3/4 h-[90vh] rounded shadow-lg">
                                        <ProductionDataTable
                                            productionData={productionData}
                                            currentMonth={currentDate.month}
                                            currentYear={currentDate.year}
                                            onSaveData={(data) => handleSaveData(index, data)}
                                            instanceId={instanceIds[index]}
                                            lineIndex={index}
                                            lineType={lineType}
                                            onClose={() => togglePopup(index)}
                                            fetchEnergyData={(day, shift) => fetchEnergyData(index, day, shift)}
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
