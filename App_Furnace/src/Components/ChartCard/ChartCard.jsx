"use client";

import React from 'react';
import TimeRangeSelector from './TimeRange';

const ChartCard = ({ title, children, timeRange, onTimeRangeChange, loading }) => {
    const LoadingSpinner = () => (
        <div className="flex justify-center items-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );
    return (
        <div className="bg-white p-4 ">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{title}</h3>
                <TimeRangeSelector
                    activeRange={timeRange}
                    onRangeChange={onTimeRangeChange}
                />
            </div>
            {loading ? <LoadingSpinner /> : children}
            {/* {children} */}
        </div>
    );
};

export default ChartCard;