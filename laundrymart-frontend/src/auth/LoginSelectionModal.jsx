// src/auth/LoginSelectionModal.jsx
import React from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginSelectionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <h2 className="text-3xl font-bold text-center mb-8">Welcome Back!</h2>
        <p className="text-center text-gray-600 mb-10">How would you like to login?</p>

        <div className="space-y-4">
          <Link
            to="/login"
            onClick={onClose}
            className="block w-full py-4 text-center bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all"
          >
            Login as Customer
          </Link>
          <p className="text-center text-sm text-gray-500">or</p>
          <button
            onClick={onClose}
            className="w-full py-4 text-center border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all"
          >
            Staff / Admin Login
          </button>
          {/* You can expand this later for separate staff login if needed */}
        </div>

        <p className="text-center mt-8 text-sm text-gray-500">
          Don't have an account? <Link to="/register" onClick={onClose} className="text-blue-600 font-bold hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginSelectionModal;