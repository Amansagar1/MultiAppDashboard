"use client";
import React, { useState } from "react";
import ReportFilters from "@/components/reports/ReportFilters";
import ReportDisplay from "@/components/reports/ReportDisplay";

const ReportPage = () => {
  const [filters, setFilters] = useState({
    productionLine: "",
    startDate: "",
    endDate: "",
    frequency: "",
  });

  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const productionLines = [
    { id: "GRA", name: "GRA" },
    { id: "GCS", name: "GCS" },
    { id: "SPC", name: "SPC" },
  ];

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatDateToLocalISOString = (date) => {
    const pad = (num) => num.toString().padStart(2, "0");
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  // ✅ Generate mock CSV data
  const generateMockCSV = () => {
    const headers = ["timestamp", "variable1", "variable2", "variable3"];
    const rows = [];

    for (let i = 0; i < 25; i++) {
      const timestamp = new Date(Date.now() - i * 60000).toISOString();
      const v1 = (Math.random() * 100).toFixed(2);
      const v2 = (Math.random() * 50).toFixed(2);
      const v3 = (Math.random() * 10).toFixed(2);
      rows.push(`${timestamp},${v1},${v2},${v3}`);
    }

    return [headers.join(","), ...rows].join("\n");
  };

  const handleSubmit = async () => {
    const { productionLine, startDate, endDate, frequency } = filters;

    if (!productionLine || !startDate || !endDate || !frequency) {
      setError("Please fill in all filters");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setError("End date must be after start date");
      return;
    }

    setError(null);
    setCurrentPage(1);
    setIsLoading(true);

    try {
      const mockCSV = generateMockCSV();
      const lines = mockCSV.split("\n").filter((line) => line.trim() !== "");

      if (lines.length < 2) {
        setError("No mock data available");
        return;
      }

      const headers = lines[0].split(",");
      const data = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",");
        const row = {};
        headers.forEach((header, index) => {
          row[header.trim()] = values[index] ? values[index].trim() : "";
        });

        if (row.timestamp) {
          const localDate = new Date(row.timestamp);
          row.timestampFormatted = localDate.toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
            timeZone: "America/Chicago",
          });
        }

        data.push(row);
      }

      setResponseData({
        data,
        variables: headers.filter((h) => h !== "timestamp"),
      });
    } catch (err) {
      console.error("Mock Error:", err);
      setError(`Failed to process mock data: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const resetFilters = () => {
    setFilters({
      productionLine: "",
      startDate: "",
      endDate: "",
      frequency: "",
    });
    setResponseData(null);
    setError(null);
  };

  return (
    <div className="w-full p-2 sm:p-2 pr-10 lg:p-2 h-screen">
      <ReportFilters
        onApply={handleSubmit}
        filters={filters}
        productionLines={productionLines}
        handleFilterChange={handleFilterChange}
        isLoading={isLoading}
      />

      {isLoading ? (
        <div className="flex justify-center items-center p-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : responseData ? (
        <ReportDisplay
          onReset={resetFilters}
          responseData={responseData}
          filters={filters}
          currentPageData={responseData.data}
          variables={responseData.variables}
        />
      ) : error ? (
        <div className="text-red-600 text-sm p-2">{error}</div>
      ) : null}
    </div>
  );
};

export default ReportPage;
