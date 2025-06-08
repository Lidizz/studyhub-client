import { CourseCard } from "./CourseCard.jsx";
import React, { useEffect, useState }  from "react";
import { getCoursesSummaryForStudent, getCoursesSummaryForInstructor} from '../../services/api';

export function CourseGrid() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;
    const userRole = user?.role;

    useEffect(() => {
        if (!userId) {
            setError("No user ID found");
            setLoading(false);
            return;
        }

        console.log('User ID:', userId);
        console.log('User Role:', userRole);



        const fetchCourses = async () => {
            try {
                let response;

                if (userRole === 'STUDENT') {
                    console.log('Fetching courses for student...');
                    response = await getCoursesSummaryForStudent(userId);
                } else if (userRole === 'INSTRUCTOR') {
                    console.log('Fetching courses for instructor...');
                    response = await getCoursesSummaryForInstructor(userId);
                }else {
                    throw new Error('user role not valid');
                }

                setCourses(response.data);
                setLoading(false);

            } catch(err) {

                console.error('Error fetching courses:', err);
                setError('Error fetching courses: ' + (err.response?.data || err.message));
                setLoading(false);
            }
        };
        fetchCourses();
    }, [userId, userRole]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="bg-gray-100 p-6 rounded-lg">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">
                {userRole === 'STUDENT' ? 'Your Enrolled Courses' : 'Your Teaching Courses'}

            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.length === 0 &&(
                    <p>
                        {userRole === 'STUDENT'
                            ? 'No enrolled courses.'
                            : 'No teaching assignments found.'}

                    </p>
                )}

                {courses.map((course, index) => (
                    <CourseCard
                        key={index}
                        id = {course.id}
                        title={course.title}
                        instructor={course.department}
                        nextDeadline="N/A"
                        totalModules={course.credits} // NEEDS TO BE UPDATED. INCORRECT FIELD.
                    />
                ))}
            </div>
        </div>
    );
}

export default CourseGrid;