

// DeliveryStatusDoughnut.jsx
import React, { useEffect, useState } from "react";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const chartWrapperStyle = {
  height: "300px",
  backgroundColor: "white",
  padding: "1rem",
  borderRadius: "0.5rem",
  boxShadow: "0 1px 3px rgb(0 0 0 / 0.12), 0 1px 2px rgb(0 0 0 / 0.24)",
};

const DeliveryStatusDoughnut = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d._id),
    datasets: [
      {
        label: "Count",
        data: data.map((d) => d.count),
        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
          "#ec4899",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: true, text: "Delivery Status Counts" },
    },
  };

  return (
    <div style={chartWrapperStyle}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default DeliveryStatusDoughnut;
