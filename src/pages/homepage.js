import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../zustand/research.js';
import API from '../api/index.js';
import LoadingSpinner from '../components/LoadingSpinner.js';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const { profile, setProfile, logout } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
          const { data } = await API.AUTH.authenticate(token);
          setProfile({
            token: data.token,
            userId: data.userId,
            role: data.role,
            fname: data.fname,
            lname: data.lname
          });
          // Clear token from URL
          window.history.replaceState({}, document.title, window.location.pathname);
        } else if (!profile?.token) {
          navigate('/login');
        }
      } catch (error) {
        console.error('Authentication error:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate, setProfile, profile]);

  const handleLogout = async () => {
    try {
      await API.AUTH.logout();
      logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) return <LoadingSpinner fullPage />;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">ResearchBridge</h1>
          {profile ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">
                Welcome, {profile.fname} {profile.lname}
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
            >
              Login / Signup
            </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {profile ? (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Dashboard</h2>
            {/* Add dashboard content here */}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Welcome to ResearchBridge</h2>
            <p className="text-gray-600 mb-6">
              Connect and collaborate with researchers worldwide
            </p>
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Get Started
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;