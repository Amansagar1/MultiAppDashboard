"use client";
import React from "react";
import {
  CalendarIcon,
  ChartBarIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";

const StatCard = ({ title, value, bgColor = "bg-gray-100", icon, valueColor = "text-black" }) => (
  <div className={`p-4 rounded-xl shadow-sm ${bgColor} flex flex-col gap-1`}>
    <div className="flex items-center gap-2 text-sm text-gray-700">
      {icon}
      <span>{title}</span>
    </div>
    <div className={`text-2xl font-bold ${valueColor}`}>{value}</div>
  </div>
);

const InfoCard = ({ title, value, color = "text-gray-900" }) => (
  <div className="bg-gray-50 border rounded-lg p-4">
    <p className="text-xs text-gray-500">{title}</p>
    <p className={`text-lg font-semibold ${color}`}>{value}</p>
  </div>
);

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-8 font-sans">
      <h1 className="text-3xl font-bold text-gray-800">Machine Details</h1>

      {/* OEE Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 bg-white p-4 rounded-xl shadow-md">
        <StatCard
          title="OEE Day"
          value="44%"
          bgColor="bg-gray-100"
          valueColor="text-green-700"
          icon={<ChartBarIcon className="w-4 h-4 text-green-600" />}
        />
        <StatCard
          title="OEE Month"
          value="35%"
          bgColor="bg-gray-100"
          valueColor="text-blue-700"
          icon={<CalendarIcon className="w-4 h-4 text-blue-600" />}
        />
        <StatCard
          title="Availability"
          value="100%"
          bgColor="bg-gray-100"
          valueColor="text-lime-700"
          icon={<ClockIcon className="w-4 h-4 text-lime-600" />}
        />
        <StatCard
          title="Performance"
          value="44%"
          bgColor="bg-gray-100"
          valueColor="text-purple-700"
          icon={<ArrowTrendingUpIcon className="w-4 h-4 text-purple-600" />}
        />
        <StatCard
          title="Quality"
          value="100%"
          bgColor="bg-gray-100"
          valueColor="text-pink-700"
          icon={<ShieldCheckIcon className="w-4 h-4 text-pink-600" />}
        />
        <StatCard
          title="Previous Day OEE"
          value="56%"
          bgColor="bg-gray-100"
          valueColor="text-yellow-700"
          icon={<BoltIcon className="w-4 h-4 text-yellow-600" />}
        />
      </div>

      {/* Machine Parameters */}
      <section className="bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Machine Parameters</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <InfoCard title="Running Hours" value="1250 Hrs" />
          <InfoCard title="Lubricant Temp" value="45°C" color="text-green-600" />
          <InfoCard title="Gear Oil Temp" value="55°C" color="text-yellow-600" />
          <InfoCard title="Pre-Final Die Size" value="20mm" />
          <InfoCard title="Final Die Size" value="18mm" />
          <InfoCard title="Stop Error" value="E-234" color="text-red-600" />
          <InfoCard title="Annealing Program" value="Active" />
          <InfoCard title="Line Speed" value="50 m/min" />
          <InfoCard title="Length Completion" value="75%" />
          <InfoCard title="Drawing" value="Optimal" />
          <InfoCard title="Annealer" value="Optimal" />
        </div>
      </section>

      {/* Energy Monitoring */}
      <section className="bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Energy Monitoring</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <InfoCard title="Current KWH" value="25.7" color="text-blue-600" />
          <InfoCard title="Power Factor" value="0.98 (Good)" color="text-green-600" />
          <InfoCard title="Running Current" value="52A" />
          <InfoCard title="Per Phase Current (L1)" value="15A" />
          <InfoCard title="Per Phase Current (L2)" value="14A" />
          <InfoCard title="Per Phase Current (L3)" value="16A" />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
