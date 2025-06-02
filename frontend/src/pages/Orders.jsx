
import { useEffect, useState } from "react";
import { FaShoppingCart, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${baseURL}/api/orders`);
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="container py-4 text-center">
        <div className="spinner-border text-primary" role="status" />
        <div className="mt-2">Loading orders...</div>
      </div>
    );

  if (error)
    return (
      <div className="container py-4">
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      </div>
    );

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <FaCheckCircle className="text-success me-2" />;
      case "pending":
        return <FaClock className="text-warning me-2" />;
      case "cancelled":
        return <FaTimesCircle className="text-danger me-2" />;
      default:
        return <FaShoppingCart className="text-secondary me-2" />;
    }
  };

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
        Orders

      </h2>

      <p
        className="text-center text-muted mb-5"
        style={{ fontSize: "1.15rem", maxWidth: "700px", margin: "0 auto" }}
      >
        A detailed list of recent orders with status and amount information.

      </p>

      <div className="table-responsive">
        <table className="table table-hover shadow rounded-4 overflow-hidden border border-2 border-light-subtle">
          <thead className="table-primary">
            <tr>
              <th className="p-3 text-dark">Order ID</th>
              <th className="p-3 text-dark">Customer</th>
              <th className="p-3 text-dark">Date</th>
              <th className="p-3 text-dark">Status</th>
              <th className="p-3 text-dark">Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="align-middle"
                style={{
                  transition: "background-color 0.3s ease",
                  fontWeight: "500",
                }}
              >
                <td className="p-3">{order._id.slice(-11)}</td>
                <td className="p-3">{order.customerId?.name || "N/A"}</td>
                <td className="p-3">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
                <td className="p-3 d-flex align-items-center">
                  {getStatusIcon(order.status)}
                  {order.status}
                </td>
                <td className="p-3 fw-bold text-primary">
                  ${order.orderAmount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
