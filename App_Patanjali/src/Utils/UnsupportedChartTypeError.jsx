import React from 'react';

// Error Component for Unsupported Chart Types
const UnsupportedChartTypeError = () => (
    <div className="w-full h-full flex items-center justify-center bg-red-100 text-red-600 p-4">
        <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Unsupported Chart Type</h2>
            <p>The chart type is not supported or recognized.</p>
        </div>
    </div>
);

export default UnsupportedChartTypeError