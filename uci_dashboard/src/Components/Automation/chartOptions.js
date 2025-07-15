// chartConfig.js
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register ChartJS components once here
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  annotationPlugin,
  ChartDataLabels
);

// Runtime Chart Options
export const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: { top: 9 },
  },
  plugins: {
    legend: {
      display: true,
    },
    datalabels: {
      anchor: "end",
      align: "end",
      font: {
        size: 10,
        weight: "bold",
      },
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
          borderColor: "orange",
          borderDash: [6, 6],
          borderWidth: 2,
          label: {
            display: true,
            text: "Runtime (9.5 hrs)",
            position: "end",
            color: "orange",
            backgroundColor: "white",
            font: {
              weight: "bold",
            },
          },
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      min: 0,
      max: 14,
      ticks: {
        stepSize: 2,
      },
      grid: {
        color: "#E5E7EB",
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        autoSkip: false,
      },
    },
  },
};

// Production Chart Options
export const getProductionChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
    datalabels: {
      anchor: "end",
      align: "end",
      font: {
        size: 9,
        weight: "bold",
      },
      formatter: (value) => `${value}`,
      color: (context) => context.dataset.backgroundColor,
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) =>
          `${tooltipItem.dataset.label}: ${tooltipItem.raw.toLocaleString()} Counts`,
      },
    },
    annotation: {
      annotations: {
        referenceLine: {
          type: "line",
          yMin: 228,
          yMax: 228,
          borderColor: "orange",
          borderDash: [6, 6],
          borderWidth: 2,
          label: {
            display: true,
            text: "Target (240)",
            position: "end",
            color: "#000",
            font: {
              size: 12,
              weight: "bold",
            },
          },
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      min: 0,
      max: 400,
      ticks: {
        stepSize: 10,
      },
      grid: {
        color: "#E5E7EB",
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        autoSkip: false,
      },
    },
  },
};
