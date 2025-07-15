import React from 'react';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import Breadcrumb from '@/Components/BreadCrumb/BreadcrumbRuntime';

const AmlaLine4Dashboard = () => {
    const mainLineLoadProfileRef = useRef(null);
    const shrinkingLineLoadProfileRef = useRef(null);
    const idleHourConsumptionRef = useRef(null);
    const availabilityChartRef = useRef(null);
    
    // Hardcoded data states
    const [lineData] = useState([
        {
            instanceid: 'dec146e7-295c-40d4-903a-6a61a913d824',
            variable: 'Active_Energy',
            value: 3870
        },
        {
            instanceid: '16cf3cdd-ef34-4450-a7ee-2e8222074613',
            variable: 'Active_Energy',
            value: 1790
        },
        {
            instanceid: 'dec146e7-295c-40d4-903a-6a61a913d824',
            variable: 'Estimate_Bill',
            value: 77400
        },
        {
            instanceid: '16cf3cdd-ef34-4450-a7ee-2e8222074613',
            variable: 'Estimate_Bill',
            value: 35800
        },
        {
            instanceid: '529a2b50-725e-4f24-80b1-63d0f860f0f4',
            variable: 'Voltage_L-L_Avg',
            value: 415
        },
        {
            instanceid: '529a2b50-725e-4f24-80b1-63d0f860f0f4',
            variable: 'Voltage_LN_Avg',
            value: 240
        },
        {
            instanceid: '39ff4795-63f7-4c3c-afe5-90d5133115d7',
            variable: 'Current_Avg',
            value: 45.3
        },
        {
            instanceid: '4e1dd090-4331-401c-b7a3-c08b4dad38aa',
            variable: 'PF_Total',
            value: 0.92
        },
        {
            instanceid: 'ad4d9f65-c957-4e79-a542-d3168c3b98ac',
            variable: 'Voltage_L-L_Avg',
            value: 410
        },
        {
            instanceid: 'ad4d9f65-c957-4e79-a542-d3168c3b98ac',
            variable: 'Voltage_LN_Avg',
            value: 237
        },
        {
            instanceid: '27ab18b6-152b-4382-8801-dd87b4726418',
            variable: 'Current_Avg',
            value: 32.7
        },
        {
            instanceid: 'e1c04f10-d794-432e-820c-ccd1150340cd',
            variable: 'PF_Total',
            value: 0.88
        }
    ]);

    const [totalEnergyConsumption] = useState(5660);
    const [estimatedBill] = useState(113200);
    const [timeRange, setTimeRange] = useState({
        from: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        to: new Date().toISOString()
    });
    const [lastUpdated, setLastUpdated] = useState(new Date());
    
    // Hardcoded load profile data
    const [mainLineLoadProfileData] = useState([
        { timestamp: '2025-01-01T08:00:00Z', value: 120 },
        { timestamp: '2025-01-01T09:00:00Z', value: 135 },
        { timestamp: '2025-01-01T10:00:00Z', value: 142 },
        { timestamp: '2025-01-01T11:00:00Z', value: 138 },
        { timestamp: '2025-01-01T12:00:00Z', value: 125 },
        { timestamp: '2025-01-01T13:00:00Z', value: 118 },
        { timestamp: '2025-01-01T14:00:00Z', value: 132 },
        { timestamp: '2025-01-01T15:00:00Z', value: 145 }
    ]);

    const [shrinkingLineLoadProfileData] = useState([
        { timestamp: '2025-01-01T08:00:00Z', value: 85 },
        { timestamp: '2025-01-01T09:00:00Z', value: 92 },
        { timestamp: '2025-01-01T10:00:00Z', value: 88 },
        { timestamp: '2025-01-01T11:00:00Z', value: 95 },
        { timestamp: '2025-01-01T12:00:00Z', value: 82 },
        { timestamp: '2025-01-01T13:00:00Z', value: 78 },
        { timestamp: '2025-01-01T14:00:00Z', value: 90 },
        { timestamp: '2025-01-01T15:00:00Z', value: 96 }
    ]);

    const [mainLineSummary] = useState({
        fullLoad: 120.5,
        idleLoad: 45.3
    });

    const [shrinkingLineSummary] = useState({
        fullLoad: 85.2,
        idleLoad: 32.1
    });

    // Hardcoded operator data
    const [operatorMainData] = useState([
        { date: '2025-01-01', idleload: 8.5, availability: 92.5 },
        { date: '2025-01-02', idleload: 7.2, availability: 94.1 },
        { date: '2025-01-03', idleload: 9.1, availability: 91.3 },
        { date: '2025-01-04', idleload: 6.8, availability: 95.2 },
        { date: '2025-01-05', idleload: 8.3, availability: 93.0 },
        { date: '2025-01-06', idleload: 7.9, availability: 93.7 },
        { date: '2025-01-07', idleload: 8.7, availability: 92.2 },
        { date: '2025-01-08', idleload: 7.5, availability: 94.5 },
        { date: '2025-01-09', idleload: 8.1, availability: 93.8 },
        { date: '2025-01-10', idleload: 6.9, availability: 95.1 }
    ]);

    const [operatorShrinkData] = useState([
        { date: '2025-01-01', idleload: 6.2, availability: 95.8 },
        { date: '2025-01-02', idleload: 5.8, availability: 96.3 },
        { date: '2025-01-03', idleload: 6.7, availability: 94.9 },
        { date: '2025-01-04', idleload: 5.3, availability: 97.1 },
        { date: '2025-01-05', idleload: 6.1, availability: 96.0 },
        { date: '2025-01-06', idleload: 5.9, availability: 96.4 },
        { date: '2025-01-07', idleload: 6.4, availability: 95.6 },
        { date: '2025-01-08', idleload: 5.7, availability: 96.7 },
        { date: '2025-01-09', idleload: 6.0, availability: 96.2 },
        { date: '2025-01-10', idleload: 5.5, availability: 96.9 }
    ]);

    // Function to safely format numeric values
    const safelyFormatNumber = (value, decimals = 2) => {
        if (value === null || value === undefined || isNaN(Number(value))) {
            return "0";
        }
        return Number(value).toFixed(decimals);
    };

    // Function to handle time range changes from breadcrumb
    const handleTimeRangeChange = (newTimeRange) => {
        setTimeRange(newTimeRange);
        setLastUpdated(new Date());
    };

    // Format date for charts
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    // Helper function to get value from line data by instance ID and variable name
    const getValueFromData = (instanceId, variableName) => {
        const dataPoint = lineData.find(item =>
            item.instanceid === instanceId &&
            item.variable === variableName
        );

        return dataPoint ? dataPoint.value : null;
    };

    // Get values for Main Line
    const mainLineVoltage = getValueFromData('529a2b50-725e-4f24-80b1-63d0f860f0f4', 'Voltage_L-L_Avg');
    const mainLinePhaseVoltage = getValueFromData('529a2b50-725e-4f24-80b1-63d0f860f0f4', 'Voltage_LN_Avg');
    const mainLineCurrent = getValueFromData('39ff4795-63f7-4c3c-afe5-90d5133115d7', 'Current_Avg');
    const mainLinePF = getValueFromData('4e1dd090-4331-401c-b7a3-c08b4dad38aa', 'PF_Total');
    const mainLineEnergy = getValueFromData('dec146e7-295c-40d4-903a-6a61a913d824', 'Active_Energy');

    // Get values for Shrinking Line
    const shrinkingLineVoltage = getValueFromData('ad4d9f65-c957-4e79-a542-d3168c3b98ac', 'Voltage_L-L_Avg');
    const shrinkingLinePhaseVoltage = getValueFromData('ad4d9f65-c957-4e79-a542-d3168c3b98ac', 'Voltage_LN_Avg');
    const shrinkingLineCurrent = getValueFromData('27ab18b6-152b-4382-8801-dd87b4726418', 'Current_Avg');
    const shrinkingLinePF = getValueFromData('e1c04f10-d794-432e-820c-ccd1150340cd', 'PF_Total');
    const shrinkingLineEnergy = getValueFromData('16cf3cdd-ef34-4450-a7ee-2e8222074613', 'Active_Energy');

    // Main Line Load Profile Chart
    useEffect(() => {
        if (mainLineLoadProfileRef.current && mainLineLoadProfileData.length > 0) {
            const mainLineChart = echarts.init(mainLineLoadProfileRef.current);

            // Format data for chart
            const timestamps = mainLineLoadProfileData.map(item => {
                const date = new Date(item.timestamp);
                return date.toLocaleString();
            });

            const values = mainLineLoadProfileData.map(item => item.value);

            mainLineChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    formatter: '{b}<br/><span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#4361ee"></span> Main Line: {c} kWh',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderColor: '#ccc',
                    borderWidth: 1,
                    textStyle: {
                        color: '#333'
                    },
                    extraCssText: 'box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);'
                },
                grid: {
                    left: '4%',
                    right: '2%',
                    bottom: '3%',
                    containLabel: true
                },
                legend: {
                    data: ['Main Line'],
                    top: 10,
                    textStyle: {
                        fontSize: 12,
                        color: '#333'
                    },
                    icon: 'roundRect'
                },
                xAxis: {
                    type: 'category',
                    data: timestamps,
                    axisLabel: {
                        rotate: 45,
                        fontSize: 10,
                        color: '#666'
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dashed',
                            opacity: 0.2
                        }
                    },
                    axisTick: {
                        alignWithLabel: true
                    }
                },
                yAxis: {
                    type: 'value',
                    name: 'load profile',
                    nameLocation: 'middle',
                    nameGap: 35,
                    nameTextStyle: {
                        color: '#666'
                    },
                    splitLine: {
                        lineStyle: {
                            type: 'dashed',
                            opacity: 0.3
                        }
                    }
                },
                series: [{
                    name: 'Main Line',
                    data: values,
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 6,
                    itemStyle: {
                        color: '#4361ee'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgba(67, 97, 238, 0.5)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(67, 97, 238, 0.1)'
                            }
                        ])
                    }
                }]
            });

            const handleResize = () => {
                mainLineChart.resize();
            };

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [mainLineLoadProfileRef, mainLineLoadProfileData]);

    // Shrinking Line Load Profile Chart
    useEffect(() => {
        if (shrinkingLineLoadProfileRef.current && shrinkingLineLoadProfileData.length > 0) {
            const shrinkingLineChart = echarts.init(shrinkingLineLoadProfileRef.current);

            // Format data for chart
            const timestamps = shrinkingLineLoadProfileData.map(item => {
                const date = new Date(item.timestamp);
                return date.toLocaleString();
            });

            const values = shrinkingLineLoadProfileData.map(item => item.value);

            shrinkingLineChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    formatter: '{b}<br/><span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#e63946"></span> Shrinking Line: {c} kWh',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderColor: '#ccc',
                    borderWidth: 1,
                    textStyle: {
                        color: '#333'
                    },
                    extraCssText: 'box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);'
                },
                legend: {
                    data: ['Shrinking Line'],
                    top: 10,
                    textStyle: {
                        fontSize: 12,
                        color: '#333'
                    },
                    icon: 'roundRect'
                },
                grid: {
                    left: '4%',
                    right: '2%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: timestamps,
                    axisLabel: {
                        rotate: 45,
                        fontSize: 10,
                        color: '#666'
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dashed',
                            opacity: 0.2
                        }
                    },
                    axisTick: {
                        alignWithLabel: true
                    }
                },
                yAxis: {
                    type: 'value',
                    name: 'load profile',
                    nameLocation: 'middle',
                    nameGap: 35,
                    nameTextStyle: {
                        color: '#666'
                    },
                    splitLine: {
                        lineStyle: {
                            type: 'dashed',
                            opacity: 0.3
                        }
                    }
                },
                series: [{
                    name: 'Shrinking Line',
                    data: values,
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 6,
                    itemStyle: {
                        color: '#4361ee'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgba(67, 97, 238, 0.5)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(67, 97, 238, 0.1)'
                            }
                        ])
                    }
                }]
            });

            const handleResize = () => {
                shrinkingLineChart.resize();
            };

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [shrinkingLineLoadProfileRef, shrinkingLineLoadProfileData]);

    // Idle Hour Consumption Chart
    useEffect(() => {
        if (idleHourConsumptionRef.current && operatorMainData.length > 0 && operatorShrinkData.length > 0) {
            const idleHourChart = echarts.init(idleHourConsumptionRef.current);

            // Format dates for x-axis
            const dates = operatorMainData.map(item => formatDate(item.date));

            // Data for both lines
            const mainLineData = operatorMainData.map(item => item.idleload);
            const shrinkingLineData = operatorShrinkData.map(item => item.idleload);

            idleHourChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    },
                    formatter: function (params) {
                        let result = params[0].name + '<br/>';
                        params.forEach(item => {
                            const color = item.seriesName === 'Main Line' ? '#0a369d' : '#4895ef';
                            result += `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${color}"></span> ${item.seriesName}: ${item.value.toFixed(2)} kWh<br/>`;
                        });
                        return result;
                    }
                },
                legend: {
                    data: ['Main Line', 'Shrinking Line'],
                    top: 10,
                    textStyle: {
                        fontSize: 12
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: dates,
                    axisLabel: {
                        rotate: 45,
                        fontSize: 10
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dashed',
                            opacity: 0.2
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    name: 'Idle Load (kWh)',
                    nameLocation: 'middle',
                    nameGap: 40,
                    splitLine: {
                        lineStyle: {
                            type: 'dashed',
                            opacity: 0.2
                        }
                    }
                },
                series: [
                    {
                        name: 'Main Line',
                        type: 'bar',
                        data: mainLineData,
                        barWidth: '25%',
                        barGap: '10%',
                        itemStyle: {
                            color: '#0a369d',
                            borderRadius: [4, 4, 0, 0]
                        }
                    },
                    {
                        name: 'Shrinking Line',
                        type: 'bar',
                        data: shrinkingLineData,
                        barWidth: '25%',
                        barGap: '10%',
                        itemStyle: {
                            color: '#4895ef',
                            borderRadius: [4, 4, 0, 0]
                        }
                    }
                ]
            });

            const handleResize = () => {
                idleHourChart.resize();
            };

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [idleHourConsumptionRef, operatorMainData, operatorShrinkData]);

    // Availability Chart
    useEffect(() => {
        if (availabilityChartRef.current && operatorMainData.length > 0 && operatorShrinkData.length > 0) {
            const availabilityChart = echarts.init(availabilityChartRef.current);

            // Format dates for x-axis
            const dates = operatorMainData.map(item => formatDate(item.date));

            // Data for availability
            const mainLineAvailability = operatorMainData.map(item => item.availability);
            const shrinkingLineAvailability = operatorShrinkData.map(item => item.availability);

            availabilityChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: function (params) {
                        let result = params[0].name + '<br/>';
                        params.forEach(item => {
                            const color = item.seriesName === 'Main Line' ? '#006400' : '#90EE90';
                            result += `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${color}"></span> ${item.seriesName}: ${item.value.toFixed(2)}%<br/>`;
                        });
                        return result;
                    }
                },
                legend: {
                    data: ['Main Line', 'Shrinking Line'],
                    top: 10,
                    textStyle: {
                        fontSize: 12
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: dates,
                    axisLabel: {
                        rotate: 45,
                        fontSize: 10
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dashed',
                            opacity: 0.2
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    name: 'Availability (%)',
                    nameLocation: 'middle',
                    nameGap: 40,
                    axisLabel: {
                        formatter: '{value}%'
                    },
                    splitLine: {
                        lineStyle: {
                            type: 'dashed',
                            opacity: 0.2
                        }
                    }
                },
                series: [
                    {
                        name: 'Main Line',
                        type: 'bar',
                        data: mainLineAvailability,
                        barWidth: '25%',
                        barGap: '10%',
                        itemStyle: {
                            color: '#006400',
                            borderRadius: [4, 4, 0, 0]
                        }
                    },
                    {
                        name: 'Shrinking Line',
                        type: 'bar',
                        data: shrinkingLineAvailability,
                        barWidth: '25%',
                        barGap: '10%',
                        itemStyle: {
                            color: '#90EE90',
                            borderRadius: [4, 4, 0, 0]
                        }
                    }
                ]
            });

            const handleResize = () => {
                availabilityChart.resize();
            };

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [availabilityChartRef, operatorMainData, operatorShrinkData]);

    return (
        <div className="bg-gradient-to-br from-blue-50 to-gray-100">
            <Breadcrumb
                instanceName="Production / Amla line_4"
                onTimeRangeApply={handleTimeRangeChange}
                lastUpdated={lastUpdated}
            />
            <div className="mx-auto p-2">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 bg-white p-2 rounded-xl shadow-lg border-l-4 border-green-600">
                    <h1 className="text-xl sm:text-2xl font-bold text-green-800">Amla Line - 4 (28 ml)</h1>
                    <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0">
                        <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-lg shadow-md">
                            <span className="font-semibold">Total Energy Consumption: </span>
                            <span className="font-bold">{`${safelyFormatNumber(totalEnergyConsumption)} kWh`}</span>
                        </div>
                        <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-lg shadow-md">
                            <span className="font-semibold">Estimated Bill: </span>
                            <span className="font-bold">{`₹ ${Math.round(estimatedBill).toLocaleString()}`}</span>
                        </div>
                    </div>
                </div>

                {/* Main Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                    {/* Main Line Card */}
                    <div className="bg-[#E5C38B] rounded-xl shadow-md overflow-hidden border border-[#FFC969]">
                        <div className="flex w-full">
                            <div className="w-1/2 bg-gradient-to-r from-[#E5C38B] to-[#FFC969] p-3">
                                <h2 className="text-lg font-bold text-amber-900">Main Line</h2>
                            </div>
                            <div className="w-1/2 bg-gradient-to-r from-gray-200 to-gray-300 p-3">
                                <div className="flex flex-row justify-between items-center">
                                    <div className="text-center">
                                        <span className="text-sm font-medium text-gray-700">Run Hours:</span>
                                        <span className="ml-1 text-lg font-bold text-gray-700">{safelyFormatNumber(mainLineSummary.fullLoad, 1)} Hrs</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-sm font-medium text-gray-700">Idle Hours:</span>
                                        <span className="ml-1 text-lg font-bold text-gray-700">{safelyFormatNumber(mainLineSummary.idleLoad, 1)} Hrs</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 w-full flex flex-col md:flex-row gap-2">
                            <div className="grid grid-cols-2 gap-3 flex-grow">
                                <div className="bg-[#FFC969] p-3 rounded-lg shadow-sm transition-all hover:shadow-md">
                                    <p className="font-medium text-amber-900">Phase Voltage</p>
                                    <p className="text-xl font-bold text-amber-950">
                                        {mainLinePhaseVoltage ? `${safelyFormatNumber(mainLinePhaseVoltage, 1)} V` : "0 V"}
                                    </p>
                                </div>
                                <div className="bg-[#FFC969] p-3 rounded-lg shadow-sm transition-all hover:shadow-md">
                                    <p className="font-medium text-amber-900">Line Voltage</p>
                                    <p className="text-xl font-bold text-amber-950">
                                        {mainLineVoltage ? `${safelyFormatNumber(mainLineVoltage, 1)} V` : "0 V"}
                                    </p>
                                </div>
                                <div className="bg-[#FFC969] p-3 rounded-lg shadow-sm transition-all hover:shadow-md">
                                    <p className="font-medium text-amber-900">Avg Current</p>
                                    <p className="text-xl font-bold text-amber-950">
                                        {mainLineCurrent ? `${safelyFormatNumber((mainLineCurrent * 3), 2)} A` : "0 A"}
                                    </p>
                                </div>
                                <div className="bg-[#FFC969] p-3 rounded-lg shadow-sm transition-all hover:shadow-md">
                                    <p className="font-medium text-amber-900">PF Total</p>
                                    <p className="text-xl font-bold text-amber-950">
                                        {mainLinePF ? `${safelyFormatNumber(mainLinePF, 2)}` : "0"}
                                    </p>
                                </div>
                            </div>
                            <div className="bg-[#FFC969] p-4 rounded-lg shadow-md md:w-1/4">
                                <p className="font-medium text-amber-900">Energy Consumption</p>
                                <p className="text-2xl font-bold text-amber-950">
                                    {mainLineEnergy ? `${safelyFormatNumber(mainLineEnergy, 2)} kWh` : "0 kWh"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Shrinking Line Card */}
                    <div className="bg-[#E5C38B] rounded-xl shadow-md overflow-hidden border border-[#FFC969]">
                        <div className="flex w-full">
                            <div className="w-1/2 bg-gradient-to-r from-[#E5C38B] to-[#FFC969] p-3">
                                <h2 className="text-lg font-bold text-amber-900">Shrinking Line</h2>
                            </div>
                            <div className="w-1/2 bg-gradient-to-r from-gray-200 to-gray-300 p-3">
                                <div className="flex flex-row justify-between items-center">
                                    <div className="text-center">
                                        <span className="text-sm font-medium text-gray-700">Run Hours:</span>
                                        <span className="ml-1 text-lg font-bold text-gray-700">{safelyFormatNumber(shrinkingLineSummary.fullLoad, 1)} Hrs</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-sm font-medium text-gray-700">Idle Hours:</span>
                                        <span className="ml-1 text-lg font-bold text-gray-700">{safelyFormatNumber(shrinkingLineSummary.idleLoad, 1)} Hrs</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 w-full flex flex-col md:flex-row gap-2">
                            <div className="grid grid-cols-2 gap-3 flex-grow">
                                <div className="bg-[#FFC969] p-3 rounded-lg shadow-sm transition-all hover:shadow-md">
                                    <p className="font-medium text-amber-900">Phase Voltage</p>
                                    <p className="text-xl font-bold text-amber-950">
                                        {shrinkingLinePhaseVoltage ? `${safelyFormatNumber(shrinkingLinePhaseVoltage, 2)} V` : "0"}
                                    </p>
                                </div>
                                <div className="bg-[#FFC969] p-3 rounded-lg shadow-sm transition-all hover:shadow-md">
                                    <p className="font-medium text-amber-900">Line Voltage</p>
                                    <p className="text-xl font-bold text-amber-950">
                                        {shrinkingLineVoltage ? `${safelyFormatNumber(shrinkingLineVoltage, 2)} V` : "0"}
                                    </p>
                                </div>
                                <div className="bg-[#FFC969] p-3 rounded-lg shadow-sm transition-all hover:shadow-md">
                                    <p className="font-medium text-amber-900">Avg Current</p>
                                    <p className="text-xl font-bold text-amber-950">
                                        {shrinkingLineCurrent ? `${safelyFormatNumber(shrinkingLineCurrent, 2)} A` : "0"}
                                    </p>
                                </div>
                                <div className="bg-[#FFC969] p-3 rounded-lg shadow-sm transition-all hover:shadow-md">
                                    <p className="font-medium text-amber-900">PF Total</p>
                                    <p className="text-xl font-bold text-amber-950">
                                        {shrinkingLinePF ? `${safelyFormatNumber(shrinkingLinePF, 2)} ` : "0"}
                                    </p>
                                </div>
                            </div>
                            <div className="bg-[#FFC969] p-4 rounded-lg shadow-md md:w-1/4">
                                <p className="font-medium text-amber-900">Energy Consumption</p>
                                <p className="text-2xl font-bold text-amber-950">
                                    {shrinkingLineEnergy ? `${safelyFormatNumber(shrinkingLineEnergy, 2)} kWh` : "0"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {/* Main Line Load Profile Chart */}
                    <div className="bg-white h-[40vh] p-4 rounded-xl shadow-md border border-gray-200 transition-all hover:shadow-lg">
                        <h3 className="text-md font-semibold text-gray-700 ">Load Profile of Main Line </h3>
                        <div ref={mainLineLoadProfileRef} className="w-full h-[35vh]"></div>
                    </div>

                    {/* Shrinking Line Load Profile Chart */}
                    <div className="bg-white h-[40vh] p-4 rounded-xl shadow-md border border-gray-200 transition-all hover:shadow-lg">
                        <h3 className="text-md font-semibold text-gray-700 ">Load Profile of Shrinking Line </h3>
                        <div ref={shrinkingLineLoadProfileRef} className="w-full h-[35vh]"></div>
                    </div>

                    {/* Idle Hour Consumption */}
                    <div className="bg-white h-[40vh] p-4 rounded-xl shadow-md border border-gray-200 transition-all hover:shadow-lg">
                        <h3 className="text-md font-semibold text-gray-700 mb-2">Idle hour of Line_4</h3>
                        <div ref={idleHourConsumptionRef} className="w-full h-[35vh]"></div>
                    </div>

                    {/* Availability Chart */}
                    <div className="bg-white h-[40vh] p-4 rounded-xl shadow-md border border-gray-200 transition-all hover:shadow-lg">
                        <h3 className="text-md font-semibold text-gray-700 mb-2">Availability of Line_4</h3>
                        <div ref={availabilityChartRef} className="w-full h-[35vh]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AmlaLine4Dashboard;