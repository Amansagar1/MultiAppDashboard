// import React from 'react';
// import * as echarts from 'echarts';
// import { useEffect, useRef, useState } from 'react';
// import Breadcrumb from '@/Components/BreadCrumb/BreadcrumbRuntime';
// import { GetLineDetails, loadProfileLine6Main, loadProfileLine6Shrink, loadSummaryLine6Main, loadSummaryLine6Shrink } from '../../webServices/ApiControllers';

// const AmlaLine6Dashboard = () => {
//     const mainLineLoadProfileRef = useRef(null);
//     const shrinkingLineLoadProfileRef = useRef(null);
//     const idleHourConsumptionRef = useRef(null);
//     const availabilityChartRef = useRef(null);
//     const [lineData, setLineData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [totalEnergyConsumption, setTotalEnergyConsumption] = useState(0);
//     const [estimatedBill, setEstimatedBill] = useState(0);
//     const [timeRange, setTimeRange] = useState({
//         from: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
//         to: new Date().toISOString()
//     });
//     const [lastUpdated, setLastUpdated] = useState(new Date());
//     const [mainLineLoadProfileData, setMainLineLoadProfileData] = useState([]);
//     const [shrinkingLineLoadProfileData, setShrinkingLineLoadProfileData] = useState([]);
//     const [mainLineSummary, setMainLineSummary] = useState({
//         fullLoad: 0,
//         idleLoad: 0
//     });
//     const [shrinkingLineSummary, setShrinkingLineSummary] = useState({
//         fullLoad: 0,
//         idleLoad: 0
//     });

//     // Loading spinner component
//     const LoadingSpinner = () => (
//         <div className="flex items-center p-1.5">
//             <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//     );

//     const ChartLoadingSpinner = () => (
//         <div className="flex items-center justify-center p-2">
//             <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//     );

//     // Function to safely format numeric values
//     const safelyFormatNumber = (value, decimals = 2) => {
//         // Check if value is a number or can be converted to one
//         if (value === null || value === undefined || isNaN(Number(value))) {
//             return "0";
//         }
//         return Number(value).toFixed(decimals);
//     };

//     // Function to handle time range changes from breadcrumb
//     const handleTimeRangeChange = (newTimeRange) => {
//         setTimeRange(newTimeRange);
//         setLastUpdated(new Date());
//     };

//     useEffect(() => {
//         const fetchLineData = async () => {
//             setLoading(true);
//             try {
//                 const lineNumber = 6;
//                 const response = await GetLineDetails({
//                     lineNumber,
//                     from: timeRange.from,
//                     to: timeRange.to
//                 });
//                 // console.log("getLineDetails", response);

//                 if (response && Array.isArray(response)) {
//                     setLineData(response);

//                     // Calculate total energy consumption and estimated bill
//                     const mainLineEnergy = response.find(item =>
//                         item.instanceid === '9e2283dd-81e4-47fd-9e37-8aa2db631bac' &&
//                         item.variable === 'Active_Energy'
//                     );

//                     const shrinkingLineEnergy = response.find(item =>
//                         item.instanceid === '5bab2ed3-77f2-458e-84a3-3875286154a3' &&
//                         item.variable === 'Active_Energy'
//                     );

//                     const mainLineBill = response.find(item =>
//                         item.instanceid === '9e2283dd-81e4-47fd-9e37-8aa2db631bac' &&
//                         item.variable === 'Estimate_Bill'
//                     );

//                     const shrinkingLineBill = response.find(item =>
//                         item.instanceid === '5bab2ed3-77f2-458e-84a3-3875286154a3' &&
//                         item.variable === 'Estimate_Bill'
//                     );

//                     const totalEnergy = (mainLineEnergy?.value || 0) + (shrinkingLineEnergy?.value || 0);
//                     const totalBill = (mainLineBill?.value || 0) + (shrinkingLineBill?.value || 0);

//                     setTotalEnergyConsumption(totalEnergy);
//                     setEstimatedBill(totalBill);
//                 }
//             } catch (error) {
//                 console.error("Error fetching line data:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchLineData();
//     }, [timeRange]);

//     // Fetch Main Line Load Profile data
//     useEffect(() => {
//         const fetchMainLineLoadProfile = async () => {
//             setLoading(true);
//             try {
//                 const response = await loadProfileLine6Main({
//                     from: timeRange.from,
//                     to: timeRange.to
//                 });
//                 // console.log("loadProfileLine4Main", response);
//                 if (response && Array.isArray(response)) {
//                     setMainLineLoadProfileData(response);
//                 }
//             } catch (error) {
//                 console.error("Error fetching main line load profile:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchMainLineLoadProfile();
//     }, [timeRange]);

//     // Fetch Shrinking Line Load Profile data
//     useEffect(() => {
//         const fetchShrinkingLineLoadProfile = async () => {
//             setLoading(true);
//             try {
//                 const response = await loadProfileLine6Shrink({
//                     from: timeRange.from,
//                     to: timeRange.to
//                 });
//                 // console.log("loadProfileLine4Shrink", response);
//                 if (response && Array.isArray(response)) {
//                     setShrinkingLineLoadProfileData(response);
//                 }
//             } catch (error) {
//                 console.error("Error fetching shrinking line load profile:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchShrinkingLineLoadProfile();
//     }, [timeRange]);

//     // Fetch Main Line Summary data
//     useEffect(() => {
//         const fetchMainLineSummary = async () => {
//             setLoading(true);
//             try {
//                 const response = await loadSummaryLine6Main({
//                     from: timeRange.from,
//                     to: timeRange.to
//                 });
//                 // console.log("loadSummaryLine4Main", response);
//                 if (response && Array.isArray(response)) {
//                     const fullLoad = response.find(item => item.variable === 'FullLoad')?.value || 0;
//                     const idleLoad = response.find(item => item.variable === 'IdleLoad')?.value || 0;

//                     setMainLineSummary({
//                         fullLoad,
//                         idleLoad
//                     });
//                 }
//             } catch (error) {
//                 console.error("Error fetching main line summary:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchMainLineSummary();
//     }, [timeRange]);

//     // Fetch Shrinking Line Summary data
//     useEffect(() => {
//         const fetchShrinkingLineSummary = async () => {
//             setLoading(true);
//             try {
//                 const response = await loadSummaryLine6Shrink({
//                     from: timeRange.from,
//                     to: timeRange.to
//                 });
//                 // console.log("loadSummaryLine4Shrink", response);
//                 if (response && Array.isArray(response)) {
//                     const fullLoad = response.find(item => item.variable === 'FullLoad')?.value || 0;
//                     const idleLoad = response.find(item => item.variable === 'IdleLoad')?.value || 0;

//                     setShrinkingLineSummary({
//                         fullLoad,
//                         idleLoad
//                     });
//                 }
//             } catch (error) {
//                 console.error("Error fetching shrinking line summary:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchShrinkingLineSummary();
//     }, [timeRange]);

//     // Helper function to get value from line data by instance ID and variable name
//     const getValueFromData = (instanceId, variableName) => {
//         if (!lineData) return null;

//         const dataPoint = lineData.find(item =>
//             item.instanceid === instanceId &&
//             item.variable === variableName
//         );

//         return dataPoint ? dataPoint.value : null;
//     };

//     // Get values for Main Line
//     const mainLineVoltage = getValueFromData('da3d1725-1dd6-43c2-ba80-c1fdbcf48803', 'Voltage_L-L_Avg');
//     const mainLinePhaseVoltage = getValueFromData('da3d1725-1dd6-43c2-ba80-c1fdbcf48803', 'Voltage_LN_Avg');
//     const mainLineCurrent = getValueFromData('2e1cc646-e595-4ccc-9638-c5a14a1c98c0', 'Current_Avg');
//     const mainLinePF = getValueFromData('1315ba67-957e-4a81-86ec-375450c090ce', 'PF_Total');
//     const mainLineEnergy = getValueFromData('9e2283dd-81e4-47fd-9e37-8aa2db631bac', 'Active_Energy');

//     // Get values for Shrinking Line
//     const shrinkingLineVoltage = getValueFromData('0cea029d-68fa-4dfa-8faa-586459ae8ea2', 'Voltage_L-L_Avg');
//     const shrinkingLinePhaseVoltage = getValueFromData('0cea029d-68fa-4dfa-8faa-586459ae8ea2', 'Voltage_LN_Avg');
//     const shrinkingLineCurrent = getValueFromData('bea95977-dba1-4d88-8ef2-b787102f379e', 'Current_Avg');
//     const shrinkingLinePF = getValueFromData('bd7fa5c7-3648-4755-bcc8-df3cb17e0f3c', 'PF_Total');
//     const shrinkingLineEnergy = getValueFromData('5bab2ed3-77f2-458e-84a3-3875286154a3', 'Active_Energy');

//     // Main Line Load Profile Chart
//     useEffect(() => {
//         if (mainLineLoadProfileRef.current && mainLineLoadProfileData.length > 0) {
//             const mainLineChart = echarts.init(mainLineLoadProfileRef.current);

//             // Format data for chart
//             const timestamps = mainLineLoadProfileData.map(item => {
//                 const date = new Date(item.timestamp);
//                 return date.toLocaleString();
//             });

//             const values = mainLineLoadProfileData.map(item => item.value);

//             mainLineChart.setOption({
//                 tooltip: {
//                     trigger: 'axis',
//                     formatter: '{b}<br/><span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#4361ee"></span> Main Line: {c} kWh',
//                     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//                     borderColor: '#ccc',
//                     borderWidth: 1,
//                     textStyle: {
//                         color: '#333'
//                     },
//                     extraCssText: 'box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);'
//                 },
//                 grid: {
//                     left: '4%',
//                     right: '2%',
//                     bottom: '3%',
//                     containLabel: true
//                 },
//                 legend: {
//                     data: ['Main Line'],
//                     top: 10,
//                     textStyle: {
//                         fontSize: 12,
//                         color: '#333'
//                     },
//                     icon: 'roundRect'
//                 },
//                 xAxis: {
//                     type: 'category',
//                     data: timestamps,
//                     axisLabel: {
//                         rotate: 45,
//                         fontSize: 10,
//                         color: '#666'
//                     },
//                     splitLine: {
//                         show: true,
//                         lineStyle: {
//                             type: 'dashed',
//                             opacity: 0.2
//                         }
//                     },
//                     axisTick: {
//                         alignWithLabel: true
//                     }
//                 },
//                 yAxis: {
//                     type: 'value',
//                     name: 'load profile',
//                     nameLocation: 'middle',
//                     nameGap: 35,
//                     nameTextStyle: {
//                         color: '#666'
//                     },
//                     splitLine: {
//                         lineStyle: {
//                             type: 'dashed',
//                             opacity: 0.3
//                         }
//                     }
//                 },
//                 series: [{
//                     name: 'Main Line',
//                     data: values,
//                     type: 'line',
//                     smooth: true,
//                     symbol: 'circle',
//                     symbolSize: 6,
//                     itemStyle: {
//                         color: '#4361ee'
//                     },
//                     areaStyle: {
//                         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//                             {
//                                 offset: 0,
//                                 color: 'rgba(67, 97, 238, 0.5)'
//                             },
//                             {
//                                 offset: 1,
//                                 color: 'rgba(67, 97, 238, 0.1)'
//                             }
//                         ])
//                     }
//                 }]
//             });

//             const handleResize = () => {
//                 mainLineChart.resize();
//             };

//             window.addEventListener('resize', handleResize);
//             return () => window.removeEventListener('resize', handleResize);
//         }
//     }, [mainLineLoadProfileRef, mainLineLoadProfileData]);

//     // Shrinking Line Load Profile Chart
//     useEffect(() => {
//         if (shrinkingLineLoadProfileRef.current && shrinkingLineLoadProfileData.length > 0) {
//             const shrinkingLineChart = echarts.init(shrinkingLineLoadProfileRef.current);

//             // Format data for chart
//             const timestamps = shrinkingLineLoadProfileData.map(item => {
//                 const date = new Date(item.timestamp);
//                 return date.toLocaleString();
//             });

//             const values = shrinkingLineLoadProfileData.map(item => item.value);

//             shrinkingLineChart.setOption({
//                 tooltip: {
//                     trigger: 'axis',
//                     formatter: '{b}<br/><span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#e63946"></span> Shrinking Line: {c} kWh',
//                     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//                     borderColor: '#ccc',
//                     borderWidth: 1,
//                     textStyle: {
//                         color: '#333'
//                     },
//                     extraCssText: 'box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);'
//                 },
//                 legend: {
//                     data: ['Shrinking Line'],
//                     top: 10,
//                     textStyle: {
//                         fontSize: 12,
//                         color: '#333'
//                     },
//                     icon: 'roundRect'
//                 },
//                 grid: {
//                     left: '4%',
//                     right: '2%',
//                     bottom: '3%',
//                     containLabel: true
//                 },
//                 xAxis: {
//                     type: 'category',
//                     data: timestamps,
//                     axisLabel: {
//                         rotate: 45,
//                         fontSize: 10,
//                         color: '#666'
//                     },
//                     splitLine: {
//                         show: true,
//                         lineStyle: {
//                             type: 'dashed',
//                             opacity: 0.2
//                         }
//                     },
//                     axisTick: {
//                         alignWithLabel: true
//                     }
//                 },
//                 yAxis: {
//                     type: 'value',
//                     name: 'load profile',
//                     nameLocation: 'middle',
//                     nameGap: 35,
//                     nameTextStyle: {
//                         color: '#666'
//                     },
//                     splitLine: {
//                         lineStyle: {
//                             type: 'dashed',
//                             opacity: 0.3
//                         }
//                     }
//                 },
//                 series: [{
//                     name: 'Shrinking Line',
//                     data: values,
//                     type: 'line',
//                     smooth: true,
//                     symbol: 'circle',
//                     symbolSize: 6,
//                     itemStyle: {
//                         color: '#4361ee'
//                     },
//                     areaStyle: {
//                         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//                             {
//                                 offset: 0,
//                                 color: 'rgba(67, 97, 238, 0.5)'
//                             },
//                             {
//                                 offset: 1,
//                                 color: 'rgba(67, 97, 238, 0.1)'
//                             }
//                         ])
//                     }
//                 }]
//             });

//             const handleResize = () => {
//                 shrinkingLineChart.resize();
//             };

//             window.addEventListener('resize', handleResize);
//             return () => window.removeEventListener('resize', handleResize);
//         }
//     }, [shrinkingLineLoadProfileRef, shrinkingLineLoadProfileData]);

//     useEffect(() => {
//         // Idle Hour Consumption Chart
//         if (idleHourConsumptionRef.current) {
//             const idleHourChart = echarts.init(idleHourConsumptionRef.current);

//             const hours = ['08:00', '12:00', '16:00', '20:00', '00:00', '04:00'];
//             const mainLineData = [12, 14, 13, 11, 14, 12];
//             const shrinkingLineData = [10, 7, 9, 6, 9, 8];
//             const consumption = [1.1, 0.9, 1.05, 0.85, 1.1, 0.95];

//             idleHourChart.setOption({
//                 tooltip: {
//                     trigger: 'axis'
//                 },
//                 xAxis: {
//                     type: 'category',
//                     data: hours,
//                     splitLine: {
//                         show: true,
//                         lineStyle: {
//                             type: 'dashed',
//                             opacity: 0.2
//                         }
//                     }
//                 },
//                 yAxis: [
//                     {
//                         type: 'value',
//                         name: 'kWh',
//                         min: 0,
//                         max: 15,
//                         position: 'left',
//                         splitLine: {
//                             show: true,
//                             lineStyle: {
//                                 type: 'dashed',
//                                 opacity: 0.2
//                             }
//                         }
//                     },
//                     {
//                         type: 'value',
//                         name: 'PF',
//                         min: 0,
//                         max: 1.25,
//                         position: 'right',
//                         splitLine: {
//                             show: false
//                         }
//                     }
//                 ],
//                 series: [
//                     {
//                         name: 'Main Line',
//                         type: 'line',
//                         data: mainLineData,
//                         color: '#4895ef',
//                         smooth: true,
//                         symbolSize: 6,
//                         lineStyle: {
//                             width: 3
//                         }
//                     },
//                     {
//                         name: 'Shrinking Line',
//                         type: 'line',
//                         data: shrinkingLineData,
//                         color: '#f72585',
//                         smooth: true,
//                         symbolSize: 6,
//                         lineStyle: {
//                             width: 3
//                         }
//                     },
//                     {
//                         name: 'Unit Consumption',
//                         type: 'line',
//                         data: consumption,
//                         yAxisIndex: 1,
//                         color: '#ffd166',
//                         smooth: true,
//                         symbolSize: 6,
//                         lineStyle: {
//                             width: 3
//                         }
//                     }
//                 ],
//                 legend: {
//                     data: ['Main Line', 'Shrinking Line', 'Unit Consumption'],
//                     top: 10,
//                     textStyle: {
//                         fontSize: 10
//                     }
//                 }
//             });

//             const handleResize = () => {
//                 idleHourChart.resize();
//             };

//             window.addEventListener('resize', handleResize);
//             return () => window.removeEventListener('resize', handleResize);
//         }
//     }, [idleHourConsumptionRef]);

//     useEffect(() => {
//         // Availability Chart
//         if (availabilityChartRef.current) {
//             const availabilityChart = echarts.init(availabilityChartRef.current);

//             const hours = Array.from({ length: 24 }, (_, i) => i);

//             // Generate availability data - alternating bars for Main Line and Shrinking Line
//             const mainLineData = hours.map(() => Math.random() * 25 + 75);
//             const shrinkingLineData = hours.map(() => Math.random() * 25 + 75);

//             availabilityChart.setOption({
//                 grid: { left: 40, right: 20, top: 50, bottom: 50 },
//                 tooltip: {
//                     trigger: 'axis',
//                     axisPointer: {
//                         type: 'shadow'
//                     }
//                 },
//                 xAxis: {
//                     type: 'category',
//                     data: hours,
//                     axisLabel: { rotate: 0 },
//                     splitLine: {
//                         show: true,
//                         lineStyle: {
//                             type: 'dashed',
//                             opacity: 0.2
//                         }
//                     }
//                 },
//                 yAxis: {
//                     type: 'value',
//                     min: 0,
//                     max: 100,
//                     interval: 25,
//                     axisLabel: {
//                         formatter: '{value}%'
//                     },
//                     splitLine: {
//                         show: true,
//                         lineStyle: {
//                             type: 'dashed',
//                             opacity: 0.2
//                         }
//                     }
//                 },
//                 series: [
//                     {
//                         name: 'Main Line',
//                         type: 'bar',
//                         data: mainLineData,
//                         color: '#4361ee',
//                         barWidth: '30%',
//                         barGap: '0%',
//                         xAxisIndex: 0,
//                         itemStyle: {
//                             borderRadius: [4, 4, 0, 0]
//                         }
//                     },
//                     {
//                         name: 'Shrinking Line',
//                         type: 'bar',
//                         data: shrinkingLineData,
//                         color: '#e63946',
//                         barWidth: '30%',
//                         barGap: '0%',
//                         xAxisIndex: 0,
//                         itemStyle: {
//                             borderRadius: [4, 4, 0, 0]
//                         }
//                     }
//                 ],
//                 legend: {
//                     data: ['Main Line', 'Shrinking Line'],
//                     top: 10,
//                     textStyle: {
//                         fontSize: 10
//                     }
//                 }
//             });

//             const handleResize = () => {
//                 availabilityChart.resize();
//             };

//             window.addEventListener('resize', handleResize);
//             return () => window.removeEventListener('resize', handleResize);
//         }
//     }, [availabilityChartRef]);

//     return (
//         <div className="bg-gradient-to-br from-blue-50 to-gray-100">
//             <Breadcrumb
//                 instanceName="Production / Amla line_6"
//                 onTimeRangeApply={handleTimeRangeChange}
//                 lastUpdated={lastUpdated}
//             />
//             <div className="mx-auto p-2">
//                 {/* Header */}
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 bg-white p-2 rounded-xl shadow-lg border-l-4 border-green-600">
//                     <h1 className="text-xl sm:text-2xl font-bold text-green-800">Amla Line - 6 (65 ml)</h1>
//                     <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0">
//                         <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-lg shadow-md">
//                             <span className="font-semibold">Total Energy Consumption: </span>
//                             <span className="font-bold">{loading ? "Loading..." : `${safelyFormatNumber(totalEnergyConsumption)} kWh`}</span>
//                         </div>
//                         <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-lg shadow-md">
//                             <span className="font-semibold">Estimated Bill: </span>
//                             <span className="font-bold">{loading ? "Loading..." : `₹ ${Math.round(estimatedBill).toLocaleString()}`}</span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Main Cards */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
//                     {/* Main Line Card */}
//                     <div className="bg-[#E5C38B] rounded-xl shadow-md overflow-hidden border border-[#FFC969]">
//                         <div className="flex w-full">
//                             <div className="w-1/2 bg-gradient-to-r from-[#E5C38B] to-[#FFC969] p-3">
//                                 <h2 className="text-lg font-bold text-amber-900">Main Line</h2>
//                             </div>
//                             <div className="w-1/2 bg-gradient-to-r from-gray-200 to-gray-300 p-3">
//                                 <div className="flex flex-row justify-between items-center">
//                                     <div className="text-center">
//                                         <span className="text-sm font-medium text-gray-700">Run Hours:</span>
//                                         <span className="ml-1 text-lg font-bold text-gray-700">{safelyFormatNumber(mainLineSummary.fullLoad, 1)} Hrs</span>
//                                     </div>
//                                     <div className="text-center">
//                                         <span className="text-sm font-medium text-gray-700">Idle Hours:</span>
//                                         <span className="ml-1 text-lg font-bold text-gray-700">{safelyFormatNumber(mainLineSummary.idleLoad, 1)} Hrs</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="p-4 w-full flex flex-col md:flex-row gap-2">
//                             <div className="grid grid-cols-2 gap-3 flex-grow">
//                                 <div className="bg-[#FFC969] p-3 rounded-lg shadow-sm transition-all hover:shadow-md">
//                                     <p className="font-medium text-amber-900">Phase Voltage</p>
//                                     {loading ? (
//                                         <LoadingSpinner />
//                                     ) : (
//                                         <p className="text-xl font-bold text-amber-950">
//                                             {mainLinePhaseVoltage ? `${safelyFormatNumber(mainLinePhaseVoltage, 1)} V` : "0 V"}
//                                         </p>
//                                     )}
//                                 </div>
//                                 <div className="bg-[#FFC969] p-3 rounded-lg shadow-sm transition-all hover:shadow-md">
//                                     <p className="font-medium text-amber-900">Line Voltage</p>
//                                     {loading ? (
//                                         <LoadingSpinner />
//                                     ) : (
//                                         <p className="text-xl font-bold text-amber-950">
//                                             {mainLineVoltage ? `${safelyFormatNumber(mainLineVoltage, 1)} V` : "0 V"}
//                                         </p>
//                                     )}
//                                 </div>
//                                 <div className="bg-[#FFC969] p-3 rounded-lg shadow-sm transition-all hover:shadow-md">
//                                     <p className="font-medium text-amber-900">Avg Current</p>
//                                     {loading ? (
//                                         <LoadingSpinner />
//                                     ) : (
//                                         <p className="text-xl font-bold text-amber-950">
//                                             {mainLineCurrent ? `${safelyFormatNumber((mainLineCurrent * 3), 2)} A` : "0 A"}
//                                         </p>
//                                     )}
//                                 </div>
//                                 <div className="bg-[#FFC969] p-3 rounded-lg shadow-sm transition-all hover:shadow-md">
//                                     <p className="font-medium text-amber-900">PF Total</p>
//                                     {loading ? (
//                                         <LoadingSpinner />
//                                     ) : (
//                                         <p className="text-xl font-bold text-amber-950">
//                                             {mainLinePF ? `${safelyFormatNumber(mainLinePF, 2)}` : "0"}
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>
//                             <div className="bg-[#FFC969] p-4 rounded-lg shadow-md md:w-1/4">
//                                 <p className="font-medium text-amber-900">Energy Consumption</p>
//                                 {loading ? (
//                                     <LoadingSpinner />
//                                 ) : (
//                                     <p className="text-2xl font-bold text-amber-950">
//                                         {mainLineEnergy ? `${safelyFormatNumber(mainLineEnergy, 2)} kWh` : "0 kWh"}
//                                     </p>
//                                 )}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Shrinking Line Card */}
//                     <div className="bg-[#E5C38B] rounded-xl shadow-md overflow-hidden border border-[#FFC969]">
//                         <div className="flex w-full">
//                             <div className="w-1/2 bg-gradient-to-r from-[#E5C38B] to-[#FFC969] p-3">
//                                 <h2 className="text-lg font-bold text-amber-900">Shrinking Line</h2>
//                             </div>
//                             <div className="w-1/2 bg-gradient-to-r from-gray-200 to-gray-300 p-3">
//                                 <div className="flex flex-row justify-between items-center">
//                                     <div className="text-center">
//                                         <span className="text-sm font-medium text-gray-700">Run Hours:</span>
//                                         <span className="ml-1 text-lg font-bold text-gray-700">{safelyFormatNumber(shrinkingLineSummary.fullLoad, 1)} Hrs</span>
//                                     </div>
//                                     <div className="text-center">
//                                         <span className="text-sm font-medium text-gray-700">Idle Hours:</span>
//                                         <span className="ml-1 text-lg font-bold text-gray-700">{safelyFormatNumber(shrinkingLineSummary.idleLoad, 1)} Hrs</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="p-4 w-full flex flex-col md:flex-row gap-2">
//                             <div className="grid grid-cols-2 gap-3 flex-grow">
//                                 <div className="bg-[#FFC969] p-3 rounded-lg shadow-sm transition-all hover:shadow-md">
//                                     <p className="font-medium text-amber-900">Phase Voltage</p>
//                                     {loading ? (
//                                         <LoadingSpinner />
//                                     ) : (
//                                         <p className="text-xl font-bold text-amber-950">
//                                             {shrinkingLinePhaseVoltage ? `${safelyFormatNumber(shrinkingLinePhaseVoltage, 2)} V` : "0"}
//                                         </p>
//                                     )}
//                                 </div>
//                                 <div className="bg-[#FFC969] p-3 rounded-lg shadow-sm transition-all hover:shadow-md">
//                                     <p className="font-medium text-amber-900">Line Voltage</p>
//                                     {loading ? (
//                                         <LoadingSpinner />
//                                     ) : (
//                                         <p className="text-xl font-bold text-amber-950">
//                                             {shrinkingLineVoltage ? `${safelyFormatNumber(shrinkingLineVoltage, 2)} V` : "0"}
//                                         </p>
//                                     )}
//                                 </div>
//                                 <div className="bg-[#FFC969] p-3 rounded-lg shadow-sm transition-all hover:shadow-md">
//                                     <p className="font-medium text-amber-900">Avg Current</p>
//                                     {loading ? (
//                                         <LoadingSpinner />
//                                     ) : (
//                                         <p className="text-xl font-bold text-amber-950">
//                                             {shrinkingLineCurrent ? `${safelyFormatNumber(shrinkingLineCurrent, 2)} A` : "0"}
//                                         </p>
//                                     )}
//                                 </div>
//                                 <div className="bg-[#FFC969] p-3 rounded-lg shadow-sm transition-all hover:shadow-md">
//                                     <p className="font-medium text-amber-900">PF Total</p>
//                                     {loading ? (
//                                         <LoadingSpinner />
//                                     ) : (
//                                         <p className="text-xl font-bold text-amber-950">
//                                             {shrinkingLinePF ? `${safelyFormatNumber(shrinkingLinePF, 2)} ` : "0"}
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>
//                             <div className="bg-[#FFC969] p-4 rounded-lg shadow-md md:w-1/4">
//                                 <p className="font-medium text-amber-900">Energy Consumption</p>
//                                 {loading ? (
//                                     <LoadingSpinner />
//                                 ) : (
//                                     <p className="text-2xl font-bold text-amber-950">
//                                         {shrinkingLineEnergy ? `${safelyFormatNumber(shrinkingLineEnergy, 2)} kWh` : "0"}
//                                     </p>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Charts */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                     {/* Main Line Load Profile Chart */}
//                     <div className="bg-white h-[40vh] p-4 rounded-xl shadow-md border border-gray-200 transition-all hover:shadow-lg">
//                         <h3 className="text-md font-semibold text-gray-700 ">Load Profile of Main Line </h3>
//                         {/* <div ref={mainLineLoadProfileRef} className="w-full h-72"></div> */}
//                         {loading ? (
//                             <ChartLoadingSpinner />
//                         ) : (
//                             <div ref={mainLineLoadProfileRef} className="w-full h-[35vh]"></div>
//                         )}
//                     </div>

//                     {/* Shrinking Line Load Profile Chart */}
//                     <div className="bg-white h-[40vh] p-4 rounded-xl shadow-md border border-gray-200 transition-all hover:shadow-lg">
//                         <h3 className="text-md font-semibold text-gray-700 ">Load Profile of Shrinking Line </h3>
//                         {/* <div ref={shrinkingLineLoadProfileRef} className="w-full h-72"></div> */}
//                         {loading ? (
//                             <ChartLoadingSpinner />
//                         ) : (
//                             <div ref={shrinkingLineLoadProfileRef} className="w-full h-[35vh]"></div>
//                         )}
//                     </div>

//                     {/* Idle Hour Consumption */}
//                     <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 transition-all hover:shadow-lg">
//                         <h3 className="text-md font-semibold text-gray-700 mb-2">Idle Hour Consumption (kWh) per hour - 8 Hours</h3>
//                         <div ref={idleHourConsumptionRef} className="w-full h-64"></div>
//                     </div>

//                     {/* Availability Chart */}
//                     <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 transition-all hover:shadow-lg">
//                         <h3 className="text-md font-semibold text-gray-700 mb-2">Availability of Lines for 8 hours</h3>
//                         <div ref={availabilityChartRef} className="w-full h-64"></div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AmlaLine6Dashboard;


import React from 'react';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import Breadcrumb from '@/Components/BreadCrumb/BreadcrumbRuntime';
import { GetLineDetails, loadProfileLine6Main, loadProfileLine6Shrink, loadSummaryLine6Main, loadSummaryLine6Shrink, getOperatorMain6, getOperatorShrink6 } from '../../webServices/ApiControllers';

const AmlaLine6Dashboard = () => {
    const mainLineLoadProfileRef = useRef(null);
    const shrinkingLineLoadProfileRef = useRef(null);
    const idleHourConsumptionRef = useRef(null);
    const availabilityChartRef = useRef(null);
    const [lineData, setLineData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [operatorDataLoading, setOperatorDataLoading] = useState(true);
    const [totalEnergyConsumption, setTotalEnergyConsumption] = useState(0);
    const [estimatedBill, setEstimatedBill] = useState(0);
    const [timeRange, setTimeRange] = useState({
        from: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        to: new Date().toISOString()
    });
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [mainLineLoadProfileData, setMainLineLoadProfileData] = useState([]);
    const [shrinkingLineLoadProfileData, setShrinkingLineLoadProfileData] = useState([]);
    const [mainLineSummary, setMainLineSummary] = useState({
        fullLoad: 0,
        idleLoad: 0
    });
    const [shrinkingLineSummary, setShrinkingLineSummary] = useState({
        fullLoad: 0,
        idleLoad: 0
    });
    const [operatorMainData, setOperatorMainData] = useState([]);
    const [operatorShrinkData, setOperatorShrinkData] = useState([]);

    // Loading spinner component
    const LoadingSpinner = () => (
        <div className="flex items-center p-1.5">
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    const ChartLoadingSpinner = () => (
        <div className="flex items-center justify-center p-2">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    // Function to safely format numeric values
    const safelyFormatNumber = (value, decimals = 2) => {
        // Check if value is a number or can be converted to one
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

    useEffect(() => {
        const fetchLineData = async () => {
            setLoading(true);
            try {
                const lineNumber = 6;
                const response = await GetLineDetails({
                    lineNumber,
                    from: timeRange.from,
                    to: timeRange.to
                });
                // console.log("getLineDetails", response);

                if (response && Array.isArray(response)) {
                    setLineData(response);

                    // Calculate total energy consumption and estimated bill
                    const mainLineEnergy = response.find(item =>
                        item.instanceid === '9e2283dd-81e4-47fd-9e37-8aa2db631bac' &&
                        item.variable === 'Active_Energy'
                    );

                    const shrinkingLineEnergy = response.find(item =>
                        item.instanceid === '5bab2ed3-77f2-458e-84a3-3875286154a3' &&
                        item.variable === 'Active_Energy'
                    );

                    const mainLineBill = response.find(item =>
                        item.instanceid === '9e2283dd-81e4-47fd-9e37-8aa2db631bac' &&
                        item.variable === 'Estimate_Bill'
                    );

                    const shrinkingLineBill = response.find(item =>
                        item.instanceid === '5bab2ed3-77f2-458e-84a3-3875286154a3' &&
                        item.variable === 'Estimate_Bill'
                    );

                    const totalEnergy = (mainLineEnergy?.value || 0) + (shrinkingLineEnergy?.value || 0);
                    const totalBill = (mainLineBill?.value || 0) + (shrinkingLineBill?.value || 0);

                    setTotalEnergyConsumption(totalEnergy);
                    setEstimatedBill(totalBill);
                }
            } catch (error) {
                console.error("Error fetching line data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLineData();
    }, [timeRange]);

    // Fetch Main Line Load Profile data
    useEffect(() => {
        const fetchMainLineLoadProfile = async () => {
            setLoading(true);
            try {
                const response = await loadProfileLine6Main({
                    from: timeRange.from,
                    to: timeRange.to
                });
                // console.log("loadProfileLine4Main", response);
                if (response && Array.isArray(response)) {
                    setMainLineLoadProfileData(response);
                }
            } catch (error) {
                console.error("Error fetching main line load profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMainLineLoadProfile();
    }, [timeRange]);

    // Fetch Shrinking Line Load Profile data
    useEffect(() => {
        const fetchShrinkingLineLoadProfile = async () => {
            setLoading(true);
            try {
                const response = await loadProfileLine6Shrink({
                    from: timeRange.from,
                    to: timeRange.to
                });
                // console.log("loadProfileLine4Shrink", response);
                if (response && Array.isArray(response)) {
                    setShrinkingLineLoadProfileData(response);
                }
            } catch (error) {
                console.error("Error fetching shrinking line load profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchShrinkingLineLoadProfile();
    }, [timeRange]);

    // Fetch Main Line Summary data
    useEffect(() => {
        const fetchMainLineSummary = async () => {
            setLoading(true);
            try {
                const response = await loadSummaryLine6Main({
                    from: timeRange.from,
                    to: timeRange.to
                });
                // console.log("loadSummaryLine4Main", response);
                if (response && Array.isArray(response)) {
                    const fullLoad = response.find(item => item.variable === 'FullLoad')?.value || 0;
                    const idleLoad = response.find(item => item.variable === 'IdleLoad')?.value || 0;

                    setMainLineSummary({
                        fullLoad,
                        idleLoad
                    });
                }
            } catch (error) {
                console.error("Error fetching main line summary:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMainLineSummary();
    }, [timeRange]);

    // Fetch Shrinking Line Summary data
    useEffect(() => {
        const fetchShrinkingLineSummary = async () => {
            setLoading(true);
            try {
                const response = await loadSummaryLine6Shrink({
                    from: timeRange.from,
                    to: timeRange.to
                });
                // console.log("loadSummaryLine4Shrink", response);
                if (response && Array.isArray(response)) {
                    const fullLoad = response.find(item => item.variable === 'FullLoad')?.value || 0;
                    const idleLoad = response.find(item => item.variable === 'IdleLoad')?.value || 0;

                    setShrinkingLineSummary({
                        fullLoad,
                        idleLoad
                    });
                }
            } catch (error) {
                console.error("Error fetching shrinking line summary:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchShrinkingLineSummary();
    }, [timeRange]);

    // Fetch Operator Main Line data
    useEffect(() => {
        const fetchOperatorMainData = async () => {
            setOperatorDataLoading(true);
            try {
                const response = await getOperatorMain6();
                if (response && Array.isArray(response)) {
                    // Get last 15 days data
                    const sortedData = [...response].sort((a, b) => new Date(a.date) - new Date(b.date));
                    const last15Days = sortedData.slice(-15);
                    setOperatorMainData(last15Days);
                }
            } catch (error) {
                console.error("Error fetching operator main data:", error);
            } finally {
                setOperatorDataLoading(false);
            }
        };

        fetchOperatorMainData();
    }, []);

    // Fetch Operator Shrink Line data
    useEffect(() => {
        const fetchOperatorShrinkData = async () => {
            setOperatorDataLoading(true);
            try {
                const response = await getOperatorShrink6();
                if (response && Array.isArray(response)) {
                    // Get last 15 days data
                    const sortedData = [...response].sort((a, b) => new Date(a.date) - new Date(b.date));
                    const last15Days = sortedData.slice(-15);
                    setOperatorShrinkData(last15Days);
                }
            } catch (error) {
                console.error("Error fetching operator shrink data:", error);
            } finally {
                setOperatorDataLoading(false);
            }
        };

        fetchOperatorShrinkData();
    }, []);

    // Helper function to get value from line data by instance ID and variable name
    const getValueFromData = (instanceId, variableName) => {
        if (!lineData) return null;

        const dataPoint = lineData.find(item =>
            item.instanceid === instanceId &&
            item.variable === variableName
        );

        return dataPoint ? dataPoint.value : null;
    };

    // Get values for Main Line
    const mainLineVoltage = getValueFromData('da3d1725-1dd6-43c2-ba80-c1fdbcf48803', 'Voltage_L-L_Avg');
    const mainLinePhaseVoltage = getValueFromData('da3d1725-1dd6-43c2-ba80-c1fdbcf48803', 'Voltage_LN_Avg');
    const mainLineCurrent = getValueFromData('2e1cc646-e595-4ccc-9638-c5a14a1c98c0', 'Current_Avg');
    const mainLinePF = getValueFromData('1315ba67-957e-4a81-86ec-375450c090ce', 'PF_Total');
    const mainLineEnergy = getValueFromData('9e2283dd-81e4-47fd-9e37-8aa2db631bac', 'Active_Energy');

    // Get values for Shrinking Line
    const shrinkingLineVoltage = getValueFromData('0cea029d-68fa-4dfa-8faa-586459ae8ea2', 'Voltage_L-L_Avg');
    const shrinkingLinePhaseVoltage = getValueFromData('0cea029d-68fa-4dfa-8faa-586459ae8ea2', 'Voltage_LN_Avg');
    const shrinkingLineCurrent = getValueFromData('bea95977-dba1-4d88-8ef2-b787102f379e', 'Current_Avg');
    const shrinkingLinePF = getValueFromData('bd7fa5c7-3648-4755-bcc8-df3cb17e0f3c', 'PF_Total');
    const shrinkingLineEnergy = getValueFromData('5bab2ed3-77f2-458e-84a3-3875286154a3', 'Active_Energy');

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
                    formatter: '{b}<br/><span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#4361ee"></span> Shrinking Line: {c} kWh',
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
                                color: 'rgba(67, 97, 238, 0.5)'
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

    // Idle Hour Consumption Chart with API data
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

    // Availability Chart with API data
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
                instanceName="Production / Amla line_6"
                onTimeRangeApply={handleTimeRangeChange}
                lastUpdated={lastUpdated}
            />
            <div className="mx-auto p-2">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 bg-white p-2 rounded-xl shadow-lg border-l-4 border-green-600">
                    <h1 className="text-xl sm:text-2xl font-bold text-green-800">Amla Line - 6 (65 ml)</h1>
                    <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0">
                        <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-lg shadow-md">
                            <span className="font-semibold">Total Energy Consumption: </span>
                            <span className="font-bold">{loading ? "Loading..." : `${safelyFormatNumber(totalEnergyConsumption)} kWh`}</span>
                        </div>
                        <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-lg shadow-md">
                            <span className="font-semibold">Estimated Bill: </span>
                            <span className="font-bold">{loading ? "Loading..." : `₹ ${Math.round(estimatedBill).toLocaleString()}`}</span>
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
                                    {loading ? (
                                        <LoadingSpinner />
                                    ) : (
                                        <p className="text-xl font-bold text-amber-950">
                                            {mainLinePhaseVoltage ? `${safelyFormatNumber(mainLinePhaseVoltage, 1)} V` : "0 V"}
                                        </p>
                                    )}
                                </div>
                                <div className="bg-[#FFC969] p-3 rounded-lg shadow-sm transition-all hover:shadow-md">
                                    <p className="font-medium text-amber-900">Line Voltage</p>
                                    {loading ? (
                                        <LoadingSpinner />
                                    ) : (
                                        <p className="text-xl font-bold text-amber-950">
                                            {mainLineVoltage ? `${safelyFormatNumber(mainLineVoltage, 1)} V` : "0 V"}
                                        </p>
                                    )}
                                </div>
                                <div className="bg-[#FFC969] p-3 rounded-lg shadow-sm transition-all hover:shadow-md">
                                    <p className="font-medium text-amber-900">Avg Current</p>
                                    {loading ? (
                                        <LoadingSpinner />
                                    ) : (
                                        <p className="text-xl font-bold text-amber-950">
                                            {mainLineCurrent ? `${safelyFormatNumber((mainLineCurrent * 3), 2)} A` : "0 A"}
                                        </p>
                                    )}
                                </div>
                                <div className="bg-[#FFC969] p-3 rounded-lg shadow-sm transition-all hover:shadow-md">
                                    <p className="font-medium text-amber-900">PF Total</p>
                                    {loading ? (
                                        <LoadingSpinner />
                                    ) : (
                                        <p className="text-xl font-bold text-amber-950">
                                            {mainLinePF ? `${safelyFormatNumber(mainLinePF, 2)}` : "0"}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="bg-[#FFC969] p-4 rounded-lg shadow-md md:w-1/4">
                                <p className="font-medium text-amber-900">Energy Consumption</p>
                                {loading ? (
                                    <LoadingSpinner />
                                ) : (
                                    <p className="text-2xl font-bold text-amber-950">
                                        {mainLineEnergy ? `${safelyFormatNumber(mainLineEnergy, 2)} kWh` : "0 kWh"}
                                    </p>
                                )}
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
                                    {loading ? (
                                        <LoadingSpinner />
                                    ) : (
                                        <p className="text-xl font-bold text-amber-950">
                                            {shrinkingLinePhaseVoltage ? `${safelyFormatNumber(shrinkingLinePhaseVoltage, 2)} V` : "0"}
                                        </p>
                                    )}
                                </div>
                                <div className="bg-[#FFC969] p-3 rounded-lg shadow-sm transition-all hover:shadow-md">
                                    <p className="font-medium text-amber-900">Line Voltage</p>
                                    {loading ? (
                                        <LoadingSpinner />
                                    ) : (
                                        <p className="text-xl font-bold text-amber-950">
                                            {shrinkingLineVoltage ? `${safelyFormatNumber(shrinkingLineVoltage, 2)} V` : "0"}
                                        </p>
                                    )}
                                </div>
                                <div className="bg-[#FFC969] p-3 rounded-lg shadow-sm transition-all hover:shadow-md">
                                    <p className="font-medium text-amber-900">Avg Current</p>
                                    {loading ? (
                                        <LoadingSpinner />
                                    ) : (
                                        <p className="text-xl font-bold text-amber-950">
                                            {shrinkingLineCurrent ? `${safelyFormatNumber(shrinkingLineCurrent, 2)} A` : "0"}
                                        </p>
                                    )}
                                </div>
                                <div className="bg-[#FFC969] p-3 rounded-lg shadow-sm transition-all hover:shadow-md">
                                    <p className="font-medium text-amber-900">PF Total</p>
                                    {loading ? (
                                        <LoadingSpinner />
                                    ) : (
                                        <p className="text-xl font-bold text-amber-950">
                                            {shrinkingLinePF ? `${safelyFormatNumber(shrinkingLinePF, 2)} ` : "0"}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="bg-[#FFC969] p-4 rounded-lg shadow-md md:w-1/4">
                                <p className="font-medium text-amber-900">Energy Consumption</p>
                                {loading ? (
                                    <LoadingSpinner />
                                ) : (
                                    <p className="text-2xl font-bold text-amber-950">
                                        {shrinkingLineEnergy ? `${safelyFormatNumber(shrinkingLineEnergy, 2)} kWh` : "0"}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {/* Main Line Load Profile Chart */}
                    <div className="bg-white h-[40vh] p-4 rounded-xl shadow-md border border-gray-200 transition-all hover:shadow-lg">
                        <h3 className="text-md font-semibold text-gray-700 ">Load Profile of Main Line </h3>
                        {loading ? (
                            <ChartLoadingSpinner />
                        ) : (
                            <div ref={mainLineLoadProfileRef} className="w-full h-[35vh]"></div>
                        )}
                    </div>

                    {/* Shrinking Line Load Profile Chart */}
                    <div className="bg-white h-[40vh] p-4 rounded-xl shadow-md border border-gray-200 transition-all hover:shadow-lg">
                        <h3 className="text-md font-semibold text-gray-700 ">Load Profile of Shrinking Line </h3>
                        {loading ? (
                            <ChartLoadingSpinner />
                        ) : (
                            <div ref={shrinkingLineLoadProfileRef} className="w-full h-[35vh]"></div>
                        )}
                    </div>

                    {/* Idle Hour Consumption */}
                    <div className="bg-white h-[40vh] p-4 rounded-xl shadow-md border border-gray-200 transition-all hover:shadow-lg">
                        <h3 className="text-md font-semibold text-gray-700 mb-2">Idle hour of Line_6</h3>
                        {operatorDataLoading ? (
                            <ChartLoadingSpinner />
                        ) : (
                            <div ref={idleHourConsumptionRef} className="w-full h-[35vh]"></div>
                        )}
                    </div>

                    {/* Availability Chart */}
                    <div className="bg-white h-[40vh] p-4 rounded-xl shadow-md border border-gray-200 transition-all hover:shadow-lg">
                        <h3 className="text-md font-semibold text-gray-700 mb-2">Availability of Line_6</h3>
                        {operatorDataLoading ? (
                            <ChartLoadingSpinner />
                        ) : (
                            <div ref={availabilityChartRef} className="w-full h-[35vh]"></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AmlaLine6Dashboard;