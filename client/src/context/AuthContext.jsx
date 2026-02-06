import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        setLoading(false);
    }, []);

    const AUTH_URL = (import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/transactions', '/auth') : 'http://localhost:5000/api/auth');

    const login = async (email, password) => {
        try {
            setError(null);
            const res = await axios.post(`${AUTH_URL}/login`, { email, password });

            const { token, user: userData } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(userData);
            return true;
        } catch (err) {
            if (err.code === 'ERR_NETWORK') {
                setError('Server is waking up (Render Free Tier). Please wait 30 seconds and try again.');
            } else {
                setError(err.response?.data?.error || 'Login failed - please check your credentials');
            }
            return false;
        }
    };

    const register = async (name, email, password) => {
        try {
            setError(null);
            const res = await axios.post(`${AUTH_URL}/register`, { name, email, password });

            const { token, user: userData } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(userData);
            return true;
        } catch (err) {
            if (err.code === 'ERR_NETWORK') {
                setError('Server is waking up (Render Free Tier). Please wait 30 seconds and try again.');
            } else {
                setError(err.response?.data?.error || 'Registration failed - email might already exist');
            }
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
