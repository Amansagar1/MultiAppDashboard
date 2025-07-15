import React from "react";
import { Bar } from "react-chartjs-2";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { barChartOptions, getProductionChartOptions } from "./chartOptions";

const ChartContainer = ({ title, isLoading, children }) => (
  <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
    <h3 className="font-bold text-lg mb-2 text-center">{title}</h3>
    {isLoading ? <div className="text-center py-4">Loading...</div> : children}
  </div>
);

const ChartsSection = ({
  asset,
  loadingChart,
  runtimeChartData,
  plannedChartData,
  kpiData,
  loadingAsset,
  onNavigate,
  isAtCurrentDate,
  currentOffset,
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Runtime Chart */}
<ChartContainer title={asset + " - Runtime (Hrs)"} isLoading={loadingChart}>

          <div className="flex gap-1 text-xs justify-end mb-2">
            <button
              onClick={() => onNavigate(asset, -1)}
              className="text-green-500 hover:text-blue-600 text-xl"
              disabled={loadingAsset === asset}
              title="Previous 7 days"
            >
              <IoMdArrowDropleft />
            </button>
            <button
              onClick={() => onNavigate(asset, 1)}
              className="text-green-500 hover:text-blue-600 text-xl"
              disabled={isAtCurrentDate(asset) || loadingAsset === asset}
              title="Next 7 days"
            >
              <IoMdArrowDropright />
            </button>
          </div>

          {runtimeChartData && (
            <>
              <div className="relative h-[250px] p-2">
                <Bar data={runtimeChartData} options={barChartOptions} />
              </div>
              <div className="overflow-x-auto mt-2">
                <table className="min-w-full text-sm text-left border-t border-gray-300">
                  <thead className="bg-gray-300">
                    <tr>
                      <th className="px-2 py-1 border border-black">Shift</th>
                      {runtimeChartData.labels.map((label, idx) => (
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
                    {runtimeChartData.datasets.map((dataset, shiftIdx) => (
                      <tr
                        key={shiftIdx}
                        style={{
                          backgroundColor: dataset.backgroundColor,
                          color: "#fffd",
                        }}
                      >
                        <td className="px-2 py-1 border border-black">
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
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </ChartContainer>

        {/* Production Chart */}
       <ChartContainer title={asset + " - Production"} isLoading={loadingChart}>

          <div className="flex gap-1 text-xs justify-end mb-2">
            <button
              onClick={() => onNavigate(asset, -1)}
              className="text-blue-500 hover:text-blue-600 text-xl"
    disabled={loadingAsset === asset || currentOffset === 0}
              title="Previous 7 days"
            >
              <IoMdArrowDropleft />
            </button>
            <button
              onClick={() => onNavigate(asset, 1)}
              className="text-blue-500 hover:text-blue-600 text-xl"
   disabled={isAtCurrentDate(asset) || loadingAsset === asset}
              title="Next 7 days"
            >
              <IoMdArrowDropright />
            </button>
          </div>

          {plannedChartData && (
            <>
              <div className="relative h-[250px] p-2">
                <Bar data={plannedChartData} options={getProductionChartOptions} />
              </div>
              <div className="overflow-x-auto mt-2">
                <table className="min-w-full text-sm text-left border-t border-gray-300">
                  <thead className="bg-gray-300 border">
                    <tr>
                      <th className="px-2 py-1 border border-black">Shift</th>
                      {plannedChartData.labels.map((label, idx) => (
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
                    {plannedChartData.datasets.map((dataset, shiftIdx) => (
                      <tr
                        key={shiftIdx}
                        style={{
                          backgroundColor: dataset.backgroundColor,
                          color: "#fffd",
                        }}
                      >
                        <td className="px-2 py-1 border border-black">
                          {dataset.label}
                        </td>
                        {dataset.data.map((val, idx) => (
                          <td
                            key={idx}
                            className="px-2 py-1 text-center border border-black"
                          >
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </ChartContainer>
      </div>
    </div>
  );
};

export default ChartsSection;
