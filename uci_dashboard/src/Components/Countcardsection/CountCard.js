import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";

// Spinner
const CircleLoader = () => (
  <div className="w-full flex justify-center items-center">
    <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

const apiToUiMap = {
  overall_Count: "Overall Prod",
  monthly_Count: "Monthly Prod",
  prev_Day_OK_Count: "PrevDay Prod",
  today_Count: "CurrentDay Prod ",
  shift_1_OK_Count: "Shift1 Production",
  shift_2_OK_Count: "Shift2 Production",
  shift_1_NOK_Count: "Shift1 Rejection",
  shift_2_NOK_Count: "Shift2 Rejection",
  today_NOK_Count: "CurrentDay Rejection",
};

const dummyData = {
  GRA: { label: "GRA_P3" },
  GCS: { label: "GCS_P1" },
  SPC: { label: "SPC_P3" },
};

const metricCards = (kpiData) => [
  { title: "OEE MONTH", value: kpiData.monthly_OEE, suffix: "%" },
  { title: "OEE DAY", value: kpiData.oee, suffix: "%" },
  { title: "Prev Day OEE", value: kpiData.previous_OEE, suffix: "%" },
  { title: "Downtime", value: kpiData.downtime },
  { title: "Quality", value: kpiData.quality, suffix: "%" },
  { title: "Performance", value: kpiData.performance, suffix: "%" },
];

// Helper to generate mock numbers
const getRandomValue = (min = 0, max = 100) => (Math.random() * (max - min) + min).toFixed(2);

const generateMockData = () => {
  const data = {};
  const kpi = {};

  Object.keys(dummyData).forEach((label) => {
    // Count data
    const counts = {};
    Object.keys(apiToUiMap).forEach((key) => {
      counts[apiToUiMap[key]] = Math.floor(Math.random() * 500);
    });
    data[label] = counts;

    // KPI data
    kpi[label] = {
      monthly_OEE: getRandomValue(70, 95),
      oee: getRandomValue(60, 90),
      previous_OEE: getRandomValue(60, 90),
      downtime: Math.floor(Math.random() * 1000),
      quality: getRandomValue(85, 99),
      performance: getRandomValue(80, 98),
    };
  });

  return { data, kpi };
};

const CountCard = () => {
  const [data, setData] = useState({});
  const [kpi, setKpi] = useState({});
  const [timestamp, setTimestamp] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: mockData, kpi: mockKpi } = generateMockData();
    setData(mockData);
    setKpi(mockKpi);
    setLoading(false);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const texasTime = DateTime.now().setZone("America/Chicago").toFormat("yyyy-MM-dd HH:mm:ss");
      setTimestamp(texasTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <div className="bg-[#ECF6EF] rounded-md p-2 shadow-md w-full space-y-1 border">
        {Object.keys(dummyData).map((label) => {
          const sectionData = data[label] || {};
          const kpiData = kpi[label] || {};

          return (
            <div key={label} className="space-y-2 flex w-full items-center gap-4">
              <div>
                <h2 className="text-sm font-bold text-gray-800">{label}</h2>
              </div>
              <div className="justify-between flex w-full gap-2 flex-wrap xxl:flex-nowrap">
                {/* KPI Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 w-full">
                  {metricCards(kpiData).map((metric, idx) => (
                    <div
                      key={idx}
                      className="border-l-4 border-green-500 bg-white px-1 py-2 rounded-md shadow-sm min-w-[90px] flex flex-col"
                    >
                      <p className="text-xs text-gray-500 font-medium">{metric.title}</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {loading ? (
                          <span className="flex justify-center items-center h-4 mt-1">
                            <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                          </span>
                        ) : metric.value != null ? (
                          `${parseFloat(metric.value).toFixed(2)}${metric.suffix || ""}`
                        ) : (
                          "N/A"
                        )}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Table */}
                <div className="bg-white rounded shadow border w-full">
                  <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-gray-700 text-white text-[10px]">
                      <tr>
                        {Object.values(apiToUiMap).map((label, i) => (
                          <th key={i} className="px-2 py-2 border-gray-700 border">
                            {label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr className="bg-[#ECF6EF] text-center">
                          <td colSpan={Object.keys(apiToUiMap).length}>
                            <CircleLoader />
                          </td>
                        </tr>
                      ) : (
                        <tr className="bg-[#ECF6EF] text-center">
                          {Object.keys(apiToUiMap).map((key, i) => (
                            <td
                              key={i}
                              className="px-4 py-2 border text-xs font-bold border-gray-700 text-gray-800"
                            >
                              {sectionData[apiToUiMap[key]] ?? "N/A"}
                            </td>
                          ))}
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CountCard;
