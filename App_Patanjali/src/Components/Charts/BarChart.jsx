// "use client";
// import React, { useEffect, useRef } from 'react';
// import { useTheme } from '@/Components/Context/ThemeContext';
// import * as echarts from 'echarts';
// import { getTimeRange, getFormatter } from '@/Utils/TimeUtils';

// const BarChart = ({
// data,
// // General Properties
// backgroundColor = '#ffffff',
// showAnimation = false,
// enableZoom = false,
// showBorder = false,
// borderSize = 1,
// borderColor = '#e0e0e0',

// // Title Properties
// name = 'Bar Chart',
// nameSize = 16,
// nameColor = '#333333',
// nameBold = true,
// nameItalic = false,
// titlePosition = 'center',

// // Legends Properties
// showLegend = true,
// legendPosition = 'bottom',
// activeLegend = [],
// onLegendChange,

// // Axes Properties
// showGridLines = true,
// gridLineColor = '#e0e0e0',
// xAxisLabel = 'Time',
// xAxisLabelSize = 12,
// xAxisLabelColor = '#666666',
// yAxisLabel = 'Value',
// yAxisLabelSize = 12,
// yAxisLabelColor = '#666666',

// // Data Labels Properties
// showDataLabels = false,
// labelSize = 12,
// labelColor = '#666666',

// // Bar Chart specific Properties
// barGap = '30%',
// barCategoryGap = '20%',
// colorScheme = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
// barOrientation = 'vertical',
// }) => {
//     const chartRef = useRef(null);
//     const { isDarkMode } = useTheme();
//     const chartInstance = useRef(null);
//     const colorMapRef = useRef({});

//     const updateColorMap = (dataKeys) => {
//         const allKeys = new Set([...dataKeys]);
//         const orderedKeys = activeLegend.length > 0 ?
//             [...new Set([...activeLegend, ...dataKeys])] :
//             [...allKeys];

//         const newColorMap = {};
//         orderedKeys.forEach((key, index) => {
//             // Use the colorScheme prop directly, which will be updated by ChartProperties
//             newColorMap[key] = colorScheme[index] || colorScheme[index % colorScheme.length];
//         });

//         colorMapRef.current = newColorMap;
//     };

//     useEffect(() => {
//         // Update color map when colorScheme changes
//         if (data && Object.keys(data).length > 0) {
//             updateColorMap(Object.keys(data));
//             if (chartInstance.current) {
//                 initChart(data);
//             }
//         }
//     }, [colorScheme]); // Add colorScheme to dependencies

//     const processData = (data) => {
//         if (!data || typeof data !== 'object') {
//             console.error('Invalid data provided to BarChart:', data);
//             return { seriesData: [], xAxisData: [] };
//         }

//         const categories = Object.keys(data);
//         if (!categories.length || !data[categories[0]]) {
//             return { seriesData: [], xAxisData: [] };
//         }

//         // Update color mapping
//         updateColorMap(categories);

//         const seriesData = categories.map((key) => ({
//             name: key,
//             type: 'bar',
//             data: data[key].map((item) => parseFloat(item.value)),
//             emphasis: {
//                 focus: 'series',
//             },
//             itemStyle: {
//                 color: colorMapRef.current[key]
//             },
//             label: {
//                 show: showDataLabels,
//                 position: 'top',
//                 fontSize: labelSize,
//                 color: labelColor
//             },
//         }));

//         const xAxisData = data[categories[0]].map((item) => new Date(item.timestamp));

//         return { seriesData, xAxisData };
//     };

//     const initChart = (data) => {
//         if (!data || typeof data !== 'object') {
//             console.error('Invalid data provided to BarChart:', data);
//             return;
//         }

//         const { seriesData, xAxisData } = processData(data);

//         // Determine time range and get corresponding formatter
//         const timeRange = getTimeRange(xAxisData);
//         const xAxisFormatter = getFormatter(timeRange);

//         const dataKeys = Object.keys(data);
//         const activeLegendsSet = new Set(activeLegend.length > 0 ? activeLegend : dataKeys);

//         const option = {
//             backgroundColor: isDarkMode ? '#000000' : backgroundColor,
//             title: {
//                 text: name,
//                 textStyle: {
//                     fontSize: nameSize,
//                     color: isDarkMode ? '#ffffff' : nameColor,
//                     fontWeight: nameBold ? 'bold' : 'normal',
//                     fontStyle: nameItalic ? 'italic' : 'normal',
//                 },
//                 left: titlePosition,
//             },
//             tooltip: {
//                 trigger: 'axis',
//                 axisPointer: {
//                     type: 'shadow',
//                 },
//             },
//             legend: {
//                 show: showLegend,
//                 data: dataKeys,
//                 [legendPosition]: 10,
//                 left: 'center',
//                 selected: dataKeys.reduce((acc, key) => {
//                     acc[key] = activeLegendsSet.has(key);
//                     return acc;
//                 }, {}),
//                 textStyle: {
//                     color: isDarkMode ? '#ffffff' : '#333333'
//                 }
//             },
//             grid: {
//                 left: '5%',
//                 right: '5%',
//                 bottom: '15%',
//                 top: '15%',
//                 containLabel: true,
//             },
//             xAxis: {
//                 type: 'category',
//                 data: xAxisData,
//                 boundaryGap: true,
//                 name: xAxisLabel,
//                 nameLocation: 'middle',
//                 nameGap: 25,
//                 nameTextStyle: {
//                     fontSize: xAxisLabelSize,
//                     color: isDarkMode ? '#ffffff' : xAxisLabelColor,
//                 },
//                 axisLabel: {
//                     formatter: xAxisFormatter,
//                     fontSize: xAxisLabelSize,
//                     color: isDarkMode ? '#ffffff' : xAxisLabelColor,
//                 },
//                 splitLine: {
//                     show: showGridLines,
//                     lineStyle: {
//                         color: gridLineColor,
//                     },
//                 },
//             },
//             yAxis: {
//                 type: 'value',
//                 name: yAxisLabel,
//                 boundaryGap: true,
//                 nameLocation: 'middle',
//                 nameRotate: 90,
//                 nameGap: 35,
//                 nameTextStyle: {
//                     fontSize: yAxisLabelSize,
//                     color: isDarkMode ? '#ffffff' : yAxisLabelColor,
//                 },
//                 axisLabel: {
//                     fontSize: yAxisLabelSize,
//                     color: isDarkMode ? '#ffffff' : yAxisLabelColor,
//                 },
//                 splitLine: {
//                     show: showGridLines,
//                     lineStyle: {
//                         color: gridLineColor,
//                     },
//                 },
//             },
//             series: seriesData.map((series) => ({
//                 ...series,
//                 silent: !activeLegendsSet.has(series.name),
//                 barGap,
//                 barCategoryGap,
//             })),
//             animation: showAnimation,
//             dataZoom: enableZoom ? [{ type: 'inside', start: 0, end: 100 }] : undefined,
//         };

//         chartInstance.current.setOption(option);

//         chartInstance.current.on('legendselectchanged', function (params) {
//             if (onLegendChange && typeof onLegendChange === 'function') {
//                 const newActiveLegends = Object.keys(params.selected).filter((key) => params.selected[key]);
//                 onLegendChange(newActiveLegends);
//             }
//         });
//     };

//     useEffect(() => {
//         if (!data) {
//             console.error("No data provided to BarChart component");
//             return;
//         }

//         if (chartRef.current) {
//             chartInstance.current = echarts.init(chartRef.current);
//         }

//         const resizeObserver = new ResizeObserver(() => {
//             chartInstance.current?.resize();
//         });

//         resizeObserver.observe(chartRef.current);

//         if (chartInstance.current) {
//             initChart(data);
//         }

//         return () => {
//             resizeObserver.disconnect();
//             if (chartInstance.current) {
//                 chartInstance.current.dispose();
//             }
//         };
//     }, [
//         data,
//         backgroundColor,
//         showAnimation,
//         enableZoom,
//         showBorder,
//         borderSize,
//         borderColor,
//         name,
//         nameSize,
//         nameColor,
//         nameBold,
//         nameItalic,
//         titlePosition,
//         showLegend,
//         legendPosition,
//         activeLegend,
//         showGridLines,
//         gridLineColor,
//         xAxisLabel,
//         xAxisLabelSize,
//         xAxisLabelColor,
//         yAxisLabel,
//         yAxisLabelSize,
//         yAxisLabelColor,
//         showDataLabels,
//         labelSize,
//         labelColor,
//         barGap,
//         barCategoryGap,
//         colorScheme,
//         barOrientation,
//         isDarkMode,
//     ]);

//     return (
//         <div
//             ref={chartRef}
//             style={{
//                 width: '100%',
//                 height: '100%',
//                 position: 'relative',
//                 border: showBorder ? `${borderSize}px solid ${borderColor}` : 'none',
//             }}
//         />
//     );
// };

// export default BarChart;



"use client";
import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/Components/Context/ThemeContext';
import * as echarts from 'echarts';
import { getTimeRange, getFormatter } from '@/Utils/TimeUtils';

const BarChart = ({
    data,
    // General Properties
    backgroundColor = '#ffffff',
    showAnimation = false,
    enableZoom = false,
    showBorder = false,
    borderSize = 1,
    borderColor = '#e0e0e0',

    // Title Properties
    name = 'Bar Chart',
    nameSize = 16,
    nameColor = '#333333',
    nameBold = true,
    nameItalic = false,
    titlePosition = 'center',

    // Legends Properties
    showLegend = true,
    legendPosition = 'bottom',
    activeLegend = [],
    onLegendChange,

    // Axes Properties
    showGridLines = true,
    gridLineColor = '#e0e0e0',
    xAxisLabel = 'Time',
    xAxisLabelSize = 12,
    xAxisLabelColor = '#666666',
    yAxisLabel = 'Value',
    yAxisLabelSize = 12,
    yAxisLabelColor = '#666666',

    // Data Labels Properties
    showDataLabels = false,
    labelSize = 12,
    labelColor = '#666666',

    // Bar Chart specific Properties
    barGap = '30%',
    barCategoryGap = '20%',
    colorScheme = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
    barOrientation = 'vertical',
}) => {
    const chartRef = useRef(null);
    const { isDarkMode } = useTheme();
    const chartInstance = useRef(null);
    const colorMapRef = useRef({});

    // Initialize chart with proper pixel ratio handling
    const initChart = () => {
        if (chartRef.current) {
            // Get the device pixel ratio
            const pixelRatio = window.devicePixelRatio || 1;

            // Initialize chart with the correct pixel ratio
            chartInstance.current = echarts.init(chartRef.current, null, {
                devicePixelRatio: pixelRatio,
                renderer: 'canvas',
                useDirtyRect: false  // Disable dirty rect optimization for clearer rendering
            });

            // Update container style to ensure proper rendering
            chartRef.current.style.width = '100%';
            chartRef.current.style.height = '100%';
        }
    };

    // Handle resize with proper pixel ratio
    const handleResize = () => {
        if (chartInstance.current) {
            const pixelRatio = window.devicePixelRatio || 1;
            chartInstance.current.setOption({}, {
                notMerge: false,
                lazyUpdate: true
            });
            chartInstance.current.resize({
                width: 'auto',
                height: 'auto',
                devicePixelRatio: pixelRatio
            });
        }
    };

    const updateColorMap = (dataKeys) => {
        const allKeys = new Set([...dataKeys]);
        const orderedKeys = activeLegend.length > 0 ?
            [...new Set([...activeLegend, ...dataKeys])] :
            [...allKeys];

        const newColorMap = {};
        orderedKeys.forEach((key, index) => {
            newColorMap[key] = colorScheme[index % colorScheme.length];
        });

        colorMapRef.current = newColorMap;
    };

    const processData = (data) => {
        if (!data || typeof data !== 'object') {
            console.error('Invalid data provided to BarChart:', data);
            return { seriesData: [], xAxisData: [] };
        }

        const categories = Object.keys(data);
        if (!categories.length || !data[categories[0]]) {
            return { seriesData: [], xAxisData: [] };
        }

        updateColorMap(categories);

        const seriesData = categories.map((key) => ({
            name: key,
            type: 'bar',
            data: data[key].map((item) => parseFloat(item.value)),
            emphasis: {
                focus: 'series',
            },
            itemStyle: {
                color: colorMapRef.current[key]
            },
            label: {
                show: showDataLabels,
                position: 'top',
                fontSize: labelSize,
                color: labelColor,
                textStyle: {
                    fontFamily: 'sans-serif',
                    textRendering: 'optimizeLegibility'
                }
            },
        }));

        const xAxisData = data[categories[0]].map((item) => new Date(item.timestamp));

        return { seriesData, xAxisData };
    };

    const updateChartOptions = (data) => {
        if (!data || typeof data !== 'object') {
            console.error('Invalid data provided to BarChart:', data);
            return;
        }

        const { seriesData, xAxisData } = processData(data);
        const timeRange = getTimeRange(xAxisData);
        const xAxisFormatter = getFormatter(timeRange);

        const dataKeys = Object.keys(data);
        const activeLegendsSet = new Set(activeLegend.length > 0 ? activeLegend : dataKeys);

        const option = {
            backgroundColor: isDarkMode ? '#000000' : backgroundColor,
            title: {
                text: name,
                textStyle: {
                    fontSize: nameSize,
                    color: isDarkMode ? '#ffffff' : nameColor,
                    fontWeight: nameBold ? 'bold' : 'normal',
                    fontStyle: nameItalic ? 'italic' : 'normal',
                    fontFamily: 'sans-serif',
                    textRendering: 'optimizeLegibility'
                },
                left: titlePosition,
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
                textStyle: {
                    fontFamily: 'sans-serif',
                    textRendering: 'optimizeLegibility'
                }
            },
            legend: {
                show: showLegend,
                data: dataKeys,
                [legendPosition]: 10,
                left: 'center',
                selected: dataKeys.reduce((acc, key) => {
                    acc[key] = activeLegendsSet.has(key);
                    return acc;
                }, {}),
                textStyle: {
                    color: isDarkMode ? '#ffffff' : '#333333',
                    fontFamily: 'sans-serif',
                    textRendering: 'optimizeLegibility'
                }
            },
            grid: {
                left: '5%',
                right: '5%',
                bottom: '15%',
                top: '15%',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                data: xAxisData,
                boundaryGap: true,
                name: xAxisLabel,
                nameLocation: 'middle',
                nameGap: 25,
                nameTextStyle: {
                    fontSize: xAxisLabelSize,
                    color: isDarkMode ? '#ffffff' : xAxisLabelColor,
                    fontFamily: 'sans-serif',
                    textRendering: 'optimizeLegibility'
                },
                axisLabel: {
                    formatter: xAxisFormatter,
                    fontSize: xAxisLabelSize,
                    color: isDarkMode ? '#ffffff' : xAxisLabelColor,
                    fontFamily: 'sans-serif',
                    textRendering: 'optimizeLegibility'
                },
                splitLine: {
                    show: showGridLines,
                    lineStyle: {
                        color: gridLineColor,
                    },
                },
            },
            yAxis: {
                type: 'value',
                name: yAxisLabel,
                boundaryGap: true,
                nameLocation: 'middle',
                nameRotate: 90,
                nameGap: 35,
                nameTextStyle: {
                    fontSize: yAxisLabelSize,
                    color: isDarkMode ? '#ffffff' : yAxisLabelColor,
                    fontFamily: 'sans-serif',
                    textRendering: 'optimizeLegibility'
                },
                axisLabel: {
                    fontSize: yAxisLabelSize,
                    color: isDarkMode ? '#ffffff' : yAxisLabelColor,
                    fontFamily: 'sans-serif',
                    textRendering: 'optimizeLegibility'
                },
                splitLine: {
                    show: showGridLines,
                    lineStyle: {
                        color: gridLineColor,
                    },
                },
            },
            series: seriesData.map((series) => ({
                ...series,
                silent: !activeLegendsSet.has(series.name),
                barGap,
                barCategoryGap,
            })),
            animation: showAnimation,
            dataZoom: enableZoom ? [{ type: 'inside', start: 0, end: 100 }] : undefined,
        };

        // Set options with animation disabled initially for sharp initial render
        chartInstance.current.setOption(option, {
            notMerge: true,
            lazyUpdate: false,
            silent: true
        });
    };

    useEffect(() => {
        initChart();

        // Set up resize observer with debounced handler
        let resizeTimeout;
        const resizeObserver = new ResizeObserver(() => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(handleResize, 100); // Debounce resize events
        });

        if (chartRef.current) {
            resizeObserver.observe(chartRef.current);
        }

        // Clean up
        return () => {
            clearTimeout(resizeTimeout);
            resizeObserver.disconnect();
            if (chartInstance.current) {
                chartInstance.current.dispose();
            }
        };
    }, []);

    useEffect(() => {
        if (chartInstance.current && data) {
            updateChartOptions(data);
        }
    }, [
        data,
        backgroundColor,
        showAnimation,
        enableZoom,
        showBorder,
        borderSize,
        borderColor,
        name,
        nameSize,
        nameColor,
        nameBold,
        nameItalic,
        titlePosition,
        showLegend,
        legendPosition,
        activeLegend,
        showGridLines,
        gridLineColor,
        xAxisLabel,
        xAxisLabelSize,
        xAxisLabelColor,
        yAxisLabel,
        yAxisLabelSize,
        yAxisLabelColor,
        showDataLabels,
        labelSize,
        labelColor,
        barGap,
        barCategoryGap,
        colorScheme,
        barOrientation,
        isDarkMode,
    ]);

    return (
        <div
            ref={chartRef}
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                border: showBorder ? `${borderSize}px solid ${borderColor}` : 'none',
            }}
        />
    );
};

export default BarChart;