"use client";

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const BarChart = ({ data, title, yAxisLabel }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chart = echarts.init(chartRef.current);

        const option = {
            // title: {
            //     text: title,
            //     left: 'center'
            // },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: data.map(item => item.time)
            },
            yAxis: {
                type: 'value',
                name: yAxisLabel
            },
            series: [{
                data: data.map(item => item.value),
                type: 'bar',
                barWidth: '60%',
                itemStyle: {
                    color: '#4F46E5'
                }
            }]
        };

        chart.setOption(option);

        return () => chart.dispose();
    }, [data]);

    return <div ref={chartRef} className="w-full h-[300px]" />;
};

export default BarChart;