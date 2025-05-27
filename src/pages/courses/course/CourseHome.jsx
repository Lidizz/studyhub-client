import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, ClipboardList } from "lucide-react";

// Sample data structure - for now
const coursesData = [
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
/*

const modulesData = {
    APP2000: [
        { id: "APP2000-M1", title: "Module 1: Intro to App Dev", content: "..." },
        { id: "APP2000-M2", title: "Module 2: React Basics", content: "..." },
        // ... more modules
    ],
    OBJ2100: [
        // ... modules for OBJ2100
    ],
    // ... modules for other courses
};

const assignmentsData = {
    APP2000: [
        {
            id: "APP2000-A1",
            title: "Assignment 1: First App",
            description: "...",
            dueDate: "2024-03-10",
        },
        {
            id: "APP2000-A2",
            title: "Assignment 2: React Project",
            description: "...",
            dueDate: "2024-03-24",
        },
        // ... more assignments
    ],
    // ... assignments for other courses
};

 */

export function CourseHome() {
    const { courseId } = useParams();
    const navigate = useNavigate();

    // Find the course data based on courseId
    const course = coursesData.find((c) => c.title === courseId);

    if (!course) {
        return <div>Course not found!</div>; // if it does not exist
    }

    // Go back to the previous page
    const handleGoBack = () => {
        navigate(-1);
    };
    /*

    const handleNavigateToModules = () => {
        navigate(`/course/${courseId}/modules`);
    };

    const handleNavigateToAssignments = () => {
        navigate(`/course/${courseId}/assignments`);
    };


     */

    return (
        <div className="min-h-screen bg-gray-100 rounded-lg">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <button
                    onClick={handleGoBack}
                    className="flex items-center mb-4 text-purple-600 hover:text-purple-800"
                >
                    <ArrowLeft className="mr-2" /> Back
                </button>

                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    {course.title}
                </h1>
                <p className="text-gray-600 mb-4">Instructor: {course.instructor}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Course Info Card */}
                    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">
                            Course Information
                        </h2>
                        <p className="text-gray-600">
                            {/* Placeholder content: */}
                            This is a placeholder for the course description. You can replace
                            it with the actual course description from your data.
                        </p>
                    </div>
                    {
                    /*

                    * Modules Card *


                    <div
                        className="bg-white rounded-lg p-6 shadow-md border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={handleNavigateToModules}
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800">Modules</h2>
                            <BookOpen className="text-purple-600" size={24} />
                        </div>
                        <p className="text-gray-600 mt-2">
                            View all modules for this course.
                        </p>
                    </div>






                        /* Assignments Card
                    <div
                        className="bg-white rounded-lg p-6 shadow-md border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={handleNavigateToAssignments}>
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800">Assignments</h2>
                            <ClipboardList className="text-purple-600" size={24} />
                        </div>
                        <p className="text-gray-600 mt-2">
                            View all assignments for this course.
                        </p>
                    </div>


                         */}

                </div>
            </div>
        </div>
    );
};
export default CourseHome;

