// import React, { useEffect, useRef } from 'react';
// import { useTheme } from '@/Components/Context/ThemeContext';
// import * as echarts from 'echarts';

// const BubbleChart = ({
//     data,
//     // General Properties
//     backgroundColor = '#ffffff',
//     showAnimation = false,
//     showBorder = false,
//     borderSize = 1,
//     borderColor = '#e0e0e0',

//     // Title Properties
//     name = 'Bubble Chart',
//     nameSize = 16,
//     nameColor = '#333333',
//     nameBold = false,
//     nameItalic = false,

//     // Legend Properties
//     showLegend = true,
//     legendPosition = 'top',

//     // Axes Properties
//     showGridLines = true,
//     gridLineColor = '#e0e0e0',
//     xAxisLabel = 'Value',
//     xAxisLabelSize = 12,
//     xAxisLabelColor = '#666666',
//     yAxisLabel = 'Timestamp',
//     yAxisLabelSize = 12,
//     yAxisLabelColor = '#666666',

//     // Data Labels Properties
//     showDataLabels = false,
//     labelSize = 12,
//     labelColor = '#666666',
//     dataLabelPosition = 'top',

//     // Bubble Chart Specific Properties
//     bubbleMinSize = 10,
//     bubbleMaxSize = 50,
//     bubbleOpacity = 0.7,
//     colorScheme = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'],
//     showBubbleBorder = false,
//     bubbleBorderColor = '#000000',
//     bubbleBorderWidth = 1,
// }) => {
//     const chartRef = useRef(null);
//     const { isDarkMode } = useTheme();
//     const chartInstance = useRef(null);

//     useEffect(() => {
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
//         if (!data) {
//             console.error("No data provided to BubbleChart component");
//             return;
//         }

//         if (!chartInstance.current || !data) return;

//         const { seriesData } = processData(data);

//         const option = {
//             backgroundColor: isDarkMode ? '#00000' : backgroundColor,
//             animation: showAnimation,
//             title: {
//                 text: name,
//                 textStyle: {
//                     fontSize: nameSize,
//                     color: isDarkMode ? '#ffffff' : nameColor,
//                     fontWeight: nameBold ? 'bold' : 'normal',
//                     fontStyle: nameItalic ? 'italic' : 'normal',
//                 },
//                 left: 'center',
//             },
//             tooltip: {
//                 trigger: 'item',
//                 formatter: function (params) {
//                     return `${params.seriesName}<br/>
//                             Value: ${params.data[0]}<br/>
//                             Timestamp: ${new Date(params.data[1]).toLocaleString()}<br/>
//                             Size: ${params.data[2]}`;
//                 }
//             },
//             legend: {
//                 show: showLegend,
//                 orient: legendPosition === 'right' ? 'vertical' : 'horizontal',
//                 left: legendPosition === 'top' ? 'center' : 'right',
//                 top: legendPosition === 'top' ? 'top' : 'center',
//                 data: Object.keys(data),
//                 textStyle: {
//                     fontSize: labelSize,
//                     color: labelColor
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
//                 type: 'value',
//                 name: xAxisLabel,
//                 boundaryGap: true,
//                 name: xAxisLabel,
//                 nameLocation: 'middle',
//                 nameGap: 25,
//                 nameTextStyle: {
//                     fontSize: xAxisLabelSize,
//                     color: xAxisLabelColor
//                 },
//                 splitLine: {
//                     show: showGridLines,
//                     lineStyle: {
//                         color: gridLineColor
//                     }
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
//                     color: yAxisLabelColor
//                 },
//                 splitLine: {
//                     show: showGridLines,
//                     lineStyle: {
//                         color: gridLineColor
//                     }
//                 },
//                 axisLabel: {
//                     formatter: (value) => new Date(value).toLocaleDateString('en-US')
//                 },
//             },
//             series: seriesData.map((series, index) => ({
//                 ...series,
//                 itemStyle: {
//                     color: colorScheme[index % colorScheme.length],
//                     opacity: bubbleOpacity,
//                     borderColor: showBubbleBorder ? bubbleBorderColor : 'transparent',
//                     borderWidth: bubbleBorderWidth
//                 },
//                 label: showDataLabels ? {
//                     show: true,
//                     position: dataLabelPosition,
//                     fontSize: labelSize,
//                     color: labelColor,
//                     formatter: (params) => params.data[0]
//                 } : undefined,
//             }))
//         };

//         chartInstance.current.setOption(option);
//     }, [
//         data, backgroundColor, showAnimation, showBorder, borderSize, borderColor,
//         name, nameSize, nameColor, nameBold, nameItalic, showLegend, legendPosition,
//         showGridLines, gridLineColor, xAxisLabel, xAxisLabelSize, xAxisLabelColor,
//         yAxisLabel, yAxisLabelSize, yAxisLabelColor, showDataLabels, labelSize,
//         labelColor, dataLabelPosition, bubbleMinSize, bubbleMaxSize, bubbleOpacity,
//         colorScheme, showBubbleBorder, bubbleBorderColor, bubbleBorderWidth
//     ]);

//     const processData = (data) => {
//         const categories = Object.keys(data);
//         if (!categories.length || !data[categories[0]]) {
//             return { seriesData: [] };
//         }

//         const allSizes = categories.flatMap(key => data[key].map(item => item.size || 10));
//         const minSize = Math.min(...allSizes);
//         const maxSize = Math.max(...allSizes);

//         const seriesData = categories.map((key) => ({
//             name: key,
//             type: 'scatter',
//             symbolSize: (data) => {
//                 const size = data[2];
//                 return ((size - minSize) / (maxSize - minSize)) * (bubbleMaxSize - bubbleMinSize) + bubbleMinSize;
//             },
//             data: data[key].map((item) => [
//                 item.value,
//                 item.timestamp,
//                 item.size || 10,
//             ]),
//         }));

//         return { seriesData };
//     };

//     return <div ref={chartRef} style={{ width: '100%', height: '100%', border: showBorder ? `${borderSize}px solid ${borderColor}` : 'none' }} />;
// };

// export default BubbleChart;




import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/Components/Context/ThemeContext';
import * as echarts from 'echarts';

const BubbleChart = ({
    data,
    // General Properties
    backgroundColor = '#ffffff',
    showAnimation = false,
    showBorder = false,
    borderSize = 1,
    borderColor = '#e0e0e0',

    // Title Properties
    name = 'Bubble Chart',
    nameSize = 16,
    nameColor = '#333333',
    nameBold = false,
    nameItalic = false,

    // Legend Properties
    showLegend = true,
    legendPosition = 'top',
    activeLegend = [], // Added activeLegend prop
    onLegendChange, // Added onLegendChange prop

    // Axes Properties
    showGridLines = true,
    gridLineColor = '#e0e0e0',
    xAxisLabel = 'Value',
    xAxisLabelSize = 12,
    xAxisLabelColor = '#666666',
    yAxisLabel = 'Timestamp',
    yAxisLabelSize = 12,
    yAxisLabelColor = '#666666',

    // Data Labels Properties
    showDataLabels = false,
    labelSize = 12,
    labelColor = '#666666',
    dataLabelPosition = 'top',

    // Bubble Chart Specific Properties
    bubbleMinSize = 10,
    bubbleMaxSize = 50,
    bubbleOpacity = 0.7,
    colorScheme = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'],
    showBubbleBorder = false,
    bubbleBorderColor = '#000000',
    bubbleBorderWidth = 1,
}) => {
    const chartRef = useRef(null);
    const { isDarkMode } = useTheme();
    const chartInstance = useRef(null);
    const colorMapRef = useRef({});

    const updateColorMap = (dataKeys) => {
        const allKeys = new Set([...dataKeys]);
        const orderedKeys = activeLegend.length > 0 ?
            [...new Set([...activeLegend, ...dataKeys])] :
            [...allKeys];

        const newColorMap = {};
        orderedKeys.forEach((key, index) => {
            // Use the colorScheme prop directly, which will be updated by ChartProperties
            newColorMap[key] = colorScheme[index] || colorScheme[index % colorScheme.length];
        });

        colorMapRef.current = newColorMap;
    };

    useEffect(() => {
        // Update color map when colorScheme changes
        if (data && Object.keys(data).length > 0) {
            updateColorMap(Object.keys(data));
            if (chartInstance.current) {
                initChart(data);
            }
        }
    }, [colorScheme]); // Add colorScheme to dependencies

    const processData = (data) => {
        const categories = Object.keys(data);
        if (!categories.length || !data[categories[0]]) {
            return { seriesData: [] };
        }

        // Update color mapping before processing data
        updateColorMap(categories);

        const allSizes = categories.flatMap(key => data[key].map(item => item.size || 10));
        const minSize = Math.min(...allSizes);
        const maxSize = Math.max(...allSizes);

        const seriesData = categories.map((key) => ({
            name: key,
            type: 'scatter',
            symbolSize: (data) => {
                const size = data[2];
                return ((size - minSize) / (maxSize - minSize)) * (bubbleMaxSize - bubbleMinSize) + bubbleMinSize;
            },
            data: data[key].map((item) => [
                item.value,
                item.timestamp,
                item.size || 10,
            ]),
            itemStyle: {
                color: colorMapRef.current[key],
                opacity: bubbleOpacity,
                borderColor: showBubbleBorder ? bubbleBorderColor : 'transparent',
                borderWidth: bubbleBorderWidth
            },
        }));

        return { seriesData };
    };

    useEffect(() => {
        if (chartRef.current) {
            chartInstance.current = echarts.init(chartRef.current);
        }

        const resizeObserver = new ResizeObserver(() => {
            chartInstance.current?.resize();
        });

        resizeObserver.observe(chartRef.current);

        return () => {
            resizeObserver.disconnect();
            if (chartInstance.current) {
                chartInstance.current.dispose();
            }
        };
    }, []);

    useEffect(() => {
        if (!data) {
            console.error("No data provided to BubbleChart component");
            return;
        }

        if (!chartInstance.current || !data) return;

        const { seriesData } = processData(data);
        const dataKeys = Object.keys(data);
        const activeLegendsSet = new Set(activeLegend.length > 0 ? activeLegend : dataKeys);

        const option = {
            backgroundColor: isDarkMode ? '#000000' : backgroundColor,
            animation: showAnimation,
            title: {
                text: name,
                textStyle: {
                    fontSize: nameSize,
                    color: isDarkMode ? '#ffffff' : nameColor,
                    fontWeight: nameBold ? 'bold' : 'normal',
                    fontStyle: nameItalic ? 'italic' : 'normal',
                },
                left: 'center',
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    return `${params.seriesName}<br/>
                            Value: ${params.data[0]}<br/>
                            Timestamp: ${new Date(params.data[1]).toLocaleString()}<br/>
                            Size: ${params.data[2]}`;
                }
            },
            legend: {
                show: showLegend,
                orient: legendPosition === 'right' ? 'vertical' : 'horizontal',
                left: legendPosition === 'top' ? 'center' : 'right',
                top: legendPosition === 'top' ? 'top' : 'center',
                data: dataKeys,
                selected: dataKeys.reduce((acc, key) => {
                    acc[key] = activeLegendsSet.has(key);
                    return acc;
                }, {}),
                textStyle: {
                    fontSize: labelSize,
                    color: isDarkMode ? '#ffffff' : labelColor
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
                type: 'value',
                name: xAxisLabel,
                boundaryGap: true,
                nameLocation: 'middle',
                nameGap: 25,
                nameTextStyle: {
                    fontSize: xAxisLabelSize,
                    color: isDarkMode ? '#ffffff' : xAxisLabelColor
                },
                splitLine: {
                    show: showGridLines,
                    lineStyle: {
                        color: gridLineColor
                    }
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
                    color: isDarkMode ? '#ffffff' : yAxisLabelColor
                },
                splitLine: {
                    show: showGridLines,
                    lineStyle: {
                        color: gridLineColor
                    }
                },
                axisLabel: {
                    formatter: (value) => new Date(value).toLocaleDateString('en-US')
                },
            },
            series: seriesData.map(series => ({
                ...series,
                label: showDataLabels ? {
                    show: true,
                    position: dataLabelPosition,
                    fontSize: labelSize,
                    color: isDarkMode ? '#ffffff' : labelColor,
                    formatter: (params) => params.data[0]
                } : undefined,
            }))
        };

        chartInstance.current.setOption(option);

        // Add legend change handler
        chartInstance.current.on('legendselectchanged', function (params) {
            if (onLegendChange && typeof onLegendChange === 'function') {
                const newActiveLegends = Object.keys(params.selected)
                    .filter(key => params.selected[key]);
                onLegendChange(newActiveLegends);
            }
        });
    }, [
        data, backgroundColor, showAnimation, showBorder, borderSize, borderColor,
        name, nameSize, nameColor, nameBold, nameItalic, showLegend, legendPosition,
        showGridLines, gridLineColor, xAxisLabel, xAxisLabelSize, xAxisLabelColor,
        yAxisLabel, yAxisLabelSize, yAxisLabelColor, showDataLabels, labelSize,
        labelColor, dataLabelPosition, bubbleMinSize, bubbleMaxSize, bubbleOpacity,
        colorScheme, showBubbleBorder, bubbleBorderColor, bubbleBorderWidth,
        isDarkMode, activeLegend // Added activeLegend to dependencies
    ]);

    return <div ref={chartRef} style={{ width: '100%', height: '100%', border: showBorder ? `${borderSize}px solid ${borderColor}` : 'none' }} />;
};

export default BubbleChart;