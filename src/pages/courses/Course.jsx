import { CourseCard }from "./CourseCard.jsx";
import React from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import { themeConfig } from '../../themeConfig';
import { getCoursesSummaryForStudent, getCoursesSummaryForInstructor} from '../../services/api';

const CourseGrid = () => {
    const [courses, setCourses] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const studentId = user?.id;
    //  userRole detection
    const userRole = user?.role;
    const { theme } = useSelector((state) => state.theme);
    const { bg, text } = themeConfig[theme];

    React.useEffect(() => {
        if (!studentId) {
            setError("No student ID found");
            setLoading(false);
            return;
        }

        // fetch logic with role-based API calls and fallback
        const fetchCourses = async () => {
            try {
                let response;


                if (userRole === 'STUDENT') {
                    console.log('Fetching courses for student...');
                    response = await getCoursesSummaryForStudent(studentId);
                } else if (userRole === 'INSTRUCTOR') {
                    console.log('Fetching courses for instructor...');
                    response = await getCoursesSummaryForInstructor(studentId);
                } else {

                    console.log('Using fallback API...');
                    throw new Error('Using fallback');
                }

                setCourses(response.data);
                setLoading(false);

            } catch (err) {
                console.log('New API failed, trying original method...');


                try {
                    const response = await axios.get(`http://localhost:8080/api/courses/student/${studentId}/summary`);
                    setCourses(response.data);
                    setLoading(false);
                } catch (originalErr) {
                    console.error('Error fetching courses:', originalErr);
                    setError('Error fetching courses');
                    setLoading(false);
                }
            }
        };

        fetchCourses();
    }, [studentId, userRole]);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={`p-6 rounded-lg ${bg} ${text}`}>
            {/* CHANGE: Dynamic title based on user role */}
            <h1 className="text-2xl md:text-3xl font-bold text-left gradient-text mb-6">
                {userRole === 'STUDENT' ? 'Your Courses' :
                    userRole === 'INSTRUCTOR' ? 'Your Teaching Courses' :
                        'Your Courses'}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* CHANGE: Dynamic empty state message based on user role */}
                {courses.length === 0 && (
                    <p>
                        {userRole === 'STUDENT' ? 'No enrolled courses.' :
                            userRole === 'INSTRUCTOR' ? 'No teaching assignments found.' :
                                'No courses found.'}
                    </p>
                )}
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