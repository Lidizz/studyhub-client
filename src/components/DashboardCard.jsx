import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { themeConfig } from "../themeConfig.js";

const DashboardCard = () => {
  const { theme } = useSelector((state) => state.theme);
  const { bg, text, border } = themeConfig[theme];
  const [courses, setCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const userRole = user?.role;
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  React.useEffect(() => {
    if (!userId) {
      setError("No user ID found");
      setLoading(false);
      return;
    }

    let endpoint;
    if (userRole === "STUDENT") {
      endpoint = `http://localhost:8080/api/courses/student/${userId}`;
    } else if (userRole === "INSTRUCTOR") {
      endpoint = `http://localhost:8080/api/courses/instructor/${userId}`;
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

  if (loading) return <p className={`text-center ${text}`}>Loading...</p>;
  if (error)
    return (
      <p
        className={`text-center ${theme === "light" ? "text-red-600" : "text-red-400"}`}
      >
        {error}
      </p>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {courses.length === 0 && (
        <p className={`text-center ${text}`}>No enrolled courses.</p>
      )}
      {courses.map((course, index) => (
        <div
          className={`rounded-lg p-4 border ${border} shadow-sm ${bg} ${text}`}
          key={index}
        >
          <h2 className="text-lg font-medium">{course.title}</h2>
          <p className="text-sm mt-1">
            End Date:{" "}
            <span className="font-medium">{formatDate(course.endDate)}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCard;
