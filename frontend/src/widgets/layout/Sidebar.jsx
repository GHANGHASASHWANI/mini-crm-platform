// // src/widgets/layout/Sidebar.jsx
// import React from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import Nav from "react-bootstrap/Nav";

// const routes = [
//   { iconClass: "bi bi-house-door", name: "Dashboard", path: "/dashboard" },
//   { iconClass: "bi bi-people", name: "Customers", path: "/customers" },
//   { iconClass: "bi bi-cart", name: "Orders", path: "/orders" },
//   { iconClass: "bi bi-megaphone", name: "Campaigns", path: "/campaigns" },
//   { iconClass: "bi bi-bar-chart", name: "Analytics", path: "/analytics" },
//   { iconClass: "bi bi-tags", name: "Segments", path: "/segments" },
//   { iconClass: "bi bi-chat-dots", name: "Communication Logs", path: "/communication-logs" },
// ];

// // export default function Sidebar() {
// //   const location = useLocation();

// //   return (
// //     <div className="bg-dark text-white p-3" style={{ width: "240px", minHeight: "100vh" }}>
// //       <h5 className="mb-4 text-center fw-bold">Mini CRM</h5>
// //       <Nav className="flex-column">
// //         {routes.map(({ name, path, iconClass }) => (
// //           <NavLink
// //             key={path}
// //             to={path}
// //             className={({ isActive }) =>
// //               `d-flex align-items-center text-decoration-none px-3 py-2 rounded mb-2 ${
// //                 isActive ? "bg-primary text-white fw-bold" : "text-light"
// //               }`
// //             }
// //           >
// //             <i className={`${iconClass} me-2`}></i> {name}
// //           </NavLink>
// //         ))}
// //       </Nav>
// //     </div>
// //   );
// // }

// export default function Sidebar() {
//   const location = useLocation();

//   return (
//     <div
//       className="bg-dark text-white p-3 d-flex flex-column justify-content-between"
//       style={{ width: "240px", height: "100vh", position: "fixed" }}
//     >
//       {/* Top: Brand */}
//       <h5 className="mb-4 text-center fw-bold">Mini CRM</h5>

//       {/* Middle: Nav Items */}
//       <Nav className="flex-column flex-grow-1">
//         {routes.map(({ name, path, iconClass }) => (
//           <NavLink
//             key={path}
//             to={path}
//             className={({ isActive }) =>
//               `d-flex align-items-center text-decoration-none px-3 py-2 rounded mb-2 ${
//                 isActive ? "bg-primary text-white fw-bold" : "text-light"
//               }`
//             }
//           >
//             <i className={`${iconClass} me-2`}></i> {name}
//           </NavLink>
//         ))}
//       </Nav>

//       {/* Bottom: You can add footer or profile links here if needed */}
//       <div className="text-center small text-muted">© 2025 Mini CRM</div>
//     </div>
//   );
// }

// import React from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import Nav from "react-bootstrap/Nav";

// const routes = [
//   { iconClass: "bi bi-house-door", name: "Dashboard", path: "/dashboard" },
//   { iconClass: "bi bi-people", name: "Customers", path: "/customers" },
//   { iconClass: "bi bi-cart", name: "Orders", path: "/orders" },
//   { iconClass: "bi bi-megaphone", name: "Campaigns", path: "/campaigns" },
//   { iconClass: "bi bi-bar-chart", name: "Analytics", path: "/analytics" },
//   { iconClass: "bi bi-tags", name: "Segments", path: "/segments" },
//   { iconClass: "bi bi-chat-dots", name: "Communication Logs", path: "/communication-logs" },
// ];

// export default function Sidebar() {
//   const location = useLocation();

//   return (
//     <div
//       className="p-3 d-flex flex-column justify-content-between"
//       style={{
//         width: "280px",                // Increased width
//         height: "100vh",
//         position: "fixed",
//         backgroundColor: "white",      // White background
//         marginTop: "10px",             // Margin top
//         marginBottom: "10px",          // Margin bottom
//         marginLeft: "10px",            // Margin left
//         boxShadow: "0 0 10px rgba(0,0,0,0.15)" // Optional: subtle shadow for elevation
//       }}
//     >
//       {/* Top: Brand */}
//       <h5 className="mb-4 text-center fw-bold text-dark">Mini CRM</h5>

//       {/* Middle: Nav Items */}
//       <Nav className="flex-column flex-grow-1">
//         {routes.map(({ name, path, iconClass }) => (
//           <NavLink
//             key={path}
//             to={path}
//             className={({ isActive }) =>
//               `d-flex align-items-center text-decoration-none px-3 py-2 rounded mb-3 ${
//                 isActive
//                   ? "text-white"
//                   : "text-dark"
//               }`
//             }
//             style={({ isActive }) => ({
//               backgroundColor: isActive ? "black" : "transparent",  // Active bg black
//               marginBottom: "12px",                                  // Margin among links
//               fontWeight: isActive ? "700" : "400",                  // Bold active link text
//             })}
//           >
//             <i className={`${iconClass} me-2`}></i> {name}
//           </NavLink>
//         ))}
//       </Nav>

//       {/* Bottom: Footer */}
//       <div className="text-center small text-muted">© 2025 Mini CRM</div>
//     </div>
//   );
// }

import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

const routes = [
  { iconClass: "bi bi-house-door", name: "Dashboard", path: "/dashboard" },
  { iconClass: "bi bi-people", name: "Customers", path: "/customers" },
  { iconClass: "bi bi-cart", name: "Orders", path: "/orders" },
  { iconClass: "bi bi-megaphone", name: "Campaigns", path: "/campaigns" },
  { iconClass: "bi bi-bar-chart", name: "Analytics", path: "/analytics" },
  { iconClass: "bi bi-tags", name: "Segments", path: "/segments" },
  { iconClass: "bi bi-chat-dots", name: "Communication Logs", path: "/communication-logs" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
   <div
  className="p-3 d-flex flex-column justify-content-between"
  style={{
    width: "320px",
    position: "fixed",
    top: "10px",
    bottom: "30px",               // Sets space from bottom
    backgroundColor: "white",
    marginLeft: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.15)",
    borderRadius: "10px",
    overflowY: "auto",            // Enables internal scroll if needed
  }}
>

      <h5 className="mb-4 text-center fw-bold text-dark">Mini CRM</h5>

      <Nav className="flex-column flex-grow-1">
        {routes.map(({ name, path, iconClass }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `d-flex align-items-center text-decoration-none px-3 py-2 rounded-3 mb-3 ${
                isActive ? "text-white" : "text-dark"
              }`
            }
            style={({ isActive }) => ({
              backgroundColor: isActive ? "black" : "transparent",
              fontWeight: isActive ? "700" : "400",
              borderRadius: "12px", // Make link corners rounded
            })}
          >
            <i className={`${iconClass} me-2 fs-5`}></i> {name}
          </NavLink>
        ))}
      </Nav>

      <div className="text-center small text-muted">© 2025 Mini CRM</div>
    </div>
  );
}
