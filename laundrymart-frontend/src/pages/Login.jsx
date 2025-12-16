// src/pages/Login.jsx
import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ username, password });
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect based on role
      if (user.role === 'ADMIN') navigate('/admin');
      else if (user.role === 'CUSTOMER') navigate('/customer');
      else if (user.role === 'EMPLOYEE') navigate('/employee');
      else if (user.role === 'RIDER') navigate('/rider');
      
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Login to LaundyMart</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{display: 'block', width: '100%', padding: '10px', margin: '10px 0'}}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{display: 'block', width: '100%', padding: '10px', margin: '10px 0'}}
          required
        />
        <button type="submit" style={{padding: '10px 20px', background: '#007bff', color: 'white', border: 'none'}}>
          Login
        </button>
        <p style={{ marginTop: '20px' }}>
  Don't have an account? <a href="/register">Register here</a>
</p><picture>
    <source media="(min-width: )" srcset="" />
    <img src="" alt="" />
</picture>
      </form>
    </div>
  );
};

export default Login;