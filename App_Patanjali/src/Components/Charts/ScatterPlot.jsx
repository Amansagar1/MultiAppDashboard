import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/Components/Context/ThemeContext';
import * as echarts from 'echarts';
import { getTimeRange, getFormatter } from '@/Utils/TimeUtils'; // Adjust the import path as needed

const ScatterPlotChart = ({
    data,
    backgroundColor = '#ffffff',
    showAnimation = false,
    showBorder = false,
    borderSize = 1,
    borderColor = '#e0e0e0',
    name = 'Scatter Plot Chart',
    nameSize = 18,
    nameColor = '#333333',
    nameBold = true,
    nameItalic = false,
    titlePosition = 'center',
    showLegend = true,
    legendPosition = 'right',
    activeLegend = [],
    onLegendChange,
    showGridLines = true,
    gridLineColor = '#e0e0e0',
    xAxisLabel = 'Timestamp',
    xAxisLabelSize = 12,
    xAxisLabelColor = '#666666',
    yAxisLabel = 'Value',
    yAxisLabelSize = 12,
    yAxisLabelColor = '#666666',
    showDataLabels = false,
    labelSize = 12,
    labelColor = '#666666',
    symbolSize = 10,
    symbolType = 'circle',
    colorScheme = ['#5470C6', '#91CC75', '#FAC858'],
    showTrendLine = false,
    trendLineType = 'linear',
    enableZoom = false,
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
        const seriesData = [];
        Object.keys(data).forEach((variable, index) => {
            const values = data[variable].map(item => [item.timestamp, item.value]);
            seriesData.push({
                name: variable,
                type: 'scatter',
                symbolSize: symbolSize,
                symbol: symbolType,
                data: values,
                itemStyle: {
                    color: colorMapRef.current[variable]
                },
                label: {
                    show: showDataLabels,
                    position: 'top',
                    fontSize: labelSize,
                    color: labelColor
                }
            });

            if (showTrendLine) {
                seriesData.push({
                    name: `${variable} Trend`,
                    type: 'line',
                    symbol: 'none',
                    data: values,
                    smooth: trendLineType === 'smooth',
                    lineStyle: {
                        color: colorMapRef.current[variable],
                        type: 'dashed'
                    }
                });
            }
        });

        return seriesData;
    };

    const initChart = (data) => {
        const seriesData = processData(data);
        const xAxisData = seriesData.flatMap(series => series.data.map(item => item[0]));
        const timeRange = getTimeRange(xAxisData);
        const xAxisFormatter = getFormatter(timeRange);
        const dataKeys = Object.keys(data);

        const activeLegendsSet = new Set(activeLegend.length > 0 ? activeLegend : dataKeys);

        // Update color mapping
        updateColorMap(dataKeys);

        const option = {
            backgroundColor: isDarkMode ? '#000000' : backgroundColor,
            title: {
                text: name,
                textStyle: {
                    fontSize: nameSize,
                    color: isDarkMode ? '#ffffff' : nameColor,
                    fontWeight: nameBold ? 'bold' : 'normal',
                    fontStyle: nameItalic ? 'italic' : 'normal',
                },
                left: titlePosition,
            },
            tooltip: {
                trigger: 'item',
                axisPointer: {
                    type: 'cross'
                },
                formatter: function (params) {
                    return `Variable: ${params.seriesName}<br/>` +
                        `Timestamp: ${new Date(params.data[0]).toLocaleString()}<br/>` +
                        `Value: ${params.data[1].toFixed(2)}`;
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
                type: 'time',
                name: xAxisLabel,
                boundaryGap: true,
                name: xAxisLabel,
                nameLocation: 'middle',
                nameGap: 25,
                nameTextStyle: {
                    fontSize: xAxisLabelSize,
                    color: xAxisLabelColor
                },
                axisLabel: {
                    formatter: xAxisFormatter,
                    fontSize: xAxisLabelSize,
                    color: xAxisLabelColor
                },
                splitLine: {
                    show: showGridLines,
                    lineStyle: {
                        color: gridLineColor
                    }
                },
                axisTick: {
                    show: false
                },
                boundaryGap: false,
            },
            yAxis: {
                type: 'value',
                name: yAxisLabel,
                boundaryGap: true,
                nameLocation: 'middle',
                nameRotate: 90,
                nameGap: 40,
                nameTextStyle: {
                    fontSize: yAxisLabelSize,
                    color: yAxisLabelColor
                },
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
                axisTick: {
                    show: false
                },
            },
            series: seriesData.map(series => ({
                ...series,
                silent: !activeLegendsSet.has(series.name),
            })),
            legend: {
                show: showLegend,
                data: dataKeys,
                left: legendPosition,
                top: legendPosition === 'right' ? '10%' : 'bottom',
                selected: dataKeys.reduce((acc, key) => {
                    acc[key] = activeLegendsSet.has(key);
                    return acc;
                }, {}),
                textStyle: {
                    color: isDarkMode ? '#ffffff' : '#333333'
                }
            },
            animation: showAnimation,
            dataZoom: enableZoom ? [
                {
                    type: 'inside',
                    start: 0,
                    end: 100
                }
            ] : undefined,
        };

        chartInstance.current.setOption(option);

        // Set up legend change event handler
        chartInstance.current.on('legendselectchanged', function (params) {
            if (onLegendChange && typeof onLegendChange === 'function') {
                const newActiveLegends = Object.keys(params.selected).filter(key => params.selected[key]);
                onLegendChange(newActiveLegends);
            }
        });
    };

    useEffect(() => {
        if (!data) {
            console.error("No data provided to ScatterPlotChart component");
            return;
        }

        if (chartRef.current) {
            chartInstance.current = echarts.init(chartRef.current);
        }

        const resizeObserver = new ResizeObserver(() => {
            chartInstance.current?.resize();
        });

        resizeObserver.observe(chartRef.current);

        if (chartInstance.current && data) {
            initChart(data);
        }

        return () => {
            resizeObserver.disconnect();
            if (chartInstance.current) {
                chartInstance.current.dispose();
            }
        };
    }, [data, backgroundColor, showAnimation, showBorder, borderSize, borderColor, name, nameSize, nameColor, nameBold, nameItalic, titlePosition, showLegend, legendPosition, showGridLines, gridLineColor, xAxisLabel, xAxisLabelSize, xAxisLabelColor, yAxisLabel, yAxisLabelSize, yAxisLabelColor, showDataLabels, labelSize, labelColor, symbolSize, symbolType, colorScheme, showTrendLine, trendLineType, enableZoom, activeLegend]);

    return <div ref={chartRef} style={{ width: '100%', height: '100%', border: showBorder ? `${borderSize}px solid ${borderColor}` : 'none', }} />;
};

export default ScatterPlotChart;