
import React, { useEffect, useState } from "react";
import { FaChartBar, FaChartPie, FaUsers, FaCalendarAlt, FaTruck } from "react-icons/fa";

import TopCampaignsChart from "../components/analytics/TopCampaignsChart";
import CampaignSuccessPie from "../components/analytics/CampaignSuccessPie";
import MonthlyCampaignPointChart from "../components/analytics/MonthlyCampaignPointChart";
import TopEngagedCustomersLineChart from "../components/analytics/TopEngagedCustomersLineChart";
import DeliveryStatusDoughnut from "../components/analytics/DeliveryStatusDoughnut";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function Analytics() {
  const [topCampaigns, setTopCampaigns] = useState(null);
  const [campaignSuccess, setCampaignSuccess] = useState(null);
  const [topCustomers, setTopCustomers] = useState(null);
  const [monthlyStats, setMonthlyStats] = useState(null);
  const [deliveryStatus, setDeliveryStatus] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAnalytics() {
      setLoading(true);
      setError(null);

      try {
        const endpoints = [
          "top-campaigns",
          "campaign-success",
          "most-engaged-customers",
          "monthly-campaign-stats",
          "delivery-status",
        ];

        const requests = endpoints.map((endpoint) =>
          fetch(`${baseURL}/api/analytics/${endpoint}`).then((res) => {
            if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
            return res.json();
          })
        );

        const [
          topCampaignsData,
          campaignSuccessData,
          topCustomersData,
          monthlyStatsData,
          deliveryStatusData,
        ] = await Promise.all(requests);

        setTopCampaigns(topCampaignsData);
        setCampaignSuccess(campaignSuccessData);
        setTopCustomers(topCustomersData);
        setMonthlyStats(monthlyStatsData);
        setDeliveryStatus(deliveryStatusData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-5" style={{ fontSize: "1.2rem", color: "#555" }}>
        Loading analytics...
      </div>
    );
  if (error)
    return (
      <div
        className="text-center mt-5"
        style={{ fontSize: "1.2rem", color: "crimson", fontWeight: "600" }}
      >
        Error: {error}
      </div>
    );

  // Card container style for each analytics section
  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    padding: "20px",
    marginBottom: "30px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "default",
  };

  return (
    <div
      className="container mt-4 mb-5"
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        minHeight: "100vh",
        backgroundColor: "#f9faff",
        paddingTop: "40px",
        paddingBottom: "40px",
      }}
    >
      <h2
        className="mb-4 text-center"
        style={{
          fontWeight: "700",
          fontSize: "3rem",
          color: "#222",
          letterSpacing: "2px",
          userSelect: "none",
          padding: "15px 0",
          backgroundColor: "#111",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
          color : "whitesmoke"
        }}
      >
        Analytics Dashboard
      </h2>

      <p
        className="text-center text-muted mb-5"
        style={{ fontSize: "1.15rem", maxWidth: "700px", margin: "0 auto" }}
      >
        Unlock key insights with real-time data analysis to drive smarter decisions and optimize
        your campaigns.
      </p>

      <div className="row g-4">
        <div
          className="col-md-6"
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.04)";
            e.currentTarget.style.boxShadow = "0 14px 32px rgba(0,0,0,0.18)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
          }}
        >
          <h4 style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
            <FaChartBar color="#3b82f6" /> Top Campaigns
          </h4>
          {topCampaigns && <TopCampaignsChart data={topCampaigns} />}
        </div>

        <div
          className="col-md-6"
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.04)";
            e.currentTarget.style.boxShadow = "0 14px 32px rgba(0,0,0,0.18)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
          }}
        >
          <h4 style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
            <FaCalendarAlt color="#10b981" /> Monthly Campaign Stats
          </h4>
          {monthlyStats && <MonthlyCampaignPointChart data={monthlyStats} />}
        </div>

        <div
          className="col-md-6"
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.04)";
            e.currentTarget.style.boxShadow = "0 14px 32px rgba(0,0,0,0.18)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
          }}
        >
          <h4 style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
            <FaUsers color="#ef4444" /> Top Engaged Customers
          </h4>
          {topCustomers && <TopEngagedCustomersLineChart data={topCustomers} />}
        </div>

        <div
          className="col-md-6"
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.04)";
            e.currentTarget.style.boxShadow = "0 14px 32px rgba(0,0,0,0.18)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
          }}
        >
          <h4 style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
            <FaTruck color="#f59e0b" /> Delivery Status
          </h4>
          {deliveryStatus && <DeliveryStatusDoughnut data={deliveryStatus} />}
        </div>

        {campaignSuccess && campaignSuccess.length > 0 && (
          <div
            className="col-12"
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow = "0 14px 32px rgba(0,0,0,0.18)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
            }}
          >
            <h4 style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
              <FaChartPie color="#8b5cf6" /> Campaign Success
            </h4>
            <CampaignSuccessPie data={campaignSuccess} />
          </div>
        )}
      </div>
    </div>
  );
}
