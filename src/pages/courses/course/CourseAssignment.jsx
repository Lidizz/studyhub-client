import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

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

export function CourseAssignment() {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Go back to the previous page
    };

    const assignments = assignmentsData[courseId] || [];

    return (
        <div className="min-h-screen bg-gray-100 rounded-lg">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <button
                    onClick={handleGoBack}
                    className="flex items-center mb-4 text-purple-600 hover:text-purple-800"
                >
                    <ArrowLeft className="mr-2" /> Back to Course
                </button>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Assignments for {courseId}
                </h1>
                <div className="grid grid-cols-1 gap-6">
                    {assignments.map((assignment) => (
                        <div
                            key={assignment.id}
                            className="bg-white rounded-lg p-6 shadow-md border border-gray-200 cursor-pointer"
                            onClick={() => navigate(`/course/${courseId}/assignments/${assignment.id}`)}
                        >
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                {assignment.title}
                            </h3>
                            <p className="text-gray-600 mb-2">{assignment.description}</p>
                            <p className="text-gray-600">Due Date: {assignment.dueDate}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CourseAssignment;



