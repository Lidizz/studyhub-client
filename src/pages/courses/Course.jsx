import { CourseCard } from "./CourseCard.jsx";
import React, { useEffect, useState }  from "react";
import axios from "axios";

export function CourseGrid() {

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));
    const studentId = user?.id;

    useEffect(() => {

        if (!studentId) {
            setError("No student ID found");
            setLoading(false);
            return;
        }

        axios.get(`http://localhost:8080/api/courses/student/${studentId}/summary`)
            .then(response => {
                setCourses(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching courses:', err);
                setError('Error fetching courses');
                setLoading(false);
            });
    }, [studentId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="bg-gray-100 p-6 rounded-lg">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Courses</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.length === 0 && <p>No enrolled courses.</p>}
                {courses.map((course, index) => (
                    <CourseCard
                        key={index}
                        id ={course.id}
                        title={course.title}
                        instructor={course.department} // optional, replace if needed
                        nextDeadline="N/A"
                        totalModules={course.credits}
                    />
                ))}
            </div>
        </div>
    );
}

export default CourseGrid;
