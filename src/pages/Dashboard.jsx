import React from 'react';
import {DashboardCards} from "../components/DashboardCards.jsx";
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const { theme } = useSelector((state) => state.theme);
    return (
        <div className="min-h-screen p-4 md:p-6">
            <div className={`w-full max-w-md mx-auto p-6 md:p-8 rounded-lg shadow-xl ${theme === 'light' ? 'bg-white' : 'bg-opacity-20 bg-gray-900'}`}>
                <h2 className="text-2xl md:text-3xl font-bold text-center gradient-text mb-6">Dashboard</h2>
                <p className="text-center text-sm md:text-base">Welcome to your StudyHub Dashboard! (Under construction)</p>
            </div>

            <div className="w-full max-w-6xl mx-auto p-6 md:p-8 rounded-lg shadow-xl mt-10 min-h-[330px]">
            <h1 className={"text-center"}>Your enrolled classes for the semester.</h1>
                <DashboardCards />
            </div>
        </div>
    );
};

export default Dashboard;