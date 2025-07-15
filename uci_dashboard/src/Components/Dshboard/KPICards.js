'use client'; 
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// KPI key mapping (remains unchanged)
const kpiKeys = {
  "OEE Month": {
    main: "monthly_OEE",
    gra: "grA_Monthly_OEE",
    gcs: "gcS_Monthly_OEE",
    spc: "spc_Monthly_OEE",
  },
  "OEE Day": {
    main: "oee",
    gra: "grA_OEE",
    gcs: "gcS_OEE",
    spc: "spc_OEE",
  },
  "Previous Day OEE": {
    main: "previous_OEE",
    gra: "grA_prev_OEE",
    gcs: "gcS_prev_OEE",
    spc: "spc_prev_OEE",
  },
  "Availability": {
    main: "availability",
    gra: "grA_Avaialbility",
    gcs: "gcS_Avaialbility",
    spc: "spc_Avaialbility",
  },
  "Quality": {
    main: "quality",
    gra: "grA_Quality",
    gcs: "gcS_Quality",
    spc: "spc_Quality",
  },
  "Performance": {
    main: "performance",
    gra: "grA_Performance",
    gcs: "gcS_Performance",
    spc: "spc_Performance",
  },
};

// ✅ Hardcoded KPI overview data
const mockOverviewData = {
  monthly_OEE: 88,
  grA_Monthly_OEE: 85,
  gcS_Monthly_OEE: 82,
  spc_Monthly_OEE: 91,

  oee: 82,
  grA_OEE: 80,
  gcS_OEE: 76,
  spc_OEE: 90,

  previous_OEE: 79,
  grA_prev_OEE: 78,
  gcS_prev_OEE: 74,
  spc_prev_OEE: 85,

  availability: 93,
  grA_Avaialbility: 92,
  gcS_Avaialbility: 89,
  spc_Avaialbility: 96,

  quality: 97,
  grA_Quality: 95,
  gcS_Quality: 92,
  spc_Quality: 99,

  performance: 89,
  grA_Performance: 88,
  gcS_Performance: 83,
  spc_Performance: 92,
};

const KPICards = ({ isLoading }) => {
  const overviewData = mockOverviewData; // 👈 use mock data here

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4 my-2">
      {Object.keys(kpiKeys).map((label, index) => {
        const mainValue = overviewData[kpiKeys[label]?.main];
        const isPercentage = label !== "Downtime";
        const displayValue =
          mainValue !== undefined && mainValue !== null
            ? isPercentage
              ? `${Math.round(mainValue)} %`
              : `${mainValue}`
            : "N/A";

        return (
          <div
            key={index}
            className="group relative p-2 flex flex-col items-center justify-center rounded-lg shadow bg-white border-l-4 border-[#00DD6E] h-18 cursor-help w-full"
          >
            {/* Tooltip */}
            <div className="absolute bottom-0 left-28 -translate-x-1/2 text-white bg-black bg-opacity-80 p-3 gap-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition duration-300 text-xs z-50 pointer-events-none">
              <strong className="block">{label}</strong>
              <hr className="my-1 border-gray-400" />
              <div className="flex gap-4">
                <p>
                  <span className="font-semibold">GRA:</span>{" "}
                  {overviewData[kpiKeys[label]?.gra] ?? "N/A"}
                </p>
                <p>
                  <span className="font-semibold">GCS:</span>{" "}
                  {overviewData[kpiKeys[label]?.gcs] ?? "N/A"}
                </p>
                <p>
                  <span className="font-semibold">SPC:</span>{" "}
                  {overviewData[kpiKeys[label]?.spc] ?? "N/A"}
                </p>
              </div>
            </div>

            {/* Label and Value */}
            <h2 className="text-gray-500 text-[14px]">
              {isLoading ? <Skeleton width={100} /> : label}
            </h2>
            <div className="text-[24px] font-bold text-gray-800">
              {isLoading ? <Skeleton width={60} height={36} /> : displayValue}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KPICards;
