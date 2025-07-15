"use client";
import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
// import { getPerformanceIndex, getHisRuntimeDowntime } from "@/webServices/UCIAPIController";

import KPISection from "@/Components/Automation/KPISection";
import ChartsSection from "@/Components/Automation/ChartsSection";

const timezone = "America/Chicago";
const assetName = "SPC";

const Page = () => {
  const [kpiData, setKpiData] = useState({
    oee: 0,
    previous_OEE: 0,
    availability: 0,
    downtime: 0,
    quality: 0,
    performance: 0,
    labels: [],
    productionSummary: {
      overallProd: 0,
      monthlyProd: 0,
      prevDayProd: 0,
      currentDayProd: 0,
      shift1Prod: 0,
      shift2Prod: 0,
      shift1Rejection: 0,
      shift2Rejection: 0,
      currentDayRejection: 0,
    },
  });

  const [runtimeChartData, setRuntimeChartData] = useState(null);
  const [plannedChartData, setPlannedChartData] = useState(null);
  const [loadingKPI, setLoadingKPI] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);
  const [currentDateWindow, setCurrentDateWindow] = useState({}); // offset in days (multiples of 7)
  const [loadingAsset, setLoadingAsset] = useState(null);

  // Navigate by 7 days windows: direction = +1 or -1
  const handleNavigate = (asset, direction) => {
    setLoadingAsset(asset);
    setCurrentDateWindow((prev) => ({
      ...prev,
      [asset]: (prev[asset] || 0) + direction * 7,
    }));
    setLoadingAsset(null);
  };

  // Check if we are at current date window (offset 0)
  const isAtCurrentDate = (asset) => (currentDateWindow[asset] || 0) === 0;

  // Fetch KPI data only on initial load
  useEffect(() => {
    const now = DateTime.now().setZone(timezone);
    const from = now.startOf("day").toFormat("yyyy-MM-dd HH:mm");
    const to = now.set({ hour: 20, minute: 0 }).toFormat("yyyy-MM-dd HH:mm");

    const fetchKpiData = async () => {
      try {
        setLoadingKPI(true);
        const data = await getPerformanceIndex(assetName, from, to, timezone);
        setKpiData((prev) => ({
          ...prev,
          ...data,
          productionSummary: {
            overallProd: data?.overall_Count || 0,
            monthlyProd: data?.monthly_Count || 0,
            prevDayProd: data?.prev_Day_OK_Count || 0,
            currentDayProd: data?.today_Count || 0,
            shift1Prod: data?.shift_1_OK_Count || 0,
            shift2Prod: data?.shift_2_OK_Count || 0,
            shift1Rejection: data?.shift_1_NOK_Count || 0,
            shift2Rejection: data?.shift_2_NOK_Count || 0,
            currentDayRejection: data?.today_NOK_Count || 0,
          },
        }));
      } catch (error) {
        console.error("❌ Failed to fetch KPI data:", error);
      } finally {
        setLoadingKPI(false);
      }
    };

    fetchKpiData();
  }, []);

  // Fetch chart data based on current date window offset for assetName
  useEffect(() => {
    const offset = currentDateWindow[assetName] || 0;

    // now + offset days (offset multiples of 7)
    const now = DateTime.now().setZone(timezone).plus({ days: offset });

    // 7-day window from now - 6 days to now (inclusive)
    const from = now.minus({ days: 6 }).startOf("day").toFormat("yyyy-MM-dd HH:mm");
    const to = now.endOf("day").toFormat("yyyy-MM-dd HH:mm");

    // Generate fixed 7 days labels function
    const generateLast7DaysLabels = (endDate) => {
      const labels = [];
      for (let i = 6; i >= 0; i--) {
        labels.push(endDate.minus({ days: i }).toFormat("dd/LL"));
      }
      return labels;
    };

    const fetchChartData = async () => {
      try {
        setLoadingChart(true);
        const res = await getHisRuntimeDowntime(assetName, from, to, timezone);

        const groupedData = {};
        const runTimeHours = res.runTimeHours || 9.5;
        const productionLimit = res.productionLimit || 228;

        // Group production data
        res.prodData.forEach((item) => {
          const date = DateTime.fromISO(item.timestamp).toFormat("dd/LL");
          groupedData[date] = groupedData[date] || { Shift1: {}, Shift2: {} };
          groupedData[date][item.shift].product = item.product_count;
        });

        // Group downtime data
        res.downTimeData.forEach((item) => {
          const date = DateTime.fromISO(item.timestamp).toFormat("dd/LL");
          groupedData[date] = groupedData[date] || { Shift1: {}, Shift2: {} };
          groupedData[date][item.shift].downtime = item.downtime;
        });

        // Create labels for exactly 7 days
        const labels = generateLast7DaysLabels(now);

        const shift1Runtime = [];
        const shift2Runtime = [];
        const shift1Prod = [];
        const shift2Prod = [];
        let totalProd = 0;
        let totalDowntime = 0;
        let totalRuntime = 0;

        labels.forEach((date) => {
          const shift1 = groupedData[date]?.Shift1 || {};
          const shift2 = groupedData[date]?.Shift2 || {};

          const s1Downtime = shift1.downtime || 0;
          const s2Downtime = shift2.downtime || 0;

          const s1Runtime = runTimeHours - s1Downtime;
          const s2Runtime = runTimeHours - s2Downtime;

          const s1Prod = shift1.product || 0;
          const s2Prod = shift2.product || 0;

          shift1Runtime.push(s1Runtime);
          shift2Runtime.push(s2Runtime);
          shift1Prod.push(s1Prod);
          shift2Prod.push(s2Prod);

          totalProd += s1Prod + s2Prod;
          totalDowntime += s1Downtime + s2Downtime;
          totalRuntime += s1Runtime + s2Runtime;
        });

        const performance = (totalProd / (labels.length * 2 * productionLimit)) * 100;
        const availability = (totalRuntime / (labels.length * 2 * runTimeHours)) * 100;
        const quality = 100;
        const oee = (availability * performance * quality) / 10000;

        setKpiData((prev) => ({
          ...prev,
          oee,
          downtime: totalDowntime.toFixed(2),
          performance,
          quality,
          labels,
          productionSummary: {
            ...prev.productionSummary,
            overallProd: totalProd,
            monthlyProd: totalProd,
            shift1Prod: shift1Prod.at(-1) || 0,
            shift2Prod: shift2Prod.at(-1) || 0,
          },
        }));

        setRuntimeChartData({
          labels,
          datasets: [
            {
              label: "Shift 1",
              data: shift1Runtime,
              backgroundColor: "#047857",
              barThickness: 16,
              categoryPercentage: 0.6,
              barPercentage: 0.6,
            },
            {
              label: "Shift 2",
              data: shift2Runtime,
              backgroundColor: "#34D399",
              barThickness: 16,
              categoryPercentage: 0.6,
              barPercentage: 0.6,
            },
          ],
        });

        setPlannedChartData({
          labels,
          datasets: [
            {
              label: "Shift 1",
              data: shift1Prod,
              backgroundColor: "#1D4ED8",
              barThickness: 16,
              categoryPercentage: 0.6,
              barPercentage: 0.6,
            },
            {
              label: "Shift 2",
              data: shift2Prod,
              backgroundColor: "#93C5FD",
              barThickness: 16,
              categoryPercentage: 0.6,
              barPercentage: 0.6,
            },
          ],
        });
      } catch (error) {
        console.error("Error loading chart data", error);
      } finally {
        setLoadingChart(false);
      }
    };

    fetchChartData();
  }, [currentDateWindow]);

  return (
    <div className="bg-gray-100 h-screen p-1 overflow-scroll">
      <div className="w-full">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-md font-bold text-gray-800">{assetName}</h1>
            <div className="w-12 h-1 bg-green-500 mt-2 rounded-full"></div>
          </div>
        </div>

        <KPISection kpiData={kpiData} loadingKPI={loadingKPI} />

        <ChartsSection
          asset={assetName}
          loadingChart={loadingChart}
          runtimeChartData={runtimeChartData}
          plannedChartData={plannedChartData}
          kpiData={kpiData}
          loadingAsset={loadingAsset}
          onNavigate={handleNavigate}
          isAtCurrentDate={isAtCurrentDate}
            currentOffset={currentDateWindow[assetName] || 0} 
        />
      </div>
    </div>
  );
};

export default Page;
