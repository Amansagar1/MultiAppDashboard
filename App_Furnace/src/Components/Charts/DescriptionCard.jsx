"use client";

import React from 'react';

const DashboardInfoCard = ({ title, value, icon: Icon, trend, color }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center border">
            <div>
                <h3 className="text-gray-500 text-sm">{title}</h3>
                <p className="text-2xl font-semibold mt-1">{value}</p>
                <div className={`flex items-center mt-2 ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    <span>{Math.abs(trend)}%</span>
                    <span className="ml-1">vs last month</span>
                </div>
            </div>
            <div className={`p-4 rounded-full ${color}`}>
                <Icon className="h-6 w-6 text-white" />
            </div>
        </div>
    );
};

export default DashboardInfoCard;