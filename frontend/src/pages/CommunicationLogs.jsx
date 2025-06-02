

import { useEffect, useState } from "react";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function CommunicationLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${baseURL}/api/communication-logs`);
        if (!res.ok) throw new Error("Failed to fetch communication logs");
        const logsData = await res.json();
        setLogs(logsData);
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const formatTime = (timestamp) => {
    return timestamp
      ? new Intl.DateTimeFormat("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date(timestamp))
      : "N/A";
  };

  const renderStatusBadge = (status) => {
    const lowered = status.toLowerCase();

    const iconMap = {
      sent: "fas fa-paper-plane",
      failed: "fas fa-exclamation-triangle",
      pending: "fas fa-clock",
    };

    const badgeClassMap = {
      sent: "bg-success",
      failed: "bg-danger",
      pending: "bg-warning text-dark",
    };

    return (
      <span className={`badge ${badgeClassMap[lowered] || "bg-secondary"} px-3 py-2`}>
        <i className={`${iconMap[lowered] || "fas fa-info-circle"} me-2`}></i>
        {status}
      </span>
    );
  };

  if (loading) return <div className="p-4">Loading communication logs...</div>;
  if (error) return <div className="p-4 text-danger">Error: {error}</div>;

  return (
    <div className="container my-5">
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
       Communication Logs

      </h2>

      <p
        className="text-center text-muted mb-5"
        style={{ fontSize: "1.15rem", maxWidth: "700px", margin: "0 auto" }}
      >
All interactions delivered to customers      </p>
      

      <div className="table-responsive shadow rounded bg-white p-3">
        <table className="table table-hover align-middle">
          <thead className="table-dark text-white">
            <tr>
              <th><i className="fas fa-bullhorn me-1"></i>Campaign</th>
              <th><i className="fas fa-user me-1"></i>Customer</th>
              <th><i className="fas fa-info-circle me-1"></i>Status</th>
              <th><i className="fas fa-comment-dots me-1"></i>Message</th>
              <th><i className="fas fa-clock me-1"></i>Delivered At</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id}>
                <td>{log.campaignId?.name || "—"}</td>
                <td>{log.customerId?.name || "—"}</td>
                <td>{renderStatusBadge(log.status)}</td>
                <td style={{ maxWidth: "300px", whiteSpace: "pre-wrap" }}>{log.message}</td>
                <td>{formatTime(log.deliveryTime)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
