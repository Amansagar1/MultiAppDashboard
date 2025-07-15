
// "use client"
// import React, { useEffect, useRef, useState } from 'react';
// import * as echarts from 'echarts';
// import { IndianRupee, Activity, Zap, Battery, Percent } from 'lucide-react';

// const mixerData = {
//     'mixer-a': {
//         name: 'Mixer A',
//         stats: {
//             phaseVoltage: '230 V',
//             lineVoltage: '415 V',
//             totalCurrent: '1500A',
//             totalPF: '0.98',
//             estimatedBill: '₹12,220',
//             energyConsumption: '123 kWh'
//         },
//         processFlow: ['Side Pot', 'Mixer A', 'Transfer Pump', 'Storage Tank'],
//         hourlyData: Array(24).fill().map((_, i) => ({
//             time: `${String(i).padStart(2, '0')}:00`,
//             mainLine: Math.random() * 50 + 50,
//             grindingLine: Math.random() * 50 + 40
//         })),
//         availability: Array(24).fill().map((_, i) => ({
//             time: `${String(i).padStart(2, '0')}:00`,
//             value: Math.random() * 0.4 + 0.6
//         })),
//         performance: Array(24).fill().map((_, i) => ({
//             time: `${String(i).padStart(2, '0')}:00`,
//             value: Math.random() * 30 + 70
//         })),
//         runHours: { full: 65, idle: 20, off: 15 },
//         processEfficiency: {
//             optimal: 45,
//             standard: 35,
//             suboptimal: 20
//         },
//         equipmentUsage: {
//             machine1: Array(8).fill().map(() => Math.floor(Math.random() * 30 + 60)),
//             machine2: Array(8).fill().map(() => Math.floor(Math.random() * 25 + 55)),
//             machine3: Array(8).fill().map(() => Math.floor(Math.random() * 20 + 50))
//         }
//     },
//     'mixer-b': {
//         name: 'Mixer B',
//         stats: {
//             phaseVoltage: '230 V',
//             lineVoltage: '415 V',
//             totalCurrent: '1500A',
//             totalPF: '0.98',
//             estimatedBill: '₹12,220',
//             energyConsumption: '123 kWh'
//         },
//         processFlow: ['Side Pot', 'Mixer B', 'Transfer Pump', 'Storage Tank'],
//         hourlyData: Array(24).fill().map((_, i) => ({
//             time: `${String(i).padStart(2, '0')}:00`,
//             mainLine: Math.random() * 50 + 50,
//             grindingLine: Math.random() * 50 + 40
//         })),
//         availability: Array(24).fill().map((_, i) => ({
//             time: `${String(i).padStart(2, '0')}:00`,
//             value: Math.random() * 0.4 + 0.6
//         })),
//         performance: Array(24).fill().map((_, i) => ({
//             time: `${String(i).padStart(2, '0')}:00`,
//             value: Math.random() * 30 + 70
//         })),
//         runHours: { full: 65, idle: 20, off: 15 },
//         processEfficiency: {
//             optimal: 45,
//             standard: 35,
//             suboptimal: 20
//         },
//         equipmentUsage: {
//             machine1: Array(8).fill().map(() => Math.floor(Math.random() * 30 + 60)),
//             machine2: Array(8).fill().map(() => Math.floor(Math.random() * 25 + 55)),
//             machine3: Array(8).fill().map(() => Math.floor(Math.random() * 20 + 50))
//         }
//     },
//     'mixer-c': {
//         name: 'Mixer C',
//         stats: {
//             phaseVoltage: '230 V',
//             lineVoltage: '415 V',
//             totalCurrent: '1500A',
//             totalPF: '0.98',
//             estimatedBill: '₹12,220',
//             energyConsumption: '123 kWh'
//         },
//         processFlow: ['Side Pot', 'Mixer C', 'Transfer Pump', 'Storage Tank'],
//         hourlyData: Array(24).fill().map((_, i) => ({
//             time: `${String(i).padStart(2, '0')}:00`,
//             mainLine: Math.random() * 50 + 50,
//             grindingLine: Math.random() * 50 + 40
//         })),
//         availability: Array(24).fill().map((_, i) => ({
//             time: `${String(i).padStart(2, '0')}:00`,
//             value: Math.random() * 0.4 + 0.6
//         })),
//         performance: Array(24).fill().map((_, i) => ({
//             time: `${String(i).padStart(2, '0')}:00`,
//             value: Math.random() * 30 + 70
//         })),
//         runHours: { full: 65, idle: 20, off: 15 },
//         processEfficiency: {
//             optimal: 45,
//             standard: 35,
//             suboptimal: 20
//         },
//         equipmentUsage: {
//             machine1: Array(8).fill().map(() => Math.floor(Math.random() * 30 + 60)),
//             machine2: Array(8).fill().map(() => Math.floor(Math.random() * 25 + 55)),
//             machine3: Array(8).fill().map(() => Math.floor(Math.random() * 20 + 50))
//         }
//     }
// };

// const Production = () => {
//     const [activeTab, setActiveTab] = useState('mixer-a');
//     const [activeShift, setActiveShift] = useState('shift-a');
//     const data = mixerData[activeTab];
//     const lineChart1Ref = useRef(null);
//     const lineChart2Ref = useRef(null);
//     const barChart1Ref = useRef(null);
//     const barChart2Ref = useRef(null);
//     const pieChartRef = useRef(null);
//     const doughnutChartRef = useRef(null);

//     // ... rest of the chart options and useEffect remain the same ...
//     useEffect(() => {
//         const lineChartOption1 = {
//             title: { text: 'Availability of lines for 8 hrs', left: 'center' },
//             tooltip: { trigger: 'axis' },
//             legend: { data: ['Main Line', 'Grinding Line'], bottom: 0 },
//             xAxis: { type: 'category', data: data.hourlyData.map(item => item.time) },
//             yAxis: { type: 'value', name: 'Percentage', max: 100 },
//             series: [
//                 {
//                     name: 'Main Line',
//                     type: 'line',
//                     data: data.hourlyData.map(item => item.mainLine),
//                     smooth: true,
//                     lineStyle: { width: 3 },
//                     itemStyle: { color: '#4096ff' }
//                 },
//                 {
//                     name: 'Grinding Line',
//                     type: 'line',
//                     data: data.hourlyData.map(item => item.grindingLine),
//                     smooth: true,
//                     lineStyle: { width: 3 },
//                     itemStyle: { color: '#ff4d4f' }
//                 }
//             ]
//         };

//         const lineChartOption2 = {
//             title: { text: 'Energy Consumption Trend for Shift', left: 'center' },
//             tooltip: { trigger: 'axis' },
//             xAxis: { type: 'category', data: data.performance.map(item => item.time) },
//             yAxis: { type: 'value', name: 'Performance %', max: 100 },
//             series: [{
//                 type: 'line',
//                 data: data.performance.map(item => item.value),
//                 smooth: true,
//                 lineStyle: { width: 3 },
//                 itemStyle: { color: '#52c41a' }
//             }]
//         };

//         const barChartOption1 = {
//             title: { text: 'Idle Hour Consumption (kWh) per hour -8 hrs', left: 'center' },
//             tooltip: { trigger: 'axis' },
//             legend: {
//                 data: ['Machine 1', 'Machine 2', 'Machine 3'],
//                 bottom: 0
//             },
//             xAxis: { type: 'category', data: Array(8).fill().map((_, i) => `${String(i).padStart(2, '0')}:00`) },
//             yAxis: { type: 'value', name: 'Usage %', max: 100 },
//             series: [
//                 {
//                     name: 'Machine 1',
//                     type: 'bar',
//                     data: data.equipmentUsage.machine1,
//                     itemStyle: { color: '#4096ff' }
//                 },
//                 {
//                     name: 'Machine 2',
//                     type: 'bar',
//                     data: data.equipmentUsage.machine2,
//                     itemStyle: { color: '#ff4d4f' }
//                 },
//                 {
//                     name: 'Machine 3',
//                     type: 'bar',
//                     data: data.equipmentUsage.machine3,
//                     itemStyle: { color: '#52c41a' }
//                 }
//             ]
//         };

//         const barChartOption2 = {
//             title: { text: 'Energy consumption For the Month', left: 'center' },
//             tooltip: { trigger: 'axis' },
//             xAxis: { type: 'category', data: data.hourlyData.slice(0, 8).map(item => item.time) },
//             yAxis: { type: 'value', name: 'kWh' },
//             series: [{
//                 type: 'bar',
//                 data: data.hourlyData.slice(0, 8).map(() => Math.random() * 10 + 5),
//                 itemStyle: { color: '#faad14' }
//             }]
//         };

//         const pieChartOption = {
//             title: { text: 'Run Hours Distribution', left: 'center' },
//             tooltip: { trigger: 'item' },
//             legend: { orient: 'vertical', left: 'left' },
//             series: [{
//                 type: 'pie',
//                 radius: '50%',
//                 data: [
//                     { value: data.runHours.full, name: 'Full Load/Run', itemStyle: { color: '#52c41a' } },
//                     { value: data.runHours.idle, name: 'Idle Hours', itemStyle: { color: '#faad14' } },
//                     { value: data.runHours.off, name: 'Off Hours', itemStyle: { color: '#ff4d4f' } }
//                 ]
//             }]
//         };

//         const doughnutChartOption = {
//             title: { text: 'Process Efficiency', left: 'center' },
//             tooltip: { trigger: 'item' },
//             legend: {
//                 orient: 'vertical',
//                 left: 'left'
//             },
//             series: [{
//                 name: 'Process Efficiency',
//                 type: 'pie',
//                 radius: ['40%', '70%'],
//                 avoidLabelOverlap: false,
//                 label: {
//                     show: true,
//                     position: 'center',
//                     formatter: '{d}%'
//                 },
//                 emphasis: {
//                     label: {
//                         show: true,
//                         fontSize: 20,
//                         fontWeight: 'bold'
//                     }
//                 },
//                 data: [
//                     { value: data.processEfficiency.optimal, name: 'Optimal', itemStyle: { color: '#52c41a' } },
//                     { value: data.processEfficiency.standard, name: 'Standard', itemStyle: { color: '#faad14' } },
//                     { value: data.processEfficiency.suboptimal, name: 'Suboptimal', itemStyle: { color: '#ff4d4f' } }
//                 ]
//             }]
//         };

//         const charts = [
//             { ref: lineChart1Ref, option: lineChartOption1 },
//             { ref: lineChart2Ref, option: lineChartOption2 },
//             { ref: barChart1Ref, option: barChartOption1 },
//             { ref: barChart2Ref, option: barChartOption2 },
//             { ref: pieChartRef, option: pieChartOption },
//             { ref: doughnutChartRef, option: doughnutChartOption }
//         ];

//         const instances = charts.map(({ ref, option }) => {
//             const chart = echarts.init(ref.current);
//             chart.setOption(option);
//             return chart;
//         });

//         const handleResize = () => instances.forEach(chart => chart.resize());
//         window.addEventListener('resize', handleResize);

//         return () => {
//             instances.forEach(chart => chart.dispose());
//             window.removeEventListener('resize', handleResize);
//         };
//     }, [data]);

//     return (
//         <div className="p-2 bg-gray-100">

//             {/* Tabs and Shift Selection */}
//             <div className="flex justify-between items-center mb-1 p-2">
//                 <div className="flex space-x-2">
//                     {Object.keys(mixerData).map((key) => (
//                         <button
//                             key={key}
//                             onClick={() => setActiveTab(key)}
//                             className={`px-4 py-2 rounded-md transition-colors ${activeTab === key
//                                 ? 'bg-blue-500 text-white'
//                                 : 'bg-white text-gray-600 hover:bg-gray-200 shadow-md'
//                                 }`}
//                         >
//                             {mixerData[key].name}
//                         </button>
//                     ))}
//                 </div>

//                 {/* Shift Selection Dropdown */}
//                 <select
//                     value={activeShift}
//                     onChange={(e) => setActiveShift(e.target.value)}
//                     className="px-4 py-2 rounded-md bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 >
//                     <option value="shift-a">Shift A</option>
//                     <option value="shift-b">Shift B</option>
//                     <option value="shift-c">Shift C</option>
//                 </select>
//             </div>

//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-2">
//                 <div className="border-l-2 border-green-400 shadow-sm rounded-md bg-white">
//                     <div className="flex flex-col items-center justify-center p-4">
//                         <Activity className="h-8 w-8 text-blue-500 mb-2" />
//                         <p className="text-sm text-gray-500">Phase Voltage</p>
//                         <p className="text-xl font-bold">{data.stats.phaseVoltage}</p>
//                     </div>
//                 </div>
//                 <div className="border-l-2 border-green-400 shadow-sm rounded-md bg-white">
//                     <div className="flex flex-col items-center justify-center p-4">
//                         <Zap className="h-8 w-8 text-yellow-500 mb-2" />
//                         <p className="text-sm text-gray-500">Line Voltage</p>
//                         <p className="text-xl font-bold">{data.stats.lineVoltage}</p>
//                     </div>
//                 </div>
//                 <div className="border-l-2 border-green-400 shadow-sm rounded-md bg-white">
//                     <div className="flex flex-col items-center justify-center p-4">
//                         <Battery className="h-8 w-8 text-green-500 mb-2" />
//                         <p className="text-sm text-gray-500">Total Current</p>
//                         <p className="text-xl font-bold">{data.stats.totalCurrent}</p>
//                     </div>
//                 </div>
//                 <div className="border-l-2 border-green-400 shadow-sm rounded-md bg-white">
//                     <div className="flex flex-col items-center justify-center p-4">
//                         <Percent className="h-8 w-8 text-purple-500 mb-2" />
//                         <p className="text-sm text-gray-500">Total PF</p>
//                         <p className="text-xl font-bold">{data.stats.totalPF}</p>
//                     </div>
//                 </div>
//                 <div className="border-l-2 border-green-400 shadow-sm rounded-md bg-white">
//                     <div className="flex flex-col items-center justify-center p-4">
//                         <IndianRupee className="h-8 w-8 text-red-500 mb-2" />
//                         <p className="text-sm text-gray-500">Estimated Bill</p>
//                         <p className="text-xl font-bold">{data.stats.estimatedBill}</p>
//                     </div>
//                 </div>
//                 <div className="border-l-2 border-green-400 shadow-sm rounded-md bg-white">
//                     <div className="flex flex-col items-center justify-center p-4">
//                         <Activity className="h-8 w-8 text-orange-500 mb-2" />
//                         <p className="text-sm text-gray-500">Energy Consumption</p>
//                         <p className="text-xl font-bold">{data.stats.energyConsumption}</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Charts Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                 <div className="bg-white p-4 rounded-lg shadow">
//                     <div ref={lineChart1Ref} style={{ height: '300px' }} />
//                 </div>
//                 <div className="bg-white p-4 rounded-lg shadow">
//                     <div ref={lineChart2Ref} style={{ height: '300px' }} />
//                 </div>
//                 <div className="bg-white p-4 rounded-lg shadow">
//                     <div ref={barChart1Ref} style={{ height: '300px' }} />
//                 </div>
//                 <div className="bg-white p-4 rounded-lg shadow">
//                     <div ref={barChart2Ref} style={{ height: '300px' }} />
//                 </div>
//                 <div className="bg-white p-4 rounded-lg shadow">
//                     <div ref={pieChartRef} style={{ height: '300px' }} />
//                 </div>
//                 <div className="bg-white p-4 rounded-lg shadow">
//                     <div ref={doughnutChartRef} style={{ height: '300px' }} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Production;



"use client"
import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { IndianRupee, Activity, Zap, Battery, Percent } from 'lucide-react';

// Sample data structure for mixers
const mixerData = {
    'mixer-a': {
        name: 'Mixer A',
        stats: {
            phaseVoltage: '230 V',
            lineVoltage: '415 V',
            totalCurrent: '1500A',
            totalPF: '0.98',
            estimatedBill: '₹12,220',
            energyConsumption: '123 kWh'
        },
        hourlyData: Array(24).fill().map((_, i) => ({
            time: `${String(i).padStart(2, '0')}:00`,
            mainLine: Math.random() * 50 + 50,
            grindingLine: Math.random() * 50 + 40
        })),
        performance: Array(24).fill().map((_, i) => ({
            time: `${String(i).padStart(2, '0')}:00`,
            value: Math.random() * 30 + 70
        })),
        equipmentUsage: {
            machine1: Array(8).fill().map(() => Math.floor(Math.random() * 30 + 60)),
            machine2: Array(8).fill().map(() => Math.floor(Math.random() * 25 + 55)),
            machine3: Array(8).fill().map(() => Math.floor(Math.random() * 20 + 50))
        },
        runHours: { full: 65, idle: 20, off: 15 },
        processEfficiency: {
            optimal: 45,
            standard: 35,
            suboptimal: 20
        }
    },
    'mixer-b': {
        // Similar structure as mixer-a with different values
        name: 'Mixer B',
        stats: {
            phaseVoltage: '230 V',
            lineVoltage: '415 V',
            totalCurrent: '1500A',
            totalPF: '0.98',
            estimatedBill: '₹12,220',
            energyConsumption: '123 kWh'
        },
        hourlyData: Array(24).fill().map((_, i) => ({
            time: `${String(i).padStart(2, '0')}:00`,
            mainLine: Math.random() * 50 + 50,
            grindingLine: Math.random() * 50 + 40
        })),
        performance: Array(24).fill().map((_, i) => ({
            time: `${String(i).padStart(2, '0')}:00`,
            value: Math.random() * 30 + 70
        })),
        equipmentUsage: {
            machine1: Array(8).fill().map(() => Math.floor(Math.random() * 30 + 60)),
            machine2: Array(8).fill().map(() => Math.floor(Math.random() * 25 + 55)),
            machine3: Array(8).fill().map(() => Math.floor(Math.random() * 20 + 50))
        },
        runHours: { full: 65, idle: 20, off: 15 },
        processEfficiency: {
            optimal: 45,
            standard: 35,
            suboptimal: 20
        }
    },
    'mixer-c': {
        // Similar structure as mixer-a with different values
        name: 'Mixer C',
        stats: {
            phaseVoltage: '230 V',
            lineVoltage: '415 V',
            totalCurrent: '1500A',
            totalPF: '0.98',
            estimatedBill: '₹12,220',
            energyConsumption: '123 kWh'
        },
        hourlyData: Array(24).fill().map((_, i) => ({
            time: `${String(i).padStart(2, '0')}:00`,
            mainLine: Math.random() * 50 + 50,
            grindingLine: Math.random() * 50 + 40
        })),
        performance: Array(24).fill().map((_, i) => ({
            time: `${String(i).padStart(2, '0')}:00`,
            value: Math.random() * 30 + 70
        })),
        equipmentUsage: {
            machine1: Array(8).fill().map(() => Math.floor(Math.random() * 30 + 60)),
            machine2: Array(8).fill().map(() => Math.floor(Math.random() * 25 + 55)),
            machine3: Array(8).fill().map(() => Math.floor(Math.random() * 20 + 50))
        },
        runHours: { full: 65, idle: 20, off: 15 },
        processEfficiency: {
            optimal: 45,
            standard: 35,
            suboptimal: 20
        }
    }
};

const Production = () => {
    const [activeTab, setActiveTab] = useState('mixer-a');
    const [activeShift, setActiveShift] = useState('shift-a');
    const data = mixerData[activeTab];
    const [chartInstances, setChartInstances] = useState({});

    // Chart refs
    const chartRefs = {
        lineChart1: useRef(null),
        lineChart2: useRef(null),
        barChart1: useRef(null),
        barChart2: useRef(null),
        pieChart: useRef(null),
        doughnutChart: useRef(null)
    };

    // Get responsive chart height
    const getChartHeight = () => {
        if (typeof window !== 'undefined') {
            const width = window.innerWidth;
            if (width < 640) return '250px';
            if (width < 1024) return '275px';
            return '300px';
        }
        return '300px';
    };

    // Chart options generator
    const getChartOptions = () => ({
        lineChart1: {
            title: {
                text: 'Availability of lines for 8 hrs',
                left: 'center',
                textStyle: { fontSize: window.innerWidth < 640 ? 12 : 14 }
            },
            tooltip: { trigger: 'axis', confine: true },
            legend: {
                data: ['Main Line', 'Grinding Line'],
                bottom: 0,
                textStyle: { fontSize: window.innerWidth < 640 ? 10 : 12 }
            },
            grid: { top: '15%', left: '3%', right: '4%', bottom: '15%', containLabel: true },
            xAxis: {
                type: 'category',
                data: data.hourlyData.map(item => item.time),
                axisLabel: { rotate: window.innerWidth < 640 ? 45 : 0 }
            },
            yAxis: { type: 'value', name: 'Percentage', max: 100 },
            series: [
                {
                    name: 'Main Line',
                    type: 'line',
                    data: data.hourlyData.map(item => item.mainLine),
                    smooth: true,
                    lineStyle: { width: window.innerWidth < 640 ? 2 : 3 },
                    itemStyle: { color: '#4096ff' }
                },
                {
                    name: 'Grinding Line',
                    type: 'line',
                    data: data.hourlyData.map(item => item.grindingLine),
                    smooth: true,
                    lineStyle: { width: window.innerWidth < 640 ? 2 : 3 },
                    itemStyle: { color: '#ff4d4f' }
                }
            ]
        },
        lineChart2: {
            title: {
                text: 'Energy Consumption Trend for Shift',
                left: 'center',
                textStyle: { fontSize: window.innerWidth < 640 ? 12 : 14 }
            },
            tooltip: { trigger: 'axis', confine: true },
            grid: { top: '15%', left: '3%', right: '4%', bottom: '15%', containLabel: true },
            xAxis: {
                type: 'category',
                data: data.performance.map(item => item.time),
                axisLabel: { rotate: window.innerWidth < 640 ? 45 : 0 }
            },
            yAxis: { type: 'value', name: 'Performance %', max: 100 },
            series: [{
                type: 'line',
                data: data.performance.map(item => item.value),
                smooth: true,
                lineStyle: { width: window.innerWidth < 640 ? 2 : 3 },
                itemStyle: { color: '#52c41a' }
            }]
        },
        barChart1: {
            title: {
                text: 'Idle Hour Consumption (kWh) per hour -8 hrs',
                left: 'center',
                textStyle: { fontSize: window.innerWidth < 640 ? 12 : 14 }
            },
            tooltip: { trigger: 'axis', confine: true },
            legend: {
                data: ['Machine 1', 'Machine 2', 'Machine 3'],
                bottom: 0,
                textStyle: { fontSize: window.innerWidth < 640 ? 10 : 12 }
            },
            grid: { top: '15%', left: '3%', right: '4%', bottom: '15%', containLabel: true },
            xAxis: {
                type: 'category',
                data: Array(8).fill().map((_, i) => `${String(i).padStart(2, '0')}:00`),
                axisLabel: { rotate: window.innerWidth < 640 ? 45 : 0 }
            },
            yAxis: { type: 'value', name: 'Usage %', max: 100 },
            series: [
                {
                    name: 'Machine 1',
                    type: 'bar',
                    data: data.equipmentUsage.machine1,
                    itemStyle: { color: '#4096ff' }
                },
                {
                    name: 'Machine 2',
                    type: 'bar',
                    data: data.equipmentUsage.machine2,
                    itemStyle: { color: '#ff4d4f' }
                },
                {
                    name: 'Machine 3',
                    type: 'bar',
                    data: data.equipmentUsage.machine3,
                    itemStyle: { color: '#52c41a' }
                }
            ]
        },
        barChart2: {
            title: {
                text: 'Energy consumption For the Month',
                left: 'center',
                textStyle: { fontSize: window.innerWidth < 640 ? 12 : 14 }
            },
            tooltip: { trigger: 'axis', confine: true },
            grid: { top: '15%', left: '3%', right: '4%', bottom: '15%', containLabel: true },
            xAxis: {
                type: 'category',
                data: data.hourlyData.slice(0, 8).map(item => item.time),
                axisLabel: { rotate: window.innerWidth < 640 ? 45 : 0 }
            },
            yAxis: { type: 'value', name: 'kWh' },
            series: [{
                type: 'bar',
                data: data.hourlyData.slice(0, 8).map(() => Math.random() * 10 + 5),
                itemStyle: { color: '#faad14' }
            }]
        },
        pieChart: {
            title: {
                text: 'Run Hours Distribution',
                left: 'center',
                textStyle: { fontSize: window.innerWidth < 640 ? 12 : 14 }
            },
            tooltip: { trigger: 'item', confine: true },
            legend: {
                orient: 'vertical',
                left: 'left',
                textStyle: { fontSize: window.innerWidth < 640 ? 10 : 12 }
            },
            series: [{
                type: 'pie',
                radius: '50%',
                data: [
                    { value: data.runHours.full, name: 'Full Load/Run', itemStyle: { color: '#52c41a' } },
                    { value: data.runHours.idle, name: 'Idle Hours', itemStyle: { color: '#faad14' } },
                    { value: data.runHours.off, name: 'Off Hours', itemStyle: { color: '#ff4d4f' } }
                ]
            }]
        },
        doughnutChart: {
            title: {
                text: 'Process Efficiency',
                left: 'center',
                textStyle: { fontSize: window.innerWidth < 640 ? 12 : 14 }
            },
            tooltip: { trigger: 'item', confine: true },
            legend: {
                orient: 'vertical',
                left: 'left',
                textStyle: { fontSize: window.innerWidth < 640 ? 10 : 12 }
            },
            series: [{
                name: 'Process Efficiency',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: true,
                    position: 'center',
                    formatter: '{d}%',
                    fontSize: window.innerWidth < 640 ? 10 : 12
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: window.innerWidth < 640 ? 16 : 20,
                        fontWeight: 'bold'
                    }
                },
                data: [
                    { value: data.processEfficiency.optimal, name: 'Optimal', itemStyle: { color: '#52c41a' } },
                    { value: data.processEfficiency.standard, name: 'Standard', itemStyle: { color: '#faad14' } },
                    { value: data.processEfficiency.suboptimal, name: 'Suboptimal', itemStyle: { color: '#ff4d4f' } }
                ]
            }]
        }
    });

    // Initialize and handle charts
    useEffect(() => {
        const options = getChartOptions();
        const newInstances = {};

        // Initialize all charts
        Object.entries(chartRefs).forEach(([key, ref]) => {
            if (ref.current) {
                if (chartInstances[key]) {
                    chartInstances[key].dispose();
                }
                const chart = echarts.init(ref.current);
                chart.setOption(options[key]);
                newInstances[key] = chart;
            }
        });

        setChartInstances(newInstances);

        // Handle resize
        const handleResize = () => {
            const newOptions = getChartOptions();
            Object.entries(newInstances).forEach(([key, chart]) => {
                chart.resize();
                chart.setOption(newOptions[key]);
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            Object.values(newInstances).forEach(chart => chart.dispose());
            window.removeEventListener('resize', handleResize);
        };
    }, [data]);

    // Stats card data
    const statsCards = [
        { icon: Activity, label: 'Phase Voltage', value: data.stats.phaseVoltage, color: 'blue' },
        { icon: Zap, label: 'Line Voltage', value: data.stats.lineVoltage, color: 'yellow' },
        { icon: Battery, label: 'Total Current', value: data.stats.totalCurrent, color: 'green' },
        { icon: Percent, label: 'Total PF', value: data.stats.totalPF, color: 'purple' },
        { icon: IndianRupee, label: 'Estimated Bill', value: data.stats.estimatedBill, color: 'red' },
        { icon: Activity, label: 'Energy Consumption', value: data.stats.energyConsumption, color: 'orange' }
    ];

    return (
        <div className="p-2 md:p-4 bg-gray-100 min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                {/* Mixer Selection Tabs */}
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    {Object.keys(mixerData).map((key) => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base rounded-md transition-colors 
                                ${activeTab === key
                                    ? 'bg-blue-500 text-white shadow-lg'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 shadow-md hover:shadow-lg'
                                } flex-1 sm:flex-none`}
                        >
                            {mixerData[key].name}
                        </button>
                    ))}
                </div>

                {/* Shift Selection */}
                <select
                    value={activeShift}
                    onChange={(e) => setActiveShift(e.target.value)}
                    className="w-full sm:w-auto px-3 py-1.5 text-sm md:text-base rounded-md bg-white border border-gray-200 
                        shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="shift-a">Shift A</option>
                    <option value="shift-b">Shift B</option>
                    <option value="shift-c">Shift C</option>
                </select>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-4 mb-4">
                {statsCards.map((stat, index) => (
                    <div
                        key={index}
                        className="border-l-2 border-green-400 shadow-sm rounded-md bg-white p-2 md:p-4 
                            hover:shadow-md transition-shadow duration-200"
                    >
                        <div className="flex flex-col items-center justify-center">
                            <stat.icon className={`h-6 w-6 md:h-8 md:w-8 text-${stat.color}-500 mb-1 md:mb-2`} />
                            <p className="text-xs md:text-sm text-gray-500 text-center">{stat.label}</p>
                            <p className="text-sm md:text-xl font-bold">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                {/* Line Chart 1 - Availability */}
                <div className="bg-white p-2 md:p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200">
                    <div ref={chartRefs.lineChart1} style={{ height: getChartHeight() }} />
                </div>

                {/* Line Chart 2 - Energy Consumption Trend */}
                <div className="bg-white p-2 md:p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200">
                    <div ref={chartRefs.lineChart2} style={{ height: getChartHeight() }} />
                </div>

                {/* Bar Chart 1 - Idle Hour Consumption */}
                <div className="bg-white p-2 md:p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200">
                    <div ref={chartRefs.barChart1} style={{ height: getChartHeight() }} />
                </div>

                {/* Bar Chart 2 - Monthly Energy Consumption */}
                <div className="bg-white p-2 md:p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200">
                    <div ref={chartRefs.barChart2} style={{ height: getChartHeight() }} />
                </div>

                {/* Pie Chart - Run Hours Distribution */}
                <div className="bg-white p-2 md:p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200">
                    <div ref={chartRefs.pieChart} style={{ height: getChartHeight() }} />
                </div>

                {/* Doughnut Chart - Process Efficiency */}
                <div className="bg-white p-2 md:p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200">
                    <div ref={chartRefs.doughnutChart} style={{ height: getChartHeight() }} />
                </div>
            </div>
        </div>
    );
};

export default Production;