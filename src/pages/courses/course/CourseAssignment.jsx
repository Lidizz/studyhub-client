import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {ArrowLeft } from "lucide-react";
import axios from "axios";

export function CourseAssignment() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        axios.get(`http://localhost:8080/api/courses/${courseId}/assignments`)
            .then((response) => {
                setAssignments(response.data);
                setLoading(false);
            })

            .catch(err => {
                setError(err.message || "Assignment not found");
                setLoading(false);
            });
    }, [courseId]);

    if (loading) return <div className="p-6">Loading assignments...</div>;
    if (error) return <div className="p-6 text-red-600">Error loading assignments: {error}</div>;

    return (
        <div className="min-h-screen bg-gray-100 rounded-lg">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center mb-4 text-purple-600 hover:text-purple-800"
                >
                    <ArrowLeft className="mr-2" /> Back to Course
                </button>

                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Assignments for {courseId}
                </h1>

                {assignments.length === 0 ? (
                    <div className="text-center text-gray-600 py-8">
                        No assignments available for this course.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {assignments.map((assignment) => (
                            <div
                                key={assignment.id}
                                className="bg-white rounded-lg p-6 shadow-md border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => navigate(`/course/${courseId}/assignments/${assignment.id}`)}
                            >
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    {assignment.title}
                                </h3>
                                <p className="text-gray-600 mb-2 line-clamp-2">
                                    {assignment.description}
                                </p>
                                <p className="text-gray-600">
                                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CourseAssignment;














