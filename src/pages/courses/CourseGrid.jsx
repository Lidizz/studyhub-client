import CourseCard from "./CourseCard.jsx";
import React from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import { themeConfig } from '../../themeConfig';

const CourseGrid = () => {
    const [courses, setCourses] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const studentId = user?.id;
    const { theme } = useSelector((state) => state.theme);
    const { bg, text } = themeConfig[theme];

    React.useEffect(() => {
        if (!studentId) {
            setError("No student ID found");
            setLoading(false);
            return;
        }
        axios.get(`http://localhost:8080/api/courses/student/${studentId}/summary`)
            .then((response) => {
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
        <div className={`p-6 rounded-lg ${bg} ${text}`}>
            <h1 className="text-2xl md:text-3xl font-bold text-left gradient-text mb-6">Your Courses</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.length === 0 && <p>No enrolled courses.</p>}
                {courses.map((course, index) => (
                    <CourseCard
                        key={index}
                        id={course.id}
                        title={course.title}
                        department={course.department}
                        credits={course.credits}
                    />
                ))}
            </div>
        </div>
    );
};

export default CourseGrid;