import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Dashboard from '../pages/Dashboard';
import Orders from '../pages/Orders';
import OrderDetail from '../pages/OrderDetail';
import CreateOrder from '../pages/CreateOrder';
import Tracking from '../pages/Tracking';
import Riders from '../pages/Riders';
import Customers from '../pages/Customers';
import Home from '../pages/Home';
import Login from '../pages/Login';
import AdminLogin from '../pages/AdminLogin';
import CustomerDashboard from '../pages/CustomerDashboard';
import ProtectedRoute from '../components/ProtectedRoute';
import ProtectedAdminRoute from '../components/ProtectedAdminRoute';
import Employees from '../pages/Employees';
import RiderDashboard from '../pages/RiderDashboard';
import EmployeeDashboard from '../pages/EmployeeDashboard';
import About from '../pages/About';
import Services from '../pages/Services';
import Pricing from '../pages/Pricing';
import Contact from '../pages/Contact';
import SmartFAQ from '../pages/SmartFAQ';
import Settings from '../pages/Settings';
import AdminMessages from '../pages/AdminMessages';
import Register from '../pages/Register';

export default function AppRoutes() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<SmartFAQ />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Customer Routes */}
            <Route
                path="/customer-dashboard"
                element={
                    <ProtectedRoute allowedRoles={['customer']}>
                        <CustomerDashboard />
                    </ProtectedRoute>
                }
            />

            {/* Staff Routes */}
            <Route
                path="/rider-dashboard"
                element={
                    <ProtectedRoute allowedRoles={['rider']}>
                        <RiderDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/employee-dashboard"
                element={
                    <ProtectedRoute allowedRoles={['employee']}>
                        <EmployeeDashboard />
                    </ProtectedRoute>
                }
            />

            {/* Admin Routes (Protected) */}
            <Route
                path="/admin"
                element={
                    <ProtectedAdminRoute>
                        <MainLayout />
                    </ProtectedAdminRoute>
                }
            >
                <Route index element={<Dashboard />} />
                <Route path="orders" element={<Orders />} />
                <Route path="orders/new" element={<CreateOrder />} />
                <Route path="orders/:id" element={<OrderDetail />} />
                <Route path="messages" element={<AdminMessages />} />
                <Route path="tracking" element={<Tracking />} />
                <Route path="riders" element={<Riders />} />
                <Route path="employees" element={<Employees />} />
                <Route path="customers" element={<Customers />} />
                <Route path="analytics" element={<div className="p-4">Analytics Comp</div>} />
                <Route path="settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
            </Route>

            {/* Redirect unknown routes to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
