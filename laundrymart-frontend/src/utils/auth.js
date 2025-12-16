// src/utils/auth.js

export const saveToken = (token) => localStorage.setItem('token', token);

export const getToken = () => localStorage.getItem('token');

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

export const getRole = () => {
  const user = getUser();
  return user ? user.role : null;
};