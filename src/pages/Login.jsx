import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Eye, EyeOff } from 'lucide-react';
import { inputStyles, buttonStyles, iconColors } from '../utils/styles';
import { API_BASE_URL } from '../config';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { theme } = useSelector((state) => state.theme);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, {
                email: formData.email,
                password: formData.password,
            });
            console.log('Login successful:', response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/dashboard');
        } catch (err) {
            console.error('Login failed:', err);
            setError(err.response?.data || 'An error occurred during login');
        }
    };

    const handleForgotPasswordClick = (e) => {
        e.preventDefault(); // Prevent any form submission interference
        alert('Password reset functionality is not yet implemented. Please contact support.');
    };

    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            <div className="md:w-1/2 h-64 md:h-auto bg-cover bg-center" style={{ backgroundImage: 'url(study2.jpg)' }} />
            <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-6">
                <div className={`w-full max-w-md p-6 md:p-8 rounded-lg shadow-xl ${theme === 'light' ? 'bg-white' : 'bg-opacity-20 bg-gray-900'}`}>
                    <h2 className="text-2xl md:text-3xl font-bold text-center gradient-text mb-6">Login to StudyHub</h2>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`mt-1 w-full px-4 py-2 rounded-md border ${inputStyles[theme]} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                                placeholder="Enter your email"
                                required
                                autoFocus // Ensure email field gets focus
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`mt-1 w-full px-4 py-2 rounded-md border ${inputStyles[theme]} focus:outline-none focus:ring-2 focus:ring-purple-500`}
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
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm">
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm">
                                <a href="#" onClick={handleForgotPasswordClick} className="font-medium text-purple-500 hover:underline">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className={`w-full py-2 px-4 rounded-md ${buttonStyles[theme]} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200`}
                        >
                            Sign In
                        </button>
                    </form>
                    <p className="text-center text-sm mt-4">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-purple-500 hover:underline">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;