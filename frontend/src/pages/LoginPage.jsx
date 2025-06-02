
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../widgets/layout/Navbar";
import Sidebar from "../widgets/layout/Sidebar";

const LoginPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

//   const handleGoogleLogin = () => {
//     window.location.href = "http://localhost:5000/auth/google";
//   };
const { signInWithGoogle } = useContext(AuthContext);

const handleGoogleLogin = async () => {
  try {
    await signInWithGoogle();
  } catch (error) {
    console.error("Login failed:", error);
  }
};

  return (
    <>
      <Navbar />
      <div
        className="d-flex"
        style={{ height: "calc(100vh - 60px)", backgroundColor: "#fff" }}
      >
        <Sidebar />
        <main
          className="flex-grow-1 px-4"
          style={{ backgroundColor: "#fff", marginLeft: "250px" }}
        >
          {/* Heading Section */}
          <div
            className="container py-4 text-center"
            style={{ maxWidth: "700px", marginTop: "2rem" }}
          >
            <h2
              className="mb-3"
              style={{
                fontWeight: "700",
                fontSize: "3rem",
                backgroundColor: "#111",
                color: "whitesmoke",
                letterSpacing: "2px",
                userSelect: "none",
                padding: "15px 0",
                borderRadius: "15px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
              }}
            >
              Login
            </h2>
            <p
              className="text-muted"
              style={{ fontSize: "1.15rem", margin: "0 auto" }}
            >
              Sign in to access your dashboard and manage your account.
            </p>
          </div>

          {/* Login Card */}
          <section
            className="shadow rounded-4 d-flex flex-column align-items-center mx-auto mt-5"
            style={{
              width: "400px",
              maxWidth: "90vw",
              padding: "2.5rem 2rem",
              backgroundColor: "#fff",
              borderRadius: "16px",
              border: "2px solid black",
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              animation: "fadeScaleIn 0.4s ease forwards",
              color: "#000",
            }}
          >
            <h2
              className="mb-4 fw-bold d-flex align-items-center"
              style={{ letterSpacing: "1.2px" }}
            >
              <i
                className="fas fa-user-circle me-3"
                style={{ fontSize: "2rem", color: "#4285F4" }}
              ></i>
              Welcome !!
            </h2>
            <button
              className="btn d-flex align-items-center justify-content-center w-100 mb-3"
              onClick={handleGoogleLogin}
              style={{
                backgroundColor: "black",
                color: "#fff",
                fontSize: "1.15rem",
                borderRadius: "12px",
                gap: "10px",
                padding: "12px",
                fontWeight: "600",
                border: "none",
                boxShadow: "0 3px 6px rgba(219, 68, 55, 0.5)",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#c33c2f";
                e.currentTarget.style.boxShadow =
                  "0 4px 10px rgba(195, 60, 47, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "black";
                e.currentTarget.style.boxShadow =
                  "0 3px 6px rgba(219, 68, 55, 0.5)";
              }}
            >
              <i className="fab fa-google" style={{ fontSize: "1.5rem" }}></i>
              Continue with Google
            </button>
            <p
              className="text-center"
              style={{ fontSize: "0.9rem", lineHeight: "1.4", color: "#555" }}
            >
              By continuing, you agree to our{" "}
              <a
                href="/terms"
                style={{ color: "#4285F4", fontWeight: "600" }}
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                style={{ color: "#4285F4", fontWeight: "600" }}
              >
                Privacy Policy
              </a>
              .
            </p>
          </section>
        </main>
      </div>

      <style>{`
        @keyframes fadeScaleIn {
          0% {
            opacity: 0;
            transform: scale(0.85);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @media (max-width: 576px) {
          section {
            width: 95vw !important;
            padding: 2rem !important;
          }
          div.container.py-4.text-center {
            max-width: 95vw !important;
            padding: 1rem !important;
          }
        }
      `}</style>
    </>
  );
};

export default LoginPage;
