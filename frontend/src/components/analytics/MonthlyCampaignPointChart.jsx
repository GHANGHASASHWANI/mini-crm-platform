// export default MonthlyCampaignScatterChart;
import React from "react";
import { Bar } from "react-chartjs-2";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const MonthlyCampaignBarChart = ({ data }) => {
  const labels = data.map(item => monthNames[item._id - 1]);
  const totalCampaigns = data.map(item => item.totalCampaigns);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Campaigns",
        data: totalCampaigns,
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      title: { display: true, text: "Total Campaigns per Month" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default MonthlyCampaignBarChart;
