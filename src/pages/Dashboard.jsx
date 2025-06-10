import React from 'react';
import DashboardCard from "../components/DashboardCard.jsx";
import { useSelector } from 'react-redux';
import {themeConfig} from "../themeConfig.js";

const Dashboard = () => {
    const { theme } = useSelector((state) => state.theme);
    const { bg, text } = themeConfig[theme];
    return (
        <div className={`min-h-screen p-4 md:p-6 ${bg} ${text}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-left gradient-text mb-6">Dashboard</h2>
            <p className="text-left mb-6">Your enrolled classes for the semester</p>
            <DashboardCard />
        </div>
    );
};

export default Dashboard;
