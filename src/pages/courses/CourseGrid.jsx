import CourseCard from "./CourseCard.jsx";
import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { themeConfig } from "../../themeConfig";
import { useNavigate } from "react-router-dom";

const CourseGrid = () => {
  const [courses, setCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  //const studentId = user?.id;
  const userId = user?.id;
  const userRole = user?.role;
  const { theme } = useSelector((state) => state.theme);
  const { bg, text, accentBg } = themeConfig[theme];
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!userId) {
      setError("No user ID found");
      setLoading(false);
      return;
    }
    let endpoint;

    if (userRole === "STUDENT") {
      endpoint = `http://localhost:8080/api/courses/student/${userId}/summary`;
    } else if (userRole === "INSTRUCTOR") {
      endpoint = `http://localhost:8080/api/courses/instructor/${userId}/summary`;
    } else {
      setError("Invalid user role");
      setLoading(false);
      return;
    }

    axios
      .get(endpoint)
      .then((response) => {
        setCourses(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        setError("Error fetching courses");
        setLoading(false);
      });
  }, [userId, userRole]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={`relative p-6 rounded-lg ${bg} ${text}`}>
      <button
        onClick={() => navigate(`/courses/create`)}
        className={`absolute top-10 right-20 z-50 px-5 py-2 rounded-md ${accentBg} ${theme === "light" ? "text-light-bg" : "text-dark-bg"} hover:bg-[#7b2cbf] transition-colors`}
      >
        Create Course
      </button>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-left gradient-text mb-6">
          Your Courses
        </h1>

        <div className="flex justify-between items-center mb-4"></div>

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
    </div>
  );
};

export default CourseGrid;
