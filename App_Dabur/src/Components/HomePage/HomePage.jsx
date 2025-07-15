"use client";
import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { ArrowRight, AlertTriangle, IndianRupee, Leaf, Zap, BarChart2, PieChart, Calendar } from 'lucide-react';
import Breadcrumb from '@/Components/BreadCrumb/BreadcrumbRuntime';

const EnergyDashboard = () => {
    const pieChartRef = useRef(null);
    const barChartRef = useRef(null);
    const utilizationChartRef = useRef(null);
    const chartInstancesRef = useRef({
        pieChart: null,
        barChart: null,
        utilizationChart: null
    });
    const isMountedRef = useRef(true);
    
    // Hardcoded data
    const [energyData, setEnergyData] = useState({
        totalEnergy: 12560,
        co2Emission: 8.7,
        line6_Main: 4560,
        line6_Shrink: 2340,
        line4_Main: 3870,
        line4_Shrink: 1790,
        line4_Total: 5660,
        line6_Total: 6900,
        estimatedBill: 125600
    });

    const [loadSummary, setLoadSummary] = useState({
        line_4_Main: [
            { variable: 'FullLoad', value: 120.5 },
            { variable: 'IdleLoad', value: 45.3 },
            { variable: 'Idle_Energy', value: 680 }
        ],
        line_4_Shrink: [
            { variable: 'FullLoad', value: 85.2 },
            { variable: 'IdleLoad', value: 32.1 },
            { variable: 'Idle_Energy', value: 480 }
        ],
        line_6_Main: [
            { variable: 'FullLoad', value: 135.7 },
            { variable: 'IdleLoad', value: 38.9 },
            { variable: 'Idle_Energy', value: 720 }
        ],
        line_6_Shrink: [
            { variable: 'FullLoad', value: 92.4 },
            { variable: 'IdleLoad', value: 28.6 },
            { variable: 'Idle_Energy', value: 520 }
        ],
        utlization: 78.5,
        possibleSaving: 12500,
        production_Loss: 12.3
    });

    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [timeRange, setTimeRange] = useState({
        from: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        to: new Date().toISOString()
    });
    const [frequency, setFrequency] = useState('month');
    const [limit, setLimit] = useState(30);
    
    // Hardcoded energy trends data
    const [energyTrendsData, setEnergyTrendsData] = useState({
        line4: [
            { 
                instanceid: 'dec146e7-295c-40d4-903a-6a61a913d824',
                timestamp: '2025-01-01T00:00:00Z',
                total_energy: '1200'
            },
            { 
                instanceid: '16cf3cdd-ef34-4450-a7ee-2e8222074613',
                timestamp: '2025-01-01T00:00:00Z',
                total_energy: '800'
            },
            { 
                instanceid: 'dec146e7-295c-40d4-903a-6a61a913d824',
                timestamp: '2025-02-01T00:00:00Z',
                total_energy: '1350'
            },
            { 
                instanceid: '16cf3cdd-ef34-4450-a7ee-2e8222074613',
                timestamp: '2025-02-01T00:00:00Z',
                total_energy: '750'
            }
        ],
        line6: [
            { 
                instanceid: '9e2283dd-81e4-47fd-9e37-8aa2db631bac',
                timestamp: '2025-01-01T00:00:00Z',
                total_energy: '1500'
            },
            { 
                instanceid: '5bab2ed3-77f2-458e-84a3-3875286154a3',
                timestamp: '2025-01-01T00:00:00Z',
                total_energy: '900'
            },
            { 
                instanceid: '9e2283dd-81e4-47fd-9e37-8aa2db631bac',
                timestamp: '2025-02-01T00:00:00Z',
                total_energy: '1650'
            },
            { 
                instanceid: '5bab2ed3-77f2-458e-84a3-3875286154a3',
                timestamp: '2025-02-01T00:00:00Z',
                total_energy: '950'
            }
        ]
    });

    // Loading states (all false since we're using hardcoded data)
    const [energyDataLoading, setEnergyDataLoading] = useState(false);
    const [loadSummaryLoading, setLoadSummaryLoading] = useState(false);
    const [energyTrendsLoading, setEnergyTrendsLoading] = useState(false);

    const LoadingSpinner = () => (
        <span className="flex items-center p-1.5">
            <span className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-blue-500"></span>
        </span>
    );

    const ChartLoadingSpinner = () => (
        <div className="flex items-center justify-center p-2">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    const instanceIdMap = {
        'Amla Line-4 Main Line': 'dec146e7-295c-40d4-903a-6a61a913d824',
        'Amla Line-4 Shrinking Line': '16cf3cdd-ef34-4450-a7ee-2e8222074613',
        'Amla Line-6 Main Line': '9e2283dd-81e4-47fd-9e37-8aa2db631bac',
        'Amla Line-6 Shrinking Line': '5bab2ed3-77f2-458e-84a3-3875286154a3'
    };

    const safelyDisposeCharts = () => {
        if (chartInstancesRef.current.barChart) {
            try {
                chartInstancesRef.current.barChart.dispose();
            } catch (error) {
                console.warn("Error disposing bar chart:", error);
            }
            chartInstancesRef.current.barChart = null;
        }
        if (chartInstancesRef.current.pieChart) {
            try {
                chartInstancesRef.current.pieChart.dispose();
            } catch (error) {
                console.warn("Error disposing pie chart:", error);
            }
            chartInstancesRef.current.pieChart = null;
        }
        if (chartInstancesRef.current.utilizationChart) {
            try {
                chartInstancesRef.current.utilizationChart.dispose();
            } catch (error) {
                console.warn("Error disposing utilization chart:", error);
            }
            chartInstancesRef.current.utilizationChart = null;
        }
    };

    useEffect(() => {
        return () => {
            isMountedRef.current = false;
            safelyDisposeCharts();
        };
    }, []);

    const getValueByVariable = (lineData, variableName, defaultValue = 0) => {
        const item = lineData.find(item => item.variable === variableName);
        return item ? item.value : defaultValue;
    };

    const processEnergyTrendsForChart = () => {
        const line4MainData = [];
        const line4ShrinkData = [];
        const line6MainData = [];
        const line6ShrinkData = [];

        // Process line4 data
        energyTrendsData.line4.forEach(item => {
            if (item.instanceid === instanceIdMap['Amla Line-4 Main Line']) {
                line4MainData.push({
                    timestamp: item.timestamp,
                    value: parseFloat(item.total_energy || 0)
                });
            } else if (item.instanceid === instanceIdMap['Amla Line-4 Shrinking Line']) {
                line4ShrinkData.push({
                    timestamp: item.timestamp,
                    value: parseFloat(item.total_energy || 0)
                });
            }
        });

        // Process line6 data
        energyTrendsData.line6.forEach(item => {
            if (item.instanceid === instanceIdMap['Amla Line-6 Main Line']) {
                line6MainData.push({
                    timestamp: item.timestamp,
                    value: parseFloat(item.total_energy || 0)
                });
            } else if (item.instanceid === instanceIdMap['Amla Line-6 Shrinking Line']) {
                line6ShrinkData.push({
                    timestamp: item.timestamp,
                    value: parseFloat(item.total_energy || 0)
                });
            }
        });

        const timestampSet = {};
        line4MainData.forEach(item => { timestampSet[item.timestamp] = true; });
        line4ShrinkData.forEach(item => { timestampSet[item.timestamp] = true; });
        line6MainData.forEach(item => { timestampSet[item.timestamp] = true; });
        line6ShrinkData.forEach(item => { timestampSet[item.timestamp] = true; });

        const allTimestamps = Object.keys(timestampSet).sort();

        const formatTimestamp = (timestamp) => {
            const date = new Date(timestamp);
            if (isNaN(date.getTime())) {
                return timestamp;
            }
            if (frequency === 'day' || frequency === 'week') {
                const day = date.getDate().toString().padStart(2, '0');
                const month = date.toLocaleString('en-US', { month: 'short' });
                return `${day} ${month}`;
            } else {
                const month = date.toLocaleString('en-US', { month: 'short' });
                const year = date.getFullYear();
                return `${month} ${year}`;
            }
        };

        const xAxisLabels = allTimestamps.map(timestamp => formatTimestamp(timestamp));

        const findValueByTimestamp = (dataArray, timestamp) => {
            const entry = dataArray.find(item => item.timestamp === timestamp);
            return entry ? entry.value : 0;
        };

        const line4MainValues = allTimestamps.map(timestamp =>
            findValueByTimestamp(line4MainData, timestamp)
        );
        const line4ShrinkValues = allTimestamps.map(timestamp =>
            findValueByTimestamp(line4ShrinkData, timestamp)
        );
        const line6MainValues = allTimestamps.map(timestamp =>
            findValueByTimestamp(line6MainData, timestamp)
        );
        const line6ShrinkValues = allTimestamps.map(timestamp =>
            findValueByTimestamp(line6ShrinkData, timestamp)
        );

        return {
            xAxis: xAxisLabels,
            timestamps: allTimestamps,
            series: [
                {
                    name: 'Line 6 Main',
                    data: line6MainValues,
                    color: '#f59e0b'
                },
                {
                    name: 'Line 6 Shrink',
                    data: line6ShrinkValues,
                    color: '#fbbf24'
                },
                {
                    name: 'Line 4 Main',
                    data: line4MainValues,
                    color: '#60a5fa'
                },
                {
                    name: 'Line 4 Shrink',
                    data: line4ShrinkValues,
                    color: '#93c5fd'
                }
            ]
        };
    };

    const handleTimeRangeApply = (newTimeRange) => {
        safelyDisposeCharts();
        setTimeRange(newTimeRange);
        setLastUpdated(new Date());
    };

    const handleFrequencyChange = (e) => {
        setFrequency(e.target.value);
    };

    // Initialize charts with hardcoded data
    useEffect(() => {
        if (!barChartRef.current) return;
        
        try {
            if (chartInstancesRef.current.barChart) {
                chartInstancesRef.current.barChart.dispose();
                chartInstancesRef.current.barChart = null;
            }

            const chartData = processEnergyTrendsForChart();
            const barChart = echarts.init(barChartRef.current);
            chartInstancesRef.current.barChart = barChart;

            const barOption = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: function (params) {
                        const timestamp = chartData.timestamps[params[0].dataIndex];
                        const date = new Date(timestamp);
                        let result = `${date.toLocaleString()}<br/>`;
                        params.forEach(item => {
                            result += `${item.marker} ${item.seriesName}: ${item.value} kWh<br/>`;
                        });
                        return result;
                    }
                },
                legend: {
                    top: '0%',
                    left: 'center',
                    data: ['Line 6 Main', 'Line 6 Shrink', 'Line 4 Main', 'Line 4 Shrink']
                },
                grid: {
                    left: '5%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: chartData.xAxis,
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel: {
                            rotate: 45,
                            fontSize: 10
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: 'Energy (kWh)',
                        nameLocation: 'middle',
                        nameGap: 50
                    }
                ],
                series: chartData.series.map(series => ({
                    name: series.name,
                    type: 'bar',
                    stack: series.name.includes('Line 6') ? 'Line 6' : 'Line 4',
                    barWidth: '40%',
                    data: series.data,
                    itemStyle: {
                        color: series.color,
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 5,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }))
            };
            barChart.setOption(barOption);
        } catch (error) {
            console.error("Error initializing bar chart:", error);
        }
    }, [energyTrendsData, frequency]);

    useEffect(() => {
        if (!pieChartRef.current) return;
        
        try {
            if (chartInstancesRef.current.pieChart) {
                chartInstancesRef.current.pieChart.dispose();
                chartInstancesRef.current.pieChart = null;
            }

            const pieChart = echarts.init(pieChartRef.current);
            chartInstancesRef.current.pieChart = pieChart;

            const pieOption = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} kWh ({d}%)'
                },
                legend: {
                    top: '0%',
                    left: 'center',
                    data: ['Line 6', 'Line 4']
                },
                series: [
                    {
                        name: 'Energy Consumption',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: true,
                            formatter: '{c} kWh'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '14',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: true
                        },
                        data: [
                            { value: energyData.line6_Total, name: 'Line 6', itemStyle: { color: '#f59e0b' } },
                            { value: energyData.line4_Total, name: 'Line 4', itemStyle: { color: '#60a5fa' } }
                        ]
                    }
                ]
            };
            pieChart.setOption(pieOption);
        } catch (error) {
            console.error("Error initializing pie chart:", error);
        }
    }, [energyData]);

    useEffect(() => {
        if (!utilizationChartRef.current) return;
        
        try {
            if (chartInstancesRef.current.utilizationChart) {
                chartInstancesRef.current.utilizationChart.dispose();
                chartInstancesRef.current.utilizationChart = null;
            }

            const utilizationPercentage = loadSummary.utlization || 0;
            const utilizationChart = echarts.init(utilizationChartRef.current);
            chartInstancesRef.current.utilizationChart = utilizationChart;

            const utilizationOption = {
                series: [
                    {
                        type: 'gauge',
                        startAngle: 90,
                        endAngle: -270,
                        pointer: {
                            show: false
                        },
                        progress: {
                            show: true,
                            overlap: false,
                            roundCap: true,
                            clip: false,
                            itemStyle: {
                                color: '#10b981'
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                width: 20,
                                color: [
                                    [utilizationPercentage / 100, '#10b981'],
                                    [1, '#e5e7eb']
                                ]
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        anchor: {
                            show: false
                        },
                        title: {
                            show: false
                        },
                        detail: {
                            valueAnimation: true,
                            formatter: '{value}%',
                            fontSize: 30,
                            offsetCenter: [0, 0],
                            color: '#10b981',
                            fontWeight: 'bold'
                        },
                        data: [
                            {
                                value: utilizationPercentage
                            }
                        ]
                    }
                ]
            };
            utilizationChart.setOption(utilizationOption);
        } catch (error) {
            console.error("Error initializing utilization chart:", error);
        }
    }, [loadSummary]);

    useEffect(() => {
        const handleResize = () => {
            try {
                if (chartInstancesRef.current.barChart) {
                    chartInstancesRef.current.barChart.resize();
                }
                if (chartInstancesRef.current.pieChart) {
                    chartInstancesRef.current.pieChart.resize();
                }
                if (chartInstancesRef.current.utilizationChart) {
                    chartInstancesRef.current.utilizationChart.resize();
                }
            } catch (error) {
                console.warn("Error during chart resize:", error);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const lineDetails = [
        {
            name: 'Line 6 (Main Line)',
            consumption: energyData.line6_Main,
            color: 'blue-400',
            fullLoad: getValueByVariable(loadSummary.line_6_Main || [], 'FullLoad', 0),
            idleLoad: getValueByVariable(loadSummary.line_6_Main || [], 'IdleLoad', 0),
            idleEnergy: getValueByVariable(loadSummary.line_6_Main || [], 'Idle_Energy', 0)
        },
        {
            name: 'Line 4 (Main Line)',
            consumption: energyData.line4_Main,
            color: 'blue-400',
            fullLoad: getValueByVariable(loadSummary.line_4_Main || [], 'FullLoad', 0),
            idleLoad: getValueByVariable(loadSummary.line_4_Main || [], 'IdleLoad', 0),
            idleEnergy: getValueByVariable(loadSummary.line_4_Main || [], 'Idle_Energy', 0)
        },
        {
            name: 'Line 6 (Shrinking Line)',
            consumption: energyData.line6_Shrink,
            color: 'blue-400',
            fullLoad: getValueByVariable(loadSummary.line_6_Shrink || [], 'FullLoad', 0),
            idleLoad: getValueByVariable(loadSummary.line_6_Shrink || [], 'IdleLoad', 0),
            idleEnergy: getValueByVariable(loadSummary.line_6_Shrink || [], 'Idle_Energy', 0)
        },
        {
            name: 'Line 4 (Shrinking Line)',
            consumption: energyData.line4_Shrink,
            color: 'blue-400',
            fullLoad: getValueByVariable(loadSummary.line_4_Shrink || [], 'FullLoad', 0),
            idleLoad: getValueByVariable(loadSummary.line_4_Shrink || [], 'IdleLoad', 0),
            idleEnergy: getValueByVariable(loadSummary.line_4_Shrink || [], 'Idle_Energy', 0)
        }
    ];

    return (
        <div className="h-full bg-gradient-to-br from-blue-50 to-gray-100">
            <Breadcrumb
                instanceName="Energy Dashboard"
                onTimeRangeApply={handleTimeRangeApply}
                lastUpdated={lastUpdated}
            />
            <div className="p-2 mx-auto grid grid-cols-1 lg:grid-cols-4 gap-2">
                {/* Left Column (75%) */}
                <div className="lg:col-span-3 space-y-2">
                    {/* Header Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {/* Total Energy Consumption */}
                        <div className="bg-white rounded-xl px-6 py-3 shadow-md transition-all hover:shadow-lg border-l-4 border-blue-500">
                            <div className="flex items-center gap-4">
                                <Zap className="h-8 w-8 text-blue-500" />
                                <div>
                                    <h2 className="text-sm font-medium text-gray-500">Total Energy Consumption</h2>
                                    <div className="flex items-baseline">
                                        <span className="text-2xl font-bold text-gray-800">{energyData.totalEnergy.toLocaleString()}</span>
                                        <span className="ml-1 text-gray-600">kWh</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Estimated Bill */}
                        <div className="bg-white rounded-xl px-6 py-3 shadow-md transition-all hover:shadow-lg border-l-4 border-green-500">
                            <div className="flex items-center gap-4">
                                <IndianRupee className="h-8 w-8 text-green-500" />
                                <div>
                                    <h2 className="text-sm font-medium text-gray-500">Estimated Bill</h2>
                                    <div className="flex items-baseline">
                                        <span className="text-2xl font-bold text-gray-800">₹{energyData.estimatedBill.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {/* Energy Trends Chart */}
                        <div className="bg-white h-[36vh] border rounded-xl p-2 shadow-md hover:shadow-lg transition-all">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <BarChart2 className="h-5 w-5 text-indigo-500" />
                                    <h2 className="text-lg font-bold text-gray-700">Energy Trend</h2>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <select
                                        value={frequency}
                                        onChange={handleFrequencyChange}
                                        className="px-2 py-1 border rounded-md text-sm bg-gray-50 text-gray-700"
                                    >
                                        <option value="day">Daily</option>
                                        <option value="week">Weekly</option>
                                        <option value="month">Monthly</option>
                                    </select>
                                </div>
                            </div>
                            <div ref={barChartRef} className="w-full h-[31vh]" />
                        </div>

                        {/* Overall Consumption Chart */}
                        <div className="bg-white h-[36vh] border rounded-xl p-2 shadow-md hover:shadow-lg transition-all">
                            <div className="flex items-center gap-2 mb-1">
                                <PieChart className="h-5 w-5 text-orange-500" />
                                <h2 className="text-lg font-bold text-gray-700">Overall Consumption</h2>
                            </div>
                            <div ref={pieChartRef} className="w-full h-[31vh]" />
                        </div>
                    </div>

                    {/* Line Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {lineDetails.map((line, index) => (
                            <div key={index} className="bg-[#E6C894] rounded-xl px-4 py-2 shadow-md hover:shadow-lg transition-all border-l-4 border-green-400">
                                <h2 className="text-lg font-bold text-gray-700 flex items-center">
                                    <div className={`w-3 h-3 rounded-full bg-${line.color} mr-2`}></div>
                                    {line.name}
                                </h2>
                                <div className="space-y-2 text-gray-700 mb-1">
                                    <p className="flex justify-between items-center">
                                        <span>Energy consumption:</span>
                                        <span className="font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md">
                                            {line.consumption} kWh
                                        </span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span>Full Load Hours:</span>
                                        <span className="font-medium text-blue-600">{line.fullLoad.toFixed(1)} hrs</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span>Idle Hours:</span>
                                        <span className="font-medium text-orange-600">{line.idleLoad.toFixed(1)} hrs</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span>Idle Energy:</span>
                                        <span className="font-medium text-red-600">{line.idleEnergy.toFixed(1)} kWh</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column (25%) */}
                <div className="lg:col-span-1 space-y-2">
                    {/* Alerts Section */}
                    <div className="bg-[#C7DFC7] rounded-xl p-4 shadow-md">
                        <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-red-500" />
                                <h2 className="text-lg font-bold text-gray-700">Alerts</h2>
                            </div>
                            <span className="bg-red-500 text-white rounded-full px-3 py-1 text-sm font-bold">12</span>
                        </div>

                        <div className="space-y-2">
                            {[
                                { title: "Machine is idle since 15 mins", line: "Amla Line 6 - Main Line", date: "01/02/2025, 07:53" },
                                { title: "Machine is idle since 15 mins", line: "Amla Line 4 - Shrinking Line", date: "31/01/2025, 21:43" },
                                { title: "PF is low", line: "Amla Line 4 - Shrinking Line", date: "31/01/2025, 11:40" }
                            ].map((alert, i) => (
                                <div key={i} className="bg-[#FFD17C] border rounded-lg px-3 py-2 hover:bg-amber-100 transition-colors cursor-pointer">
                                    <p className="font-semibold text-gray-800">{alert.title}</p>
                                    <p className="text-sm text-gray-600">{alert.line}</p>
                                    <div className="flex justify-between items-center mt-1">
                                        <p className="text-xs text-gray-500">{alert.date}</p>
                                        <ArrowRight className="h-4 w-4 text-red-500" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Possible Savings */}
                    <div className="bg-[#C7DFC7] rounded-xl p-2 shadow-md">
                        <div className="flex items-center gap-2 mb-2">
                            <IndianRupee className="h-5 w-5 text-green-500" />
                            <h2 className="text-lg font-bold text-gray-700">Possible Savings</h2>
                        </div>
                        <div className="rounded-lg px-4 flex justify-between items-center">
                            <p className="text-gray-700 font-semibold">Idle Energy savings:</p>
                            <p className="font-bold text-green-600 text-lg">₹{loadSummary.possibleSaving.toLocaleString()}</p>
                        </div>
                    </div>

                    {/* Environmental Impact */}
                    <div className="bg-[#C7DFC7] rounded-xl p-2 shadow-md">
                        <div className="flex items-center gap-2 mb-2">
                            <Leaf className="h-5 w-5 text-green-600" />
                            <h2 className="text-lg font-bold text-gray-700">Environmental Impact</h2>
                        </div>
                        <div className="space-y-2 px-4">
                            <div className="rounded-lg flex justify-between items-center">
                                <p className="text-gray-700 font-semibold">Production Loss:</p>
                                <p className="font-bold text-red-600">{loadSummary.production_Loss}%</p>
                            </div>
                            <div className="rounded-lg flex justify-between items-center">
                                <p className="flex text-gray-700 font-semibold">Carbon Emission:</p>
                                <p className="font-bold text-green-600">{energyData.co2Emission} tCO₂</p>
                            </div>
                        </div>
                    </div>

                    {/* Utilization */}
                    <div className="bg-[#C7DFC7] rounded-xl p-2 shadow-md">
                        <div className="flex items-center gap-2 ">
                            <Zap className="h-5 w-5 text-emerald-500" />
                            <h2 className="text-lg font-bold text-gray-700">Utilization</h2>
                        </div>
                        <div ref={utilizationChartRef} className="h-44" />
                        <div className="text-center mb-1">
                            <p className="text-gray-600 font-medium">Overall efficiency</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnergyDashboard;