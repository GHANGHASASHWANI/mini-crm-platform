import React, { useState } from "react";
import Sidebar from "../widgets/layout/Sidebar";
import CRMNavbar from "../widgets/layout/Navbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <Sidebar open={openSidebar} onClose={() => setOpenSidebar(false)} />

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column">
        <CRMNavbar />
        <main className="p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
