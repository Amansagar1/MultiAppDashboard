import React from "react";
import { Bar } from "react-chartjs-2";

const ChartWithTable = ({ title, data, options }) => {
  if (!data) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <h3 className="font-bold text-lg mb-2 text-center">{title}</h3>
      <div className="relative h-[250px] p-2">
        <Bar data={data} options={options} />
      </div>
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full text-sm text-left border-t border-gray-300">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-2 py-1 border border-black">Shift</th>
              {data.labels.map((label, idx) => (
                <th key={idx} className="px-2 py-1 text-center border border-black">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.datasets.map((dataset, shiftIdx) => (
              <tr
                key={shiftIdx}
                style={{ backgroundColor: dataset.backgroundColor, color: "#fff" }}
              >
                <td className="px-2 py-1 border border-black">{dataset.label}</td>
                {dataset.data.map((val, idx) => (
                  <td key={idx} className="px-2 py-1 text-center border border-black">
                    {typeof val === "number" ? val.toFixed(2) : val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChartWithTable;
