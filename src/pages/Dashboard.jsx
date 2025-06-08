import React from 'react';
import {DashboardCards} from "../components/DashboardCards.jsx";
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const { theme } = useSelector((state) => state.theme);
    return (
        <div className="min-h-screen p-4 md:p-6">
                <h2 className="text-2xl md:text-3xl font-bold text-center gradient-text mb-6">Dashboard</h2>

            <h1 className={"text-center"}>Your enrolled classes for the semester.</h1>
                <DashboardCards />
        </div>
    );
};

export default Dashboard;