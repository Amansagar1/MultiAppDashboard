import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/Components/Context/ThemeContext';
import * as echarts from 'echarts';

const BoxPlotChart = ({
    data,
    // General Properties
    backgroundColor = '#ffffff',
    showAnimation = false,
    showBorder = false,
    borderSize = 1,
    borderColor = '#e0e0e0',

    // Title Properties
    name = 'Box Plot Chart',
    nameSize = 16,
    nameColor = '#333333',
    nameBold = false,
    nameItalic = false,

    // Legend Properties
    showLegend = true,
    legendPosition = 'top',

    // Axes Properties
    showGridLines = true,
    gridLineColor = '#e0e0e0',
    xAxisLabel = 'Categories',
    xAxisLabelSize = 12,
    xAxisLabelColor = '#666666',
    yAxisLabel = 'Value',
    yAxisLabelSize = 12,
    yAxisLabelColor = '#666666',

    // Data Labels Properties
    showDataLabels = false,
    labelSize = 12,
    labelColor = '#666666',
    dataLabelPosition = 'inside',

    // Box Plot Specific Properties
    boxColors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'],
    showOutliers = true,
    outlierColor = '#ee6666',
    boxWidth = 50,
    boxBorderWidth = 1,
    boxBorderColor = '#000',
    whiskerWidth = 2,
    whiskerColor = '#000',
    medianColor = '#fff',
    medianWidth = 2,
    capWidth = 20,
    capColor = '#000',
    outlierSymbol = 'circle',
    outlierSize = 6,
}) => {
    const chartRef = useRef(null);
    const { isDarkMode } = useTheme();
    const chartInstance = useRef(null);

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
            console.error("No data provided to BoxPlotChart component");
            return;
        }

        if (!chartInstance.current || !data) return;

        const { boxData, outliers, categories } = processData(data);

        const option = {
            backgroundColor: isDarkMode ? '#00000' : backgroundColor,
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
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                show: showLegend,
                orient: legendPosition === 'right' ? 'vertical' : 'horizontal',
                left: legendPosition === 'top' ? 'right' : 'top',
                top: legendPosition === 'top' ? 'top' : 'bottom',
                textStyle: {
                    fontSize: labelSize,
                    color: labelColor
                }
            },
            grid: {
                left: '5%',
                right: '5%',
                bottom: '15%',
                top: "15%",
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: categories,
                boundaryGap: true,
                nameLocation: 'middle',
                nameGap: 25,
                splitArea: {
                    show: false
                },
                axisLabel: {
                    formatter: '{value}',
                    fontSize: xAxisLabelSize,
                    color: xAxisLabelColor
                },
                splitLine: {
                    show: showGridLines,
                    lineStyle: {
                        color: gridLineColor
                    }
                },
                name: xAxisLabel,
                nameLocation: 'middle',
                nameGap: 30,
            },
            yAxis: {
                type: 'value',
                name: yAxisLabel,
                boundaryGap: true,
                nameLocation: 'middle',
                nameRotate: 90,
                nameGap: 35,
                axisLabel: {
                    fontSize: yAxisLabelSize,
                    color: yAxisLabelColor
                },
                splitLine: {
                    show: showGridLines,
                    lineStyle: {
                        color: gridLineColor
                    }
                },
            },
            series: [
                {
                    name: 'BoxPlot',
                    type: 'boxplot',
                    data: boxData,
                    itemStyle: {
                        color: (params) => boxColors[params.dataIndex % boxColors.length],
                        borderWidth: boxBorderWidth,
                        borderColor: boxBorderColor
                    },
                    boxWidth: boxWidth,
                    whiskerWidth: whiskerWidth,
                    whiskerLineStyle: {
                        color: whiskerColor
                    },
                    medianLineStyle: {
                        color: medianColor,
                        width: medianWidth
                    },
                    capWidth: capWidth,
                    capLineStyle: {
                        color: capColor
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    tooltip: {
                        formatter: function (param) {
                            return [
                                'Variable: ' + param.name,
                                'Upper: ' + param.data[5].toFixed(2),
                                'Q3: ' + param.data[4].toFixed(2),
                                'Median: ' + param.data[3].toFixed(2),
                                'Q1: ' + param.data[2].toFixed(2),
                                'Lower: ' + param.data[1].toFixed(2),
                            ].filter(Boolean).join('<br/>');
                        }
                    }
                },
                {
                    name: 'Outliers',
                    type: 'scatter',
                    data: outliers,
                    itemStyle: {
                        color: outlierColor
                    },
                    symbolSize: outlierSize,
                    symbol: outlierSymbol,
                },
            ].filter(series => Object.keys(series).length > 0)
        };

        chartInstance.current.setOption(option);
    }, [
        data, backgroundColor, showAnimation, showBorder, borderSize, borderColor,
        name, nameSize, nameColor, nameBold, nameItalic, showLegend, legendPosition,
        showGridLines, gridLineColor, xAxisLabel, xAxisLabelSize, xAxisLabelColor,
        yAxisLabel, yAxisLabelSize, yAxisLabelColor, showDataLabels, labelSize,
        labelColor, dataLabelPosition, boxColors, showOutliers, outlierColor,
        boxWidth, boxBorderWidth, boxBorderColor, whiskerWidth, whiskerColor,
        medianColor, medianWidth, capWidth, capColor, outlierSymbol, outlierSize
    ]);

    const processData = (inputData) => {
        const groupedData = {};

        Object.keys(inputData).forEach((key) => {
            groupedData[key] = inputData[key].map(item => parseFloat(item.value));
        });

        const boxData = [];
        const outliers = [];

        Object.keys(groupedData).forEach((key) => {
            const values = groupedData[key].sort((a, b) => a - b);
            const min = values[0];
            const max = values[values.length - 1];
            const q1 = values[Math.floor(values.length * 0.25)];
            const q2 = values[Math.floor(values.length * 0.5)];
            const q3 = values[Math.floor(values.length * 0.75)];
            const iqr = q3 - q1;
            const lowerFence = q1 - 1.5 * iqr;
            const upperFence = q3 + 1.5 * iqr;

            boxData.push([min, q1, q2, q3, max]);

            if (showOutliers) {
                values.forEach((value) => {
                    if (value < lowerFence || value > upperFence) {
                        outliers.push([key, value]);
                    }
                });
            }
        });

        return {
            boxData,
            outliers,
            categories: Object.keys(groupedData)
        };
    };

    return <div ref={chartRef} style={{ width: '100%', height: '100%', border: showBorder ? `${borderSize}px solid ${borderColor}` : 'none' }} />;
};

export default BoxPlotChart;