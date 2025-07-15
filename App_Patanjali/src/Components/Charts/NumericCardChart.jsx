// import React, { useEffect, useRef, useState } from 'react';
// import { useTheme } from '@/Components/Context/ThemeContext';
// import * as echarts from 'echarts';

// const NumericCardChart = ({
//     data,
//     chartId,
//     onLegendChange,
//     activeLegend = '',
//     backgroundColor = '#ffffff',
//     name = 'Numeric Card Chart',
//     nameSize = 16,
//     nameColor = '#333333',
//     nameBold = true,
//     nameItalic = false,
//     titlePosition = 'center',
//     numericNameSize = 16,
//     numericNameColor = '#333333',
//     valueSize = 24,
//     valueColor = '#0000ff',
//     showBorder = false,
//     borderSize = 1,
//     borderColor = '#e0e0e0',
//     showAnimation = false,
//     decimalPlaces = 2,
//     showTrend = true,
//     trendConditions = [{ operator: '>', value: 0, color: '#00ff00' }],
//     additionalText = '',
//     showLegend = true,
//     legendPosition = 'bottom',
// }) => {
//     const { isDarkMode } = useTheme();
//     const chartRef = useRef(null);
//     const chartInstance = useRef(null);

//     const getTrendColor = (value) => {
//         if (!Array.isArray(trendConditions) || trendConditions.length === 0) {
//             return valueColor;
//         }
//         for (let condition of trendConditions) {
//             switch (condition.operator) {
//                 case '>':
//                     if (value > condition.value) return condition.color;
//                     break;
//                 case '<':
//                     if (value < condition.value) return condition.color;
//                     break;
//                 case '>=':
//                     if (value >= condition.value) return condition.color;
//                     break;
//                 case '<=':
//                     if (value <= condition.value) return condition.color;
//                     break;
//                 case '==':
//                     if (value == condition.value) return condition.color;
//                     break;
//             }
//         }
//         return valueColor; // Default color if no condition is met
//     };

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
//         if (!data || !chartInstance.current) return;

//         const variables = Object.keys(data);
//         const selectedVariable = activeLegend || variables[0];
//         const selectedData = data[selectedVariable];
//         const latestValue = selectedData ? selectedData[selectedData.length - 1].value : 0;

//         const trendColor = showTrend ? getTrendColor(latestValue) : valueColor;

//         const series = variables.map((variable) => ({
//             name: variable,
//             type: 'gauge',
//             radius: '100%',
//             startAngle: 180,
//             endAngle: 0,
//             min: 0,
//             max: 100,
//             splitNumber: 1,
//             axisLine: { show: false },
//             axisTick: { show: false },
//             axisLabel: { show: false },
//             splitLine: { show: false },
//             pointer: { show: false },
//             detail: {
//                 valueAnimation: showAnimation,
//                 formatter: function (value) {
//                     return [
//                         '{value|' + value.toFixed(decimalPlaces) + '}{additionalText| ' + additionalText + '}',
//                     ].join('\n');
//                 },
//                 rich: {
//                     name: {
//                         fontSize: numericNameSize,
//                         color: numericNameColor,
//                         padding: [5, 10]
//                     },
//                     value: {
//                         fontSize: valueSize,
//                         fontWeight: 'bold',
//                         color: trendColor,
//                         padding: [15, 0, 10, 0]
//                     },
//                     additionalText: {
//                         fontSize: valueSize * 0.5,
//                         color: trendColor,
//                         padding: [0, 0, 0, 10]
//                     },
//                 },
//                 offsetCenter: [0, '0%']
//             },
//             data: [{
//                 value: variable === selectedVariable ? latestValue : null,
//             }],
//             silent: variable !== selectedVariable
//         }));

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
//             legend: {
//                 show: showLegend,
//                 data: variables,
//                 top: legendPosition === 'top' ? 'top' : 'bottom',
//                 left: legendPosition === 'left' ? 'left' : 'center',
//                 textStyle: {
//                     fontSize: 12,
//                     color: isDarkMode ? '#ffffff' : valueColor
//                 },
//                 selected: variables.reduce((acc, variable) => {
//                     acc[variable] = variable === selectedVariable;
//                     return acc;
//                 }, {}),
//             },
//             series: series
//         };

//         chartInstance.current.setOption(option);

//         chartInstance.current.on('legendselectchanged', function (params) {
//             const newSelectedVariable = params.name;
//             if (onLegendChange && typeof onLegendChange === 'function') {
//                 onLegendChange(newSelectedVariable);
//             }
//         });

//     }, [
//         data, isDarkMode, backgroundColor, name, nameSize, nameColor, valueSize, valueColor,
//         showAnimation, decimalPlaces, showTrend, titlePosition, additionalText,
//         showLegend, legendPosition, activeLegend, trendConditions, nameBold, nameItalic, titlePosition,
//     ]);

//     return (
//         <div
//             id={chartId}
//             ref={chartRef}
//             style={{
//                 width: '100%',
//                 height: '100%',
//                 border: showBorder ? `${borderSize}px solid ${borderColor}` : 'none',
//             }}
//         />
//     );
// };

// export default NumericCardChart;





// import React, { useEffect, useRef } from 'react';
// import { useTheme } from '@/Components/Context/ThemeContext';
// import * as echarts from 'echarts';

// const NumericCardChart = ({
//     data,
//     chartId,
//     onLegendChange,
//     activeLegend = [],
//     backgroundColor = '#ffffff',
//     name = 'Numeric Card Chart',
//     nameSize = 16,
//     nameColor = '#333333',
//     nameBold = true,
//     nameItalic = false,
//     titlePosition = 'center',
//     numericNameSize = 16,
//     numericNameColor = '#333333',
//     valueSize = 24,
//     valueColor = '#0000ff',
//     showBorder = false,
//     borderSize = 1,
//     borderColor = '#e0e0e0',
//     showAnimation = false,
//     decimalPlaces = 2,
//     showTrend = true,
//     trendConditions = [{ operator: '>', value: 0, color: '#00ff00' }],
//     additionalText = '',
//     showLegend = true,
//     legendPosition = 'bottom',
//     colorScheme = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
// }) => {
//     const { isDarkMode } = useTheme();
//     const chartRef = useRef(null);
//     const chartInstance = useRef(null);
//     const colorMapRef = useRef({});

//     const updateColorMap = (dataKeys) => {
//         const allKeys = new Set([...dataKeys]);
//         const orderedKeys = activeLegend.length > 0 ?
//             [...new Set([...activeLegend, ...dataKeys])] :
//             [...allKeys];

//         const newColorMap = {};
//         orderedKeys.forEach((key, index) => {
//             newColorMap[key] = colorScheme[index % colorScheme.length];
//         });

//         colorMapRef.current = newColorMap;
//     };

//     const getTrendColor = (value, variableName) => {
//         if (!Array.isArray(trendConditions) || trendConditions.length === 0) {
//             return colorMapRef.current[variableName] || valueColor;
//         }
//         for (let condition of trendConditions) {
//             switch (condition.operator) {
//                 case '>':
//                     if (value > condition.value) return condition.color;
//                     break;
//                 case '<':
//                     if (value < condition.value) return condition.color;
//                     break;
//                 case '>=':
//                     if (value >= condition.value) return condition.color;
//                     break;
//                 case '<=':
//                     if (value <= condition.value) return condition.color;
//                     break;
//                 case '==':
//                     if (value == condition.value) return condition.color;
//                     break;
//             }
//         }
//         return colorMapRef.current[variableName] || valueColor;
//     };

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
//         if (!data || !chartInstance.current) return;

//         const variables = Object.keys(data);
//         updateColorMap(variables);

//         const selectedVariable = activeLegend.length > 0 ? activeLegend[0] : variables[0];
//         const selectedData = data[selectedVariable];
//         const latestValue = selectedData ? selectedData[selectedData.length - 1].value : 0;
//         const latestTimestamp = selectedData ? selectedData[selectedData.length - 1].timestamp : '';

//         const trendColor = showTrend ? getTrendColor(latestValue, selectedVariable) : colorMapRef.current[selectedVariable];

//         const series = variables.map((variable) => ({
//             name: variable,
//             type: 'gauge',
//             radius: '100%',
//             startAngle: 180,
//             endAngle: 0,
//             min: 0,
//             max: 100,
//             splitNumber: 1,
//             axisLine: { show: false },
//             axisTick: { show: false },
//             axisLabel: { show: false },
//             splitLine: { show: false },
//             pointer: { show: false },
//             title: {
//                 show: true,
//                 offsetCenter: [0, '20%'],
//                 color: isDarkMode ? '#ffffff' : '#333333',
//                 fontSize: numericNameSize,
//                 fontWeight: 'normal'
//             },
//             detail: {
//                 valueAnimation: showAnimation,
//                 formatter: function (value) {
//                     return [
//                         '{value|' + value.toFixed(decimalPlaces) + '}{additionalText| ' + additionalText + '}',
//                     ].join('\n');
//                 },
//                 rich: {
//                     value: {
//                         fontSize: valueSize,
//                         fontWeight: 'bold',
//                         color: trendColor,
//                         padding: [15, 0, 10, 0]
//                     },
//                     additionalText: {
//                         fontSize: valueSize * 0.5,
//                         color: trendColor,
//                         padding: [0, 0, 0, 10]
//                     },
//                 },
//                 offsetCenter: [0, '0%'],
//                 backgroundColor: 'transparent',
//                 borderColor: 'transparent',
//                 borderWidth: 0,
//                 borderRadius: 8,
//                 padding: [10, 10],
//                 emphasis: {
//                     show: true
//                 }
//             },
//             data: [{
//                 value: variable === selectedVariable ? latestValue : null,
//                 itemStyle: {
//                     color: 'transparent',
//                     borderWidth: 0,
//                     borderColor: 'transparent'
//                 },
//                 emphasis: {
//                     disabled: false
//                 },
//                 tooltip: {
//                     show: true
//                 }
//             }],
//             silent: variable !== selectedVariable
//         }));

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
//                 show: true,
//                 trigger: 'item',
//                 position: 'top',
//                 formatter: function (params) {
//                     if (!params.data || params.data.value === null) return '';
//                     const date = new Date(params.data.timestamp);
//                     return `
//                         <div style="padding: 8px">
//                             <div style="margin-bottom: 4px"><strong>${params.data.name}</strong></div>
//                             <div>Value: ${params.data.value.toFixed(decimalPlaces)}</div>
//                             <div>Time: ${date.toLocaleString()}</div>
//                         </div>
//                     `;
//                 },
//                 backgroundColor: isDarkMode ? '#333333' : '#ffffff',
//                 borderColor: isDarkMode ? '#444444' : '#e0e0e0',
//                 textStyle: {
//                     color: isDarkMode ? '#ffffff' : '#333333'
//                 },
//                 extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);'
//             },
//             legend: {
//                 show: showLegend,
//                 data: variables,
//                 top: legendPosition === 'top' ? 'top' : 'bottom',
//                 left: legendPosition === 'left' ? 'left' : 'center',
//                 textStyle: {
//                     fontSize: 12,
//                     color: isDarkMode ? '#ffffff' : '#333333'
//                 },
//                 selected: variables.reduce((acc, variable) => {
//                     acc[variable] = variable === selectedVariable;
//                     return acc;
//                 }, {})
//             },
//             series: series
//         };

//         chartInstance.current.setOption(option);

//         chartInstance.current.on('legendselectchanged', function (params) {
//             const newSelectedVariable = params.name;
//             if (onLegendChange && typeof onLegendChange === 'function') {
//                 onLegendChange([newSelectedVariable]);
//             }

//             const newSelected = {};
//             variables.forEach(variable => {
//                 newSelected[variable] = variable === newSelectedVariable;
//             });
//             chartInstance.current.setOption({
//                 legend: { selected: newSelected }
//             });
//         });

//     }, [
//         data,
//         isDarkMode,
//         backgroundColor,
//         name,
//         nameSize,
//         nameColor,
//         valueSize,
//         valueColor,
//         showAnimation,
//         decimalPlaces,
//         showTrend,
//         titlePosition,
//         additionalText,
//         showLegend,
//         legendPosition,
//         activeLegend,
//         trendConditions,
//         nameBold,
//         nameItalic,
//         colorScheme
//     ]);

//     return (
//         <div
//             id={chartId}
//             ref={chartRef}
//             style={{
//                 width: '100%',
//                 height: '100%',
//                 border: showBorder ? `${borderSize}px solid ${borderColor}` : 'none',
//             }}
//         />
//     );
// };

// export default NumericCardChart;



import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/Components/Context/ThemeContext';
import * as echarts from 'echarts';

const NumericCardChart = ({
    data,
    chartId,
    onLegendChange,
    activeLegend = [],
    backgroundColor = '#ffffff',
    name = 'Numeric Card Chart',
    nameSize = 16,
    nameColor = '#333333',
    nameBold = true,
    nameItalic = false,
    titlePosition = 'center',
    numericNameSize = 16,
    numericNameColor = '#333333',
    valueSize = 24,
    valueColor = '#0000ff',
    showBorder = false,
    borderSize = 1,
    borderColor = '#e0e0e0',
    showAnimation = false,
    decimalPlaces = 2,
    showTrend = true,
    trendConditions = [{ operator: '>', value: 0, color: '#00ff00' }],
    additionalText = '',
    showLegend = true,
    legendPosition = 'bottom',
    colorScheme = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
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
            newColorMap[key] = colorScheme[index % colorScheme.length];
        });

        colorMapRef.current = newColorMap;
    };

    const getTrendColor = (value, variableName) => {
        if (!Array.isArray(trendConditions) || trendConditions.length === 0) {
            return colorMapRef.current[variableName] || valueColor;
        }
        for (let condition of trendConditions) {
            switch (condition.operator) {
                case '>':
                    if (value > condition.value) return condition.color;
                    break;
                case '<':
                    if (value < condition.value) return condition.color;
                    break;
                case '>=':
                    if (value >= condition.value) return condition.color;
                    break;
                case '<=':
                    if (value <= condition.value) return condition.color;
                    break;
                case '==':
                    if (value == condition.value) return condition.color;
                    break;
            }
        }
        return colorMapRef.current[variableName] || valueColor;
    };

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
        if (!data || !chartInstance.current) return;

        const variables = Object.keys(data);
        updateColorMap(variables);

        const selectedVariable = activeLegend.length > 0 ? activeLegend[0] : variables[0];
        const selectedData = data[selectedVariable];
        const latestValue = selectedData ? selectedData[selectedData.length - 1].value : 0;
        const latestTimestamp = selectedData ? selectedData[selectedData.length - 1].timestamp : '';

        const trendColor = showTrend ? getTrendColor(latestValue, selectedVariable) : colorMapRef.current[selectedVariable];

        const series = variables.map((variable) => ({
            name: variable,
            type: 'gauge',
            radius: '100%',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 100,
            splitNumber: 1,
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
            splitLine: { show: false },
            pointer: { show: false },
            title: {
                show: true,
                offsetCenter: [0, '20%'],
                color: isDarkMode ? '#ffffff' : '#333333',
                fontSize: numericNameSize,
                fontWeight: 'normal',
                textStyle: {
                    fontFamily: 'sans-serif',  // Use system font for better rendering
                    textRendering: 'optimizeLegibility'  // Improve text rendering
                }
            },
            detail: {
                valueAnimation: showAnimation,
                formatter: function (value) {
                    return [
                        '{value|' + value.toFixed(decimalPlaces) + '}{additionalText| ' + additionalText + '}'
                    ].join('\n');
                },
                rich: {
                    value: {
                        fontSize: valueSize,
                        fontWeight: 'bold',
                        color: trendColor,
                        padding: [15, 0, 10, 0],
                        fontFamily: 'sans-serif',
                        textRendering: 'optimizeLegibility'
                    },
                    additionalText: {
                        fontSize: valueSize * 0.5,
                        color: trendColor,
                        padding: [0, 0, 0, 10],
                        fontFamily: 'sans-serif',
                        textRendering: 'optimizeLegibility'
                    }
                },
                offsetCenter: [0, '0%'],
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 8,
                padding: [10, 10]
            },
            data: [{
                value: variable === selectedVariable ? latestValue : null,
                itemStyle: {
                    color: 'transparent',
                    borderWidth: 0,
                    borderColor: 'transparent'
                }
            }],
            silent: variable !== selectedVariable
        }));

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
                show: true,
                trigger: 'item',
                position: 'top',
                formatter: function (params) {
                    if (!params.data || params.data.value === null) return '';
                    const date = new Date(latestTimestamp);
                    return `
                        <div style="padding: 8px; font-family: sans-serif;">
                            <div style="margin-bottom: 4px"><strong>${params.seriesName}</strong></div>
                            <div>Value: ${params.data.value.toFixed(decimalPlaces)}</div>
                            <div>Time: ${date.toLocaleString()}</div>
                        </div>
                    `;
                },
                backgroundColor: isDarkMode ? '#333333' : '#ffffff',
                borderColor: isDarkMode ? '#444444' : '#e0e0e0',
                textStyle: {
                    color: isDarkMode ? '#ffffff' : '#333333',
                    fontFamily: 'sans-serif'
                },
                extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);'
            },
            legend: {
                show: showLegend,
                data: variables,
                top: legendPosition === 'top' ? 'top' : 'bottom',
                left: legendPosition === 'left' ? 'left' : 'center',
                textStyle: {
                    fontSize: 12,
                    color: isDarkMode ? '#ffffff' : '#333333',
                    fontFamily: 'sans-serif',
                    textRendering: 'optimizeLegibility'
                },
                selected: variables.reduce((acc, variable) => {
                    acc[variable] = variable === selectedVariable;
                    return acc;
                }, {})
            },
            series: series,
            animation: true,
            animationDuration: 300,
            animationEasing: 'cubicOut'
        };

        // Set options with animation disabled initially for sharp initial render
        chartInstance.current.setOption(option, {
            notMerge: true,
            lazyUpdate: false,
            silent: true
        });

        chartInstance.current.on('legendselectchanged', function (params) {
            const newSelectedVariable = params.name;
            if (onLegendChange && typeof onLegendChange === 'function') {
                onLegendChange([newSelectedVariable]);
            }

            const newSelected = {};
            variables.forEach(variable => {
                newSelected[variable] = variable === newSelectedVariable;
            });
            chartInstance.current.setOption({
                legend: { selected: newSelected }
            });
        });

    }, [
        data,
        isDarkMode,
        backgroundColor,
        name,
        nameSize,
        nameColor,
        valueSize,
        valueColor,
        showAnimation,
        decimalPlaces,
        showTrend,
        titlePosition,
        additionalText,
        showLegend,
        legendPosition,
        activeLegend,
        trendConditions,
        nameBold,
        nameItalic,
        colorScheme
    ]);

    return (
        <div
            id={chartId}
            ref={chartRef}
            style={{
                width: '100%',
                height: '100%',
                border: showBorder ? `${borderSize}px solid ${borderColor}` : 'none',
                // Add CSS to ensure proper rendering
                position: 'relative',
                overflow: 'hidden'
            }}
        />
    );
};

export default NumericCardChart;