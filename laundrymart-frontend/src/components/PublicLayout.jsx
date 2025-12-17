// src/components/PublicLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicNavbar from './PublicNavbar';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />
      <Outlet />
    </div>
  );
};

export default PublicLayout;