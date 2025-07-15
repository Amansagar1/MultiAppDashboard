import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ChartDataLabels from "chartjs-plugin-datalabels";
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
  annotationPlugin,
  ChartDataLabels,
  zoomPlugin
);

const baseBarChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    datalabels: {
      anchor: "end",
      align: "end",
      font: { size: 10, weight: "bold" },
      formatter: (value) => value.toFixed(1),
      color: (context) => context.dataset.backgroundColor,
      padding: { top: 5 },
      clip: true,
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) =>
          `${tooltipItem.dataset.label}: ${tooltipItem.raw.toFixed(2)} hrs`,
      },
    },
    annotation: {
      annotations: {
        referenceLine: {
          type: "line",
          yMin: 9.5,
          yMax: 9.5,
          borderDash: [6, 6],
          borderColor: "orange",
          borderWidth: 2,
          label: {
            display: true,
            position: "end",
          },
        },
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
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 14,
      min: 0,
      grid: { color: "#E5E7EB" },
      ticks: { stepSize: 2 },
    },
    x: {
      grid: { display: false },
      ticks: { autoSkip: false },
    },
  },
  layout: {
    padding: {
      top: 9,
    },
  },
};

const barChartOptionsCard = {
  ...baseBarChartOptions,
  plugins: {
    ...baseBarChartOptions.plugins,
    legend: { display: false },
  },
};

const barChartOptionsModal = {
  ...baseBarChartOptions,
  plugins: {
    ...baseBarChartOptions.plugins,
    legend: {
      display: true,
      position: "top",
      labels: {
        font: { size: 12 },
        color: "#333",
        boxWidth: 12,
      },
    },
  },
};

const RuntimeCharts = ({ assetNames, chartDataMap, handleNavigate, dateWindowMap }) => {
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
    className="text-green-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
    disabled={isLoading(asset)}
    title="Previous 7 days"
    style={{ minWidth: '24px', minHeight: '24px' }}
  >
    <IoMdArrowDropleft className={size} />
  </button>

  <button
    onClick={() => handleAssetNavigate(asset, -1)}
    className={`text-green-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center ${
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

              <div className="flex justify-between items-center mb-1">
                <div className="flex gap-4 items-center">
                  <h3 className="font-bold text-gray-700 text-sm flex items-center gap-2">
                    {asset} - Runtime (Hrs)
                  </h3>
                  <div className="flex  items-center gap-2 text-xs">
                    {chartDataMap[asset]?.datasets?.map((dataset, idx) => (
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

              <div className="h-[130px]  mb-2 pl-2 pr-2">
                {chartDataMap[asset] && !isLoading(asset) ? (
                  <Bar data={chartDataMap[asset]} options={barChartOptionsCard} />
                ) : (
                  <Skeleton height={120} />
                )}
              </div>

              <div className="w-full overflow-x-auto">
                <table className="min-w-full text-[10px] sm:text-xs md:text-xs text-left border-t border-gray-300">
                  <thead className="bg-gray-100 border">
                    <tr>
                      <th className="px-1 py-1 border text-[10px] border-gray-400 whitespace-nowrap">
                        Shift
                      </th>
                      {chartDataMap[asset]?.labels?.map((label, idx) => (
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
                      chartDataMap[asset]?.datasets?.map((dataset, dsIdx) => (
                        <tr
                          key={dsIdx}
                          style={{
                            backgroundColor: dataset.backgroundColor,
                            color: "#fff",
                          }}
                        >
                          <td className="px-1 py-1 border border-gray-400 font-semibold whitespace-nowrap text-[10px]">
                            {dataset.label === "Shift 1"
                              ? "1"
                              : dataset.label === "Shift 2"
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
          {chartDataMap[activeAsset] ? (
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

              <div className="flex w-full items-center justify-between">
                <h3 className="font-bold mb-2 text-lg">
                  {activeAsset} - Runtime (Hrs)
                </h3>
                <NavigationButtons asset={activeAsset} size="text-2xl" showInModal={true} />
              </div>

              <div className="h-[400px] mb-4">
                {!isLoading(activeAsset) ? (
                  <Bar
                    data={chartDataMap[activeAsset]}
                    options={barChartOptionsModal}
                  />
                ) : (
                  <Skeleton height={400} />
                )}
              </div>

              <div className="mt-2">
                <table className="min-w-full text-sm text-left border-t border-gray-300">
                  <thead className="bg-gray-300 border">
                    <tr>
                      <th className="px-2 py-1 border border-black">Shift</th>
                      {chartDataMap[activeAsset]?.labels?.map((label, idx) => (
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
                      chartDataMap[activeAsset]?.datasets?.map(
                        (dataset, dsIdx) => (
                          <tr
                            key={dsIdx}
                            style={{
                              backgroundColor: dataset.backgroundColor,
                              color: "#fff",
                            }}
                          >
                            <td className="px-2 py-1 border border-black font-semibold">
                              {dataset.label}
                            </td>
                            {dataset.data.map((val, idx) => (
                              <td
                                key={idx}
                                className="px-2 py-1 text-center border border-black"
                              >
                                {val.toFixed(2)}
                              </td>
                            ))}
                          </tr>
                        )
                      )
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

export default RuntimeCharts;