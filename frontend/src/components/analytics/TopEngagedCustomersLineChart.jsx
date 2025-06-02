
// TopEngagedCustomersLineChart.jsx
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

const TopEngagedCustomersLineChart = ({ data }) => {
  const sorted = [...data].sort((a, b) => (b.visits || 0) - (a.visits || 0));
  const labels = sorted.map((c) => c.name);
  const visits = sorted.map((c) => c.visits || 0);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Visits",
        data: visits,
        borderColor: "#10b981",
        backgroundColor: "#10b981",
        fill: false,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: true, text: "Top Engaged Customers (Line Chart)" },
    },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div style={chartWrapperStyle}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default TopEngagedCustomersLineChart;
