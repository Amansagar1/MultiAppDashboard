import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/Components/Context/ThemeContext';
import * as echarts from 'echarts';

const DoughnutChart = ({
    data,
    backgroundColor = '#ffffff',
    name,
    nameSize = 24,
    nameColor = '#333333',
    nameBold = false,
    nameItalic = false,
    titlePosition = 'center',
    labelSize = 12,
    labelColor = '#ffffff',
    showBorder = false,
    borderSize = 1,
    borderColor = '#e0e0e0',
    showAnimation = false,
    padAngle = 0,
    cornerRadius = 4,
    sortData = true,
    showLegend = true,
    legendPosition = 'right',
    showDataLabels = true,
    dataLabelPosition = 'inside',
    colorScheme = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
    innerRadius = '50%',
    outerRadius = '70%',
    activeLegend = [],
    onLegendChange
}) => {
    const { isDarkMode } = useTheme();
    const chartRef = useRef(null);
    const resizeObserverRef = useRef(null);
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

    useEffect(() => {
        if (!data) {
            console.error("No data provided to DoughnutChart component");
            return;
        }

        const processedData = Object.entries(data).map(([variable, dataPoints]) => ({
            name: variable,
            value: dataPoints[dataPoints.length - 1].value,
        }));

        // Update color mapping before initializing the chart
        updateColorMap(processedData.map(item => item.name));

        const chart = echarts.init(chartRef.current);
        const activeLegendsSet = new Set(activeLegend.length > 0 ? activeLegend : processedData.map(item => item.name));

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
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                show: showLegend,
                orient: legendPosition === 'right' ? 'vertical' : 'horizontal',
                left: legendPosition === 'top' ? 'right' : 'top',
                top: legendPosition === 'top' ? 'top' : 'bottom',
                textStyle: {
                    fontSize: labelSize,
                    color: isDarkMode ? '#ffffff' : labelColor
                },
                selected: processedData.reduce((acc, item) => {
                    acc[item.name] = activeLegendsSet.has(item.name);
                    return acc;
                }, {})
            },
            series: [
                {
                    name: name,
                    type: 'pie',
                    radius: [innerRadius, outerRadius],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: cornerRadius,
                        borderColor: showBorder ? borderColor : 'transparent',
                        borderWidth: borderSize
                    },
                    label: {
                        show: showDataLabels,
                        position: dataLabelPosition,
                        color: labelColor,
                        fontSize: labelSize
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: labelSize + 2,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: showDataLabels && dataLabelPosition === 'outside'
                    },
                    padAngle: padAngle,
                    data: processedData.map(item => ({
                        ...item,
                        itemStyle: {
                            color: colorMapRef.current[item.name]
                        }
                    }))
                }
            ],
            animation: showAnimation
        };

        chart.setOption(option);

        // Set up legend change event handler
        chart.on('legendselectchanged', function (params) {
            if (onLegendChange && typeof onLegendChange === 'function') {
                const newActiveLegends = Object.keys(params.selected).filter(key => params.selected[key]);
                onLegendChange(newActiveLegends);
            }
        });

        // Resize chart when container size changes
        resizeObserverRef.current = new ResizeObserver(() => {
            chart.resize();
        });
        resizeObserverRef.current.observe(chartRef.current);

        return () => {
            chart.dispose();
            resizeObserverRef.current.disconnect();
        };
    }, [
        data, backgroundColor, name, nameSize, nameColor, nameBold, nameItalic, labelSize, labelColor,
        showBorder, borderSize, borderColor, showAnimation, padAngle, cornerRadius, sortData,
        showLegend, legendPosition, showDataLabels, dataLabelPosition, colorScheme, innerRadius, outerRadius, activeLegend, isDarkMode, onLegendChange, titlePosition
    ]);

    return <div ref={chartRef} style={{ width: '100%', height: '100%', position: 'relative', border: showBorder ? `${borderSize}px solid ${borderColor}` : 'none', }} />;
};

export default DoughnutChart;