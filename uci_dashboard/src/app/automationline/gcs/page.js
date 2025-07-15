// "use client";
// import React, { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { DateTime } from "luxon";
// import {
//   getPerformanceIndex,
//   getHisRuntimeDowntime,
// } from "../../../webServices/UCIAPIController";
// import 'chartjs-plugin-datalabels';
// import zoomPlugin from 'chartjs-plugin-zoom';
// import annotationPlugin from 'chartjs-plugin-annotation';
// import ChartDataLabels from "chartjs-plugin-datalabels";
// // Register all required Chart.js plugins
// ChartJS.register(
//   CategoryScale, 
//   LinearScale, 
//   BarElement, 
//   Title, 
//   Tooltip, 
//   Legend,
//   zoomPlugin,
//   annotationPlugin,
//   ChartDataLabels,
// );

// const HourglassLoader = () => (
//   <div className="flex justify-center items-center py-6">
//     <div className="loader-hourglass"></div>
//     <style jsx>{`
//       .loader-hourglass {
//         width: 30px;
//         height: 30px;
//         border: 4px solid transparent;
//         border-top: 4px solid #22c55e;
//         border-bottom: 4px solid #22c55e;
//         border-radius: 50%;
//         animation: hourglassSpin 1s linear infinite;
//       }
//       @keyframes hourglassSpin {
//         0% {
//           transform: rotate(0deg);
//         }
//         100% {
//           transform: rotate(360deg);
//         }
//       }
//     `}</style>
//   </div>
// );

// const KPICard = ({ title, value, color = "green" }) => (
//   <div className={`bg-white border-l-4 p-2 rounded-lg shadow-md border-${color}-500 transition-all hover:shadow-lg`}>
//     <p className="text-xs font-medium  text-gray-600">{title}</p>
//     <p className="text-md font-bold text-gray-900">{value}</p>
//   </div>
// );

// const ChartContainer = ({ title, children, isLoading }) => (
//   <div className="bg-white p-2 rounded-lg shadow-md h-[400px] transition-all hover:shadow-lg">
//     <div className="flex justify-between items-center">
//       <h3 className="font-bold text-gray-800 text-base pl-4">{title}</h3>
  
//     </div>
//     {isLoading ? <HourglassLoader /> : children}
//   </div>
// );

// const Page = () => {
//   const [kpiData, setKpiData] = useState({
//     oee: 0,
//     previous_OEE: 0,
//     availability: 0,
//     downtime: 0,
//     quality: 0,
//     performance: 0,
//     labels: [],
//     productionSummary: {
//       overallProd: 0,
//       monthlyProd: 0,
//       prevDayProd: 0,
//       currentDayProd: 0,
//       shift1Prod: 0,
//       shift2Prod: 0,
//       shift1Rejection: 0,
//       shift2Rejection: 0,
//       currentDayRejection: 0,
//     },
//   });

//   const [runtimeChartData, setRuntimeChartData] = useState(null);
//   const [plannedChartData, setPlannedChartData] = useState(null);
//   const [loadingKPI, setLoadingKPI] = useState(true);
//   const [loadingChart, setLoadingChart] = useState(true);
//   const [runtimeChartRef, setRuntimeChartRef] = useState(null);
//   const [prodChartRef, setProdChartRef] = useState(null);

//   const timezone = "America/Chicago";
//   const assetName = "GCS";

//   useEffect(() => {
//     const now = DateTime.now().setZone(timezone);
//     const from = now.startOf("day").toFormat("yyyy-MM-dd HH:mm");
//     const to = now.set({ hour: 20, minute: 0 }).toFormat("yyyy-MM-dd HH:mm");

//     const fetchKpiData = async () => {
//       try {
//         setLoadingKPI(true);
//         const data = await getPerformanceIndex(assetName, from, to, timezone);

//         setKpiData((prev) => ({
//           ...prev,
//           ...data,
//           productionSummary: {
//             overallProd: data?.overall_Count || 0,
//             monthlyProd: data?.monthly_Count || 0,
//             prevDayProd: data?.prev_Day_OK_Count || 0,
//             currentDayProd: data?.today_Count || 0,
//             shift1Prod: data?.shift_1_OK_Count || 0,
//             shift2Prod: data?.shift_2_OK_Count || 0,
//             shift1Rejection: data?.shift_1_NOK_Count || 0,
//             shift2Rejection: data?.shift_2_NOK_Count || 0,
//             currentDayRejection: data?.today_NOK_Count || 0,
//           },
//         }));
//       } catch (error) {
//         console.error("❌ Failed to fetch KPI data:", error);
//       } finally {
//         setLoadingKPI(false);
//       }
//     };

//     fetchKpiData();
//   }, []);

//   useEffect(() => {
//     const now = DateTime.now().setZone(timezone);
//     const from = now.minus({ days: 7 }).startOf("day").toFormat("yyyy-MM-dd HH:mm");
//     const to = now.endOf("day").toFormat("yyyy-MM-dd HH:mm");

//     const fetchChartData = async () => {
//       try {
//         setLoadingChart(true);
//         const res = await getHisRuntimeDowntime(assetName, from, to, timezone);

//         const groupedData = {};
//         const runTimeHours = res.runTimeHours || 9.5;
//         const productionLimit = res.productionLimit || 228;

//         res.prodData.forEach((item) => {
//           const date = DateTime.fromISO(item.timestamp).toFormat("dd/LL");
//           groupedData[date] = groupedData[date] || { Shift1: {}, Shift2: {} };
//           groupedData[date][item.shift].product = item.product_count;
//         });

//         res.downTimeData.forEach((item) => {
//           const date = DateTime.fromISO(item.timestamp).toFormat("dd/LL");
//           groupedData[date] = groupedData[date] || { Shift1: {}, Shift2: {} };
//           groupedData[date][item.shift].downtime = item.downtime;
//         });

//         const labels = Object.keys(groupedData);
//         const shift1Runtime = [], shift2Runtime = [];
//         const shift1Prod = [], shift2Prod = [];
//         let totalProd = 0, totalDowntime = 0, totalRuntime = 0;

//         labels.forEach((date) => {
//           const shift1 = groupedData[date].Shift1 || {};
//           const shift2 = groupedData[date].Shift2 || {};

//           const s1Runtime = shift1.downtime !== undefined ? runTimeHours - shift1.downtime : 0;
//           const s2Runtime = shift2.downtime !== undefined ? runTimeHours - shift2.downtime : 0;

//           const s1Prod = shift1.product || 0;
//           const s2Prod = shift2.product || 0;

//           shift1Runtime.push(s1Runtime);
//           shift2Runtime.push(s2Runtime);
//           shift1Prod.push(s1Prod);
//           shift2Prod.push(s2Prod);

//           totalProd += s1Prod + s2Prod;
//           totalDowntime += (shift1.downtime || 0) + (shift2.downtime || 0);
//           totalRuntime += s1Runtime + s2Runtime;
//         });

//         const performance = (totalProd / (labels.length * 2 * productionLimit)) * 100;
//         const availability = (totalRuntime / (labels.length * 2 * runTimeHours)) * 100;
//         const quality = 100;
//         const oee = (availability * performance * quality) / 10000;

//         setKpiData((prev) => ({
//           ...prev,
//           oee,
      
      
//           downtime: totalDowntime.toFixed(2),
//           performance,
//           quality,
//           labels,
//           productionSummary: {
//             ...prev.productionSummary,
//             overallProd: totalProd,
//             monthlyProd: totalProd,
//             shift1Prod: shift1Prod.at(-1) || 0,
//             shift2Prod: shift2Prod.at(-1) || 0,
//           },
//         }));

//         setRuntimeChartData({
//           labels,
//           datasets: [
//              {
//                   label: "Shift 1",
//                   data: shift1Runtime,
//                   backgroundColor: "#047857",
//                   barThickness: 16,
//                   categoryPercentage: 0.6,
//                   barPercentage: 0.6,
//                 },
//                 {
//                   label: "Shift 2",
//                   data: shift2Runtime,
//                   backgroundColor: "#34D399",
//                   barThickness: 16,
//                   categoryPercentage: 0.6,
//                   barPercentage: 0.6,
//                 },
//           ],
//         });

//         setPlannedChartData({
//           labels,
//           datasets: [
//             {
//                   label: "Shift 1 ",
//                   data: shift1Prod,
//                   backgroundColor: "#1D4ED8",
//                   barThickness: 16,
//                   categoryPercentage: 0.6,
//                   barPercentage: 0.6,

//                 },
//                 {
//                   label: "Shift 2 ",
//                   data: shift2Prod,
//                   backgroundColor: "#93C5FD",
//                   barThickness: 16,
//                   categoryPercentage: 0.6,
//                   barPercentage: 0.6,
//                 },
//           ],
//         });
//       } catch (error) {
//         console.error("Error loading chart data", error);
//       } finally {
//         setLoadingChart(false);
//       }
//     };

//     fetchChartData();
//   }, []);


//   const barChartOptions = {
//   responsive: true,
//   maintainAspectRatio: false,
//   plugins: {
//     legend: {
//       display: true,
//     },
//     datalabels: {
//       anchor: "end",
//       align: "end",
//       font: { size: 10, weight: "bold" },
//       formatter: (value) => value.toFixed(1),
//        color: (context) => {
//         const dataset = context.dataset;
//         return dataset.backgroundColor;
//       },
//       padding: {
//         top: 5, 
//       },
//       clip: true, 
//     },
//       tooltip: {
//       callbacks: {
//         label: (tooltipItem) =>
//           `${tooltipItem.dataset.label}: ${tooltipItem.raw.toFixed(2)} hrs`,
//       },
//     },
//        annotation: {
//       annotations: {
//         referenceLine: {
//           type: "line",
//           yMin: 9.5,
//           yMax: 9.5,
//         borderDash: [6, 6],
//           borderColor: "orange",
//           borderWidth: 2,
//           label: {
//             display: true,
//             // content: "Runtime (10 hrs)",
//             // color: "green",
//             // backgroundColor: "white",
//             position: "end",
//           },
//         },
//       },
//     },
//  zoom: {
//       pan: { enabled: true, mode: "x" },
//       zoom: {
//         wheel: { enabled: true },
//         pinch: { enabled: true },
//         mode: "x",
//       },
//     },
//     },
//     scales: {
//     y: {
//       beginAtZero: true,
//       max: 14,
//       min: 0,
//       grid: { color: "#E5E7EB" },
//       ticks: { stepSize: 2 },
//     },
//     x: {
//       grid: { display: false },
//       ticks: {
//         autoSkip: false,
//       },
//     },
//   },
//   layout: {
//     padding: {
//       top: 9, // Adds some padding to avoid overlap
//     },
//   },
//   };

//   const getProductionChartOptions = {
//     responsive: true,
//   maintainAspectRatio: false,
//   plugins: {
//     legend: {
//       display: true,
//     },
//     datalabels: {
//       anchor: "end",
//       font: { size: 9, weight: "bold" },
//       align: "end",
//       formatter: (value) => `${value}`,
//       color: (context) => {
//         const dataset = context.dataset;
//         return dataset.backgroundColor;
//       },
//     },
//     tooltip: {
//       callbacks: {
//         label: (tooltipItem) =>
//           `${tooltipItem.dataset.label}: ${tooltipItem.raw.toLocaleString()} Counts`,
//       },
//     },
//     zoom: {
//       pan: { enabled: true, mode: "x" },
//       zoom: {
//         wheel: { enabled: true },
//         pinch: { enabled: true },
//         mode: "x",
//       },
//     },
//     annotation: {
//       annotations: {
//         referenceLine: {
//           type: "line",
//           yMin: 228,
//           yMax: 228,
//           borderColor: "orange",
//           borderDash: [6, 6],
//           borderWidth: 2,
//           label: {
//             content: "Target (240)",
//             enabled: true,
//             position: "end",
//             color: "#000",
//             font: { size: 12, weight: "bold" },
//           },
//         },
//       },
//     },
//   },
//   scales: {
//     y: {
//       beginAtZero: true,
//       max: 400,
//       min: 0,
//       grid: { color: "#E5E7EB" },
//       ticks: { stepSize: 10 },
//     },
//     x: {
//       grid: { display: false },
//       ticks: {
//         autoSkip: false,
//       },
//     },
//   },
//   };

//   // Function to get chart reference
//   const getRuntimeChartRef = (chartInstance) => {
//     setRuntimeChartRef(chartInstance);
//   };

//   const getProdChartRef = (chartInstance) => {
//     setProdChartRef(chartInstance);
//   };

//   // Function to format KPI values with color code
//   const getKPIColorCode = (value, type) => {
//     if (type === 'oee' || type === 'availability' || type === 'performance' || type === 'quality') {
//       if (value >= 90) return "green";
//       if (value >= 70) return "yellow";
//       return "green";
//     }
//     if (type === 'downTime') {
//       if (value <= 1) return "green";
//       if (value <= 3) return "yellow";
//       return "green";
//     }
//     return "green";
//   };

//   // Helper function to format KPI values
//   const formatKpiValue = (value, type) => {
//     if (type === 'downTime') return `${value} Hrs`;
//     return `${value.toFixed(2)}%`;
//   };

//   return (
//     <div className="bg-gray-100 h-screen p-1 overflow-scroll">
//       <div className="w-full">
//         <div className="flex items-center justify-between mb-2">
//           <div>
//             <h1 className="text-md font-bold text-gray-800">{assetName} </h1>
//             <div className="w-12 h-1 bg-green-500 mt-2 rounded-full"></div>
//           </div>
//           <div className="flex items-center space-x-2">
//           </div>
//         </div>

//         <div className="mb-2">
//           {loadingKPI ? (
//             <HourglassLoader />
//           ) : (
//             <>
//               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-4 ">
//                 <KPICard 
//                   title="OEE Day" 
//                   value={`${(kpiData.oee || 0).toFixed(2)}%`} 
//                   color={getKPIColorCode(kpiData.oee || 0, 'oee')} 
//                 />
//                      <KPICard 
//                   title="Prev Day OEE" 
//                   value={`${(kpiData.previous_OEE || 0).toFixed(2)}%`} 
//                   color={getKPIColorCode(kpiData.previous_OEE || 0, 'availability')} 
//                 />
//                 <KPICard 
//                   title="OEE MONTH" 
//                   value={`${(kpiData.monthly_OEE || 0).toFixed(2)}%`} 
//                   color={getKPIColorCode(kpiData.monthly_OEE || 0, 'availability')} 
//                 />
              
//                 <KPICard 
//                   title="Downtime" 
//                   value={`${kpiData.downtime} `} 
//                   color={getKPIColorCode(parseFloat(kpiData.downtime || 0), 'downTime')} 
//                 />
//                    <KPICard 
//                   title="Quality" 
//                   value={`${(kpiData.quality || 0).toFixed(2)}%`} 
//                   color={getKPIColorCode(kpiData.quality || 0, 'quality')} 
//                 />
//                   <KPICard 
//                   title="Performance" 
//                   value={`${(kpiData.performance || 0).toFixed(2)}%`} 
//                   color={getKPIColorCode(kpiData.performance || 0, 'performance')} 
//                 />
             
//               </div>
//             </>
//           )}
//         </div>

//         <div className="mb-4 bg-white rounded-md shadow-md overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-700 text-white">
//                 <tr>
//                   {Object.keys(kpiData.productionSummary).map((key, idx) => {
//                     const formattedKey = key
//                       .replace(/([A-Z])/g, ' $1')
//                       .replace(/^./, str => str.toUpperCase())
//                       .replace(/Prod/g, 'Production')
//                       .replace(/Nok/g, 'NOK');
                      
//                     return (
//                       <th 
//                         className="px-1 py-2 text-xs font-medium text-left " 
//                         key={idx}
//                       >
//                         {formattedKey}
//                       </th>
//                     );
//                   })}
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 <tr>
//                   {Object.values(kpiData.productionSummary).map((val, idx) => (
//                     <td className="px-4 py-3 text-sm text-gray-900" key={idx}>
//                       {val.toLocaleString()}
//                     </td>
//                   ))}
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//          <ChartContainer title="GCS - Runtime (Hrs)" isLoading={loadingChart}>
//   {!loadingChart && runtimeChartData && (
//     <>
//       <div className="relative h-[250px] p-2">
//         <Bar data={runtimeChartData} options={barChartOptions} />
//       </div>
//  <div className="overflow-x-auto mt-2">
//   <table className="min-w-full text-sm text-left border-t border-gray-300">
//     <thead className="bg-gray-300">
//       <tr>
//         <th className="px-2 py-1 border border-black">Shift</th>
//         {runtimeChartData.labels.map((label, idx) => (
//           <th key={idx} className="px-2 py-1 text-center border border-black">{label}</th>
//         ))}
//       </tr>
//     </thead>
//     <tbody>
//       <tr style={{ backgroundColor: "#047857", color: "#fffd" }}>
//         <td className="px-2 py-1 border border-black">Shift 1</td>
//         {runtimeChartData.datasets[0].data.map((val, idx) => (
//           <td key={idx} className="px-2 py-1 text-center border border-black">{val.toFixed(2)}</td>
//         ))}
//       </tr>
//       <tr style={{ backgroundColor: "#34D399", color: "#fffd" }}>
//         <td className="px-2 py-1  border border-black">Shift 2</td>
//         {runtimeChartData.datasets[1].data.map((val, idx) => (
//           <td key={idx} className="px-2 py-1 text-center border border-black">{val.toFixed(2)}</td>
//         ))}
//       </tr>
//     </tbody>
//   </table>
// </div>


//     </>
//   )}
// </ChartContainer>

          
//  <ChartContainer title="GCS - Production " isLoading={loadingChart}>
//   {!loadingChart && plannedChartData && (
//     <>
//       <div className="relative h-[250px] p-2">
//         <Bar data={plannedChartData} options={getProductionChartOptions} />
//       </div>
// <div className="overflow-x-auto mt-2">
//   <table className="min-w-full text-sm text-left border-t border-gray-300">
//     <thead className="bg-gray-300 border">
//       <tr className="border">
//         <th className="px-2 py-1 border border-black">Shift</th>
//         {plannedChartData.labels.map((label, idx) => (
//           <th key={idx} className="px-2 py-1 text-center border border-black">{label}</th>
//         ))}
//       </tr>
//     </thead>
//     <tbody>
//       <tr style={{ backgroundColor: "#1D4ED8", color: "#fffd" }}>
//         <td className="px-2 py-1 border border-black">Shift 1</td>
//         {plannedChartData.datasets[0].data.map((val, idx) => (
//           <td key={idx} className="px-2 py-1 text-center border border-black">{val}</td>
//         ))}
//       </tr>
//       <tr style={{ backgroundColor: "#93C5FD", color: "#fffd" }}>
//         <td className="px-2 py-1 border border-black">Shift 2</td>
//         {plannedChartData.datasets[1].data.map((val, idx) => (
//           <td key={idx} className="px-2 py-1 text-center border border-black">{val}</td>
//         ))}
//       </tr>
//     </tbody>
//   </table>
// </div>


//     </>
//   )}
// </ChartContainer>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;
// "use client";
// import React, { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { DateTime } from "luxon";
// import {
//   getPerformanceIndex,
//   getHisRuntimeDowntime,
// } from "../../../webServices/UCIAPIController";
// import 'chartjs-plugin-datalabels';
// import zoomPlugin from 'chartjs-plugin-zoom';
// import annotationPlugin from 'chartjs-plugin-annotation';
// import ChartDataLabels from "chartjs-plugin-datalabels";
// // Register all required Chart.js plugins
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   zoomPlugin,
//   annotationPlugin,
//   ChartDataLabels,
// );

// const HourglassLoader = () => (
//   <div className="flex justify-center items-center py-6">
//     <div className="loader-hourglass"></div>
//     <style jsx>{`
//       .loader-hourglass {
//         width: 30px;
//         height: 30px;
//         border: 4px solid transparent;
//         border-top: 4px solid #22c55e;
//         border-bottom: 4px solid #22c55e;
//         border-radius: 50%;
//         animation: hourglassSpin 1s linear infinite;
//       }
//       @keyframes hourglassSpin {
//         0% {
//           transform: rotate(0deg);
//         }
//         100% {
//           transform: rotate(360deg);
//         }
//       }
//     `}</style>
//   </div>
// );

// const KPICard = ({ title, value, color = "green" }) => (
//   <div className={`bg-white border-l-4 p-2 rounded-lg shadow-md border-${color}-500 transition-all hover:shadow-lg`}>
//     <p className="text-xs font-medium  text-gray-600">{title}</p>
//     <p className="text-md font-bold text-gray-900">{value}</p>
//   </div>
// );

// const ChartContainer = ({ title, children, isLoading }) => (
//   <div className="bg-white p-2 rounded-lg shadow-md h-[400px] transition-all hover:shadow-lg">
//     <div className="flex justify-between items-center">
//       <h3 className="font-bold text-gray-800 text-base pl-4">{title}</h3>

//     </div>
//     {isLoading ? <HourglassLoader /> : children}
//   </div>
// );

// const Page = () => {
//   const [kpiData, setKpiData] = useState({
//     oee: 0,
//     previous_OEE: 0,
//     availability: 0,
//     downtime: 0,
//     quality: 0,
//     performance: 0,
//     labels: [],
//     productionSummary: {
//       overallProd: 0,
//       monthlyProd: 0,
//       prevDayProd: 0,
//       currentDayProd: 0,
//       shift1Prod: 0,
//       shift2Prod: 0,
//       shift1Rejection: 0,
//       shift2Rejection: 0,
//       currentDayRejection: 0,
//     },
//   });

//   const [runtimeChartData, setRuntimeChartData] = useState(null);
//   const [plannedChartData, setPlannedChartData] = useState(null);
//   const [loadingKPI, setLoadingKPI] = useState(true);
//   const [loadingChart, setLoadingChart] = useState(true);
//   const [runtimeChartRef, setRuntimeChartRef] = useState(null);
//   const [prodChartRef, setProdChartRef] = useState(null);

//   const timezone = "America/Chicago";
//   const assetName = "GRA";

//   useEffect(() => {
//     const now = DateTime.now().setZone(timezone);
//     const from = now.startOf("day").toFormat("yyyy-MM-dd HH:mm");
//     const to = now.set({ hour: 20, minute: 0 }).toFormat("yyyy-MM-dd HH:mm");

//     const fetchKpiData = async () => {
//       try {
//         setLoadingKPI(true);
//         const data = await getPerformanceIndex(assetName, from, to, timezone);

//         setKpiData((prev) => ({
//           ...prev,
//           ...data,
//           productionSummary: {
//             overallProd: data?.overall_Count || 0,
//             monthlyProd: data?.monthly_Count || 0,
//             prevDayProd: data?.prev_Day_OK_Count || 0,
//             currentDayProd: data?.today_Count || 0,
//             shift1Prod: data?.shift_1_OK_Count || 0,
//             shift2Prod: data?.shift_2_OK_Count || 0,
//             shift1Rejection: data?.shift_1_NOK_Count || 0,
//             shift2Rejection: data?.shift_2_NOK_Count || 0,
//             currentDayRejection: data?.today_NOK_Count || 0,
//           },
//         }));
//       } catch (error) {
//         console.error("❌ Failed to fetch KPI data:", error);
//       } finally {
//         setLoadingKPI(false);
//       }
//     };

//     fetchKpiData();
//   }, []);

//   useEffect(() => {
//     const now = DateTime.now().setZone(timezone);
//     const from = now.minus({ days: 7 }).startOf("day").toFormat("yyyy-MM-dd HH:mm");
//     const to = now.endOf("day").toFormat("yyyy-MM-dd HH:mm");

//     const fetchChartData = async () => {
//       try {
//         setLoadingChart(true);
//         const res = await getHisRuntimeDowntime(assetName, from, to, timezone);

//         const groupedData = {};
//         const runTimeHours = res.runTimeHours || 9.5;
//         const productionLimit = res.productionLimit || 228;

//         res.prodData.forEach((item) => {
//           const date = DateTime.fromISO(item.timestamp).toFormat("dd/LL");
//           groupedData[date] = groupedData[date] || { Shift1: {}, Shift2: {} };
//           groupedData[date][item.shift].product = item.product_count;
//         });

//         res.downTimeData.forEach((item) => {
//           const date = DateTime.fromISO(item.timestamp).toFormat("dd/LL");
//           groupedData[date] = groupedData[date] || { Shift1: {}, Shift2: {} };
//           groupedData[date][item.shift].downtime = item.downtime;
//         });

//         const labels = Object.keys(groupedData);
//         const shift1Runtime = [], shift2Runtime = [];
//         const shift1Prod = [], shift2Prod = [];
//         let totalProd = 0, totalDowntime = 0, totalRuntime = 0;

//         labels.forEach((date) => {
//           const shift1 = groupedData[date].Shift1 || {};
//           const shift2 = groupedData[date].Shift2 || {};

//           const s1Runtime = shift1.downtime !== undefined ? runTimeHours - shift1.downtime : 0;
//           const s2Runtime = shift2.downtime !== undefined ? runTimeHours - shift2.downtime : 0;

//           const s1Prod = shift1.product || 0;
//           const s2Prod = shift2.product || 0;

//           shift1Runtime.push(s1Runtime);
//           shift2Runtime.push(s2Runtime);
//           shift1Prod.push(s1Prod);
//           shift2Prod.push(s2Prod);

//           totalProd += s1Prod + s2Prod;
//           totalDowntime += (shift1.downtime || 0) + (shift2.downtime || 0);
//           totalRuntime += s1Runtime + s2Runtime;
//         });

//         const performance = (totalProd / (labels.length * 2 * productionLimit)) * 100;
//         const availability = (totalRuntime / (labels.length * 2 * runTimeHours)) * 100;
//         const quality = 100;
//         const oee = (availability * performance * quality) / 10000;

//         setKpiData((prev) => ({
//           ...prev,
//           oee,


//           downtime: totalDowntime.toFixed(2),
//           performance,
//           quality,
//           labels,
//           productionSummary: {
//             ...prev.productionSummary,
//             overallProd: totalProd,
//             monthlyProd: totalProd,
//             shift1Prod: shift1Prod.at(-1) || 0,
//             shift2Prod: shift2Prod.at(-1) || 0,
//           },
//         }));

//         setRuntimeChartData({
//           labels,
//           datasets: [
//             {
//               label: "Shift 1",
//               data: shift1Runtime,
//               backgroundColor: "#047857",
//               barThickness: 16,
//               categoryPercentage: 0.6,
//               barPercentage: 0.6,
//             },
//             {
//               label: "Shift 2",
//               data: shift2Runtime,
//               backgroundColor: "#34D399",
//               barThickness: 16,
//               categoryPercentage: 0.6,
//               barPercentage: 0.6,
//             },
//           ],
//         });

//         setPlannedChartData({
//           labels,
//           datasets: [
//             {
//               label: "Shift 1 ",
//               data: shift1Prod,
//               backgroundColor: "#1D4ED8",
//               barThickness: 16,
//               categoryPercentage: 0.6,
//               barPercentage: 0.6,

//             },
//             {
//               label: "Shift 2 ",
//               data: shift2Prod,
//               backgroundColor: "#93C5FD",
//               barThickness: 16,
//               categoryPercentage: 0.6,
//               barPercentage: 0.6,
//             },
//           ],
//         });
//       } catch (error) {
//         console.error("Error loading chart data", error);
//       } finally {
//         setLoadingChart(false);
//       }
//     };

//     fetchChartData();
//   }, []);


//   const barChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: true,
//       },
//       datalabels: {
//         anchor: "end",
//         align: "end",
//         font: { size: 10, weight: "bold" },
//         formatter: (value) => value.toFixed(1),
//         color: (context) => {
//           const dataset = context.dataset;
//           return dataset.backgroundColor;
//         },
//         padding: {
//           top: 5,
//         },
//         clip: true,
//       },
//       tooltip: {
//         callbacks: {
//           label: (tooltipItem) =>
//             `${tooltipItem.dataset.label}: ${tooltipItem.raw.toFixed(2)} hrs`,
//         },
//       },
//       annotation: {
//         annotations: {
//           referenceLine: {
//             type: "line",
//             yMin: 9.5,
//             yMax: 9.5,
//             borderDash: [6, 6],
//             borderColor: "orange",
//             borderWidth: 2,
//             label: {
//               display: true,
//               // content: "Runtime (10 hrs)",
//               // color: "green",
//               // backgroundColor: "white",
//               position: "end",
//             },
//           },
//         },
//       },
//       zoom: {
//         pan: { enabled: true, mode: "x" },
//         zoom: {
//           wheel: { enabled: true },
//           pinch: { enabled: true },
//           mode: "x",
//         },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 14,
//         min: 0,
//         grid: { color: "#E5E7EB" },
//         ticks: { stepSize: 2 },
//       },
//       x: {
//         grid: { display: false },
//         ticks: {
//           autoSkip: false,
//         },
//       },
//     },
//     layout: {
//       padding: {
//         top: 9,
//       },
//     },
//   };

//   const getProductionChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: true,
//       },
//       datalabels: {
//         anchor: "end",
//         font: { size: 9, weight: "bold" },
//         align: "end",
//         formatter: (value) => `${value}`,
//         color: (context) => {
//           const dataset = context.dataset;
//           return dataset.backgroundColor;
//         },
//       },
//       tooltip: {
//         callbacks: {
//           label: (tooltipItem) =>
//             `${tooltipItem.dataset.label}: ${tooltipItem.raw.toLocaleString()} Counts`,
//         },
//       },
//       zoom: {
//         pan: { enabled: true, mode: "x" },
//         zoom: {
//           wheel: { enabled: true },
//           pinch: { enabled: true },
//           mode: "x",
//         },
//       },
//       annotation: {
//         annotations: {
//           referenceLine: {
//             type: "line",
//             yMin: 228,
//             yMax: 228,
//             borderColor: "orange",
//             borderDash: [6, 6],
//             borderWidth: 2,
//             label: {
//               content: "Target (240)",
//               enabled: true,
//               position: "end",
//               color: "#000",
//               font: { size: 12, weight: "bold" },
//             },
//           },
//         },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 400,
//         min: 0,
//         grid: { color: "#E5E7EB" },
//         ticks: { stepSize: 10 },
//       },
//       x: {
//         grid: { display: false },
//         ticks: {
//           autoSkip: false,
//         },
//       },
//     },
//   };

//   // Function to get chart reference
//   const getRuntimeChartRef = (chartInstance) => {
//     setRuntimeChartRef(chartInstance);
//   };

//   const getProdChartRef = (chartInstance) => {
//     setProdChartRef(chartInstance);
//   };

//   // Function to format KPI values with color code
//   const getKPIColorCode = (value, type) => {
//     if (type === 'oee' || type === 'availability' || type === 'performance' || type === 'quality') {
//       if (value >= 90) return "green";
//       if (value >= 70) return "yellow";
//       return "green";
//     }
//     if (type === 'downTime') {
//       if (value <= 1) return "green";
//       if (value <= 3) return "yellow";
//       return "green";
//     }
//     return "green";
//   };

//   // Helper function to format KPI values
//   const formatKpiValue = (value, type) => {
//     if (type === 'downTime') return `${value} Hrs`;
//     return `${value.toFixed(2)}%`;
//   };

//   return (
//     <div className="bg-gray-100 h-screen p-1 overflow-scroll">
//       <div className="w-full">
//         <div className="flex items-center justify-between mb-2">
//           <div>
//             <h1 className="text-md font-bold text-gray-800">{assetName} </h1>
//             <div className="w-12 h-1 bg-green-500 mt-2 rounded-full"></div>
//           </div>
//           <div className="flex items-center space-x-2">
//           </div>
//         </div>

//         <div className="mb-2">
//           {loadingKPI ? (
//             <HourglassLoader />
//           ) : (
//             <>
//               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-4 ">
//                 <KPICard
//                   title="OEE Day"
//                   value={`${(kpiData.oee || 0).toFixed(2)}%`}
//                   color={getKPIColorCode(kpiData.oee || 0, 'oee')}
//                 />
//                 <KPICard
//                   title="Prev Day OEE"
//                   value={`${(kpiData.previous_OEE || 0).toFixed(2)}%`}
//                   color={getKPIColorCode(kpiData.previous_OEE || 0, 'availability')}
//                 />
//                 <KPICard
//                   title="OEE MONTH"
//                   value={`${(kpiData.monthly_OEE || 0).toFixed(2)}%`}
//                   color={getKPIColorCode(kpiData.monthly_OEE || 0, 'availability')}
//                 />

//                 <KPICard
//                   title="Downtime"
//                   value={`${kpiData.downtime} `}
//                   color={getKPIColorCode(parseFloat(kpiData.downtime || 0), 'downTime')}
//                 />
//                 <KPICard
//                   title="Quality"
//                   value={`${(kpiData.quality || 0).toFixed(2)}%`}
//                   color={getKPIColorCode(kpiData.quality || 0, 'quality')}
//                 />
//                 <KPICard
//                   title="Performance"
//                   value={`${(kpiData.performance || 0).toFixed(2)}%`}
//                   color={getKPIColorCode(kpiData.performance || 0, 'performance')}
//                 />

//               </div>
//             </>
//           )}
//         </div>

//         <div className="mb-4 bg-white rounded-md shadow-md overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-700 text-white">
//                 <tr>
//                   {Object.keys(kpiData.productionSummary).map((key, idx) => {
//                     const formattedKey = key
//                       .replace(/([A-Z])/g, ' $1')
//                       .replace(/^./, str => str.toUpperCase())
//                       .replace(/Prod/g, 'Production')
//                       .replace(/Nok/g, 'NOK');

//                     return (
//                       <th
//                         className="px-1 py-2 text-xs font-medium text-left "
//                         key={idx}
//                       >
//                         {formattedKey}
//                       </th>
//                     );
//                   })}
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 <tr>
//                   {Object.values(kpiData.productionSummary).map((val, idx) => (
//                     <td className="px-4 py-3 text-sm text-gray-900" key={idx}>
//                       {val.toLocaleString()}
//                     </td>
//                   ))}
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//           <ChartContainer title="GRA - Runtime (Hrs)" isLoading={loadingChart}>
//             {!loadingChart && runtimeChartData && (
//               <>
//                 <div className="relative h-[250px] p-2">
//                   <Bar data={runtimeChartData} options={barChartOptions} />
//                 </div>
//                 <div className="overflow-x-auto mt-2">
//                   <table className="min-w-full text-sm text-left border-t border-gray-300">
//                     <thead className="bg-gray-300">
//                       <tr>
//                         <th className="px-2 py-1 border border-black">Shift</th>
//                         {runtimeChartData.labels.map((label, idx) => (
//                           <th key={idx} className="px-2 py-1 text-center border border-black">{label}</th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr style={{ backgroundColor: "#047857", color: "#fffd" }}>
//                         <td className="px-2 py-1 border border-black">Shift 1</td>
//                         {runtimeChartData.datasets[0].data.map((val, idx) => (
//                           <td key={idx} className="px-2 py-1 text-center border border-black">{val.toFixed(2)}</td>
//                         ))}
//                       </tr>
//                       <tr style={{ backgroundColor: "#34D399", color: "#fffd" }}>
//                         <td className="px-2 py-1  border border-black">Shift 2</td>
//                         {runtimeChartData.datasets[1].data.map((val, idx) => (
//                           <td key={idx} className="px-2 py-1 text-center border border-black">{val.toFixed(2)}</td>
//                         ))}
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>


//               </>
//             )}
//           </ChartContainer>


//           <ChartContainer title="GRA - Production " isLoading={loadingChart}>
//             {!loadingChart && plannedChartData && (
//               <>
//                 <div className="relative h-[250px] p-2">
//                   <Bar data={plannedChartData} options={getProductionChartOptions} />
//                 </div>
//                 <div className="overflow-x-auto mt-2">
//                   <table className="min-w-full text-sm text-left border-t border-gray-300">
//                     <thead className="bg-gray-300 border">
//                       <tr className="border">
//                         <th className="px-2 py-1 border border-black">Shift</th>
//                         {plannedChartData.labels.map((label, idx) => (
//                           <th key={idx} className="px-2 py-1 text-center border border-black">{label}</th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr style={{ backgroundColor: "#1D4ED8", color: "#fffd" }}>
//                         <td className="px-2 py-1 border border-black">Shift 1</td>
//                         {plannedChartData.datasets[0].data.map((val, idx) => (
//                           <td key={idx} className="px-2 py-1 text-center border border-black">{val}</td>
//                         ))}
//                       </tr>
//                       <tr style={{ backgroundColor: "#93C5FD", color: "#fffd" }}>
//                         <td className="px-2 py-1 border border-black">Shift 2</td>
//                         {plannedChartData.datasets[1].data.map((val, idx) => (
//                           <td key={idx} className="px-2 py-1 text-center border border-black">{val}</td>
//                         ))}
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </>
//             )}
//           </ChartContainer>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;
"use client";
import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
// import { getPerformanceIndex, getHisRuntimeDowntime } from "@/webServices/UCIAPIController";

import KPISection from "@/Components/Automation/KPISection";
import ChartsSection from "@/Components/Automation/ChartsSection";

const timezone = "America/Chicago";
const assetName = "GCS";

const Page = () => {
  const [kpiData, setKpiData] = useState({
    oee: 0,
    previous_OEE: 0,
    availability: 0,
    downtime: 0,
    quality: 0,
    performance: 0,
    labels: [],
    productionSummary: {
      overallProd: 0,
      monthlyProd: 0,
      prevDayProd: 0,
      currentDayProd: 0,
      shift1Prod: 0,
      shift2Prod: 0,
      shift1Rejection: 0,
      shift2Rejection: 0,
      currentDayRejection: 0,
    },
  });

  const [runtimeChartData, setRuntimeChartData] = useState(null);
  const [plannedChartData, setPlannedChartData] = useState(null);
  const [loadingKPI, setLoadingKPI] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);
  const [currentDateWindow, setCurrentDateWindow] = useState({}); // offset in days (multiples of 7)
  const [loadingAsset, setLoadingAsset] = useState(null);

  // Navigate by 7 days windows: direction = +1 or -1
  const handleNavigate = (asset, direction) => {
    setLoadingAsset(asset);
    setCurrentDateWindow((prev) => ({
      ...prev,
      [asset]: (prev[asset] || 0) + direction * 7,
    }));
    setLoadingAsset(null);
  };

  // Check if we are at current date window (offset 0)
  const isAtCurrentDate = (asset) => (currentDateWindow[asset] || 0) === 0;

  // Fetch KPI data only on initial load
  useEffect(() => {
    const now = DateTime.now().setZone(timezone);
    const from = now.startOf("day").toFormat("yyyy-MM-dd HH:mm");
    const to = now.set({ hour: 20, minute: 0 }).toFormat("yyyy-MM-dd HH:mm");

    const fetchKpiData = async () => {
      try {
        setLoadingKPI(true);
        const data = await getPerformanceIndex(assetName, from, to, timezone);
        setKpiData((prev) => ({
          ...prev,
          ...data,
          productionSummary: {
            overallProd: data?.overall_Count || 0,
            monthlyProd: data?.monthly_Count || 0,
            prevDayProd: data?.prev_Day_OK_Count || 0,
            currentDayProd: data?.today_Count || 0,
            shift1Prod: data?.shift_1_OK_Count || 0,
            shift2Prod: data?.shift_2_OK_Count || 0,
            shift1Rejection: data?.shift_1_NOK_Count || 0,
            shift2Rejection: data?.shift_2_NOK_Count || 0,
            currentDayRejection: data?.today_NOK_Count || 0,
          },
        }));
      } catch (error) {
        console.error("❌ Failed to fetch KPI data:", error);
      } finally {
        setLoadingKPI(false);
      }
    };

    fetchKpiData();
  }, []);

  // Fetch chart data based on current date window offset for assetName
  useEffect(() => {
    const offset = currentDateWindow[assetName] || 0;

    // now + offset days (offset multiples of 7)
    const now = DateTime.now().setZone(timezone).plus({ days: offset });

    // 7-day window from now - 6 days to now (inclusive)
    const from = now.minus({ days: 6 }).startOf("day").toFormat("yyyy-MM-dd HH:mm");
    const to = now.endOf("day").toFormat("yyyy-MM-dd HH:mm");

    // Generate fixed 7 days labels function
    const generateLast7DaysLabels = (endDate) => {
      const labels = [];
      for (let i = 6; i >= 0; i--) {
        labels.push(endDate.minus({ days: i }).toFormat("dd/LL"));
      }
      return labels;
    };

    const fetchChartData = async () => {
      try {
        setLoadingChart(true);
        const res = await getHisRuntimeDowntime(assetName, from, to, timezone);

        const groupedData = {};
        const runTimeHours = res.runTimeHours || 9.5;
        const productionLimit = res.productionLimit || 228;

        // Group production data
        res.prodData.forEach((item) => {
          const date = DateTime.fromISO(item.timestamp).toFormat("dd/LL");
          groupedData[date] = groupedData[date] || { Shift1: {}, Shift2: {} };
          groupedData[date][item.shift].product = item.product_count;
        });

        // Group downtime data
        res.downTimeData.forEach((item) => {
          const date = DateTime.fromISO(item.timestamp).toFormat("dd/LL");
          groupedData[date] = groupedData[date] || { Shift1: {}, Shift2: {} };
          groupedData[date][item.shift].downtime = item.downtime;
        });

        // Create labels for exactly 7 days
        const labels = generateLast7DaysLabels(now);

        const shift1Runtime = [];
        const shift2Runtime = [];
        const shift1Prod = [];
        const shift2Prod = [];
        let totalProd = 0;
        let totalDowntime = 0;
        let totalRuntime = 0;

        labels.forEach((date) => {
          const shift1 = groupedData[date]?.Shift1 || {};
          const shift2 = groupedData[date]?.Shift2 || {};

          const s1Downtime = shift1.downtime || 0;
          const s2Downtime = shift2.downtime || 0;

          const s1Runtime = runTimeHours - s1Downtime;
          const s2Runtime = runTimeHours - s2Downtime;

          const s1Prod = shift1.product || 0;
          const s2Prod = shift2.product || 0;

          shift1Runtime.push(s1Runtime);
          shift2Runtime.push(s2Runtime);
          shift1Prod.push(s1Prod);
          shift2Prod.push(s2Prod);

          totalProd += s1Prod + s2Prod;
          totalDowntime += s1Downtime + s2Downtime;
          totalRuntime += s1Runtime + s2Runtime;
        });

        const performance = (totalProd / (labels.length * 2 * productionLimit)) * 100;
        const availability = (totalRuntime / (labels.length * 2 * runTimeHours)) * 100;
        const quality = 100;
        const oee = (availability * performance * quality) / 10000;

        setKpiData((prev) => ({
          ...prev,
          oee,
          downtime: totalDowntime.toFixed(2),
          performance,
          quality,
          labels,
          productionSummary: {
            ...prev.productionSummary,
            overallProd: totalProd,
            monthlyProd: totalProd,
            shift1Prod: shift1Prod.at(-1) || 0,
            shift2Prod: shift2Prod.at(-1) || 0,
          },
        }));

        setRuntimeChartData({
          labels,
          datasets: [
            {
              label: "Shift 1",
              data: shift1Runtime,
              backgroundColor: "#047857",
              barThickness: 16,
              categoryPercentage: 0.6,
              barPercentage: 0.6,
            },
            {
              label: "Shift 2",
              data: shift2Runtime,
              backgroundColor: "#34D399",
              barThickness: 16,
              categoryPercentage: 0.6,
              barPercentage: 0.6,
            },
          ],
        });

        setPlannedChartData({
          labels,
          datasets: [
            {
              label: "Shift 1",
              data: shift1Prod,
              backgroundColor: "#1D4ED8",
              barThickness: 16,
              categoryPercentage: 0.6,
              barPercentage: 0.6,
            },
            {
              label: "Shift 2",
              data: shift2Prod,
              backgroundColor: "#93C5FD",
              barThickness: 16,
              categoryPercentage: 0.6,
              barPercentage: 0.6,
            },
          ],
        });
      } catch (error) {
        console.error("Error loading chart data", error);
      } finally {
        setLoadingChart(false);
      }
    };

    fetchChartData();
  }, [currentDateWindow]);

  return (
    <div className="bg-gray-100 h-screen p-1 overflow-scroll">
      <div className="w-full">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-md font-bold text-gray-800">{assetName}</h1>
            <div className="w-12 h-1 bg-green-500 mt-2 rounded-full"></div>
          </div>
        </div>

        <KPISection kpiData={kpiData} loadingKPI={loadingKPI} />

        <ChartsSection
          asset={assetName}
          loadingChart={loadingChart}
          runtimeChartData={runtimeChartData}
          plannedChartData={plannedChartData}
          kpiData={kpiData}
          loadingAsset={loadingAsset}
          onNavigate={handleNavigate}
          isAtCurrentDate={isAtCurrentDate}
            currentOffset={currentDateWindow[assetName] || 0} 
        />
      </div>
    </div>
  );
};

export default Page;
