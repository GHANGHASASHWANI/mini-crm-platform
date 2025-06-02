
// // // // // // MonthlyCampaignPointChart.jsx
// // // // // import React, { useEffect, useState } from "react";
// // // // // import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";
// // // // // import {
// // // // //   Chart as ChartJS,
// // // // //   CategoryScale,
// // // // //   LinearScale,
// // // // //   BarElement,
// // // // //   Title,
// // // // //   Tooltip,
// // // // //   Legend,
// // // // //   ArcElement,
// // // // //   PointElement,
// // // // //   LineElement,
// // // // // } from "chart.js";

// // // // // ChartJS.register(
// // // // //   CategoryScale,
// // // // //   LinearScale,
// // // // //   BarElement,
// // // // //   Title,
// // // // //   Tooltip,
// // // // //   Legend,
// // // // //   ArcElement,
// // // // //   PointElement,
// // // // //   LineElement
// // // // // );

// // // // // const chartWrapperStyle = {
// // // // //   height: "300px",
// // // // //   backgroundColor: "white",
// // // // //   padding: "1rem",
// // // // //   borderRadius: "0.5rem",
// // // // //   boxShadow: "0 1px 3px rgb(0 0 0 / 0.12), 0 1px 2px rgb(0 0 0 / 0.24)",
// // // // // };

// // // // // const MonthlyCampaignPointChart = ({ data }) => {
// // // // //   const labels = data.map((d) => d._id);
// // // // //   const totalCampaigns = data.map((d) => d.totalCampaigns);

// // // // //   const chartData = {
// // // // //     labels,
// // // // //     datasets: [
// // // // //       {
// // // // //         label: "Total Campaigns",
// // // // //         data: totalCampaigns,
// // // // //         borderColor: "#3b82f6",
// // // // //         backgroundColor: "#3b82f6",
// // // // //         showLine: false,
// // // // //         pointRadius: 6,
// // // // //         pointHoverRadius: 8,
// // // // //       },
// // // // //     ],
// // // // //   };

// // // // //   const options = {
// // // // //     responsive: true,
// // // // //     maintainAspectRatio: false,
// // // // //     plugins: {
// // // // //       title: { display: true, text: "Monthly Campaign Rates (Point Chart)" },
// // // // //     },
// // // // //     elements: { line: { tension: 0 } },
// // // // //     scales: { y: { beginAtZero: true } },
// // // // //   };

// // // // //   return (
// // // // //     <div style={chartWrapperStyle}>
// // // // //       <Line data={chartData} options={options} />
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default MonthlyCampaignPointChart;

// // // // // MonthlyCampaignPointChart.jsx
// // // // import React from "react";
// // // // import { Line } from "react-chartjs-2";
// // // // import {
// // // //   Chart as ChartJS,
// // // //   CategoryScale,
// // // //   LinearScale,
// // // //   PointElement,
// // // //   LineElement,
// // // //   Title,
// // // //   Tooltip,
// // // //   Legend,
// // // // } from "chart.js";

// // // // ChartJS.register(
// // // //   CategoryScale,
// // // //   LinearScale,
// // // //   PointElement,
// // // //   LineElement,
// // // //   Title,
// // // //   Tooltip,
// // // //   Legend
// // // // );

// // // // const chartWrapperStyle = {
// // // //   height: "350px",
// // // //   backgroundColor: "#fff",
// // // //   padding: "1.5rem",
// // // //   borderRadius: "0.75rem",
// // // //   boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
// // // //   userSelect: "none",
// // // // };

// // // // const MonthlyCampaignPointChart = ({ data }) => {
// // // //   const labels = data.map((d) => d._id);
// // // //   const totalCampaigns = data.map((d) => d.totalCampaigns);

// // // //   const chartData = {
// // // //     labels,
// // // //     datasets: [
// // // //       {
// // // //         label: "Total Campaigns",
// // // //         data: totalCampaigns,
// // // //         borderColor: "#3b82f6",
// // // //         backgroundColor: "#3b82f6",
// // // //         fill: false,
// // // //         pointRadius: 7,
// // // //         pointHoverRadius: 10,
// // // //         tension: 0.3, // smooth curves
// // // //         showLine: true, // show connecting line to spread points
// // // //       },
// // // //     ],
// // // //   };

// // // //   const options = {
// // // //     responsive: true,
// // // //     maintainAspectRatio: false,
// // // //     plugins: {
// // // //       legend: {
// // // //         labels: { font: { size: 14 } },
// // // //       },
// // // //       title: {
// // // //         display: true,
// // // //         text: "Monthly Campaign Rates (Point Chart)",
// // // //         font: { size: 18, weight: "bold" },
// // // //       },
// // // //       tooltip: {
// // // //         enabled: true,
// // // //         mode: "nearest",
// // // //         intersect: false,
// // // //       },
// // // //     },
// // // //     elements: {
// // // //       line: { tension: 0.3 },
// // // //       point: {
// // // //         radius: 7,
// // // //         hoverRadius: 10,
// // // //       },
// // // //     },
// // // //     scales: {
// // // //       x: {
// // // //         type: "category",
// // // //         title: {
// // // //           display: true,
// // // //           text: "Month",
// // // //           font: { size: 16, weight: "bold" },
// // // //         },
// // // //         ticks: { maxRotation: 45, minRotation: 30 },
// // // //         grid: { display: false },
// // // //       },
// // // //       y: {
// // // //         beginAtZero: true,
// // // //         title: {
// // // //           display: true,
// // // //           text: "Total Campaigns",
// // // //           font: { size: 16, weight: "bold" },
// // // //         },
// // // //         grid: { color: "#eee" },
// // // //       },
// // // //     },
// // // //   };

// // // //   return (
// // // //     <div style={chartWrapperStyle}>
// // // //       <Line data={chartData} options={options} />
// // // //     </div>
// // // //   );
// // // // };

// // // // export default MonthlyCampaignPointChart;
// // // // MonthlyCampaignPointChart.jsx
// // // import React from "react";
// // // import { Line } from "react-chartjs-2";
// // // import {
// // //   Chart as ChartJS,
// // //   CategoryScale,
// // //   LinearScale,
// // //   PointElement,
// // //   LineElement,
// // //   Title,
// // //   Tooltip,
// // //   Legend,
// // // } from "chart.js";

// // // ChartJS.register(
// // //   CategoryScale,
// // //   LinearScale,
// // //   PointElement,
// // //   LineElement,
// // //   Title,
// // //   Tooltip,
// // //   Legend
// // // );

// // // const chartWrapperStyle = {
// // //   height: "300px",
// // //   backgroundColor: "white",
// // //   padding: "1rem",
// // //   borderRadius: "0.5rem",
// // //   boxShadow: "0 1px 3px rgb(0 0 0 / 0.12), 0 1px 2px rgb(0 0 0 / 0.24)",
// // // };

// // // const MonthlyCampaignPointChart = ({ data }) => {
// // //   // Extract labels and data values
// // //   const labels = data.map((d) => d._id.toString());
// // //   const totalCampaigns = data.map((d) => d.totalCampaigns);

// // //   const chartData = {
// // //     labels,
// // //     datasets: [
// // //       {
// // //         label: "Total Campaigns",
// // //         data: totalCampaigns,
// // //         borderColor: "#3b82f6",
// // //         backgroundColor: "#3b82f6",
// // //         fill: false,
// // //         tension: 0.3,
// // //         pointRadius: 6,
// // //         pointHoverRadius: 8,
// // //       },
// // //     ],
// // //   };

// // //   const options = {
// // //     responsive: true,
// // //     maintainAspectRatio: false,
// // //     scales: {
// // //       x: {
// // //         type: "category",           // Ensures labels are distributed evenly on x-axis
// // //         title: {
// // //           display: true,
// // //           text: "Month",
// // //           font: { size: 14, weight: "bold" },
// // //         },
// // //         ticks: {
// // //           maxRotation: 45,
// // //           minRotation: 30,
// // //           font: { size: 12 },
// // //         },
// // //         grid: {
// // //           display: false,
// // //         },
// // //       },
// // //       y: {
// // //         beginAtZero: true,
// // //         title: {
// // //           display: true,
// // //           text: "Total Campaigns",
// // //           font: { size: 14, weight: "bold" },
// // //         },
// // //         grid: {
// // //           color: "#eee",
// // //         },
// // //       },
// // //     },
// // //     plugins: {
// // //       legend: {
// // //         labels: {
// // //           font: { size: 14 },
// // //         },
// // //       },
// // //       title: {
// // //         display: true,
// // //         text: "Monthly Campaign Rates (Point Chart)",
// // //         font: { size: 18, weight: "bold" },
// // //       },
// // //       tooltip: {
// // //         enabled: true,
// // //         mode: "nearest",
// // //         intersect: false,
// // //       },
// // //     },
// // //   };

// // //   return (
// // //     <div style={chartWrapperStyle}>
// // //       <Line data={chartData} options={options} />
// // //     </div>
// // //   );
// // // };

// // // export default MonthlyCampaignPointChart;
// // import React from "react";
// // import { Scatter } from "react-chartjs-2";
// // import {
// //   Chart as ChartJS,
// //   CategoryScale,
// //   LinearScale,
// //   PointElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// // } from "chart.js";

// // ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

// // const chartWrapperStyle = {
// //   height: "300px",
// //   backgroundColor: "white",
// //   padding: "1rem",
// //   borderRadius: "0.5rem",
// //   boxShadow: "0 1px 3px rgb(0 0 0 / 0.12), 0 1px 2px rgb(0 0 0 / 0.24)",
// // };

// // const MonthlyCampaignScatterChart = ({ data }) => {
// //   // Convert your categorical labels into numeric x coordinates
// //   // Scatter charts require numeric x and y values
// //   const labels = data.map((d) => d._id.toString());
// //   const scatterDataPoints = data.map((d, index) => ({
// //     x: index + 1,
// //     y: d.totalCampaigns,
// //   }));

// //   const chartData = {
// //     datasets: [
// //       {
// //         label: "Total Campaigns",
// //         data: scatterDataPoints,
// //         backgroundColor: "#3b82f6",
// //         pointRadius: 6,
// //         pointHoverRadius: 8,
// //       },
// //     ],
// //   };

// //   const options = {
// //     responsive: true,
// //     maintainAspectRatio: false,
// //     scales: {
// //       x: {
// //         type: "linear",
// //         title: {
// //           display: true,
// //           text: "Month (Index)",
// //           font: { size: 14, weight: "bold" },
// //         },
// //         ticks: {
// //           stepSize: 1,
// //           callback: function (value) {
// //             return labels[value - 1] || value; // Show labels on x-axis
// //           },
// //           font: { size: 12 },
// //         },
// //         min: 1,
// //         max: labels.length,
// //         grid: { display: false },
// //       },
// //       y: {
// //         beginAtZero: true,
// //         title: {
// //           display: true,
// //           text: "Total Campaigns",
// //           font: { size: 14, weight: "bold" },
// //         },
// //         grid: { color: "#eee" },
// //       },
// //     },
// //     plugins: {
// //       legend: { labels: { font: { size: 14 } } },
// //       title: {
// //         display: true,
// //         text: "Monthly Campaign Rates (Scatter Chart)",
// //         font: { size: 18, weight: "bold" },
// //       },
// //       tooltip: { enabled: true, mode: "nearest", intersect: false },
// //     },
// //   };

// //   return (
// //     <div style={chartWrapperStyle}>
// //       <Scatter data={chartData} options={options} />
// //     </div>
// //   );
// // };

// // export default MonthlyCampaignScatterChart;

// // MonthlyCampaignScatterChart.jsx
// import React from "react";
// import { Scatter } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

// const chartWrapperStyle = {
//   height: "300px",
//   backgroundColor: "white",
//   padding: "1rem",
//   borderRadius: "0.5rem",
//   boxShadow: "0 1px 3px rgb(0 0 0 / 0.12), 0 1px 2px rgb(0 0 0 / 0.24)",
// };

// const MonthlyCampaignScatterChart = ({ data }) => {
//   const labels = data.map((d) => d._id.toString());

//   // Map data to {x, y} points where x is index + 1 (numeric), y is campaign count
//   const scatterDataPoints = data.map((d, index) => ({
//     x: index + 1,
//     y: d.totalCampaigns,
//   }));

//   const chartData = {
//     datasets: [
//       {
//         label: "Total Campaigns",
//         data: scatterDataPoints,
//         backgroundColor: "#3b82f6",
//         pointRadius: 7,
//         pointHoverRadius: 10,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       x: {
//         type: "linear",
//         min: 1,
//         max: labels.length,
//         title: {
//           display: true,
//           text: "Month",
//           font: { size: 14, weight: "bold" },
//         },
//         ticks: {
//           stepSize: 1,
//           callback: (value) => labels[value - 1] || value,
//           font: { size: 12 },
//         },
//         grid: { display: false },
//       },
//       y: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: "Total Campaigns",
//           font: { size: 14, weight: "bold" },
//         },
//         grid: { color: "#eee" },
//       },
//     },
//     plugins: {
//       legend: { labels: { font: { size: 14 } } },
//       title: {
//         display: true,
//         text: "Monthly Campaign Rates (Scatter Chart)",
//         font: { size: 18, weight: "bold" },
//       },
//       tooltip: { enabled: true, mode: "nearest", intersect: false },
//     },
//   };

//   return (
//     <div style={chartWrapperStyle}>
//       <Scatter data={chartData} options={options} />
//     </div>
//   );
// };

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
