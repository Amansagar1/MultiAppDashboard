'use client';
import React, { useState } from 'react';
import PlantDashboard from '@/Components/DashboardComponent/PlantDashboard';

const PlantDashboardPage = ({ params }) => {

    return (
        <div style={{ zIndex: 1000 }} className=" w-full min-h-screen bg-gray-50">
            <PlantDashboard params={params} />
        </div>
    );
};

export default PlantDashboardPage;