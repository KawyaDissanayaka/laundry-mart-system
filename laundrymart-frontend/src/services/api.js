// src/services/api.js   ← Update this file

import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080' });

// Automatically add JWT token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Fixed endpoints (match your working backend)
export const register = (user) => API.post('/register', user);
export const login = (user) => API.post('/login', user);

// These will work after we create the controllers
export const getUsers = () => API.get('/admin/users');           // Only for ADMIN
export const createOrder = (order) => API.post('/customer/orders', order);
export const getMyOrders = () => API.get('/customer/orders');