

// import React, { useEffect, useRef } from 'react';
// import { useTheme } from '@/Components/Context/ThemeContext';
// import * as echarts from 'echarts';

// const ComboChart = ({
//     data,
//     chartId,
//     backgroundColor = '#ffffff',
//     title = 'Combo Chart',
//     titleSize = 16,
//     nameColor = '#333333',
//     labelSize = 12,
//     labelColor = '#666666',
//     showBorder = false,
//     borderSize = 1,
//     borderColor = '#e0e0e0',
//     showGridLines = true,
//     gridLineColor = '#e0e0e0',
//     barColors = ['#83bff6', '#188df0'],
//     lineColors = ['#ff0000'],
//     showDataLabels = false,
//     showDataPoints = true,
//     showAnimation = false,
//     xAxisLabel = 'Time',
//     yAxisLabel = 'Value',
//     xAxisLabelSize = 12,
//     xAxisLabelColor = '#666666',
//     yAxisLabelSize = 12,
//     yAxisLabelColor = '#666666',
//     curveType = 'linear',
//     showLegend = true,
//     legendPosition = 'top',
//     showLine = true,
//     baselineValue = 0,
//     areaOpacity = 0.3,
//     fillGradientStart = '#ffffff',
//     fillGradientEnd = '#000000',
//     activeLegend = [], // New prop for active legends
//     onLegendChange // New prop for legend change callback
// }) => {
//     const { isDarkMode } = useTheme();
//     const chartRef = useRef(null);
//     const chartInstance = useRef(null);

//     useEffect(() => {
//         if (!data) {
//             console.error("No data provided to ComboChart component");
//             return; // Exit early if there's no data
//         }

//         if (chartRef.current) {
//             chartInstance.current = echarts.init(chartRef.current);
//         }

//         const resizeObserver = new ResizeObserver(() => {
//             chartInstance.current?.resize();
//         });

//         resizeObserver.observe(chartRef.current);

//         return () => {
//             resizeObserver.disconnect();
//             if (chartInstance.current) {
//                 chartInstance.current.dispose();
//             }
//         };
//     }, []);

//     useEffect(() => {
//         if (!chartInstance.current || !data) return;

//         const processedData = processData(data);
//         const dataKeys = Object.keys(processedData);
//         const barData = processedData[dataKeys[0]] || [];
//         const lineData = processedData[dataKeys[1]] || [];

//         // If activeLegend is empty, set all legends as active
//         const activeLegendsSet = new Set(activeLegend.length > 0 ? activeLegend : dataKeys);

//         const series = [
//             {
//                 name: 'Bar',
//                 type: 'bar',
//                 data: barData,
//                 itemStyle: {
//                     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//                         { offset: 0, color: barColors[0] },
//                         { offset: 1, color: barColors[1] }
//                     ])
//                 },
//                 label: {
//                     show: showDataLabels,
//                     position: 'top'
//                 },
//                 silent: !activeLegendsSet.has('Bar')
//             },
//             {
//                 name: 'Line',
//                 type: 'line',
//                 smooth: curveType === 'curveLinear',
//                 step: curveType === 'curveStep' ? 'middle' : false,
//                 symbol: showDataPoints ? 'circle' : 'none',
//                 showSymbol: showLine,
//                 lineStyle: {
//                     width: showLine ? 2 : 0,
//                     color: lineColors[0]
//                 },
//                 areaStyle: {
//                     opacity: areaOpacity,
//                     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//                         { offset: 0, color: fillGradientStart },
//                         { offset: 1, color: fillGradientEnd }
//                     ])
//                 },
//                 data: lineData,
//                 label: {
//                     show: showDataLabels,
//                     position: 'top'
//                 },
//                 silent: !activeLegendsSet.has('Line')
//             }
//         ];

//         const option = {
//             backgroundColor: isDarkMode ? '#000000' : backgroundColor,
//             title: {
//                 text: title,
//                 textStyle: {
//                     fontSize: titleSize,
//                     color: isDarkMode ? '#ffffff' : nameColor
//                 }
//             },
//             tooltip: {
//                 trigger: 'axis',
//                 formatter: function (params) {
//                     const time = new Date(params[0].value[0]).toLocaleString();
//                     let result = `${time}<br/>`;
//                     params.forEach(param => {
//                         if (activeLegendsSet.has(param.seriesName)) {
//                             result += `${param.seriesName}: ${param.value[1].toFixed(2)}<br/>`;
//                         }
//                     });
//                     return result;
//                 }
//             },
//             legend: {
//                 show: showLegend,
//                 orient: legendPosition === 'top' ? 'horizontal' : 'vertical',
//                 left: legendPosition === 'top' ? 'right' : 'left',
//                 top: legendPosition === 'top' ? 'top' : 'middle',
//                 textStyle: {
//                     fontSize: labelSize,
//                     color: labelColor
//                 },
//                 selected: dataKeys.reduce((acc, key) => {
//                     acc[key] = activeLegendsSet.has(key);
//                     return acc;
//                 }, {})
//             },
//             grid: {
//                 left: '5%',
//                 right: '5%',
//                 bottom: '15%',
//                 top: "15%",
//                 containLabel: true
//             },
//             xAxis: {
//                 type: 'time',
//                 boundaryGap: true,
//                 name: xAxisLabel,
//                 nameLocation: 'middle',
//                 nameGap: 25,
//                 axisLabel: {
//                     fontSize: xAxisLabelSize,
//                     color: xAxisLabelColor
//                 },
//                 splitLine: {
//                     show: showGridLines,
//                     lineStyle: {
//                         color: gridLineColor
//                     }
//                 },
//                 name: xAxisLabel,
//                 nameLocation: 'middle',
//                 nameGap: 30,
//             },
//             yAxis: {
//                 type: 'value',
//                 boundaryGap: true,
//                 nameLocation: 'middle',
//                 nameRotate: 90,
//                 nameGap: 35,
//                 axisLabel: {
//                     fontSize: yAxisLabelSize,
//                     color: yAxisLabelColor
//                 },
//                 splitLine: {
//                     show: showGridLines,
//                     lineStyle: {
//                         color: gridLineColor
//                     }
//                 },
//                 name: yAxisLabel,
//                 nameLocation: 'middle',
//                 nameGap: 20,
//                 baseline: baselineValue,
//             },
//             series,
//             animation: showAnimation
//         };

//         chartInstance.current.setOption(option);

//         // Set up legend change event handler
//         chartInstance.current.on('legendselectchanged', (event) => {
//             const selectedLegends = Object.keys(event.selected).filter(key => event.selected[key]);
//             onLegendChange(selectedLegends); // Callback to update the active legends
//         });

//     }, [
//         data, backgroundColor, title, titleSize, nameColor, labelSize, labelColor,
//         showGridLines, gridLineColor, barColors, lineColors, showDataPoints,
//         showAnimation, xAxisLabel, yAxisLabel, xAxisLabelSize, xAxisLabelColor,
//         yAxisLabelSize, yAxisLabelColor, curveType, showLegend, legendPosition,
//         showLine, baselineValue, areaOpacity, fillGradientStart, fillGradientEnd,
//         showDataLabels, activeLegend, onLegendChange, showBorder, borderSize, borderColor
//     ]);

//     const processData = (inputData) => {
//         if (typeof inputData !== 'object') {
//             console.error("Invalid input data");
//             return {};
//         }

//         const processedData = {};
//         Object.entries(inputData).forEach(([key, value]) => {
//             if (Array.isArray(value)) {
//                 processedData[key] = value.map(item => [new Date(item.timestamp).getTime(), item.value]);
//             }
//         });

//         return processedData;
//     };

//     return <div ref={chartRef} style={{ width: '100%', height: '100%', border: showBorder ? `${borderSize}px solid ${borderColor}` : 'none', }} />;
// };

// export default ComboChart;




import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/Components/Context/ThemeContext';
import * as echarts from 'echarts';

const ComboChart = ({
    data,
    chartId,
    backgroundColor = '#ffffff',
    title = 'Combo Chart',
    titleSize = 16,
    nameColor = '#333333',
    labelSize = 12,
    labelColor = '#666666',
    showBorder = false,
    borderSize = 1,
    borderColor = '#e0e0e0',
    showGridLines = true,
    gridLineColor = '#e0e0e0',
    colorScheme = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
    showDataLabels = false,
    showDataPoints = true,
    showAnimation = false,
    xAxisLabel = 'Time',
    yAxisLabel = 'Value',
    xAxisLabelSize = 12,
    xAxisLabelColor = '#666666',
    yAxisLabelSize = 12,
    yAxisLabelColor = '#666666',
    curveType = 'linear',
    showLegend = true,
    legendPosition = 'top',
    showLine = true,
    baselineValue = 0,
    areaOpacity = 0.3,
    fillGradientStart = '#ffffff',
    fillGradientEnd = '#000000',
    activeLegend = [],
    onLegendChange
}) => {
    const { isDarkMode } = useTheme();
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const colorMapRef = useRef({});

    const updateColorMap = (dataKeys) => {
        const allKeys = new Set([...dataKeys]);
        const orderedKeys = activeLegend.length > 0 ?
            [...new Set([...activeLegend, ...dataKeys])] :
            [...allKeys];

        const newColorMap = {};
        orderedKeys.forEach((key, index) => {
            newColorMap[key] = colorScheme[index] || colorScheme[index % colorScheme.length];
        });

        colorMapRef.current = newColorMap;
    };

    useEffect(() => {
        if (data && Object.keys(data).length > 0) {
            updateColorMap(Object.keys(data));
            if (chartInstance.current) {
                initChart(data);
            }
        }
    }, [colorScheme]);

    const processData = (inputData) => {
        if (typeof inputData !== 'object') {
            console.error("Invalid input data");
            return {};
        }

        const processedData = {};
        Object.entries(inputData).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                processedData[key] = value.map(item => [new Date(item.timestamp).getTime(), item.value]);
            }
        });

        return processedData;
    };

    const initChart = (data) => {
        const processedData = processData(data);
        const dataKeys = Object.keys(processedData);
        updateColorMap(dataKeys);

        const activeLegendsSet = new Set(activeLegend.length > 0 ? activeLegend : dataKeys);

        const series = dataKeys.map((key, index) => {
            const isBar = index === 0; // First series is bar, rest are lines
            const baseConfig = {
                name: key,
                type: isBar ? 'bar' : 'line',
                data: processedData[key],
                label: {
                    show: showDataLabels,
                    position: 'top'
                },
                silent: !activeLegendsSet.has(key)
            };

            if (isBar) {
                return {
                    ...baseConfig,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: colorMapRef.current[key] },
                            { offset: 1, color: echarts.color.lift(colorMapRef.current[key], -0.2) }
                        ])
                    }
                };
            } else {
                return {
                    ...baseConfig,
                    smooth: curveType === 'curveLinear',
                    step: curveType === 'curveStep' ? 'middle' : false,
                    symbol: showDataPoints ? 'circle' : 'none',
                    showSymbol: showLine,
                    lineStyle: {
                        width: showLine ? 2 : 0,
                        color: colorMapRef.current[key]
                    },
                    areaStyle: {
                        opacity: areaOpacity,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: echarts.color.lift(colorMapRef.current[key], 0.2) },
                            { offset: 1, color: echarts.color.lift(colorMapRef.current[key], -0.2) }
                        ])
                    }
                };
            }
        });

        const option = {
            backgroundColor: isDarkMode ? '#000000' : backgroundColor,
            title: {
                text: title,
                textStyle: {
                    fontSize: titleSize,
                    color: isDarkMode ? '#ffffff' : nameColor
                }
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    const time = new Date(params[0].value[0]).toLocaleString();
                    let result = `${time}<br/>`;
                    params.forEach(param => {
                        if (activeLegendsSet.has(param.seriesName)) {
                            result += `${param.seriesName}: ${param.value[1].toFixed(2)}<br/>`;
                        }
                    });
                    return result;
                }
            },
            legend: {
                show: showLegend,
                orient: legendPosition === 'top' ? 'horizontal' : 'vertical',
                left: legendPosition === 'top' ? 'right' : 'left',
                top: legendPosition === 'top' ? 'top' : 'middle',
                textStyle: {
                    fontSize: labelSize,
                    color: isDarkMode ? '#ffffff' : labelColor
                },
                selected: dataKeys.reduce((acc, key) => {
                    acc[key] = activeLegendsSet.has(key);
                    return acc;
                }, {})
            },
            grid: {
                left: '5%',
                right: '5%',
                bottom: '15%',
                top: "15%",
                containLabel: true
            },
            xAxis: {
                type: 'time',
                boundaryGap: true,
                name: xAxisLabel,
                nameLocation: 'middle',
                nameGap: 30,
                axisLabel: {
                    fontSize: xAxisLabelSize,
                    color: isDarkMode ? '#ffffff' : xAxisLabelColor
                },
                splitLine: {
                    show: showGridLines,
                    lineStyle: {
                        color: gridLineColor
                    }
                }
            },
            yAxis: {
                type: 'value',
                boundaryGap: true,
                name: yAxisLabel,
                nameLocation: 'middle',
                nameRotate: 90,
                nameGap: 35,
                axisLabel: {
                    fontSize: yAxisLabelSize,
                    color: isDarkMode ? '#ffffff' : yAxisLabelColor
                },
                splitLine: {
                    show: showGridLines,
                    lineStyle: {
                        color: gridLineColor
                    }
                },
                baseline: baselineValue
            },
            series,
            animation: showAnimation
        };

        chartInstance.current.setOption(option);

        chartInstance.current.on('legendselectchanged', (event) => {
            const selectedLegends = Object.keys(event.selected).filter(key => event.selected[key]);
            if (onLegendChange && typeof onLegendChange === 'function') {
                onLegendChange(selectedLegends);
            }
        });
    };

    useEffect(() => {
        if (!data) {
            console.error("No data provided to ComboChart component");
            return;
        }

        if (chartRef.current) {
            chartInstance.current = echarts.init(chartRef.current);
        }

        const resizeObserver = new ResizeObserver(() => {
            chartInstance.current?.resize();
        });

        resizeObserver.observe(chartRef.current);

        if (chartInstance.current) {
            initChart(data);
        }

        return () => {
            resizeObserver.disconnect();
            if (chartInstance.current) {
                chartInstance.current.dispose();
            }
        };
    }, [
        data, backgroundColor, title, titleSize, nameColor, labelSize, labelColor,
        showGridLines, gridLineColor, colorScheme, showDataPoints,
        showAnimation, xAxisLabel, yAxisLabel, xAxisLabelSize, xAxisLabelColor,
        yAxisLabelSize, yAxisLabelColor, curveType, showLegend, legendPosition,
        showLine, baselineValue, areaOpacity, showDataLabels, activeLegend,
        onLegendChange, showBorder, borderSize, borderColor, isDarkMode
    ]);

    return (
        <div
            ref={chartRef}
            style={{
                width: '100%',
                height: '100%',
                border: showBorder ? `${borderSize}px solid ${borderColor}` : 'none',
            }}
        />
    );
};

export default ComboChart;