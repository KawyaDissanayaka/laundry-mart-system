// src/components/Layout.jsx
import React from 'react';
import Navbar from './Navbar';  // We'll create this next
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Outlet />  {/* This renders the child route (dashboard) */}
      </div>
    </div>
  );
};

export default Layout;