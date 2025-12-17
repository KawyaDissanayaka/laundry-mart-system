import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Role-based protection
    if (user?.role === 'admin') {
        return <Navigate to="/admin" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        // Redirect based on their actual role
        switch (user?.role) {
            case 'rider': return <Navigate to="/rider-dashboard" replace />;
            case 'employee': return <Navigate to="/employee-dashboard" replace />;
            case 'customer': return <Navigate to="/customer-dashboard" replace />;
            default: return <Navigate to="/" replace />;
        }
    }

    return children;
}
