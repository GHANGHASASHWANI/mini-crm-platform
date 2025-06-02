// CampaignSuccessPie.jsx

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
  height: "600px",
  backgroundColor: "white",
  padding: "1rem",
  borderRadius: "0.5rem",
  boxShadow: "0 1px 3px rgb(0 0 0 / 0.12), 0 1px 2px rgb(0 0 0 / 0.24)",
};

const CampaignSuccessPie = ({ data }) => {
  const chartData = {
    labels: data.map((c) => c.name),
    datasets: [
      {
        label: "Success Rate (%)",
        data: data.map((c) => c.successRate),
        backgroundColor: [
          "#4caf50",
          "#2196f3",
          "#ff9800",
          "#9c27b0",
          "#f44336",
          "#00bcd4",
          "#ffc107",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: true, text: "Campaign Success Rates (%)" },
    },
  };

  return (
    <div style={chartWrapperStyle}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default CampaignSuccessPie;
