import React, { useEffect, useState }  from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, ClipboardList } from "lucide-react";
import { getCourseById } from '../../../services/api';




export function CourseHome() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        getCourseById(courseId)
            .then((response) => {
                setCourse(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message || 'Course not found');
                setLoading(false);
            });
    }, [courseId]);

    if (loading) return <div className="p-6">Loading course information...</div>;
    if (error) return <div className="p-6 text-red-600">Error loading course: {error}</div>;
    if (!course) return <div className="p-6">Course not found!</div>;


    return (
        <div className="min-h-screen bg-gray-100 rounded-lg">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center mb-4 text-purple-600 hover:text-purple-800"
                >
                    <ArrowLeft className="mr-2" /> Back
                </button>

                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    {course.title}
                </h1>
                <p className="text-gray-600 mb-4">Instructor: {course.instructor}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">
                            Course Information
                        </h2>
                        <p className="text-gray-600">
                            {/* Placeholder content: */}
                            {course.description || "This is a placeholder for the course description."}
                        </p>
                    </div>

                    <div
                        className="bg-white rounded-lg p-6 shadow-md border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => navigate(`/course/${courseId}/modules`)}
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800">Modules</h2>
                            <BookOpen className="text-purple-600" size={24} />
                        </div>
                        <p className="text-gray-600 mt-2">
                            View all modules for this course.
                        </p>
                    </div>

                    <div
                        className="bg-white rounded-lg p-6 shadow-md border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => navigate(`/course/${courseId}/assignments`)}
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800">Assignments</h2>
                            <ClipboardList className="text-purple-600" size={24} />
                        </div>
                        <p className="text-gray-600 mt-2">
                            View all assignments for this course.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseHome;






