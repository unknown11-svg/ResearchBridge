import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../zustand/research.js';

const Home = () => {
  const { profile, setProfile } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    setProfile(null);
    navigate('/');
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const token = urlParams.get("token");
    const userId = urlParams.get("userId");
    const role = urlParams.get("role");
    const fname = urlParams.get("fname");
    const lname = urlParams.get("lname");

    if (token && userId && role) {
      setProfile({ token, userId, role, fname, lname });
      navigate("/");
    }
  }, [navigate, setProfile]);

  const buttonStyle = {
    width: '100%',
    height: '54px',
    cursor: 'pointer',
    outline: 'none',
    color: 'white',
    fontWeight: '500',
    border: 'none',
    fontSize: '1.2rem',
    background: 'linear-gradient(45deg, #2D3248, #D4B584, #393F59)',
    marginTop: '2.19rem',
    borderRadius: '0.31rem'
  };

  return (
    <section>
      <header>
        <nav>
          {profile ? (
            <section>
              <span>Welcome, {profile.fname} {profile.lname}</span>
              <button onClick={handleLogout}>Logout</button>
            </section>
          ) : (
            <section>
              <main>
                <h1>Welcome to the ResearchBridge Homepage</h1>
                <p>
                  ResearchBridge is a University Collaboration Platform<br />
                  It is a web-based application designed to streamline academic collaboration<br />
                  within university
                </p>
              </main>
              <button style={buttonStyle} onClick={() => navigate('/login')}>
                Login
              </button>
              <button style={buttonStyle} onClick={() => navigate('/signup')}>
                Signup
              </button>
            </section>
          )}
        </nav>
      </header>
    </section>
  );
};

export default Home;
