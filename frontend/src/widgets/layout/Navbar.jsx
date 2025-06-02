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
