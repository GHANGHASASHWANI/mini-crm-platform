

import { useEffect, useState } from "react";

const baseURL = import.meta.env.VITE_API_BASE_URL;

// Render readable rules with icons
function renderRuleDescription(rules) {
  const descriptions = [];

  for (const key in rules) {
    const condition = rules[key];
    if (typeof condition === "object") {
      const operator = Object.keys(condition)[0];
      const value = condition[operator];

      let text = "";
      switch (key) {
        case "totalSpend":
          text = `Total Spend ${operator === "$gte" ? "≥" : "<"} $${value}`;
          break;
        case "visits":
          text = `Visits ${operator === "$gte" ? "≥" : "<"} ${value}`;
          break;
        case "createdAt":
          text = `Customer created after ${new Date(value).toLocaleDateString()}`;
          break;
        case "lastActiveDate":
          text = `Last active after ${new Date(value).toLocaleDateString()}`;
          break;
        default:
          text = `${key} ${operator} ${value}`;
      }

      descriptions.push(text);
    }
  }

  return descriptions;
}

export default function Segments() {
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSegments() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${baseURL}/api/segments`);
        if (!res.ok) throw new Error("Failed to fetch segments");
        const data = await res.json();
        setSegments(data);
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchSegments();
  }, []);

  if (loading)
    return (
      <div className="text-center p-4">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger text-center p-4">
        Error: {error}
      </div>
    );

  return (
    <div className="container py-4" style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
       <h2
        className="mb-4 text-center"
        style={{
          fontWeight: "700",
          fontSize: "3rem",
          letterSpacing: "2px",
          userSelect: "none",
          padding: "15px 0",
          backgroundColor: "#111",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
          color : "whitesmoke"
        }}
      >
        Segments

      </h2>

      <p
        className="text-center text-muted mb-5"
        style={{ fontSize: "1.15rem", maxWidth: "700px", margin: "0 auto" }}
      >
        Explore detailed segments of your customers, including spending habits, visit frequency, and activity timelines.

      </p>
       

      <div className="row g-4">
        {segments.map((segment) => (
          <div key={segment._id} className="col-sm-6 col-lg-4">
            <div
              className="card h-100 shadow-sm border-0"
              style={{
                borderRadius: "15px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                border: "2px solid #a0c4ff",  // subtle light blue border added here
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 16px 28px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
              }}
            >
              {/* Black heading strip */}
              <div
                className="p-3"
                style={{
                  backgroundColor: "black",
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                  textAlign: "center",
                }}
              >
                <h5
                  className="mb-0 text-white"
                  style={{
                    fontWeight: "900",
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    letterSpacing: "2px",
                    userSelect: "none",
                    textTransform: "uppercase",
                  }}
                >
                  {segment.name}
                </h5>
              </div>

              <div className="card-body flex-grow-1">
                <ul className="list-unstyled small text-muted mt-3 mb-0">
                  {renderRuleDescription(segment.rules).map((desc, idx) => (
                    <li
                      key={idx}
                      className="d-flex align-items-center mb-1"
                      style={{ color: "#666" }}
                    >
                      {desc.includes("Spend") && (
                        <i className="fas fa-dollar-sign text-success me-2" aria-hidden="true"></i>
                      )}
                      {desc.includes("Visits") && (
                        <i className="fas fa-eye text-primary me-2" aria-hidden="true"></i>
                      )}
                      {desc.includes("created") && (
                        <i className="fas fa-user-plus text-purple me-2" aria-hidden="true"></i>
                      )}
                      {desc.includes("Last active") && (
                        <i className="fas fa-clock text-warning me-2" aria-hidden="true"></i>
                      )}
                      {desc.includes("after") && !desc.includes("active") && (
                        <i className="fas fa-calendar-plus text-secondary me-2" aria-hidden="true"></i>
                      )}
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="card-footer text-muted small"
                style={{
                  fontWeight: "600",
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                }}
              >
                Created: {new Date(segment.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
