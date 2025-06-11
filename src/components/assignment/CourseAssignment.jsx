import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { themeConfig } from "../../themeConfig";
import { iconColors } from "../../utils/styles";

const CourseAssignment = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [course, setCourse] = useState(null);
  const { theme } = useSelector((state) => state.theme);
  const { bg, text, border, hoverBg, accentBg } = themeConfig[theme];
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role || "STUDENT";
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/courses/${courseId}`)
      .then((response) => {
        setCourse(response.data);
      })
      .catch((err) => {
        console.error("Error fetching course:", err);
      });
  }, [courseId]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/api/courses/${courseId}/assignments`)
      .then((response) => {
        setAssignments(response.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setAssignments([]);
          setError(null);
        } else {
          setError(err.message || "Assignments not found");
        }
        setLoading(false);
      });
  }, [courseId]);
  const handleCreateAssignment = () => {
    navigate(`/course/${courseId}/assignments/create`);
  };
  if (loading)
    return <div className={`p-6 ${text}`}>Loading assignments...</div>;
  if (error)
    return (
      <div
        className={`p-6 ${theme === "light" ? "text-red-600" : "text-red-400"}`}
      >
        {" "}
        Error loading assignments: {error}{" "}
      </div>
    );
  const handleGoBack = () => navigate(`/course/${courseId}`);
  return (
    <div className={`min-h-screen ${bg} ${text}`}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handleGoBack}
            className={`flex items-center ${theme === "light" ? "text-[#9333ea] hover:text-[#7b2cbf]" : "text-[#f9fafb] hover:text-[#d8b4fe]"}`}
          >
            <span
              className="icon-wrapper"
              style={{ "--icon-color": iconColors[theme] }}
            >
              {" "}
              <ArrowLeft size={18} className={`mr-2 ${text}`} />{" "}
            </span>{" "}
            Back to Course
          </button>
          {userRole === "INSTRUCTOR" && (
            <button
              onClick={handleCreateAssignment}
              className={`px-6 py-2 rounded-md ${accentBg} ${theme === "light" ? "text-light-bg" : "text-dark-bg"} hover:bg-[#7b2cbf] transition-colors`}
            >
              {" "}
              Create Assignment{" "}
            </button>
          )}{" "}
        </div>
        <h1 className="text-3xl font-bold mb-6">
          {" "}
          Assignments for{" "}
          {course?.name || course?.title || `Course ${courseId}`}{" "}
        </h1>{" "}
        {assignments.length === 0 ? (
          <div className={`text-center py-8 ${text}`}>
            {" "}
            No assignments available.{" "}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {" "}
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                className={`rounded-lg p-6 shadow-md cursor-pointer transition-all duration-200 ${bg} ${text} ${border} ${hoverBg} hover:shadow-lg`}
                onClick={() =>
                  navigate(`/course/${courseId}/assignments/${assignment.id}`)
                }
              >
                <h3 className={`text-xl font-bold ${text} mb-2`}>
                  {" "}
                  {assignment.title}{" "}
                </h3>
                <p
                  className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"} mb-2`}
                >
                  {" "}
                  {assignment.description || "No description available"}{" "}
                </p>
                <p
                  className={`text-sm ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}
                >
                  {" "}
                  Due:{" "}
                  {assignment.dueDate
                    ? new Date(assignment.dueDate).toLocaleDateString()
                    : "N/A"}{" "}
                </p>
              </div>
            ))}{" "}
          </div>
        )}{" "}
      </div>
    </div>
  );
};
export default CourseAssignment;
