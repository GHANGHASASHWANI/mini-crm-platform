import React from "react";
import Sidebar from "../widgets/layout/Sidebar";
import Navbar from "../widgets/layout/Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      {/* Sidebar is fixed, so no margin/padding on wrapper */}
      <Sidebar />

      {/* Navbar fixed top, margin-left to avoid sidebar overlap */}
      <Navbar />

      {/* Content container with margin to avoid sidebar and navbar overlap */}
      <div
        style={{
          marginLeft: "320px",  // Sidebar width + some gap
          marginTop: "0px",    // Navbar height
          padding: "20px",
          minHeight: "calc(100vh - 65px)",
          backgroundColor: "#f8f9fa",
        }}
      >
        {children}
      </div>
    </>
  );
}
