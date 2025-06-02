
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function CampaignCard({ campaign }) {
  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4">
      <div
        className="card h-100 shadow border-0"
        style={{
          borderRadius: "16px",
          overflow: "hidden",
          transition: "all 0.3s ease-in-out",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.boxShadow = "0 12px 18px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
        }}
      >
        {/* Card Header */}
        <div
          className="p-3 text-white"
          style={{
            background: "linear-gradient(135deg, #222 0%, #444 100%)",
            textAlign: "center",
          }}
        >
          <h5 className="mb-0" style={{ fontWeight: "700", userSelect: "none" }}>
            {campaign.name}
          </h5>
        </div>

        {/* Card Body */}
        <div className="card-body py-3 px-4">
          <p className="mb-2 text-center">
            <strong>Segment:</strong>{" "}
            <span className="text-muted">{campaign.segment?.name || "N/A"}</span>
          </p>
          <p className="mb-2 text-center">
            <strong>Sent:</strong>{" "}
            <span className="text-muted">{campaign.sent}</span>
          </p>
          <p className="mb-2 text-center">
            <strong>Failed:</strong>{" "}
            <span className="text-muted">{campaign.failed}</span>
          </p>
          <p className="mb-3 text-center">
            <strong>Audience Size:</strong>{" "}
            <span className="text-muted">{campaign.audienceSize}</span>
          </p>

          {/* Action Buttons */}
          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-outline-dark btn-sm"
              title="Edit Campaign"
              style={{
                fontWeight: "600",
                borderRadius: "8px",
              }}
            >
              <FaEdit className="me-1" />
              Edit
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              title="Delete Campaign"
              style={{
                fontWeight: "600",
                borderRadius: "8px",
              }}
            >
              <FaTrash className="me-1" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseURL = import.meta.env.VITE_API_BASE_URL; // or hardcode for testing

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${baseURL}/api/campaigns`);
        if (!res.ok) throw new Error("Failed to fetch campaigns");

        const data = await res.json();
        setCampaigns(data);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        setError("Failed to load campaigns. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [baseURL]);

  if (loading)
    return (
      <div className="container py-4 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <div className="mt-2">Loading campaigns...</div>
      </div>
    );

  if (error)
    return (
      <div className="container py-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );

  if (campaigns.length === 0)
    return (
      <div className="container py-4 text-center">
        <p>No campaigns found.</p>
      </div>
    );

  return (
    <div className="container py-4">
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
        Campaigns

      </h2>

      <p
        className="text-center text-muted mb-5"
        style={{ fontSize: "1.15rem", maxWidth: "700px", margin: "0 auto" }}
      >
          Overview and management of your marketing campaigns.

      </p>
      
      <div className="row">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign._id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
}
