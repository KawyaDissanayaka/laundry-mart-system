// src/components/Navbar.jsx
import React from 'react';
import { getUser, logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;  // Don't show navbar on login/register

  return (
    <nav style={{
      background: '#343a40',
      color: 'white',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <h2 style={{ margin: 0 }}>LaundyMart</h2>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <span>Welcome, <strong>{user.fullName || user.username}</strong> ({user.role})</span>
        <a href="/profile" style={{ color: '#ccc', textDecoration: 'none' }}>Profile</a>
        <button
          onClick={handleLogout}
          style={{
            background: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;