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

const TopCampaignsChart = ({ data }) => {
  const chartData = {
    labels: data.map((c) => c.name),
    datasets: [
      {
        label: "Sent",
        data: data.map((c) => c.sent || 0),
        backgroundColor: "rgba(75, 192, 192, 0.7)",
      },
      {
        label: "Failed",
        data: data.map((c) => c.failed || 0),
        backgroundColor: "rgba(255, 99, 132, 0.7)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Top Campaigns" },
    },
  };

  return (
    <div style={chartWrapperStyle}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default TopCampaignsChart;
