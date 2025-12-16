// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';  // If you created it
import Layout from './components/Layout';
import AdminDashboard from './pages/AdminDashboard';
import CustomerDashboard from './pages/CustomerDashboard';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/login" />;
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />

        {/* All protected pages use Layout (with Navbar) */}
        <Route element={<Layout />}>
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/customer" 
            element={
              <ProtectedRoute allowedRoles={['CUSTOMER']}>
                <CustomerDashboard />
              </ProtectedRoute>
            } 
          />
          {/* Add employee/rider later */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;