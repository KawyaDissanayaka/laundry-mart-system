import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Configure axios base URL
const API_BASE_URL = 'http://localhost:8080';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is already logged in on component mount
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error('Error parsing saved user:', error);
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    const register = async (userData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/register`, {
                username: userData.username,
                password: userData.password,
                email: userData.email,
                role: 'CUSTOMER', // Default role for registration
                fullName: userData.name,
                phone: userData.phone,
                address: userData.address
            });

            if (response.status === 200 && response.data) {
                const { token, user } = response.data;
                const userWithToken = { ...user, token };
                setUser(userWithToken);
                localStorage.setItem('user', JSON.stringify(userWithToken));
                return { success: true, user: userWithToken };
            }
        } catch (error) {
            console.error('Registration error:', error);
            if (error.response?.data) {
                // Backend sends string error message directly sometimes
                const errorMessage = typeof error.response.data === 'string'
                    ? error.response.data
                    : error.response.data.message || 'Registration failed';
                return { success: false, error: errorMessage };
            }
            return { success: false, error: 'Registration failed. Please try again.' };
        }
    };

    const login = async (username, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, {
                username,
                password
            });

            if (response.status === 200 && response.data) {
                const { token, user } = response.data;
                const userWithToken = { ...user, token };
                setUser(userWithToken);
                localStorage.setItem('user', JSON.stringify(userWithToken));
                return { success: true, user: userWithToken };
            }
        } catch (error) {
            console.error('Login error:', error);
            if (error.response?.data) {
                const errorMessage = typeof error.response.data === 'string'
                    ? error.response.data
                    : error.response.data.message || 'Login failed';
                return { success: false, error: errorMessage };
            }
            return { success: false, error: 'Invalid username or password' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const value = {
        user,
        loading,
        register,
        login,
        logout,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};