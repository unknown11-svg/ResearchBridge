import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../zustand/research.js";
import { Rings } from "react-loader-spinner";
import googleLogo from "../icons/image.png";
import heroVideo from "../videos/hero.mp4";
import "../styles/login.css";
import API from "../api/index.js";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [submittingGoogle, setSubmittingGoogle] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuthData } = useStore();

  const googleAuthRoute = () => {
    setSubmittingGoogle(true);
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await API.USER.login(email, password);
      const { token, userId, role } = response.data;
      const userRes = await API.USER.getById(userId);
      const { fname, lname } = userRes.data;

      const queryParams = new URLSearchParams({
        token,
        userId,
        role,
        fname,
        lname,
      }).toString();
      navigate(`/?${queryParams}`);
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="login-container">
      <section className="login-left-section">
        <h1 className="logo-text">ResearchBridge</h1>
        <section className="centered-form">
          <section>
            <p className="hero-text">Welcome Back</p>
            <p className="meta-text">Welcome Back! Please enter your details</p>
          </section>

          {/* Input Form */}
          <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input
              className="input-field"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

            <label htmlFor="password">Password</label>
            <input
              className="input-field"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

            <div className="remember-and-forgot">
              <div className="remember-me">
                <input
                  id="checkbox"
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <label htmlFor="checkbox">Remember for 30 days</label>
              </div>
              <a href="#" className="link forgot-link">
                Forgot password
              </a>
            </div>

            <button
              type="submit"
              className="email-login-button"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Google Button */}
          <section style={{ marginTop: "10px" }}>
            {submittingGoogle ? (
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

      <section className="login-right-section">
        <video className="hero-video" src={heroVideo} loop autoPlay muted />
        <span className="video-overlay" />
        <p className="overlay-text">Reaserch your horizons</p>
      </section>
    </div>
  );
};

export default LoginPage;
