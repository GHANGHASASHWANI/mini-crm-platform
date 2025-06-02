import { useEffect, useState } from "react";
const baseURL = import.meta.env.VITE_API_BASE_URL;

function getInitials(name) {
  if (!name) return "";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function CustomerCard({ customer }) {
  return (
    <div className="col-12 col-md-4 mb-4">
      <div
        className="card shadow-sm h-100"
        style={{ borderRadius: "15px", padding: "1rem" }}
      >
        <div className="card-body d-flex flex-column align-items-center text-center">
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              backgroundColor: "white",
              border: "3px solid black",
              color: "black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "700",
              fontSize: "24px",
              userSelect: "none",
              marginBottom: "1rem",
              fontFamily: "Arial, sans-serif",
            }}
            title={customer.name}
          >
            {getInitials(customer.name)}
          </div>

          <h5 className="card-title mb-1 fw-bold">{customer.name}</h5>
          <p className="text-muted mb-1">{customer.email}</p>
          <p className="fw-semibold mb-1">
            Total Spend: ${customer.totalSpend?.toFixed(2) || "0.00"}
          </p>
          <p className="mb-3">
            Visits: {customer.visits || 0} | Last Active:{" "}
            {customer.lastActiveDate
              ? new Date(customer.lastActiveDate).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCustomers() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${baseURL}/api/customers`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setCustomers(data);
      } catch (err) {
        setError(err.message || "Failed to fetch customers.");
      } finally {
        setLoading(false);
      }
    }
    fetchCustomers();
  }, []);

  return (
    <div className="container py-4">
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
        Customers

      </h2>

      <p
        className="text-center text-muted mb-5"
        style={{ fontSize: "1.15rem", maxWidth: "700px", margin: "0 auto" }}
      >
 See information about all your customers with total spend, visits, and
        last active dates.
      </p>
      

      {loading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "12rem" }}
        >
          <div className="spinner-border text-primary" role="status" />
          <span className="ms-3">Loading customers...</span>
        </div>
      )}

      {error && (
        <div
          className="alert alert-danger mx-auto"
          role="alert"
          style={{ maxWidth: "600px" }}
        >
          <h5 className="alert-heading">Error loading customers!</h5>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && customers.length === 0 && (
        <p className="text-center mt-5">No customers found.</p>
      )}

      <div className="row">
        {customers.map((customer) => (
          <CustomerCard key={customer._id} customer={customer} />
        ))}
      </div>
    </div>
  );
}
