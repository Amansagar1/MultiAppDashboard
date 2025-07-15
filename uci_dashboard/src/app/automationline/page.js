

"use client";
import React, { useState, useEffect } from "react";
import Section from "../../Components/Section";
import CountCard from "../../Components/Countcardsection/CountCard";

// Loading Spinner (optional)
const Loader = () => (
  <div className="flex justify-center items-center space-x-2">
    <div className="w-8 h-8 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-blue-600"></div>
    <span className="text-md text-gray-700">Loading...</span>
  </div>
);

// Hardcoded statistics data (shared by all cards for simplicity)
const hardcodedStats = [
  { label: "Auto Mode", value: 1 },
  { label: "All System OK", value: 1 },
  { label: "Count (Daily)", value: 450 },
  { label: "Robot 1 Ready", value: 1 },
  { label: "Robot 2 Ready", value: 1 },
  { label: "Robot 1 Idle Time", value: 120 },
  { label: "Robot 2 Idle Time", value: 140 },
];

const Dashboard = () => {
  const [expandedSections, setExpandedSections] = useState({
    GRA: false,
    GCS: false,
  });

  const toggleSectionDetails = (sectionTitle) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }));
  };

  // ✅ Hardcoded dashboard sections and cards
  const sectionData = [
    {
      title: "GRA",
      totalProductionQuantity: 120,
      runHour: 3600,
      downtime: 120,
      oee: 88.5,
      timeStamp: new Date().toISOString(),
      cards: [
        {
          heading: "GRA_Laser",
          status: "Auto",
          robot_system_status: { red: false, green: true },
          all_robot_system_status: { red: false, green: true },
          robotCount: 2,
          robotStatus: [1, 1],
          statistics: hardcodedStats,
        },
        {
          heading: "GRA_P1",
          status: "Manual",
          robot_system_status: { red: true, green: false },
          all_robot_system_status: { red: true, green: false },
          robotCount: 2,
          robotStatus: [0, 0],
          statistics: hardcodedStats,
        },
        {
          heading: "GRA_P2",
          status: "Auto",
          robot_system_status: { red: false, green: true },
          all_robot_system_status: { red: false, green: true },
          robotCount: 3,
          robotStatus: [1, 1, 1],
          statistics: hardcodedStats,
        },
        {
          heading: "GRA_P3",
          instanceId: "890482da-ef78-4792-bf08-bd10692d7248",
          status: "Auto",
          robot_system_status: { red: false, green: true },
          all_robot_system_status: { red: false, green: true },
          robotCount: 2,
          robotStatus: [1, 1],
          statistics: hardcodedStats,
        },
      ],
    },
    {
      title: "GCS",
      totalProductionQuantity: 90,
      runHour: 3000,
      downtime: 160,
      oee: 82.1,
      timeStamp: new Date().toISOString(),
      cards: [
        {
          heading: "GCS_Laser",
          status: "Manual",
          instanceId: "",
          robot_system_status: { red: true, green: false },
          all_robot_system_status: { red: true, green: false },
          robotCount: 2,
          robotStatus: [0, 1],
          statistics: hardcodedStats,
        },
        {
          heading: "GCS_P1",
          instanceId: "",
          status: "Auto",
          robot_system_status: { red: false, green: true },
          all_robot_system_status: { red: false, green: true },
          robotCount: 4,
          robotStatus: [1, 1, 0, 1],
          statistics: hardcodedStats,
        },
      ],
    },
  ];

  return (
    <div className="bg-gray-100 h-screen overflow-scroll space-y-2">
      <div className="w-full flex items-center justify-between gap-4 p-1">
        <CountCard />
      </div>

      {sectionData.map((section) => (
        <Section
          key={section.title}
          section={section}
          expandedSections={expandedSections}
          toggleSectionDetails={toggleSectionDetails}
          timeStamp={section.timeStamp}
        />
      ))}
    </div>
  );
};

export default Dashboard;
