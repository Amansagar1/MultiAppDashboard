"use client";
import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import dynamic from 'next/dynamic';


const DashboardPage = () => {

  const KPICards = dynamic(() => import("../../Components/Dshboard/KPICards"), { ssr: false });
const ProductionCharts = dynamic(() => import("../../Components/Dshboard/ProductionCharts"), { ssr: false });
const RuntimeCharts = dynamic(() => import("../../Components/Dshboard/RuntimeCharts"), { ssr: false });


  const assetNames = ["GRA", "GCS", "SPC"];
  const [overviewData, setOverviewData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [productionDateWindowMap, setProductionDateWindowMap] = useState({
    GRA: 0,
    GCS: 0,
    SPC: 0,
  });

  const [runtimeDateWindowMap, setRuntimeDateWindowMap] = useState({
    GRA: 0,
    GCS: 0,
    SPC: 0,
  });

  const [chartDataMap, setChartDataMap] = useState({});
  const [plannedChartDataMap, setPlannedChartDataMap] = useState({});

  const dummyChartData = {
    labels: ["01/07", "02/07", "03/07", "04/07", "05/07", "06/07", "07/07"],
    datasets: [
      {
        label: "Shift 1",
        data: [100, 120, 110, 130, 125, 140, 150],
        backgroundColor: "#1D4ED8",
        barThickness: 16,
        categoryPercentage: 0.6,
        barPercentage: 0.6,
      },
      {
        label: "Shift 2",
        data: [80, 90, 95, 100, 105, 110, 120],
        backgroundColor: "#93C5FD",
        barThickness: 16,
        categoryPercentage: 0.6,
        barPercentage: 0.6,
      },
    ],
  };

  const dummyRuntimeChartData = {
    labels: ["01/07", "02/07", "03/07", "04/07", "05/07", "06/07", "07/07"],
    datasets: [
      {
        label: "Shift 1",
        data: [8, 7.5, 8.5, 9, 8.8, 9.1, 9],
        backgroundColor: "#047857",
        barThickness: 16,
        categoryPercentage: 0.6,
        barPercentage: 0.6,
      },
      {
        label: "Shift 2",
        data: [7.2, 8, 7.8, 8.5, 8.3, 8.7, 8.9],
        backgroundColor: "#34D399",
        barThickness: 16,
        categoryPercentage: 0.6,
        barPercentage: 0.6,
      },
    ],
  };

  const dummyOverview = {
    GRA: { OEE: 85, Availability: 90, Performance: 87, Quality: 95 },
    GCS: { OEE: 78, Availability: 80, Performance: 82, Quality: 90 },
    SPC: { OEE: 92, Availability: 95, Performance: 94, Quality: 98 },
  };

  const handleProductionNavigate = async (asset, direction) => {
    const newWindowOffset = productionDateWindowMap[asset] + direction;
    setProductionDateWindowMap((prev) => ({ ...prev, [asset]: newWindowOffset }));
    setPlannedChartDataMap((prev) => ({ ...prev, [asset]: dummyChartData }));
  };

  const handleRuntimeNavigate = async (asset, direction) => {
    const newWindowOffset = runtimeDateWindowMap[asset] + direction;
    setRuntimeDateWindowMap((prev) => ({ ...prev, [asset]: newWindowOffset }));
    setChartDataMap((prev) => ({ ...prev, [asset]: dummyRuntimeChartData }));
  };

  useEffect(() => {
    // Load dummy overview data
    setOverviewData(dummyOverview);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Load dummy production chart data
    const dataMap = {};
    assetNames.forEach((asset) => {
      dataMap[asset] = dummyChartData;
    });
    setPlannedChartDataMap(dataMap);
  }, []);

  useEffect(() => {
    // Load dummy runtime chart data
    const runtimeMap = {};
    assetNames.forEach((asset) => {
      runtimeMap[asset] = dummyRuntimeChartData;
    });
    setChartDataMap(runtimeMap);
  }, []);

  return (
    <div className="bg-gray-100 overflow-scroll h-[94vh] pb-4 relative">
      <KPICards overviewData={overviewData} isLoading={isLoading} />

      <ProductionCharts
        assetNames={assetNames}
        plannedChartDataMap={plannedChartDataMap}
        handleNavigate={handleProductionNavigate}
        dateWindowMap={productionDateWindowMap}
      />

      <RuntimeCharts
        assetNames={assetNames}
        chartDataMap={chartDataMap}
        handleNavigate={handleRuntimeNavigate}
        dateWindowMap={runtimeDateWindowMap}
      />
    </div>
  );
};

export default DashboardPage;
