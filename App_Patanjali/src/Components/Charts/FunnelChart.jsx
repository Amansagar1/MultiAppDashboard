"use client";
import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/Components/Context/ThemeContext';
import * as echarts from 'echarts';

const FunnelChart = ({
    data,
    // General Properties
    backgroundColor = '#ffffff',
    showAnimation = false,
    showBorder = false,
    borderSize = 1,
    borderColor = '#e0e0e0',

    // Title Properties
    name = 'Funnel Chart',
    nameSize = 16,
    nameColor = '#333333',
    nameBold = true,
    nameItalic = false,
    titlePosition = 'center',

    // Legends Properties
    showLegend = true,
    legendPosition = 'bottom',

    // Data Labels Properties
    showDataLabels = false,
    labelSize = 12,
    labelColor = '#666666',
    dataLabelPosition = 'inside',

    // Funnel-specific Properties
    funnelAlign = 'center',
    funnelWidth = '80%',
    funnelGap = 2,
    funnelSort = 'descending',
    colorScheme = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],

    // Active Legend and Legend Change Event
    activeLegend = [],
    onLegendChange,
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
            return { seriesData: [] };
        }

        // Update color mapping before processing data
        updateColorMap(categories);

        const seriesData = categories.map((key) => ({
            name: key,
            value: data[key].reduce((acc, item) => acc + parseFloat(item.value), 0),
            itemStyle: {
                color: colorMapRef.current[key]
            }
        }));

        return { seriesData };
    };

    const initChart = (data) => {
        const { seriesData } = processData(data);

        // Set up active legend
        const activeLegendsSet = new Set(activeLegend.length > 0 ? activeLegend : seriesData.map(item => item.name));

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
                formatter: '{b}: {c}',
            },
            legend: {
                show: showLegend,
                data: seriesData.map(item => item.name),
                [legendPosition]: 10,
                itemWidth: 20,
                itemHeight: 14,
                selected: seriesData.reduce((acc, item) => {
                    acc[item.name] = activeLegendsSet.has(item.name);
                    return acc;
                }, {}),
                textStyle: {
                    color: isDarkMode ? '#ffffff' : '#333333'
                }
            },
            series: [
                {
                    name: 'Funnel Chart',
                    type: 'funnel',
                    left: '10%',
                    top: 60,
                    bottom: 60,
                    width: funnelWidth,
                    min: 0,
                    max: Math.max(...seriesData.map(item => item.value)),
                    minSize: '0%',
                    maxSize: '100%',
                    sort: funnelSort,
                    gap: funnelGap,
                    label: {
                        show: showDataLabels,
                        position: dataLabelPosition,
                        fontSize: labelSize,
                        color: isDarkMode ? '#ffffff' : labelColor,
                    },
                    labelLine: {
                        length: 10,
                        lineStyle: {
                            width: 1,
                            type: 'solid'
                        }
                    },
                    itemStyle: {
                        borderColor: showBorder ? borderColor : 'transparent',
                        borderWidth: showBorder ? borderSize : 0,
                    },
                    emphasis: {
                        label: {
                            fontSize: labelSize + 2,
                            fontWeight: 'bold',
                        }
                    },
                    data: seriesData.filter(item => activeLegendsSet.has(item.name)),
                }
            ],
            animation: showAnimation,
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
            console.error("No data provided to FunnelChart component");
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
    }, [data, backgroundColor, showAnimation, showBorder, borderSize, borderColor,
        name, nameSize, nameColor, nameBold, nameItalic, titlePosition,
        showLegend, legendPosition, showDataLabels, labelSize, labelColor,
        dataLabelPosition, funnelAlign, funnelWidth, funnelGap, funnelSort,
        activeLegend, colorScheme, isDarkMode]); // Added colorScheme and isDarkMode to dependencies

    return <div ref={chartRef} style={{ width: '100%', height: '100%', border: showBorder ? `${borderSize}px solid ${borderColor}` : 'none', }} />;
};

export default FunnelChart;