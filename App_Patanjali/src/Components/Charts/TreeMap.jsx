import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/Components/Context/ThemeContext';
import * as echarts from 'echarts';

const TreeMapChart = ({
    data,
    // General Properties
    backgroundColor = '#f5f5f5',
    showAnimation = false,
    showBorder = true,
    borderSize = 2,
    borderColor = '#e0e0e0',

    // Title Properties
    name = 'Detailed Performance Overview',
    nameSize = 18,
    nameColor = '#333333',
    nameBold = true,
    nameItalic = false,
    titlePosition = 'center',

    // Data Labels Properties
    showDataLabels = true,
    labelSize = 14,
    labelColor = '#ffffff',

    // TreeMap Specific Properties
    leafDepth = 2,
    visibleMin = 20,
    childrenVisibleMin = 2,
    upperLabelHeight = 40,
    upperLabelFontSize = 12,
    upperLabelColor = '#ffffff',
    itemBorderWidth = 2,
    itemBorderColor = '#f0f0f0',
    colorScheme = ['#5b8ff9', '#5ad8a6', '#f6bd16', '#e8684a', '#6dc8ec'],
    hoverColor = '#FF6F61',
    roam = false,
    zoomToNodeRatio = 0.1,
    activeLegend = [], // New prop for active legends
    onLegendChange, // New prop for legend change callback
}) => {
    const { isDarkMode } = useTheme();
    const chartRef = useRef(null);
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
            console.error("No data provided to TreeMapChart component");
            return;
        }

        if (!chartInstance.current || !data) return;

        const transformedData = transformData(data);

        // Convert activeLegend to a Set for faster lookup
        const activeLegendSet = new Set(activeLegend);

        // Update colorScheme to use the activeLegend
        const activeColorScheme = colorScheme.map((color, index) => ({
            color: color,
            colorSaturation: [0.35, 0.5],
            colorMappingBy: 'index',
            itemStyle: {
                borderColor: itemBorderColor,
                borderWidth: itemBorderWidth,
                gapWidth: 2,
                shadowColor: 'rgba(0, 0, 0, 0.2)',
                shadowBlur: 10,
            },
        }));

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
                left: titlePosition,
            },
            tooltip: {
                formatter: '{b}: {c}',
            },
            legend: {
                show: true,
                data: Object.keys(transformedData),
                selected: Object.keys(transformedData).reduce((acc, key) => {
                    acc[key] = activeLegendSet.has(key);
                    return acc;
                }, {}),
                textStyle: {
                    fontSize: 14,
                    color: isDarkMode ? '#ffffff' : nameColor
                },
                top: 60,
                right: 20,
            },
            series: [{
                type: 'treemap',
                data: transformedData,
                leafDepth: leafDepth,
                visibleMin: visibleMin,
                childrenVisibleMin: childrenVisibleMin,
                label: {
                    show: showDataLabels,
                    formatter: '{b}: {c}',
                    fontSize: labelSize,
                    color: labelColor,
                },
                upperLabel: {
                    show: true,
                    height: upperLabelHeight,
                    fontSize: upperLabelFontSize,
                    color: upperLabelColor,
                },
                itemStyle: {
                    borderColor: itemBorderColor,
                    borderWidth: itemBorderWidth,
                    shadowColor: 'rgba(0, 0, 0, 0.2)',
                    shadowBlur: 10,
                },
                levels: activeColorScheme,
                emphasis: {
                    itemStyle: {
                        color: hoverColor,
                    },
                },
                roam: roam,
                zoomToNodeRatio: zoomToNodeRatio,
            }],
        };

        chartInstance.current.setOption(option);

        // Set up legend change event handler
        chartInstance.current.on('legendselectchanged', function (params) {
            if (onLegendChange && typeof onLegendChange === 'function') {
                const newActiveLegends = Object.keys(params.selected).filter(key => params.selected[key]);
                onLegendChange(newActiveLegends);
            }
        });
    }, [
        data, backgroundColor, showAnimation, showBorder, borderSize, borderColor,
        name, nameSize, nameColor, nameBold, nameItalic, titlePosition, showDataLabels, labelSize,
        labelColor, leafDepth, visibleMin, childrenVisibleMin, upperLabelHeight,
        upperLabelFontSize, upperLabelColor, itemBorderWidth, itemBorderColor,
        colorScheme, hoverColor, roam, zoomToNodeRatio, activeLegend,
    ]);

    const transformData = (data) => {
        if (typeof data !== 'object' || data === null) {
            console.error('Expected data to be an object, but got:', data);
            return [];
        }

        return Object.keys(data).map(key => ({
            name: key,
            children: data[key].map(item => {
                const date = new Date(item.timestamp);
                const formattedTimestamp = isNaN(date.getTime()) ? 'Invalid Date' : date.toISOString();
                return {
                    name: formattedTimestamp,
                    value: item.value
                };
            })
        }));
    };

    return <div ref={chartRef} style={{ width: '100%', height: '100%', border: showBorder ? `${borderSize}px solid ${borderColor}` : 'none' }} />;
};

export default TreeMapChart;