// src/pages/Register.jsx
import React, { useState } from 'react';
import { register } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    role: 'CUSTOMER',  // Default to CUSTOMER
    fullName: '',
    phone: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await register(formData);
      console.log('Registration success:', res.data);

      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);  // Redirect after 2 seconds
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data || 'Registration failed. Try a different username.');
    }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Create Account - LaundyMart</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <form onSubmit={handleRegister}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', padding: '10px', margin: '10px 0' }}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', padding: '10px', margin: '10px 0' }}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', padding: '10px', margin: '10px 0' }}
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', padding: '10px', margin: '10px 0' }}
        >
          <option value="CUSTOMER">Customer</option>
          <option value="EMPLOYEE">Employee (Worker)</option>
          <option value="RIDER">Rider</option>
          <option value="ADMIN">Admin</option>
        </select>
        <input
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', padding: '10px', margin: '10px 0' }}
        />
        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', padding: '10px', margin: '10px 0' }}
        />
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', padding: '10px', margin: '10px 0' }}
        />

        <button type="submit" style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none' }}>
          Register
        </button>
      </form>

      <p style={{ marginTop: '20px' }}>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};

export default Register;