
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  ChartBarIcon,
  CalendarIcon,
  ClockIcon,
  BoltIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

// Icon map for OEE stats
const iconMap = {
  "OEE Day": ChartBarIcon,
  "OEE Month": CalendarIcon,
  Availability: ClockIcon,
  Performance: ArrowTrendingUpIcon,
  Quality: ShieldCheckIcon,
  "Previous Day OEE": BoltIcon,
};

// ✅ StatCell Component (Inline format with icon, heading, and value)
const StatCell = ({ title, value, unit, color = "text-gray-800", icon = true }) => {
  const Icon = iconMap[title];
  return (
    <div className="flex items-center gap-1 px-3 py-2 text-sm whitespace-nowrap min-w-[130px]">
      {icon && Icon && <Icon className="w-4 h-4 text-blue-500" />}
      <span className="text-gray-600 font-medium">{title}</span>
      {value && (
        <span className={`font-semibold ${color}`}>
          {value}
          {unit && <span className="text-xs text-gray-500 ml-0.5">{unit}</span>}
        </span>
      )}
    </div>
  );
};

// ✅ MachineRow Component
const MachineRow = ({ machine }) => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push(`/machindetails`);
  };

  return (
    <>
      <div className="flex items-center bg-white border-b hover:bg-gray-50 px-2">
        {/* Machine Name */}
        <div className="w-52 p-2 shrink-0">
          <button
            onClick={handleRedirect}
            className="text-left font-medium text-gray-800 hover:text-blue-600 focus:outline-none"
          >
            {machine}
          </button>
        </div>

        {/* Inline Stats */}
        <div className="flex flex-wrap items-center justify-between  flex-grow">
          <StatCell value="44%" color="text-green-700" />
          <StatCell value="35%" color="text-blue-700" />
          <StatCell  value="100%" color="text-green-600" />
          <StatCell  value="44%" color="text-amber-600" />
          <StatCell value="100%" color="text-teal-600" />
          <StatCell  value="56%" color="text-gray-700" />
        </div>


       
      </div>

      {/* You can insert expandable content here if needed */}
    </>
  );
};

// ✅ Dashboard Component
const Dashboard = () => {
  const machines = [
    "RBD", "MWD-1", "MWD-2", "MWD-3", "MWD-4", "MWD-50",
    "MM30-1", "MM30-2", "M5-1", "M5-2", "M5-3", "M5-4", "Schmidt",
    "EXT-1", "EXT-2", "EXT-3", "EXT-4", "Tinning-1", "Tinning-2", "Tinning-3",
    "Bus-Bar Tinning", "42 Bobbin Armouring", "30 Bobbin Armouring",
    "24 Bobbin Armouring", "SKIP", "Drum Twister", "Buncher(1-16)",
    "Buncher 400-1", "Buncher 400-2"
  ];

  return (
    <div className="p-4 bg-gray-100 min-h-screen w-full">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Table Header */}
        <div className="flex items-center bg-gray-100 border-b font-semibold text-gray-700 text-sm px-2">
          <div className="w-52   p-2">Machine</div>
          <div className="flex flex-wrap justify-between flex-grow items-center">
            <StatCell title="OEE Day" value="" icon={true} />
            <StatCell title="OEE Month" value="" icon={true} />
            <StatCell title="Availability" value="" icon={true} />
            <StatCell title="Performance" value="" icon={true} />
            <StatCell title="Quality" value="" icon={true} />
            <StatCell title="Previous Day OEE" value="" icon={true} />
          </div>
          <div className="p-2 w-6"></div>
        </div>

        {/* Machine Rows */}
        <div className="divide-y">
          {machines.map((machine, idx) => (
            <MachineRow key={idx} machine={machine} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
