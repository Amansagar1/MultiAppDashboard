import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/Components/Context/ThemeContext';
import * as echarts from 'echarts';

const RadarChart = ({
    data,
    // General Properties
    backgroundColor = '#ffffff',
    showAnimation = false,
    showBorder = false,
    borderSize = 1,
    borderColor = '#e0e0e0',

    // Title Properties
    name = 'Radar Chart',
    nameSize = 16,
    nameColor = '#333333',
    nameBold = true,
    nameItalic = false,
    titlePosition = 'center',

    // Legend Properties
    showLegend = true,
    legendPosition = 'bottom',
    activeLegend = [],
    onLegendChange,

    // Data Labels Properties
    showDataLabels = false,
    labelSize = 12,
    labelColor = '#666666',

    // Radar Chart Specific Properties
    shapeType = 'polygon',
    radius = '60%',
    splitNumber = 5,
    axisLineColor = '#999',
    splitLineColor = '#ccc',
    splitAreaColors = ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)'],
    areaOpacity = 0.7,
    colorScheme = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'],
    showSymbol = true,
    symbolSize = 4,
    lineWidth = 2,
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
        // Update color map when colorScheme changes
        if (data && Object.keys(data).length > 0) {
            updateColorMap(Object.keys(data));
            if (chartInstance.current) {
                initChart(data);
            }
        }
    }, [colorScheme]);

    const processData = (data) => {
        const categories = Object.keys(data);
        if (!categories.length || !data[categories[0]]) {
            return { seriesData: [], indicators: [] };
        }

        // Update color mapping
        updateColorMap(categories);

        const seriesData = categories.map((key) => ({
            name: key,
            type: 'radar',
            data: [
                {
                    value: data[key].map((item) => parseFloat(item.value)),
                    name: key,
                },
            ],
            itemStyle: {
                color: colorMapRef.current[key]
            },
            areaStyle: {
                opacity: areaOpacity,
                color: colorMapRef.current[key]
            }
        }));

        const indicators = data[categories[0]].map((item, index) => ({
            name: item.name || `Point ${index + 1}`,
            max: Math.max(...categories.flatMap((key) => data[key].map((d) => parseFloat(d.value)))),
        }));

        return { seriesData, indicators };
    };

    const initChart = (data) => {
        if (!chartInstance.current || !data) return;

        const { seriesData, indicators } = processData(data);

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
                left: titlePosition,
            },
            tooltip: {
                trigger: 'item',
            },
            legend: {
                show: showLegend,
                orient: 'horizontal',
                left: 'center',
                bottom: legendPosition === 'bottom' ? '5%' : 'auto',
                top: legendPosition === 'top' ? '5%' : 'auto',
                data: dataKeys,
                textStyle: {
                    fontSize: labelSize,
                    color: isDarkMode ? '#ffffff' : labelColor
                },
                selected: dataKeys.reduce((acc, key) => {
                    acc[key] = activeLegendsSet.has(key);
                    return acc;
                }, {})
            },
            radar: {
                indicator: indicators,
                shape: shapeType,
                radius: radius,
                splitNumber: splitNumber,
                axisLine: {
                    lineStyle: {
                        color: isDarkMode ? '#333333' : axisLineColor
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: isDarkMode ? '#333333' : splitLineColor
                    }
                },
                splitArea: {
                    areaStyle: {
                        color: isDarkMode ? ['rgba(50,50,50,0.3)', 'rgba(30,30,30,0.3)'] : splitAreaColors
                    }
                },
            },
            series: seriesData.map((series) => ({
                ...series,
                symbolSize: symbolSize,
                symbol: showSymbol ? 'circle' : 'none',
                lineStyle: {
                    width: lineWidth
                },
                label: showDataLabels ? {
                    show: true,
                    formatter: (params) => params.value,
                    fontSize: labelSize,
                    color: isDarkMode ? '#ffffff' : labelColor
                } : undefined,
                silent: !activeLegendsSet.has(series.name)
            }))
        };

        chartInstance.current.setOption(option);

        chartInstance.current.on('legendselectchanged', function (params) {
            if (onLegendChange && typeof onLegendChange === 'function') {
                const newActiveLegends = Object.keys(params.selected)
                    .filter(key => params.selected[key]);
                onLegendChange(newActiveLegends);
            }
        });
    };

    useEffect(() => {
        if (!data) {
            console.error("No data provided to RadarChart component");
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
        name, nameSize, nameColor, nameBold, nameItalic, titlePosition, showLegend,
        legendPosition, showDataLabels, labelSize, labelColor, shapeType, radius,
        splitNumber, axisLineColor, splitLineColor, splitAreaColors, areaOpacity,
        colorScheme, showSymbol, symbolSize, lineWidth, activeLegend, isDarkMode
    ]);

    return (
        <div
            ref={chartRef}
            style={{
                width: '100%',
                height: '100%',
                border: showBorder ? `${borderSize}px solid ${borderColor}` : 'none'
            }}
        />
    );
};

export default RadarChart;