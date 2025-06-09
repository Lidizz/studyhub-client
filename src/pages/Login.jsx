import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Eye, EyeOff } from 'lucide-react';
import { API_BASE_URL } from '../config';
import {themeConfig} from "../themeConfig.js";
import {iconColors} from "../utils/styles.js";

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { theme } = useSelector((state) => state.theme);
    const { bg, text, accentBg, border } = themeConfig[theme];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, formData);
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data || 'Login failed');
        }
    };

    const handleForgotPasswordClick = (e) => {
        e.preventDefault();
        alert('Password reset not implemented. Contact support.');
    };

    return (
        <div className={`flex min-h-screen ${bg}`}>
            <div className="md:w-1/2 h-64 md:h-auto bg-cover bg-center" style={{ backgroundImage: 'url(/study2.jpg)' }} />
            <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-6">
                <div className={`w-full max-w-md p-6 md:p-8 rounded-lg shadow-md ${bg} ${border}`}>
                    <h2 className={`text-2xl md:text-3xl font-bold text-center ${text} gradient-text`}>Login to StudyHub</h2>
                    {error && <p className={`text-center text-sm ${theme === 'light' ? 'text-red-600' : 'text-red-400'}`}>{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                        <div>
                            <label className={`block text-sm font-medium ${text}`}>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`mt-1 w-full px-4 py-2 rounded-md border ${theme === 'light' ? 'bg-light-bg border-light-accent' : 'bg-dark-bg border-dark-accent'} ${text} focus:outline-none focus:ring-2 focus:ring-[#9333ea]`}
                                placeholder="Enter your email"
                                required
                                autoFocus
                            />
                        </div>
                        <div>
                            <label className={`block text-sm font-medium ${text}`}>Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`mt-1 w-full px-4 py-2 rounded-md border ${theme === 'light' ? 'bg-light-bg border-light-accent' : 'bg-dark-bg border-dark-accent'} ${text} focus:outline-none focus:ring-2 focus:ring-[#9333ea]`}
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400"
                                >
                                    <span className="icon-wrapper" style={{ '--icon-color': iconColors[theme] }}>
                                        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className={`h-4 w-4 ${theme === 'light' ? 'text-[#9333ea]' : 'text-[#38bdf8]'} border-gray-300 rounded focus:ring-[#9333ea]`}
                                />
                                <label htmlFor="remember-me" className={`ml-2 block text-sm ${text}`}>Remember me</label>
                            </div>
                            <a href="#" onClick={handleForgotPasswordClick} className={`text-sm ${theme === 'light' ? 'text-[#9333ea]' : 'text-[#38bdf8]'} hover:underline`}>Forgot password?</a>
                        </div>
                        <button
                            type="submit"
                            className={`w-full py-2 px-4 rounded-md ${accentBg} ${theme === 'light' ? 'text-light-bg' : 'text-dark-bg'} hover:bg-[#7b2cbf] focus:outline-none focus:ring-2 focus:ring-[#9333ea] transition-colors`}
                        >
                            Sign In
                        </button>
                    </form>
                    <p className={`text-center text-sm mt-4 ${text}`}>
                        Don't have an account? <Link to="/signup" className={`${theme === 'light' ? 'text-[#9333ea]' : 'text-[#38bdf8]'} hover:underline`}>Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;