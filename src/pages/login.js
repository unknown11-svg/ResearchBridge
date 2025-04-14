import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../zustand/research.js"; 
import { Rings } from "react-loader-spinner";
import googleLogo from "../icons/image.png";
import heroVideo from "../videos/hero.mp4";
import "../styles/login.css";

const LoginPage = () => {
  const [submitting] = React.useState(false);
  const navigate = useNavigate();
  const { setAuthData } = useStore(); 

  // Google Auth route
  const googleAuthRoute = () => {
    window.location.href = "http://localhost:5000/auth/google"; 
  };


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userId = params.get("userId");
    const role = params.get("role");

    if (token && userId && role) {
      setAuthData(token, userId, role);
      navigate("/");
    }
  }, [navigate, setAuthData]);

  return (
    <div className="login-container">
      <section className="login-left-section">
        <h1 className="logo-text">ResearchBridge</h1>
        <section className="centered-form">
          <section>
            <section>
              <p className="hero-text">Welcome Back</p>
              <p className="meta-text">Welcome Back! Please enter your details</p>
            </section>

            <section style={{ marginTop: "10px" }}>
              {submitting ? (
                <button className="google-loading">
                  <Rings
                    visible={true}
                    height="30"
                    width="30"
                    color="gray"
                    ariaLabel="rings-loading"
                  />
                </button>
              ) : (
                <button
                  className="google-btn"
                  onClick={googleAuthRoute}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={googleLogo}
                    alt="google-logo"
                    width={"20"}
                    height={"20"}
                  />
                  <p style={{ paddingLeft: "10px" }}>Log in with Google</p>
                </button>
              )}
            </section>

            <section>
              <p>
                Don't have an account?{" "}
                <a className="link signup-link" href="/signup">
                  Sign up
                </a>
              </p>
            </section>
          </section>
        </section>
      </section>

      <section className="login-right-section">
        <video
          className="hero-video"
          src={heroVideo}
          loop
          autoPlay
          muted
        />
        <span className="video-overlay" />
        <p className="overlay-text">Bringing Spazas to You</p>
      </section>
    </div>
  );
};

export default LoginPage;
