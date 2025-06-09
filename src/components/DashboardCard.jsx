import React from 'react';
import { useSelector } from 'react-redux';
import {themeConfig} from "../themeConfig.js";

const DashboardCard = () => {
    const { theme } = useSelector((state) => state.theme);
    const { bg, text, border } = themeConfig[theme];
    const subjects = [
        { title: "APP200", endDate: "2025-06-12" },
        { title: "DAT2000", endDate: "2025-05-31" },
        { title: "OBJ2100", endDate: "2025-06-23" },
    ];
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {subjects.map((subject) => (
                <div className={`rounded-2xl p-6 border ${border} transition-shadow shadow-md hover:shadow-lg ${bg} ${text}`}>
                    <h2 className="text-xl font-semibold">{subject.title}</h2>
                    <p className="text-sm mt-2">End Date: <span className="font-medium">{subject.endDate}</span></p>
                </div>
            ))}
        </div>
    );
};

export default DashboardCard;