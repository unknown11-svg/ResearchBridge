// Home.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../zustand/research.js';

const Home = () => {
  const { profile, setProfile } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    setProfile(null);  // Clear the profile from the store
    navigate('/');  // Navigate back to the homepage
  };

  useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
  
      const token = urlParams.get("token");
      const userId = urlParams.get("userId");
      const role = urlParams.get("role");
      const fname =urlParams.get("fname");
      const lname = urlParams.get("lname");
  
      if (token && userId && role) {
        // Store the details in Zustand (persisted to localStorage)
        setProfile({ token, userId, role, fname, lname });
  
        // Optionally, navigate to the homepage or a logged-in page
        navigate("/");
      }
    }, [navigate, setProfile]);

  return (
    <div>
      <header>
        <nav>
          {profile ? (
            <div>
              <span>Welcome, {profile.fname} {profile.lname}</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <button onClick={() => navigate('/login')}>Login / Signup</button>
          )}
        </nav>
      </header>

      <main>
        <h1>Welcome to the Homepage</h1>
        <p>This is the homepage content.</p>
      </main>
    </div>
  );
};

export default Home;
