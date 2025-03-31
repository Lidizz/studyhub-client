import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { buttonStyles } from '../utils/styles';

const Profile = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const { theme } = useSelector((state) => state.theme);
    const [profilePic, setProfilePic] = useState('/profile-placeholder.jpg');

    if (!user) {
        navigate('/login');
        return null;
    }

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
                // Optionally save to backend or localStorage here
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 md:p-6">
            <div className={`w-full max-w-md p-6 md:p-8 rounded-lg shadow-xl ${theme === 'light' ? 'bg-white' : 'bg-opacity-20 bg-gray-900'}`}>
                <h2 className="text-2xl md:text-3xl font-bold text-center gradient-text mb-6">User Profile</h2>
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={profilePic}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover mb-4"
                    />
                    <label className="cursor-pointer text-sm text-purple-500 hover:underline">
                        Edit Picture
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>
                </div>
                <div className="space-y-4 text-sm md:text-base">
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>First Name:</strong> {user.firstName}</p>
                    <p><strong>Last Name:</strong> {user.lastName}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                </div>
                <button
                    onClick={handleLogout}
                    className={`mt-6 w-full py-2 px-4 rounded-md ${buttonStyles[theme]} focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200`}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;