

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const CandleStickChart = ({ data }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    const processData = (data) => {
        const categories = Object.keys(data);
        if (!categories.length || !data[categories[0]]) {
            return { seriesData: [], xAxisData: [] };
        }

        const seriesData = categories.map((key) => ({
            name: key,
            type: 'candlestick',
            data: data[key].map((item) => [
                item.timestamp, // Date
                item.open,     // Open
                item.close,    // Close
                item.low,      // Low
                item.high,     // High
            ]),
        }));

        const xAxisData = data[categories[0]].map((item) => {
            const date = new Date(item.timestamp);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            });
        });

        return { seriesData, xAxisData };
    };

    const initChart = (data) => {
        const { seriesData, xAxisData } = processData(data);

        const option = {
            title: {
                text: 'Candlestick Chart',
                left: 'center',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                },
                formatter: (params) => {
                    if (params.length === 0) return '';
                    const param = params[0];
                    const { name, data } = param;
                    return `
                        Date: ${name}<br/>
                        Open: ${data[1]}<br/>
                        Close: ${data[2]}<br/>
                        Low: ${data[3]}<br/>
                        High: ${data[4]}
                    `;
                },
            },
            legend: {
                data: Object.keys(data),
                top: 'top',
                left: 'center',
            },
            grid: {
                left: '10%',
                right: '10%',
                bottom: '15%',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                data: xAxisData,
                axisLabel: {
                    formatter: (value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                        }).replace(' AM', '').replace(' PM', ''); // Remove AM/PM
                    },
                },
                splitLine: {
                    show: false,
                },
            },
            yAxis: {
                type: 'value',
                scale: true,
            },
            series: seriesData,
            responsive: true,
        };

        chartInstance.current.setOption(option);
    };

    useEffect(() => {
        if (!data) {
            console.error("No data provided to PieChart component");
            return; // Exit early if there's no data
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
    }, [data]);

    return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default CandleStickChart;
