"use client";
import React from "react";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";

// Format full date+time
function formatDate(timestamp) {
  const date = new Date(timestamp);
  if (isNaN(date)) return "Invalid Date";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

// Format date only
function formatDateOnly(dateStr) {
  const date = new Date(dateStr);
  if (isNaN(date)) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
}

// Format time
function formatTime(timeStr) {
  const d = new Date(timeStr);
  if (isNaN(d)) return timeStr;
  return d.toLocaleTimeString("en-GB", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

// Format downtime from minutes to HH:MM
function formatDowntime(minutes) {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

const ReportDisplay = ({
  currentPageData,
  variables,
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  onReset,
  responseData,
  filters,
}) => {
  const desiredColumnOrder = [
    "Start_Date",
    "Start_Time",
    "End_Date",
    "End_Time",
    "Product_Count",
    "Ok_Quantity",
    "Rejected_Quantity",
    "Downtime",
    "OEE",
    "Quality",
    "Performance",
    "Availability",
  ];

  // Totals for current page
  const pageTotals = {
    Product_Count: 0,
    Ok_Quantity: 0,
    Rejected_Quantity: 0,
    Downtime: 0,
  };

  currentPageData.forEach((row) => {
    pageTotals.Product_Count += Number(row.Product_Count) || 0;
    pageTotals.Ok_Quantity += Number(row.Ok_Quantity) || 0;
    pageTotals.Rejected_Quantity += Number(row.Rejected_Quantity) || 0;
    pageTotals.Downtime += Number(row.Downtime) || 0;
  });

  // Download CSV
  const downloadCSV = () => {
    if (!responseData?.data?.length) return;

    const formattedStartDate = filters.startDate.replace(/-/g, "");
    const formattedEndDate = filters.endDate.replace(/-/g, "");
    const { data } = responseData;

    const csvHeaders = [...desiredColumnOrder];

    const csvRows = data.map((row) => {
      return desiredColumnOrder
        .map((col) => {
          if (col === "Start_Date") {
            return row.Date ? formatDateOnly(row.Date) : "";
          } else if (col === "End_Date") {
            return row.timestamp ? formatDateOnly(row.timestamp) : "";
          } else if (col === "Start_Time" || col === "End_Time") {
            return row[col] ? formatTime(row[col]) : "";
          } else if (col === "Downtime") {
            return formatDowntime(Number(row[col]) || 0);
          } else {
            return row[col] ?? "";
          }
        })
        .join(",");
    });

    const totals = {
      Product_Count: 0,
      Ok_Quantity: 0,
      Rejected_Quantity: 0,
      Downtime: 0,
    };

    data.forEach((row) => {
      totals.Product_Count += Number(row.Product_Count) || 0;
      totals.Ok_Quantity += Number(row.Ok_Quantity) || 0;
      totals.Rejected_Quantity += Number(row.Rejected_Quantity) || 0;
      totals.Downtime += Number(row.Downtime) || 0;
    });

    const totalRow = desiredColumnOrder.map((col) => {
      if (col === "Product_Count") return `Total = ${totals.Product_Count}`;
      if (col === "Ok_Quantity") return `Total = ${totals.Ok_Quantity}`;
      if (col === "Rejected_Quantity") return `Total = ${totals.Rejected_Quantity}`;
      if (col === "Downtime") return `Total = ${formatDowntime(totals.Downtime)}`;
      return "";
    }).join(",");

    const csvContent = [csvHeaders.join(","), ...csvRows, totalRow].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `report_${formattedStartDate}_to_${formattedEndDate}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-2  flex flex-col max-h-[550px]   overflow-hidden pb-20">
      <div className=" flex-1 overflow-x-auto border border-gray-400 rounded">
        <table className="w-full divide-y divide-gray-400">
          <thead className="bg-gray-200">
            <tr className="divide-x divide-gray-400">
              {desiredColumnOrder.map((col) => (
                <th
                  key={col}
                  className="px-1 py-2 text-left text-xs font-bold text-gray-800 uppercase tracking-wider"
                >
                  {col === "Downtime" ? "Downtime (HH:MM)" : col === "OEE" ? "OEE (%)" : col === "Quality" ? "Quality (%)" : col=== "Performance" ? "Performance (%)" : col === "Availability" ? "Availability (%)" : col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-400">
            {currentPageData.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 divide-x divide-gray-400 even:bg-white odd:bg-green-100"
              >
                {desiredColumnOrder.map((col) => {
                  let value = "";
                  if (col === "Start_Date") {
                    value = row.Date ? formatDateOnly(row.Date) : "N/A";
                  } else if (col === "End_Date") {
                    value = row.timestamp ? formatDateOnly(row.timestamp) : "N/A";
                  } else if (col === "Start_Time" || col === "End_Time") {
                    value = row[col] ? formatTime(row[col]) : "N/A";
                  } else if (col === "Downtime") {
                    value = formatDowntime(Number(row[col]) || 0);
                  } else {
                    value = row[col] ?? "N/A";
                  }
                  return (
                    <td
                      key={col}
                      className="px-1 py-1 whitespace-nowrap text-xs text-gray-700"
                    >
                      {value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>

          <tfoot className="bg-yellow-100 font-bold">
            <tr className="divide-x divide-gray-400">
              {desiredColumnOrder.map((col) => (
                <td key={col} className="px-1 py-1 text-xs text-gray-900">
                  {col === "Start_Date"
                    ? ""
                    : col === "Product_Count"
                    ? `Total = ${pageTotals.Product_Count}`
                    : col === "Ok_Quantity"
                    ? `Total = ${pageTotals.Ok_Quantity}`
                    : col === "Rejected_Quantity"
                    ? `Total = ${pageTotals.Rejected_Quantity}`
                    : col === "Downtime"
                    ? `Total = ${formatDowntime(pageTotals.Downtime)}`
                    : ""}
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>

     

        <div className="flex gap-2 items-center justify-end pt-4 w-full">
          <button
            onClick={downloadCSV}
            disabled={!responseData?.data?.length}
            className="flex items-center gap-2 p-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 text-sm"
          >
            <Download className="h-3 w-3" />
            Download CSV
          </button>
        </div>
      </div>
    // </div>
  );
};

export default ReportDisplay;


