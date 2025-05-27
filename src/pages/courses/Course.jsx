import { CourseCard } from "./CourseCard.jsx";
import React from "react";

export function CourseGrid() {
    const courses = [
        {
            title: "APP2000",
            instructor: "Prof. Peyman Teymoori",
            nextDeadline: "Feb 15",
            totalModules: 8,
        },
        {
            title: "OBJ2100",
            instructor: "Prof. Tomas Attila Paulsen Olaj",
            nextDeadline: "Feb 20",
            totalModules: 12,
        },
        {
            title: "PRG1000",
            instructor: "Prof. Ståle Vikhagen",
            nextDeadline: "Feb 18",
            totalModules: 6,
        },
    ];

    return (
        <div className="bg-gray-100 p-6 rounded-lg">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Courses</h1>{" "}
            {/* Gray background container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                    <CourseCard key={index} {...course} />
                ))}
            </div>
        </div>
    );
};
export default CourseGrid;


