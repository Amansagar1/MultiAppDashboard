"use client";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Image from "next/image";
// import { getLastValue } from "../../../../webServices/UCIAPIController";
import machinelogo from "../../../../Components/Assets/pngwing.com.png"
// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [machineStatuses, setMachineStatuses] = useState([]);
  const [liveCounts, setLiveCounts] = useState({});
  const [lastUpdated, setLastUpdated] = useState("");
  const [timeData, setTimeData] = useState({});

  useEffect(() => {
    // Fetch data from API on component mount
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const instanceId = "591764f9-5ce6-4ca3-ba5e-3c7e18e38d90";
      const formData = {};
      const apiResponse = await getLastValue(instanceId, formData);

      const timestamp = apiResponse[0]?.timestamp;
      if (timestamp) {
        const localDate = new Date(timestamp);
        const options = {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        };
        const formattedDate = localDate.toLocaleDateString("en-GB",options);
        setLastUpdated(formattedDate);
      }

      const machineStatusMappings = {
        "Auto Mode": "AUTO_MODE",
        "Robot-1 Ready": "R1_RDY",
        "Robot-2 Ready": "R2_RDY",
        "Communication Ok": "COMM_OK",
        "Robot System Ok": "ROBT_SYS_OK",
        "All System Ok": "ALL_SYS_OK",
        "Robot-1 Alarm": "R1_ALRM",
        "Robot-2 Alarm": "R2_ALRM",
        "Press Machine Alarm": "PRS_MC_ALRM"
      };

      const operationalDetailsMappings = {
        "System Fault Duration": "SYS_FALT_TIME",
        "INSP Part Not Ok Count": "PART_NOT_OK_CNT",
        "INSP Part Ok Count": "PART_OK_CNT",
        "Robot-1 Idle Duration": "R1_IDL_TIME",
        "Robot-2 Idle Duration": "R2_IDL_TIME"
      };

      const statuses = Object.entries(machineStatusMappings).map(([label, variable]) => ({
        label,
        status: apiResponse.find((item) => item.variable === variable)?.value > 0 ? 1 : 0,
      }));

      const counts = apiResponse.reduce((acc, item) => {
        acc[item.variable] = item.value;
        return acc;
      }, {});

      const timeValues = {
        "Robot-1 Idle Duration": counts[operationalDetailsMappings["Robot-1 Idle Duration"]],
        "Robot-2 Idle Duration": counts[operationalDetailsMappings["Robot-2 Idle Duration"]],
        "System Fault Duration": counts[operationalDetailsMappings["System Fault Duration"]],
      };

      setMachineStatuses(statuses);
      setLiveCounts(counts);
      setTimeData(timeValues);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Get all the operational details and their values, including those that may have 0 or undefined values
  const operationalDetailsCards = Object.entries({
    "System Fault Duration": "SYS_FALT_TIME",
    "INSP Part Not Ok Count": "PART_NOT_OK_CNT",
    "INSP Part Ok Count": "PART_OK_CNT",
    "Robot-1 Idle Duration": "R1_IDL_TIME",
    "Robot-2 Idle Duration": "R2_IDL_TIME"
 
  }).map(([label, variable]) => ({
    label,
    value: liveCounts[variable] || 0, // Show 0 if the value is undefined
  }));

  const timeBarChartData = {
    labels: ["Robot-1 Idle Duration", "Robot-2 Idle Duration", "System Fault Duration"],
    datasets: [
      {
        label: "Robot-1 Idle Duration",
        data: [timeData["Robot-1 Idle Duration"]],
        backgroundColor: "rgba(255, 99, 132, 0.6)",  // Red color
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Robot-2 Idle Duration",
        data: [timeData["Robot-2 Idle Duration"]],
        backgroundColor: "rgba(54, 162, 235, 0.6)",  // Blue color
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "System Fault Duration",
        data: [timeData["System Fault Duration"]],
        backgroundColor: "rgba(75, 192, 192, 0.6)",  // Green color
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const timeChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 50,
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 overflow-scroll w-full justify-center mb-20">
      <div className="w-full bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex gap-4 items-center justify-between p-2">
          <h2 className="text-md font-semibold ">Machine Status</h2>
          <h2>Last Updated on: {lastUpdated}</h2>
        </div>
        <div className="flex gap-10 w-full items-center justify-center">
          <div>
          <Image src={machinelogo} width={140} height={100} alt="machine hand"  />
          </div>
          <div className="flex gap-6 w-full flex-wrap">
            {machineStatuses.map((machine, index) => (
              <div
                key={index}
                className={`w-44 flex items-center justify-between gap-6 bg-gray-100 rounded-lg p-3 shadow-md ${machine.status === 1
                  ? "border-l-4 border-green-500"
                  : "border-l-4 border-red-500"
                  }`}
              >
                <span className="text-gray-800 font-medium">{machine.label}</span>
                <button
                  className={`w-4 h-4 rounded-full ${machine.status === 1 ? "bg-green-500" : "bg-red-500"
                    }`}
                  title={machine.status === 1 ? "Active" : "Inactive"}
                ></button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full bg-white shadow-lg rounded-lg p-6 pb-10 mb-8">
        <h2 className="text-md font-semibold mb-4">Operational Details</h2>
        <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {operationalDetailsCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg flex flex-col justify-center items-center text-center border-2 border-sky-600 h-[130px]"
            >
              <p className="text-md font-semibold text-black mt-2">{card.value}</p>
              <h4 className="text-sm text-gray-700">{card.label}</h4>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full bg-white shadow-lg rounded-lg mb-8">
        <div className="w-full items-center justify-center flex flex-col sm:flex-row gap-10 p-4">
          <div className="w-[60%]">
            <h4 className="text-center text-lg">Machine Availability </h4>
            <Bar data={timeBarChartData} options={timeChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
