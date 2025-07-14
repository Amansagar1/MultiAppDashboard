import React, { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LineChartComponent = () => {
  const [timeRange, setTimeRange] = useState("daily");

  const dataSets = {
    daily: [
      { name: "Mon", count: 120 },
      { name: "Tue", count: 210 },
      { name: "Wed", count: 180 },
      { name: "Thu", count: 250 },
      { name: "Fri", count: 90 },
      { name: "Sat", count: 300 },
      { name: "Sun", count: 200 },
    ],
    weekly: [
      { name: "Week 1", count: 1200 },
      { name: "Week 2", count: 1400 },
      { name: "Week 3", count: 1100 },
      { name: "Week 4", count: 1600 },
    ],
    monthly: [
      { name: "Jan", count: 5000 },
      { name: "Feb", count: 4500 },
      { name: "Mar", count: 4800 },
      { name: "Apr", count: 5200 },
      { name: "May", count: 6000 },
      { name: "Jun", count: 5800 },
    ],
    yearly: [
      { name: "2021", count: 52000 },
      { name: "2022", count: 58000 },
      { name: "2023", count: 61000 },
      { name: "2024", count: 64000 },
    ],
  };

  const currentData = dataSets[timeRange];
  const totalCount = currentData.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="bg-white border border-gray-300 rounded-xl p-6 w-full mx-auto transition-all duration-300 hover:shadow-2xl h-[350px] mb-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 capitalize">{timeRange} Summary</h2>
          <p className="text-gray-500 text-sm">Total Count: <span className="font-bold text-blue-600">{totalCount}</span></p>
        </div>

        <div className="flex space-x-2">
          {["daily", "weekly", "monthly", "yearly"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize border transition-all duration-200 ${
                timeRange === range
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={currentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "8px",
                padding: "10px",
                color: "#fff",
              }}
              labelStyle={{ color: "#f9fafb", fontWeight: "bold" }}
              itemStyle={{ color: "#e5e7eb" }}
              cursor={{ stroke: "#9ca3af", strokeWidth: 1 }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartComponent;
