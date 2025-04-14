import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../zustand/research.js';
import '../styles/Home.css';  // Assuming you're using a separate CSS file

const Home = () => {
  const { profile, setProfile } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    setProfile(null);  // Clear the profile from the store
    navigate('/login');  // Navigate back to the homepage
  };

  useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
  
      const token = urlParams.get("token");
      const userId = urlParams.get("userId");
      const role = urlParams.get("role");
      const fname = urlParams.get("fname");
      const lname = urlParams.get("lname");
  
      if (token && userId && role) {
        // Store the details in Zustand (persisted to localStorage)
        setProfile({ token, userId, role, fname, lname });
  
        // Optionally, navigate to the homepage or a logged-in page
        navigate("/");
      }
    }, [navigate, setProfile]);

  return (
    <div className="home-container">
      <header className="home-header">
        <nav className="navbar">
          {profile ? (
            <div className="user-info">
              <span className="welcome-text">Welcome, {profile.fname} {profile.lname}</span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <button className="auth-btn" onClick={() => navigate('/login')}>Login / Signup</button>
          )}
        </nav>
      </header>

      <main className="home-main">
        <h1 className="home-title">Welcome to the Homepage</h1>
        <p className="home-content">This is the homepage content. Explore the app and enjoy the features!</p>
      </main>
    </div>
  );
};

export default Home;
