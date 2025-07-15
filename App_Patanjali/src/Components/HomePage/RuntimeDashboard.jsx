// import React, { useEffect, useRef } from 'react';
// import * as echarts from 'echarts';
// import { AlertCircle, CircleArrowRight } from 'lucide-react';

// const hourlyData = Array.from({ length: 12 }, (_, i) => ({
//     time: `${(8 + i).toString().padStart(2, '0')}:00`,
//     productionA: Math.floor(Math.random() * 5) + 5,
//     productionB: Math.floor(Math.random() * 5) + 5,
//     productionC: Math.floor(Math.random() * 5) + 5,
// }));

// const EChartsComponent = ({ options, style }) => {
//     const chartRef = useRef(null);
//     const chartInstance = useRef(null);

//     useEffect(() => {
//         // Initialize chart
//         if (chartRef.current) {
//             chartInstance.current = echarts.init(chartRef.current);
//         }

//         // Handle resize
//         const handleResize = () => {
//             chartInstance.current?.resize();
//         };
//         window.addEventListener('resize', handleResize);

//         return () => {
//             chartInstance.current?.dispose();
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     useEffect(() => {
//         // Update options
//         if (chartInstance.current) {
//             chartInstance.current.setOption(options);
//         }
//     }, [options]);

//     return <div ref={chartRef} style={style} />;
// };

// const AlertCard = ({ time, message }) => (
//     <div className="bg-red-400 text-black px-4 py-2 rounded-lg mb-2 flex justify-between items-center">
//         <div>
//             <p className="font-medium">{message}</p>
//             <p className="text-sm">{time}</p>
//         </div>
//         <div className="text-black">
//             <CircleArrowRight size={20} />
//         </div>
//     </div>
// );

// const ConsumptionTrendChart = () => {
//     const options = {
//         tooltip: {
//             trigger: 'axis'
//         },
//         legend: {
//             data: ['Production A', 'Production B', 'Production C']
//         },
//         xAxis: {
//             type: 'category',
//             data: hourlyData.map(item => item.time)
//         },
//         yAxis: {
//             type: 'value'
//         },
//         series: [
//             {
//                 name: 'Production A',
//                 type: 'line',
//                 data: hourlyData.map(item => item.productionA),
//                 itemStyle: { color: '#3b82f6' }
//             },
//             {
//                 name: 'Production B',
//                 type: 'line',
//                 data: hourlyData.map(item => item.productionB),
//                 itemStyle: { color: '#ef4444' }
//             },
//             {
//                 name: 'Production C',
//                 type: 'line',
//                 data: hourlyData.map(item => item.productionC),
//                 itemStyle: { color: '#f59e0b' }
//             }
//         ]
//     };

//     return <EChartsComponent options={options} style={{ height: '300px', width: '100%' }} />;
// };

// const ConsumptionPieChart = () => {
//     const options = {
//         tooltip: {
//             trigger: 'item'
//         },
//         legend: {
//             orient: 'horizontal',
//             bottom: 0
//         },
//         series: [
//             {
//                 type: 'pie',
//                 radius: ['40%', '70%'],
//                 data: [
//                     { value: 56, name: 'Production A', itemStyle: { color: '#3b82f6' } },
//                     { value: 48, name: 'Production B', itemStyle: { color: '#ef4444' } },
//                     { value: 60, name: 'Production C', itemStyle: { color: '#f59e0b' } }
//                 ],
//                 emphasis: {
//                     itemStyle: {
//                         shadowBlur: 10,
//                         shadowOffsetX: 0,
//                         shadowColor: 'rgba(0, 0, 0, 0.5)'
//                     }
//                 }
//             }
//         ]
//     };

//     return <EChartsComponent options={options} style={{ height: '300px', width: '100%' }} />;
// };

// const UtilizationChart = () => {
//     const options = {
//         series: [
//             {
//                 type: 'pie',
//                 radius: ['50%', '70%'],
//                 data: [
//                     { value: 80, name: 'Active', itemStyle: { color: '#3b82f6' } },
//                     { value: 20, name: 'Idle', itemStyle: { color: '#e5e7eb' } }
//                 ],
//                 label: {
//                     show: false
//                 }
//             }
//         ]
//     };

//     return <EChartsComponent options={options} style={{ height: '100px', width: '100%' }} />;
// };

// const ProductionCard = ({ name, consumption, runningHours, idleHours, idleConsumption }) => {
//     const options = {
//         grid: {
//             top: '10%',
//             left: '3%',
//             right: '4%',
//             bottom: '3%',
//             containLabel: true
//         },
//         xAxis: {
//             type: 'category',
//             data: ['6:00', '7:00', '8:00', '9:00', '10:00', '11:00'],
//             axisLabel: {
//                 fontSize: 10,
//                 color: '#666'
//             }
//         },
//         yAxis: {
//             type: 'value',
//             axisLabel: {
//                 fontSize: 10,
//                 color: '#666'
//             }
//         },
//         tooltip: {
//             trigger: 'axis',
//             axisPointer: {
//                 type: 'shadow'
//             }
//         },
//         series: [
//             {
//                 data: [
//                     Math.floor(Math.random() * 20) + 10,
//                     Math.floor(Math.random() * 20) + 10,
//                     Math.floor(Math.random() * 20) + 10,
//                     Math.floor(Math.random() * 20) + 10,
//                     Math.floor(Math.random() * 20) + 10,
//                     Math.floor(Math.random() * 20) + 10
//                 ],
//                 type: 'bar',
//                 itemStyle: {
//                     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//                         { offset: 0, color: '#83cff6' },
//                         { offset: 0.5, color: '#188df0' },
//                         { offset: 1, color: '#188df0' }
//                     ])
//                 },
//                 emphasis: {
//                     itemStyle: {
//                         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//                             { offset: 0, color: '#2378f7' },
//                             { offset: 0.7, color: '#2378f7' },
//                             { offset: 1, color: '#83cff6' }
//                         ])
//                     }
//                 }
//             }
//         ]
//     };
//     return (
//         <div className="bg-white rounded-lg shadow-sm p-4">
//             <div className="flex flex-col gap-2">
//                 <h3 className="font-bold">{name}</h3>
//                 <div className='flex space-x-6'>
//                     <div className="text-sm">
//                         <p>Energy Consumption: <span className="text-green-600 font-semibold">{consumption} kWh</span></p>
//                         <p>Running Hours: <span className="text-green-600">{runningHours} hrs</span></p>
//                     </div>
//                     <div className="text-sm">
//                         <p>Idle Hours: <span className="text-green-600">{idleHours} hrs</span></p>
//                         <p>Idle Hour Consumption: <span className="text-green-600">{idleConsumption} kWh</span></p>
//                     </div>
//                 </div>
//                 {/* Chart */}
//                 <div className="h-48 mt-4">
//                     <EChartsComponent options={options} style={{ height: '100%', width: '100%' }} />
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default function HomePage() {
//     return (
//         <div className="h-full w-full bg-gray-100 p-2 overflow-auto">
//             <div className="mx-auto space-y-4">
//                 <div className='flex h-[56vh] gap-4'>
//                     <div className='w-3/4 space-y-3'>
//                         {/* Header Section */}
//                         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                             <div className="h-36 bg-white rounded-lg shadow-sm p-4 text-center border-l-2 border-green-400">
//                                 <h2 className="text-lg text-gray-500 font-semibold">Total Energy Consumption</h2>
//                                 <div className="mt-6 text-2xl font-bold text-blue-600">1222 kWh</div>
//                             </div>

//                             <div className="h-36 bg-white rounded-lg shadow-sm p-4 text-center border-l-2 border-green-400">
//                                 <h2 className="text-lg text-gray-500 font-semibold">Estimated Bill for month</h2>
//                                 <div className="mt-6 text-2xl font-bold text-blue-600">₹12,220</div>
//                             </div>

//                             <div className="h-36 bg-white rounded-lg shadow-sm p-4 text-center border-l-2 border-green-400">
//                                 <h2 className="text-lg text-gray-500 font-semibold">Production loss</h2>
//                                 <div className="mt-6 text-2xl font-bold text-blue-600">3%</div>
//                             </div>

//                             <div className="h-36 bg-white rounded-lg shadow-sm p-4 text-center border-l-2 border-green-400">
//                                 <h2 className="text-lg text-gray-500 font-semibold">Possible Savings</h2>
//                                 <div className="mt-6 font-bold text-blue-600">Idle Energy Savings for this month: ₹130</div>
//                             </div>
//                         </div>

//                         {/* Charts Section */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div className="bg-white rounded-lg shadow-sm p-4">
//                                 <div className="mb-4">
//                                     <h2 className="text-lg font-semibold">Energy Consumption Trend - Last 12 Hours</h2>
//                                 </div>
//                                 <ConsumptionTrendChart />
//                             </div>

//                             <div className="bg-white rounded-lg shadow-sm p-4">
//                                 <div className="mb-4">
//                                     <h2 className="text-lg font-semibold">Overall Consumption (24 hrs)</h2>
//                                 </div>
//                                 <ConsumptionPieChart />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Alerts Section */}
//                     <div className="w-1/4 bg-white rounded-lg shadow-sm p-4">
//                         <div className="flex justify-between items-center mb-2">
//                             <div className="flex gap-4">
//                                 <h2 className="text-xl font-semibold">Alerts</h2>
//                                 <AlertCircle size={24} className='text-white bg-red-500 rounded-full' />
//                             </div>
//                             <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full">11</span>
//                         </div>
//                         <div className="space-y-2 h-[50vh] overflow-auto">
//                             <AlertCard
//                                 message="Mixer A is idle since 15 mins"
//                                 time="08/01/2025, 01:45"
//                             />
//                             <AlertCard
//                                 message="Mixer B is idle since 15 mins"
//                                 time="08/01/2025, 02:41"
//                             />
//                             <AlertCard
//                                 message="Mixer C is idle since 15 mins"
//                                 time="08/01/2025, 05:06"
//                             />
//                             <AlertCard
//                                 message="Mixer A is idle since 15 mins"
//                                 time="08/01/2025, 06:14"
//                             />
//                             <AlertCard
//                                 message="Mixer C is idle since 15 mins"
//                                 time="08/01/2025, 09:40"
//                             />
//                             <AlertCard
//                                 message="Mixer C is idle since 15 mins"
//                                 time="08/01/2025, 11:25"
//                             />
//                             <AlertCard
//                                 message="Mixer A is idle since 15 mins"
//                                 time="08/01/2025, 12:35"
//                             />
//                             <AlertCard
//                                 message="Mixer A is idle since 15 mins"
//                                 time="08/01/2025, 12:35"
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {/* production Cards Section */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <ProductionCard
//                         name="Mixer A"
//                         consumption={134}
//                         runningHours={4}
//                         idleHours={3}
//                         idleConsumption={34}
//                     />
//                     <ProductionCard
//                         name="Mixer B"
//                         consumption={134}
//                         runningHours={4}
//                         idleHours={3}
//                         idleConsumption={34}
//                     />
//                     <ProductionCard
//                         name="Mixer C"
//                         consumption={134}
//                         runningHours={4}
//                         idleHours={3}
//                         idleConsumption={34}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }




import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { AlertCircle, CircleArrowRight } from 'lucide-react';

const hourlyData = Array.from({ length: 12 }, (_, i) => ({
    time: `${(8 + i).toString().padStart(2, '0')}:00`,
    productionA: Math.floor(Math.random() * 5) + 5,
    productionB: Math.floor(Math.random() * 5) + 5,
    productionC: Math.floor(Math.random() * 5) + 5,
}));

const EChartsComponent = ({ options, style }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        // Initialize chart
        if (chartRef.current) {
            chartInstance.current = echarts.init(chartRef.current);
        }

        // Handle resize
        const handleResize = () => {
            chartInstance.current?.resize();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            chartInstance.current?.dispose();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        // Update options
        if (chartInstance.current) {
            chartInstance.current.setOption(options);
        }
    }, [options]);

    return <div ref={chartRef} style={style} />;
};

const AlertCard = ({ time, message }) => (
    <div className="bg-red-400 text-black px-2 sm:px-4 py-2 rounded-lg mb-2 flex justify-between items-center">
        <div className="flex-1">
            <p className="font-medium text-sm sm:text-base">{message}</p>
            <p className="text-xs sm:text-sm">{time}</p>
        </div>
        <div className="text-black ml-2">
            <CircleArrowRight size={16} className="sm:w-5 sm:h-5" />
        </div>
    </div>
);

const ConsumptionTrendChart = () => {
    const options = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Production A', 'Production B', 'Production C'],
            textStyle: { fontSize: window.innerWidth < 768 ? 10 : 12 }
        },
        grid: {
            top: '15%',
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: hourlyData.map(item => item.time),
            axisLabel: {
                fontSize: window.innerWidth < 768 ? 10 : 12,
                interval: window.innerWidth < 640 ? 2 : 0
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: { fontSize: window.innerWidth < 768 ? 10 : 12 }
        },
        series: [
            {
                name: 'Production A',
                type: 'line',
                data: hourlyData.map(item => item.productionA),
                itemStyle: { color: '#3b82f6' }
            },
            {
                name: 'Production B',
                type: 'line',
                data: hourlyData.map(item => item.productionB),
                itemStyle: { color: '#ef4444' }
            },
            {
                name: 'Production C',
                type: 'line',
                data: hourlyData.map(item => item.productionC),
                itemStyle: { color: '#f59e0b' }
            }
        ]
    };

    return <EChartsComponent options={options} style={{ height: '100%', width: '100%', minHeight: '250px' }} />;
};

const ConsumptionPieChart = () => {
    const options = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'horizontal',
            bottom: 0,
            textStyle: { fontSize: window.innerWidth < 768 ? 10 : 12 }
        },
        series: [
            {
                type: 'pie',
                radius: window.innerWidth < 640 ? ['35%', '60%'] : ['40%', '70%'],
                data: [
                    { value: 56, name: 'Production A', itemStyle: { color: '#3b82f6' } },
                    { value: 48, name: 'Production B', itemStyle: { color: '#ef4444' } },
                    { value: 60, name: 'Production C', itemStyle: { color: '#f59e0b' } }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    return <EChartsComponent options={options} style={{ height: '100%', width: '100%', minHeight: '250px' }} />;
};

const ProductionCard = ({ name, consumption, runningHours, idleHours, idleConsumption }) => {
    const options = {
        grid: {
            top: '10%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['6:00', '7:00', '8:00', '9:00', '10:00', '11:00'],
            axisLabel: {
                fontSize: window.innerWidth < 768 ? 8 : 10,
                interval: window.innerWidth < 640 ? 1 : 0
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                fontSize: window.innerWidth < 768 ? 8 : 10
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        series: [
            {
                data: [
                    Math.floor(Math.random() * 20) + 10,
                    Math.floor(Math.random() * 20) + 10,
                    Math.floor(Math.random() * 20) + 10,
                    Math.floor(Math.random() * 20) + 10,
                    Math.floor(Math.random() * 20) + 10,
                    Math.floor(Math.random() * 20) + 10
                ],
                type: 'bar',
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#83cff6' },
                        { offset: 0.5, color: '#188df0' },
                        { offset: 1, color: '#188df0' }
                    ])
                }
            }
        ]
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-2 sm:p-4">
            <div className="flex flex-col gap-2">
                <h3 className="font-bold text-sm sm:text-base">{name}</h3>
                <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0">
                    <div className="text-xs sm:text-sm">
                        <p>Energy Consumption: <span className="text-green-600 font-semibold">{consumption} kWh</span></p>
                        <p>Running Hours: <span className="text-green-600">{runningHours} hrs</span></p>
                    </div>
                    <div className="text-xs sm:text-sm">
                        <p>Idle Hours: <span className="text-green-600">{idleHours} hrs</span></p>
                        <p>Idle Hour Consumption: <span className="text-green-600">{idleConsumption} kWh</span></p>
                    </div>
                </div>
                <div className="h-32 sm:h-48 mt-2 sm:mt-4">
                    <EChartsComponent options={options} style={{ height: '100%', width: '100%' }} />
                </div>
            </div>
        </div>
    );
};

export default function HomePage() {
    return (
        <div className="h-full w-full bg-gray-100 p-2 overflow-auto">
            <div className="mx-auto space-y-4">
                {/* Header Stats */}


                {/* Main Content */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-3/4 space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
                            <div className="h-36 bg-white rounded-lg shadow-sm p-3 sm:p-4 text-center border-l-2 border-green-400">
                                <h2 className="text-sm sm:text-lg text-gray-500 font-semibold">Total Energy Consumption</h2>
                                <div className="mt-2 sm:mt-6 text-xl sm:text-2xl font-bold text-blue-600">1222 kWh</div>
                            </div>
                            <div className="h-36 bg-white rounded-lg shadow-sm p-3 sm:p-4 text-center border-l-2 border-green-400">
                                <h2 className="text-sm sm:text-lg text-gray-500 font-semibold">Estimated Bill</h2>
                                <div className="mt-2 sm:mt-6 text-xl sm:text-2xl font-bold text-blue-600">₹12,220</div>
                            </div>
                            <div className="h-36 bg-white rounded-lg shadow-sm p-3 sm:p-4 text-center border-l-2 border-green-400">
                                <h2 className="text-sm sm:text-lg text-gray-500 font-semibold">Production loss</h2>
                                <div className="mt-2 sm:mt-6 text-xl sm:text-2xl font-bold text-blue-600">3%</div>
                            </div>
                            <div className="h-36 bg-white rounded-lg shadow-sm p-3 sm:p-4 text-center border-l-2 border-green-400">
                                <h2 className="text-sm sm:text-lg text-gray-500 font-semibold">Possible Savings</h2>
                                <div className="mt-2 sm:mt-6 text-sm sm:text-base font-bold text-blue-600">Idle Energy Savings: ₹130</div>
                            </div>
                        </div>
                        {/* Charts Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
                                <h2 className="text-sm sm:text-lg font-semibold mb-2 sm:mb-4">Energy Consumption Trend - Last 12 Hours</h2>
                                <div className="h-64 sm:h-72">
                                    <ConsumptionTrendChart />
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
                                <h2 className="text-sm sm:text-lg font-semibold mb-2 sm:mb-4">Overall Consumption (24 hrs)</h2>
                                <div className="h-64 sm:h-72">
                                    <ConsumptionPieChart />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Alerts Section */}
                    <div className="w-full md:w-1/4 bg-white rounded-lg shadow-sm p-3 sm:p-4">
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex gap-2 sm:gap-4 items-center">
                                <h2 className="text-lg sm:text-xl font-semibold">Alerts</h2>
                                <AlertCircle size={20} className="text-white bg-red-500 rounded-full" />
                            </div>
                            <span className="bg-red-500 text-white text-xs sm:text-sm px-2 py-1 rounded-full">11</span>
                        </div>
                        <div className="space-y-2 h-48 md:h-[vh] overflow-auto">
                            {/* Alert cards remain the same */}
                            <AlertCard message="Mixer A is idle since 15 mins" time="08/01/2025, 01:45" />
                            <AlertCard message="Mixer B is idle since 15 mins" time="08/01/2025, 02:41" />
                            {/* ... other alert cards ... */}
                        </div>
                    </div>
                </div>

                {/* Production Cards Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <ProductionCard
                        name="Mixer A"
                        consumption={134}
                        runningHours={4}
                        idleHours={3}
                        idleConsumption={34}
                    />
                    <ProductionCard
                        name="Mixer B"
                        consumption={134}
                        runningHours={4}
                        idleHours={3}
                        idleConsumption={34}
                    />
                    <ProductionCard
                        name="Mixer C"
                        consumption={134}
                        runningHours={4}
                        idleHours={3}
                        idleConsumption={34}
                    />
                </div>
            </div>
        </div>
    );
}