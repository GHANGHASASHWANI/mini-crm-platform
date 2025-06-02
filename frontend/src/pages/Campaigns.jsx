
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function CampaignCard({ campaign, onEdit, onDelete }) {
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
        <div className="card-body py-3 px-4">
          <p className="mb-2 text-center">
            <strong>Segment:</strong>{" "}
            <span className="text-muted">{campaign.segment?.name || "N/A"}</span>
          </p>
          <p className="mb-2 text-center">
            <strong>Sent:</strong> <span className="text-muted">{campaign.sent}</span>
          </p>
          <p className="mb-2 text-center">
            <strong>Failed:</strong> <span className="text-muted">{campaign.failed}</span>
          </p>
          <p className="mb-3 text-center">
            <strong>Audience Size:</strong>{" "}
            <span className="text-muted">{campaign.audienceSize}</span>
          </p>
          <div className="d-flex justify-content-center gap-3">
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
  const [aiMessage, setAiMessage] = useState(""); // <-- AI message state

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchCampaigns();
    fetchAIMessage();  // Fetch AI message on mount
  }, [baseURL]);

  async function fetchCampaigns() {
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

  // async function fetchAIMessage() {
  //   try {
  //     // Simulate AI summary fetch; replace this with actual API call if needed
  //     // Example: const res = await fetch(`${baseURL}/api/campaigns/ai-summary`);
  //     // const json = await res.json();
  //     // setAiMessage(json.summary);

  //     setAiMessage(
  //       "AI Summary: Your campaigns are performing steadily with high engagement. Consider boosting your failed campaigns for better reach."
  //     );
  //   } catch (err) {
  //     console.error("Error fetching AI message:", err);
  //     setAiMessage("AI Summary is currently unavailable.");
  //   }
  // }
  async function fetchAIMessage() {
  try {
    console.log(baseURL);
    const res = await fetch(`${baseURL}/api/campaigns/summary/ai`);
    if (!res.ok) throw new Error("Failed to fetch AI message");
    const json = await res.json();
    setAiMessage(json.summary || "No summary available.");
  } catch (err) {
    console.error("Error fetching AI message:", err);
    setAiMessage("AI Summary is currently unavailable.");
  }
}


  async function handleDelete(id) {
    try {
      setLoading(true);
      const res = await fetch(`${baseURL}/api/campaigns/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete campaign");

      setCampaigns((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting campaign:", err);
      setError("Failed to delete campaign. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(campaign) {
    alert(`Edit feature not implemented yet for campaign: "${campaign.name}"`);
  }

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
        className="mb-3 text-center"
        style={{
          fontWeight: "700",
          fontSize: "3rem",
          letterSpacing: "2px",
          userSelect: "none",
          padding: "15px 0",
          backgroundColor: "#111",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
          color: "whitesmoke",
        }}
      >
        Campaigns
      </h2>

      {/* AI Message just below heading */}
      {aiMessage && (
        <div
          className="mb-4 text-center"
          style={{
            fontSize: "1.25rem",
            fontStyle: "italic",
            color: "#2a9d8f",
            userSelect: "text",
          }}
          aria-live="polite"
        >
          {aiMessage}
        </div>
      )}

      <p
        className="text-center text-muted mb-5"
        style={{ fontSize: "1.15rem", maxWidth: "700px", margin: "0 auto" }}
      >
        Overview and management of your marketing campaigns.
      </p>

      <div className="row">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign._id}
            campaign={campaign}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
