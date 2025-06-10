import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { themeConfig } from "../../../themeConfig";
import { iconColors } from "../../../utils/styles";

export const CourseAssignment = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [course, setCourse] = useState(null);
  const { theme } = useSelector((state) => state.theme);
  const { bg, text, border, hoverBg } = themeConfig[theme];

  useEffect(() => {
    axios.get(`http://localhost:8080/api/courses/${courseId}`)
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

  },[courseId]);

  if (loading)
    return <div className={`p-6 ${text}`}>Loading assignments...</div>;
  if (error)
    return (
      <div
        className={`p-6 ${theme === "light" ? "text-red-600" : "text-red-400"}`}
      >
        Error loading assignments: {error}
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
              <ArrowLeft size={18} className={`mr-2 ${text}`} />
            </span>
            Back to Course
          </button>
        </div>
        <h1 className="text-3xl font-bold mb-4">Assignments for {course?.name || course?.title || `Course ${courseId}`} </h1>
        {assignments.length === 0 ? (
          <div className={`text-center py-8 ${text}`}>
            No assignments available.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                className={`rounded-lg p-6 shadow-md cursor-pointer transition-all duration-200 ${bg} ${text} ${border} ${hoverBg} hover:shadow-lg`}
                onClick={() =>
                  navigate(`/course/${courseId}/assignments/${assignment.id}`)
                }
              >
                <h3 className={`text-xl font-bold ${text}`}>
                  {assignment.title}
                </h3>
                <p className={`text-sm ${text}`}>
                  {assignment.description || "No description available"}
                </p>
                <p className={`text-sm ${text}`}>
                  Due:{" "}
                  {assignment.dueDate
                    ? new Date(assignment.dueDate).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseAssignment;
