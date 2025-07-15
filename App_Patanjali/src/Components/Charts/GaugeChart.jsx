import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { useTheme } from '@/Components/Context/ThemeContext';

const GaugeChart = ({
    data,
    chartId,
    onLegendChange,
    activeLegend = '',
    // General Properties
    backgroundColor = '#ffffff',
    showAnimation = false,
    showBorder = false,
    borderSize = 1,
    borderColor = '#e0e0e0',
    colorScheme = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],

    // Title Properties
    name = 'Gauge Chart',
    nameSize = 16,
    nameColor = '#333333',
    nameBold = false,
    nameItalic = false,
    titlePosition = 'center',

    // Legends Properties
    showLegend = true,
    legendPosition = 'bottom',

    // Data Labels Properties
    showDataLabels = true,
    labelSize = 48,
    labelColor = '#0000ff',
    dataLabelPosition = 'center',

    // Specific Gauge Chart Properties
    gaugeMin = 0,
    gaugeMax = 100,
    gaugeStartAngle = 180,
    gaugeEndAngle = 0,
    showGaugeAxis = true,
    showGaugeSplitLine = true,
    showGaugePointer = true,
    gaugePointerColor = '#000000',
    gaugePointerWidth = 2,
    gaugeAxisLineColor = '#E6EBF8',
    gaugeSplitLineColor = '#E6EBF8',
    gaugeProgressColor = '#3B82F6',
    valuePrefix = '',
    valueSuffix = '',
    decimalPlaces = 2,
}) => {
    const { isDarkMode } = useTheme();
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const colorMapRef = useRef({});

    const updateColorMap = (dataKeys) => {
        const allKeys = new Set([...dataKeys]);
        const orderedKeys = activeLegend ?
            [...new Set([activeLegend, ...dataKeys])] :
            [...allKeys];

        const newColorMap = {};
        orderedKeys.forEach((key, index) => {
            newColorMap[key] = colorScheme[index] || colorScheme[index % colorScheme.length];
        });

        colorMapRef.current = newColorMap;
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
        if (data && Object.keys(data).length > 0) {
            updateColorMap(Object.keys(data));
            if (chartInstance.current) {
                updateChart(data);
            }
        }
    }, [colorScheme, data, activeLegend]);

    const updateChart = (data) => {
        if (!data || !chartInstance.current) return;

        const variables = Object.keys(data);
        const selectedVariable = activeLegend || variables[0];
        const selectedData = data[selectedVariable];
        const latestValue = selectedData ? selectedData[selectedData.length - 1].value : 0;

        // Get color for the selected variable from colorMap
        const selectedColor = colorMapRef.current[selectedVariable] || gaugeProgressColor;

        const series = [{
            name: selectedVariable,
            type: 'gauge',
            radius: '100%',
            startAngle: gaugeStartAngle,
            endAngle: gaugeEndAngle,
            min: gaugeMin,
            max: gaugeMax,
            splitNumber: 10,
            axisLine: {
                show: showGaugeAxis,
                lineStyle: {
                    color: [[1, gaugeAxisLineColor]]
                }
            },
            axisTick: { show: showGaugeAxis },
            axisLabel: { show: showGaugeAxis },
            splitLine: {
                show: showGaugeSplitLine,
                lineStyle: {
                    color: gaugeSplitLineColor
                }
            },
            pointer: {
                show: showGaugePointer,
                itemStyle: {
                    color: gaugePointerColor
                },
                width: gaugePointerWidth
            },
            progress: {
                show: true,
                itemStyle: {
                    color: selectedColor // Use the selected color from colorMap
                }
            },
            detail: {
                valueAnimation: showAnimation,
                width: '60%',
                lineHeight: 40,
                borderRadius: 8,
                offsetCenter: [0, '35%'],
                fontSize: labelSize,
                fontWeight: 'bolder',
                formatter: function (value) {
                    return [
                        `{value|${valuePrefix}${value.toFixed(decimalPlaces)}${valueSuffix}}`,
                        `{name|${selectedVariable}}`,
                    ].join('\n');
                },
                rich: {
                    name: {
                        fontSize: labelSize,
                        color: isDarkMode ? '#ffffff' : labelColor,
                        padding: [0, 0, 20, 0]
                    },
                    value: {
                        fontSize: labelSize,
                        fontWeight: 'bold',
                        color: isDarkMode ? '#ffffff' : labelColor,
                        padding: [20, 0, 0, 0]
                    }
                },
                offsetCenter: [0, dataLabelPosition === 'center' ? '0%' : '30%']
            },
            data: [{
                value: latestValue,
                itemStyle: {
                    color: selectedColor // Use the selected color for the gauge value
                }
            }],
        }];

        const option = {
            backgroundColor: isDarkMode ? '#000000' : backgroundColor,
            title: {
                text: name,
                textStyle: {
                    fontSize: nameSize,
                    color: isDarkMode ? '#ffffff' : nameColor,
                    fontWeight: nameBold ? 'bold' : 'normal',
                    fontStyle: nameItalic ? 'italic' : 'normal'
                },
                left: titlePosition,
            },
            legend: {
                show: showLegend,
                data: variables,
                top: legendPosition === 'top' ? 'top' : 'bottom',
                left: legendPosition === 'left' ? 'left' : 'center',
                textStyle: {
                    fontSize: nameSize,
                    color: isDarkMode ? '#ffffff' : nameColor
                },
                selected: variables.reduce((acc, variable) => {
                    acc[variable] = variable === selectedVariable;
                    return acc;
                }, {}),
            },
            series: series
        };

        chartInstance.current.setOption(option);

        chartInstance.current.on('legendselectchanged', function (params) {
            const newSelectedVariable = params.name;
            if (onLegendChange && typeof onLegendChange === 'function') {
                onLegendChange(newSelectedVariable);
            }
        });
    };

    return (
        <div
            id={chartId}
            ref={chartRef}
            style={{
                width: '100%',
                height: '100%',
                border: showBorder ? `${borderSize}px solid ${borderColor}` : 'none',
            }}
        />
    );
};

export default GaugeChart;