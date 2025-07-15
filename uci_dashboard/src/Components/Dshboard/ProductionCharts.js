'use client'; 
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import annotationPlugin from "chartjs-plugin-annotation";
import zoomPlugin from "chartjs-plugin-zoom";

import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Modal from "./Modal";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
  annotationPlugin
);

// Function to get chart options
const getProductionChartOptions = (showLegend = false) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: showLegend,
      position: "top",
      labels: {
        font: { size: 12 },
        color: "#333",
        boxWidth: 12,
      },
    },
    datalabels: {
      anchor: "end",
      font: { size: 9, weight: "bold" },
      align: "end",
      formatter: (value) => `${value}`,
      color: (context) => {
        const dataset = context.dataset;
        return dataset.backgroundColor;
      },
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) =>
          `${tooltipItem.dataset.label}: ${tooltipItem.raw.toLocaleString()} Counts`,
      },
    },
    zoom: {
      pan: { enabled: true, mode: "x" },
      zoom: {
        wheel: { enabled: true },
        pinch: { enabled: true },
        mode: "x",
      },
    },
    annotation: {
      annotations: {
        referenceLine: {
          type: "line",
          yMin: 228,
          yMax: 228,
          borderColor: "orange",
          borderDash: [6, 6],
          borderWidth: 2,
          label: {
            content: "Target (240)",
            enabled: true,
            position: "end",
            color: "#000",
            font: { size: 12, weight: "bold" },
          },
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 400,
      min: 0,
      grid: { color: "#E5E7EB" },
      ticks: { stepSize: 20 },
    },
    x: {
      grid: { display: false },
      ticks: {
        autoSkip: false,
      },
    },
  },
  layout: {
    padding: {
      top: 9,
    },
  },
});

const ProductionCharts = ({
  assetNames,
  plannedChartDataMap,
  handleNavigate,
  dateWindowMap = {}, // Add this prop to track current window state
}) => {
  const [activeAsset, setActiveAsset] = useState(null);
  const [loadingAssets, setLoadingAssets] = useState(new Set());

  const handleAssetNavigate = async (asset, direction) => {
    setLoadingAssets(prev => new Set([...prev, asset]));
    try {
      await handleNavigate(asset, direction);
    } finally {
      setLoadingAssets(prev => {
        const newSet = new Set(prev);
        newSet.delete(asset);
        return newSet;
      });
    }
  };

  const isAtCurrentDate = (asset) => (dateWindowMap?.[asset] || 0) === 0;
  const isLoading = (asset) => loadingAssets.has(asset);

  const LoadingSpinner = ({ size = "text-xl" }) => (
    <AiOutlineLoading3Quarters className={`animate-spin ${size}`} />
  );

  const NavigationButtons = ({ asset, size = "text-xl", showInModal = false }) => (
    <div 
      className={`flex gap-1 ${showInModal ? 'text-xs mb-2' : 'text-xs'}`} 
      onClick={(e) => e.stopPropagation()}
    >
     <button
         onClick={() => handleAssetNavigate(asset, 1)}
         className="text-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
         disabled={isLoading(asset)}
         title="Previous 7 days"
         style={{ minWidth: '24px', minHeight: '24px' }}
       >
         <IoMdArrowDropleft className={size} />
       </button>
     
       <button
         onClick={() => handleAssetNavigate(asset, -1)}
         className={`text-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center ${
           isAtCurrentDate(asset) ? "opacity-30 cursor-not-allowed" : ""
         }`}
         disabled={isAtCurrentDate(asset) || isLoading(asset)}
         title="Next 7 days"
         style={{ minWidth: '24px', minHeight: '24px' }}
       >
         <IoMdArrowDropright className={size} />
       </button>
    </div>
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {assetNames.map((asset) => (
          <div key={asset}>
            <div 
              className="bg-white p-2 rounded shadow lg:h-[265px] md:h-[310px] sm:h-[310px] cursor-pointer relative"
              onClick={() => setActiveAsset(asset)}
            >
              {/* Loading overlay for entire card */}
              {isLoading(asset) && (
                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded">
                  <div className="flex flex-col items-center gap-2">
                    <LoadingSpinner size="text-2xl" />
                    <span className="text-sm text-gray-600">Loading...</span>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <h3 className="font-bold text-gray-700 text-sm flex items-center gap-2">
                    {asset} - Production
                  </h3>
                  {/* Custom Inline Legend */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {plannedChartDataMap[asset]?.datasets?.map((dataset, idx) => (
                      <span
                        key={idx}
                        className="flex items-center gap-1 text-gray-600"
                      >
                        <span
                          className="w-3 h-3 inline-block rounded-sm"
                          style={{ backgroundColor: dataset.backgroundColor }}
                        />
                        {dataset.label}
                      </span>
                    ))}
                  </div>
                </div>

                <NavigationButtons asset={asset} />
              </div>

              <div className="h-[130px] mb-2 pl-2 pr-2 pt-1">
                {plannedChartDataMap[asset] && !isLoading(asset) ? (
                  <Bar
                    data={plannedChartDataMap[asset]}
                    options={getProductionChartOptions(false)}
                  />
                ) : (
                  <Skeleton height={120} />
                )}
              </div>

              {/* Table below the chart */}
              <div className="w-full overflow-x-auto">
                <table className="min-w-full text-[10px] sm:text-xs md:text-[10px] text-left border-t border-gray-300">
                  <thead className="bg-gray-100 border">
                    <tr>
                      <th className="px-1 py-1 border border-gray-400 whitespace-nowrap text-[10px]">
                        Shift
                      </th>
                      {plannedChartDataMap[asset]?.labels?.map((label, idx) => (
                        <th
                          key={idx}
                          className="px-2 py-1 text-center border border-gray-400 whitespace-nowrap text-[10px]"
                        >
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading(asset) ? (
                      <tr>
                        <td colSpan="100%" className="px-2 py-4 text-center">
                          <Skeleton count={2} height={20} />
                        </td>
                      </tr>
                    ) : (
                      plannedChartDataMap[asset]?.datasets?.map((dataset, dsIdx) => (
                        <tr
                          key={dsIdx}
                          style={{
                            backgroundColor: dataset.backgroundColor,
                            color: "#fff",
                          }}
                        >
                          <td className="px-1 py-1 border border-gray-400 font-semibold whitespace-nowrap text-[10px]">
                            {dataset.label?.trim() === "Shift 1"
                              ? "1"
                              : dataset.label?.trim() === "Shift 2"
                              ? "2"
                              : dataset.label}
                          </td>
                          {dataset.data.map((val, idx) => (
                            <td
                              key={idx}
                              className="px-1 py-1 text-center border border-gray-400 break-words whitespace-nowrap text-[10px]"
                            >
                              {val.toFixed(2)}
                            </td>
                          ))}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeAsset && (
        <Modal onClose={() => setActiveAsset(null)}>
          {plannedChartDataMap[activeAsset] ? (
            <div className="w-full h-[80vh] p-4  relative">
              {/* Loading overlay for modal */}
              {isLoading(activeAsset) && (
                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                  <div className="flex flex-col items-center gap-2">
                    <LoadingSpinner size="text-3xl" />
                    <span className="text-lg text-gray-600">Loading data...</span>
                  </div>
                </div>
              )}

              <div className="w-full items-center flex justify-between">
                <h3 className="font-bold mb-2 text-lg">{activeAsset} - Production</h3>
                <NavigationButtons asset={activeAsset} size="text-2xl" showInModal={true} />
              </div>

              {/* Chart */}
              <div className="h-[350px] mb-4">
                {!isLoading(activeAsset) ? (
                  <Bar
                    data={plannedChartDataMap[activeAsset]}
                    options={getProductionChartOptions(true)} // Legend shown
                  />
                ) : (
                  <Skeleton height={350} />
                )}
              </div>

              {/* Table */}
              <div className="overflow-x-auto mt-2">
                <table className="min-w-full text-sm text-left border-t border-gray-300">
                  <thead className="bg-gray-300 border">
                    <tr className="border">
                      <th className="px-2 py-1 border border-black">Shift</th>
                      {plannedChartDataMap[activeAsset]?.labels?.map((label, idx) => (
                        <th
                          key={idx}
                          className="px-2 py-1 text-center border border-black"
                        >
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading(activeAsset) ? (
                      <tr>
                        <td colSpan="100%" className="px-4 py-6 text-center">
                          <Skeleton count={3} height={30} />
                        </td>
                      </tr>
                    ) : (
                      plannedChartDataMap[activeAsset]?.datasets?.map((dataset, dsIdx) => (
                        <tr
                          key={dsIdx}
                          style={{
                            backgroundColor: dataset.backgroundColor,
                            color: "#fff",
                          }}
                        >
                          <td className="px-1 py-1 border border-black font-semibold">
                            {dataset.label}
                          </td>
                          {dataset.data.map((val, idx) => (
                            <td
                              key={idx}
                              className="px-1 py-1 text-center border border-black"
                            >
                              {val.toFixed(2)}
                            </td>
                          ))}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <h3 className="font-bold mb-4 text-lg">
                Loading data for {activeAsset}...
              </h3>
              <Skeleton height={40} width={200} />
              <Skeleton height={400} />
              <Skeleton count={5} />
            </div>
          )}
        </Modal>
      )}
    </>
  );
};

export default ProductionCharts;