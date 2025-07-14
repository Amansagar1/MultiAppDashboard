"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChartBarIcon,
  CalendarIcon,
  ClockIcon,
  BoltIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import LayoutWrapper from './layout-wrapper';
// Icon map for OEE stats
const iconMap = {
  "OEE Day": ChartBarIcon,
  "OEE Month": CalendarIcon,
  Availability: ClockIcon,
  Performance: ArrowTrendingUpIcon,
  Quality: ShieldCheckIcon,
  "Previous Day OEE": BoltIcon,
};

// Reusable StatCard
const StatCard = ({ title, value, unit, color = "text-gray-800" }) => {
  const Icon = iconMap[title];
  return (
   
    <div className="p-3 rounded-md bg-white border border-gray-200 shadow-sm transition hover:shadow-md">
      <div className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wide ">
        {Icon && (
          <div className="p-1 bg-gray-100 rounded-md">
            <Icon className="w-4 h-4 text-blue-500" />
          </div>
        )}
        <span>{title}</span>
      </div>
      <p className={`text-lg font-bold ${color}`}>
        {value}
        {unit && <span className="text-sm text-gray-500 ml-1">{unit}</span>}
      </p>
    </div>
  );
};

// Expandable machine OEE card
const MachineOEECard = ({ machine }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleRedirect = () => {
    // router.push(`/machine/${machine.toLowerCase()}`);
        router.push(`/machinedetails`);
  };

  return (
    <div className="bg-white border rounded-xl shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-2 py-2 border-b">
        <button
          onClick={handleRedirect}
          className="text-left text-lg font-semibold text-gray-800 hover:text-blue-600 focus:outline-none"
        >
          {machine}
        </button>
        <button onClick={() => setOpen(!open)} className="text-gray-500 hover:text-gray-700">
          {open ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
        </button>
      </div>

      {/* OEE Summary */}
      <div className="p-2">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          <StatCard title="OEE Day" value="44%" color="text-green-700" />
          <StatCard title="OEE Month" value="35%" color="text-blue-700" />
          <StatCard title="Availability" value="100%" color="text-green-600" />
          <StatCard title="Performance" value="44%" color="text-amber-600" />
          <StatCard title="Quality" value="100%" color="text-teal-600" />
          <StatCard title="Previous Day OEE" value="56%" color="text-gray-700" />
        </div>
      </div>

      {/* Expandable Parameters Section */}
      {open && (
        <div className="px-2 pb-2">
          <h4 className="text-md font-medium text-gray-700 mb-2">Machine Parameters</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            <StatCard title="Running Hours" value="1250" unit="Hrs" />
            <StatCard title="Lubricant Temp" value="45" unit="°C" color="text-blue-600" />
            <StatCard title="Gear Oil Temp" value="55" unit="°C" color="text-blue-600" />
            <StatCard title="Pre-Final Die Size" value="20" unit="mm" />
            <StatCard title="Final Die Size" value="18" unit="mm" />
            <StatCard title="Stop Error" value="E‑234" color="text-red-500" />
            <StatCard title="Annealing Program" value="Active" />
            <StatCard title="Line Speed" value="50" unit="m/min" />
            <StatCard title="Length Completion" value="75%" />
            <StatCard title="Drawing" value="Optimal" />
            <StatCard title="Annealer" value="Optimal" />
          </div>
        </div>
      )}
    </div>
  );
};

// List of machines
const machines = [
  "RBD", "MWD-1", "MWD-2",
   "MWD-3", "MWD-4", "MWD-50",
  "MM30-1", "MM30-2", "M5-1", "M5-2", "M5-3", "M5-4", "Schmidt",
  "EXT-1", "EXT-2", "EXT-3", "EXT-4", "Tinning-1", "Tinning-2", "Tinning-3",
  "Bus-Bar Tinning", "42 Bobbin Armouring", "30 Bobbin Armouring",
  "24 Bobbin Armouring", "SKIP", "Drum Twister", "Buncher(1-16)",
  "Buncher 400-1", "Buncher 400-2"
];

const Dashboard = () => {
  return (
      <LayoutWrapper>
    <div className="p-2 bg-gray-100 min-h-screen space-y-2">

      <div className="space-y-2">
        {machines.map((machine, idx) => (
          <MachineOEECard key={idx} machine={machine} />
        ))}
      </div>
    </div>
    </LayoutWrapper>
  );
};

export default Dashboard;