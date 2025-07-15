"use client";
import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/Components/Context/ThemeContext';
import * as echarts from 'echarts';
import { getTimeRange, getFormatter } from '@/Utils/TimeUtils';

const HistogramChart = ({
    data,
    // General Properties
    backgroundColor = '#ffffff',
    showAnimation = false,
    enableZoom = false,
    showBorder = false,
    borderSize = 1,
    borderColor = '#e0e0e0',

    // Title Properties
    name = 'Histogram Chart',
    nameSize = 18,
    nameColor = '#333333',
    nameBold = true,
    nameItalic = false,
    titlePosition = 'center',

    // Legends Properties
    showLegend = true,
    legendPosition = 'top',
    activeLegend = [], // Active legends
    onLegendChange, // Callback when legend selection changes

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

    // Histogram specific Properties
    barGap = '30%',
    barCategoryGap = '20%',
    colorScheme = ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE'],
    stack = true,
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
        const categories = Object.keys(data);
        if (!categories.length || !data[categories[0]]) {
            return { seriesData: [], xAxisData: [] };
        }

        // Update color mapping
        updateColorMap(categories);

        const xAxisData = data[categories[0]].map((item) => new Date(item.timestamp));

        const seriesData = categories.map((key) => ({
            name: key,
            type: 'bar',
            stack: stack ? 'Total' : undefined,
            emphasis: {
                focus: 'series'
            },
            itemStyle: {
                color: colorMapRef.current[key]
            },
            label: {
                show: showDataLabels,
                position: 'inside',
                fontSize: labelSize,
                color: labelColor
            },
            data: data[key].map((item) => parseFloat(item.value)),
        }));

        return { seriesData, xAxisData };
    };

    const initChart = (data) => {
        const { seriesData, xAxisData } = processData(data);

        const timeRange = getTimeRange(xAxisData);
        const xAxisFormatter = getFormatter(timeRange);

        const dataKeys = Object.keys(data);

        // Handle active legends
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
                },
                left: titlePosition,
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
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
                    color: isDarkMode ? '#ffffff' : '#333333'
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
                    color: isDarkMode ? '#ffffff' : xAxisLabelColor
                },
                axisLabel: {
                    formatter: xAxisFormatter,
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
            },
            series: seriesData,
            animation: showAnimation,
            dataZoom: enableZoom ? [
                {
                    type: 'inside',
                    start: 0,
                    end: 100
                },
            ] : undefined,
            barGap: barGap,
            barCategoryGap: barCategoryGap,
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
            console.error("No data provided to HistogramChart component");
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
        data, backgroundColor, showAnimation, showBorder, borderSize, borderColor,
        name, nameSize, nameColor, nameBold, nameItalic, titlePosition,
        showLegend, legendPosition, showGridLines, gridLineColor,
        xAxisLabel, xAxisLabelSize, xAxisLabelColor,
        yAxisLabel, yAxisLabelSize, yAxisLabelColor,
        showDataLabels, labelSize, labelColor,
        barGap, barCategoryGap, colorScheme, stack,
        activeLegend, enableZoom, isDarkMode // Added activeLegend and isDarkMode to dependencies
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

export default HistogramChart;