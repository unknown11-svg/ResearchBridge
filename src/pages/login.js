import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Rings } from "react-loader-spinner";
import googleLogo from "../icons/image.png";
import heroVideo from "../videos/hero.mp4";
import "../styles/login.css";


const LoginPage = () => {
  const [submitting, setSubmitting] = React.useState(false);
  const [message, setMessage] = useState(""); 
  const location = useLocation();

  // Google Auth route
  //"test": "react-scripts test && jest",
 // "test:coverage": "jest --coverage",
  const googleAuthRoute = () => {
    window.location.href = "http://localhost:5000/auth/google"; 
  };

  useEffect(() => {
    setSubmitting(null)
    const queryParams = new URLSearchParams(location.search);
    const messageParam = queryParams.get('message'); // Use 'messageParam' as a local variable
    if (messageParam) {
      setMessage(decodeURIComponent(messageParam)); // Update state with 'setMessage'
    }
  }, [location]);

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

            {message && <div className="message">{message}</div>} {/* Display message if exists */}


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
