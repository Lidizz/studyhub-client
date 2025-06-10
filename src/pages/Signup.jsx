import React from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Eye, EyeOff } from 'lucide-react';
import { iconColors } from '../utils/styles';
import {themeConfig} from "../themeConfig.js";

const Signup = () => {
    const [formData, setFormData] = React.useState({
        email: '', firstName: '', lastName: '', role: 'STUDENT', password: '', passwordConfirm: '',
    });
    const [showPassword, setShowPassword] = React.useState(false);
    const [error, setError] = React.useState('');
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
        if (formData.password !== formData.passwordConfirm) {
            setError('Passwords do not match');
            return;
        }
        try {
            await axios.post(`http://localhost:8080/api/users/register`, {
                email: formData.email,
                firstName: formData.firstName,
                lastName: formData.lastName,
                role: formData.role,
                password: formData.password,
            });
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data || 'Registration failed');
        }
    };

    const handleReset = () => {
        setFormData({ email: '', firstName: '', lastName: '', role: 'STUDENT', password: '', passwordConfirm: '' });
        setError('');
    };

    return (
        <div className={`flex min-h-screen ${bg}`}>
            <div className="md:w-1/2 h-64 md:h-auto bg-cover bg-center" style={{ backgroundImage: 'url(/study2.jpg)' }} />
            <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-6">
                <div className={`w-full max-w-md p-6 md:p-8 rounded-lg shadow-md ${bg} ${border}`}>
                    <h2 className={`text-2xl md:text-3xl font-bold text-center ${text} gradient-text`}>Join StudyHub</h2>
                    {error && <p className={`text-center text-sm ${theme === 'light' ? 'text-red-600' : 'text-red-400'}`}>{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label className={`block text-sm font-medium ${text}`}>First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`mt-1 w-full px-4 py-2 rounded-md border ${theme === 'light' ? 'bg-light-bg border-light-accent' : 'bg-dark-bg border-dark-accent'} ${text} focus:outline-none focus:ring-2 focus:ring-[#9333ea]`}
                                    placeholder="Enter first name"
                                    required
                                />
                            </div>
                            <div className="w-1/2">
                                <label className={`block text-sm font-medium ${text}`}>Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`mt-1 w-full px-4 py-2 rounded-md border ${theme === 'light' ? 'bg-light-bg border-light-accent' : 'bg-dark-bg border-dark-accent'} ${text} focus:outline-none focus:ring-2 focus:ring-[#9333ea]`}
                                    placeholder="Enter last name"
                                    required
                                />
                            </div>
                        </div>
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
                            />
                        </div>
                        <div>
                            <label className={`block text-sm font-medium ${text}`}>Role</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className={`mt-1 w-full px-4 py-2 rounded-md border ${theme === 'light' ? 'bg-light-bg border-light-accent' : 'bg-dark-bg border-dark-accent'} ${text} focus:outline-none focus:ring-2 focus:ring-[#9333ea]`}
                                required
                            >
                                <option value="STUDENT">Student</option>
                                <option value="INSTRUCTOR">Instructor</option>
                            </select>
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
                                    <span className="icon-wrapper" style={{'--icon-color': iconColors[theme]}}>
                                        {showPassword ? <Eye size={20}/> : <EyeOff size={20}/>}
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className={`block text-sm font-medium ${text}`}>Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="passwordConfirm"
                                    value={formData.passwordConfirm}
                                    onChange={handleChange}
                                    className={`mt-1 w-full px-4 py-2 rounded-md border ${theme === 'light' ? 'bg-light-bg border-light-accent' : 'bg-dark-bg border-dark-accent'} ${text} focus:outline-none focus:ring-2 focus:ring-[#9333ea]`}
                                    placeholder="Confirm your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400"
                                >
                                    <span className="icon-wrapper" style={{'--icon-color': iconColors[theme]}}>
                                        {showPassword ? <Eye size={20}/> : <EyeOff size={20}/>}
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                className={`w-1/2 py-2 px-4 rounded-md ${accentBg} ${theme === 'light' ? 'text-light-bg' : 'text-dark-bg'} hover:bg-[#7b2cbf] focus:outline-none focus:ring-2 focus:ring-[#9333ea] transition-colors`}
                            >
                                Register
                            </button>
                            <button
                                type="button"
                                onClick={handleReset}
                                className={`w-1/2 py-2 px-4 rounded-md ${theme === 'light' ? 'bg-light-bg text-light-text border border-light-accent hover:bg-gray-200' : 'bg-dark-bg text-dark-text border border-dark-accent hover:bg-gray-700'} focus:outline-none focus:ring-2 focus:ring-[#9333ea] transition-colors`}
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                    <p className={`text-center text-sm mt-4 ${text}`}>
                        Already have an account? <Link to="/login" className={`${theme === 'light' ? 'text-[#9333ea]' : 'text-[#38bdf8]'} hover:underline`}>Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;