

// // // import React from "react";
// // // import { Navbar, Container } from "react-bootstrap";

// // // export default function CRMNavbar() {
// // //   return (
// // //     <Navbar bg="light" expand="lg" className="shadow-sm">
// // //       <Container fluid>
// // //         <Navbar.Brand href="/" className="fw-bold">
// // //           Mini CRM hello
// // //         </Navbar.Brand>
// // //       </Container>
// // //     </Navbar>
// // //   );
// // // }
// // // import React from "react";
// // // import { Navbar, Container, Form, FormControl, Button, Nav, Dropdown } from "react-bootstrap";

// // // export default function CRMNavbar({ pageName = "Dashboard" }) {
// // //   return (
// // //     <Navbar bg="light" expand="lg" className="shadow-sm py-2">
// // //       <Container fluid className="d-flex align-items-center justify-content-between">
// // //         <div className="fw-semibold fs-5">{pageName}</div>

// // //         <Form className="flex-grow-1 mx-3 d-flex justify-content-center" style={{ maxWidth: 600 }} role="search">
// // //           <FormControl
// // //             type="search"
// // //             placeholder="Search..."
// // //             aria-label="Search"
// // //             className="rounded-start"
// // //           />
// // //           <Button variant="primary" className="rounded-end">
// // //             <i className="fa fa-search"></i>
// // //           </Button>
// // //         </Form>

// // //         <Nav>
// // //           <Dropdown align="end">
// // //             <Dropdown.Toggle
// // //               variant="outline-secondary"
// // //               id="dropdown-profile"
// // //               className="rounded-circle p-2"
// // //               style={{ width: 40, height: 40 }}
// // //             >
// // //               <i className="fa fa-user"></i>
// // //             </Dropdown.Toggle>

// // //             <Dropdown.Menu>
// // //               <Dropdown.Item href="/profile">My Profile</Dropdown.Item>
// // //               <Dropdown.Item href="/settings">Settings</Dropdown.Item>
// // //               <Dropdown.Divider />
// // //               <Dropdown.Item href="/logout">Logout</Dropdown.Item>
// // //             </Dropdown.Menu>
// // //           </Dropdown>
// // //         </Nav>
// // //       </Container>
// // //     </Navbar>
// // //   );
// // // }
// // import React from "react";
// // import { Navbar, Container, Form, FormControl, Button, Nav } from "react-bootstrap";
// // import { useLocation } from "react-router-dom";

// // export default function CRMNavbar() {
// //   const location = useLocation();

// //   const routeNameMap = {
// //     "/dashboard": "Dashboard",
// //     "/campaigns": "Campaigns",
// //     "/customers": "Customers",
// //     "/orders": "Orders",
// //     "/segments": "Segments",
// //     "/analytics": "Analytics",
// //     "/communication-logs": "Communication Logs",
// //   };

// //   const pageName = routeNameMap[location.pathname] || "Page";

// //   return (
// //     <>
// //       <div style={{ height: "65px" }}></div>

// //       <Navbar
// //         expand="lg"
// //         fixed="top"
// //         style={{
// //           height: "65px",
// //           marginLeft: "333px",
// //           width: "calc(100vw - 353px)",
// //           backgroundColor: "#f8f9fa",
// //           border: "none",
// //           boxShadow: "none",
// //           borderRadius: "10px",
// //           paddingInline: "20px",
// //           zIndex: 1030,
// //         }}
// //       >
// //         <Container fluid className="d-flex align-items-center justify-content-between" style={{ padding: 0 }}>
          
// //           {/* Left: Page Name */}
// //           <div className="fw-bold fs-5" style={{ minWidth: 150 }}>
// //             {pageName}
// //           </div>

// //           {/* Center: Search Bar */}
// //           <div className="d-flex flex-grow-1 justify-content-center">
// //             <Form className="d-flex" style={{ maxWidth: 500, width: "100%" }}>
// //               <FormControl
// //                 type="search"
// //                 placeholder="Search..."
// //                 aria-label="Search"
// //                 className="rounded-start"
// //               />
// //               <Button variant="dark" className="rounded-end ms-2">
// //                 <i className="fa fa-search"></i>
// //               </Button>
// //             </Form>
// //           </div>

// //           {/* Right: Profile Icon */}
// //           <div className="d-flex justify-content-end" style={{ minWidth: 150 }}>
// //             <Nav>
// //               <Button
// //                 variant="dark"
// //                 className="rounded-circle d-flex align-items-center justify-content-center"
// //                 style={{ width: 40, height: 40 }}
// //               >
// //                 <i className="fa fa-user fa-lg text-white"></i>
// //               </Button>
// //             </Nav>
// //           </div>
// //         </Container>
// //       </Navbar>
// //     </>
// //   );
// // }

// import React, { useState, useEffect } from "react";
// import { Navbar, Container, Form, FormControl, Button, Nav } from "react-bootstrap";
// import { useLocation, useNavigate } from "react-router-dom";

// export default function CRMNavbar() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Read user info from localStorage
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) setUser(JSON.parse(storedUser));
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     navigate("/login");
//   };

//   const routeNameMap = {
//     "/dashboard": "Dashboard",
//     "/campaigns": "Campaigns",
//     "/customers": "Customers",
//     "/orders": "Orders",
//     "/segments": "Segments",
//     "/analytics": "Analytics",
//     "/communication-logs": "Communication Logs",
//     "/login": "Login",

//   };

//   const pageName = routeNameMap[location.pathname] || "Page";

//   return (
//     <>
//       <div style={{ height: "65px" }}></div>

//       <Navbar
//         expand="lg"
//         fixed="top"
//         style={{
//           height: "65px",
//           marginLeft: "333px",
//           width: "calc(100vw - 353px)",
//           backgroundColor: "#f8f9fa",
//           border: "none",
//           boxShadow: "none",
//           borderRadius: "10px",
//           paddingInline: "20px",
//           zIndex: 1030,
//         }}
//       >
//         <Container fluid className="d-flex align-items-center justify-content-between" style={{ padding: 0 }}>
//           {/* Left: Page Name */}
//           <div className="fw-bold fs-5" style={{ minWidth: 150 }}>
//             {pageName}
//           </div>

//           {/* Center: Search Bar */}
//           <div className="d-flex flex-grow-1 justify-content-center">
//             <Form className="d-flex" style={{ maxWidth: 500, width: "100%" }}>
//               <FormControl
//                 type="search"
//                 placeholder="Search..."
//                 aria-label="Search"
//                 className="rounded-start"
//               />
//               <Button variant="dark" className="rounded-end ms-2">
//                 <i className="fa fa-search"></i>
//               </Button>
//             </Form>
//           </div>

//           {/* Right: Profile and Logout */}
//           <div className="d-flex justify-content-end align-items-center" style={{ minWidth: 200 }}>
//             {user ? (
//               <>
//                 <span className="me-3 fw-semibold">Hello, {user.name}</span>
//                 <Button variant="outline-danger" size="sm" onClick={handleLogout}>
//                   Logout
//                 </Button>
//               </>
//             ) : (
//               <Nav>
//                 <Button
//                   variant="dark"
//                   className="rounded-circle d-flex align-items-center justify-content-center"
//                   style={{ width: 40, height: 40 }}
//                   onClick={() => navigate("/login")}
//                 >
//                   <i className="fa fa-user fa-lg text-white"></i>
//                 </Button>
//               </Nav>
//             )}
//           </div>
//         </Container>
//       </Navbar>
//     </>
//   );
// }

import React, { useContext } from "react";
import { Navbar, Container, Form, FormControl, Button, Nav, Dropdown } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function CRMNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, loading } = useContext(AuthContext);

  const routeNameMap = {
    "/dashboard": "Dashboard",
    "/campaigns": "Campaigns",
    "/customers": "Customers",
    "/orders": "Orders",
    "/segments": "Segments",
    "/analytics": "Analytics",
    "/communication-logs": "Communication Logs",
    "/login": "Login",
  };

  const pageName = routeNameMap[location.pathname] || "Page";

  if (loading) return null; // or loading spinner

  return (
    <>
      <div style={{ height: "65px" }}></div>
      <Navbar fixed="top" expand="lg" style={{ marginLeft: "333px", width: "calc(100vw - 353px)", backgroundColor: "#f8f9fa" }}>
        <Container fluid className="d-flex align-items-center justify-content-between" style={{ padding: 0 }}>
          <div className="fw-bold fs-5" style={{ minWidth: 150 }}>{pageName}</div>
          <div className="d-flex flex-grow-1 justify-content-center">
            <Form className="d-flex" style={{ maxWidth: 500, width: "100%" }}>
              <FormControl type="search" placeholder="Search..." aria-label="Search" className="rounded-start" />
              <Button variant="dark" className="rounded-end ms-2"><i className="fa fa-search"></i></Button>
            </Form>
          </div>
          <div className="d-flex justify-content-end align-items-center" style={{ minWidth: 200 }}>
            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-secondary" id="dropdown-profile" className="rounded-circle p-2" style={{ width: 40, height: 40 }}>
                  <i className="fa fa-user"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => navigate("/profile")}>My Profile</Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate("/settings")}>Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button variant="dark" className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }} onClick={() => navigate("/login")}>
                <i className="fa fa-user fa-lg text-white"></i>
              </Button>
            )}
          </div>
        </Container>
      </Navbar>
    </>
  );
}
