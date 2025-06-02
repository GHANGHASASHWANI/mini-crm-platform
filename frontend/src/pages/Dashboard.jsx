
import { useEffect, useState } from "react";
import { Card, Spinner, Alert } from "react-bootstrap";
import { FaUsers, FaShoppingCart, FaBullhorn } from "react-icons/fa";

import TopCampaignsChart from "../components/analytics/TopCampaignsChart";
import TopEngagedCustomersLineChart from "../components/analytics/TopEngagedCustomersLineChart";

import JsonUpload from "../components/JsonUpload";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const StatCard = ({ Icon, title, value, description, color }) => (
  <Card className="mb-4 shadow-sm">
    <Card.Body>
      <div className="d-flex align-items-center mb-2">
        <Icon className={`me-3 text-${color}`} size={32} />
        <h5 className="mb-0 fw-bold">{title}</h5>
      </div>
      <h2 className="fw-bold">{value}</h2>
      <p className="text-muted">{description}</p>
    </Card.Body>
  </Card>
);

export default function Dashboard() {
  const [stats, setStats] = useState({
    customers: 0,
    ordersToday: 0,
    campaigns: 0,
  });
  const [topCampaigns, setTopCampaigns] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Additional states for CSV upload
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  async function fetchStats() {
    setLoading(true);
    setError(null);
    try {
      const [
        customersRes,
        ordersRes,
        campaignsRes,
        topCampaignsRes,
        topCustomersRes,
      ] = await Promise.all([
        fetch(`${baseURL}/api/customers`),
        fetch(`${baseURL}/api/orders`),
        fetch(`${baseURL}/api/campaigns`),
        fetch(`${baseURL}/api/analytics/top-campaigns`),
        fetch(`${baseURL}/api/analytics/most-engaged-customers`),
      ]);

      if (
        !customersRes.ok ||
        !ordersRes.ok ||
        !campaignsRes.ok ||
        !topCampaignsRes.ok ||
        !topCustomersRes.ok
      ) {
        throw new Error("Failed to fetch some data");
      }

      const customers = await customersRes.json();
      const orders = await ordersRes.json();
      const campaigns = await campaignsRes.json();
      const topCampaignsJson = await topCampaignsRes.json();
      const topCustomersJson = await topCustomersRes.json();

      const today = new Date().toISOString().slice(0, 10);
      const ordersTodayCount = orders.filter(
        (o) => new Date(o.orderDate).toISOString().slice(0, 10) === today
      ).length;

      setStats({
        customers: customers.length,
        ordersToday: ordersTodayCount,
        campaigns: campaigns.length,
      });

      setTopCampaigns(topCampaignsJson);
      setTopCustomers(topCustomersJson);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  // CSV upload success handler
  const onUploadSuccess = () => {
    setUploading(false);
    setUploadError(null);
    fetchStats(); // Refresh stats after upload
  };

  // CSV upload error handler
  const onUploadError = (msg) => {
    setUploading(false);
    setUploadError(msg);
  };

  // CSV upload start handler
  const onUploadStart = () => {
    setUploading(true);
    setUploadError(null);
  };

  if (loading) {
    return (
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <Spinner animation="border" variant="primary" />
        <h5 className="ms-3">Loading dashboard...</h5>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <Card body className="border-danger">
          <h5 className="text-danger">Error loading dashboard!</h5>
          <p>{error}</p>
        </Card>
      </div>
    );
  }

  // Show CSV Upload prompt if no customers present
  if (stats.customers === 0) {
    return (
      <div className="container py-4">
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <h4>No Customers Found</h4>
            <p>
              It looks like your customer database is empty. Please upload a JSON
              file to get started.
            </p>
            {uploadError && <Alert variant="danger">{uploadError}</Alert>}
            <JsonUpload
              onUploadStart={onUploadStart}
              onUploadSuccess={onUploadSuccess}
              onUploadError={onUploadError}
              uploading={uploading}
            />
          </Card.Body>
        </Card>
      </div>
    );
  }

  // Main Dashboard UI
  return (
    <div className="container py-3">
      <h2
        className="mb-4 text-center"
        style={{
          fontWeight: "700",
          fontSize: "3rem",
          userSelect: "none",
          padding: "15px 0",
          backgroundColor: "#111",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
          color: "whitesmoke",
          letterSpacing: "2px",
        }}
      >
        Welcome to Your Dashboard
      </h2>

      <p
        className="text-center text-muted mb-5"
        style={{ fontSize: "1.15rem", maxWidth: "700px", margin: "0 auto" }}
      >
        Get a quick overview of your CRM statistics
      </p>

      <div className="row">
        <div className="col-md-4">
          <StatCard
            Icon={FaUsers}
            title="Total Customers"
            value={stats.customers}
            description="All registered customers in the CRM."
            color="primary"
          />
        </div>
        <div className="col-md-4">
          <StatCard
            Icon={FaShoppingCart}
            title="Orders Today"
            value={stats.ordersToday}
            description="Orders placed today across the platform."
            color="success"
          />
        </div>
        <div className="col-md-4">
          <StatCard
            Icon={FaBullhorn}
            title="Total Campaigns"
            value={stats.campaigns}
            description="Number of marketing campaigns launched."
            color="warning"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Card className="shadow-sm">
            <Card.Header className="bg-secondary text-white">
              Recent Activity Overview
            </Card.Header>
            <Card.Body>
              {topCampaigns.length > 0 ? (
                <TopCampaignsChart data={topCampaigns} />
              ) : (
                <p className="text-muted text-center">
                  (No campaign data available)
                </p>
              )}
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-6">
          <Card className="shadow-sm">
            <Card.Header className="bg-info text-white">
              Quick Insights
            </Card.Header>
            <Card.Body>
              {topCustomers.length > 0 ? (
                <TopEngagedCustomersLineChart data={topCustomers} />
              ) : (
                <p className="text-muted text-center">
                  (No customer engagement data)
                </p>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
