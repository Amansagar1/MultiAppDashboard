"use client";

import React from 'react';

const TimeRangeSelector = ({ activeRange, onRangeChange }) => {
    const ranges = [
        { label: '24hrs', value: '24h' },
        { label: '3 Days', value: '3d' },
        { label: '7 Days', value: '7d' },
    ];

    return (
        <div className="flex space-x-2 mb-4">
            {ranges.map((range) => (
                <button
                    key={range.value}
                    onClick={() => onRangeChange(range.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${activeRange === range.value
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                >
                    {range.label}
                </button>
            ))}
        </div>
    );
};

export default TimeRangeSelector;