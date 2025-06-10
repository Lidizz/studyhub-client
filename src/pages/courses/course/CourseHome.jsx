import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, ClipboardList } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { themeConfig } from "../../../themeConfig";
import { iconColors } from "../../../utils/styles";

const CourseHome = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useSelector((state) => state.theme);
  const { bg, text, border, hoverBg } = themeConfig[theme];

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/api/courses/${courseId}`)
      .then((response) => {
        setCourse(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Course not found");
        setLoading(false);
      });
  }, [courseId]);

  if (loading) return <div className="p-6">Loading course information...</div>;
  if (error)
    return (
      <div className="p-6 text-red-600">Error loading course: {error}</div>
    );
  if (!course) return <div className="p-6">Course not found!</div>;

  const handleGoBack = () => navigate("/courses");

  return (
    <div className={`min-h-screen ${bg} ${text} rounded-lg`}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <button
          onClick={handleGoBack}
          className={`flex items-center mb-4 ${
            theme === "light"
              ? "text-[#9333ea] hover:text-[#7b2cbf]"
              : "text-[#f9fafb] hover:text-[#d8b4fe]"
          }`}
        >
          <span
            className="icon-wrapper"
            style={{ "--icon-color": iconColors[theme] }}
          >
            <ArrowLeft size={18} className={`mr-2 ${text}`} />
          </span>
          Back
        </button>

        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        {/* Removed instructor line */}

        <div className="grid grid-cols-1 gap-6">
          <div
            className={`${theme === "light" ? "bg-white" : "bg-gray-800"}  rounded-lg p-8 shadow-md ${border} col-span-1 md:col-span-2 lg:col-span-3 mb-6`}
            style={{ minHeight: "200px" }}
          >
            <h2 className="text-xl font-bold mb-4">Course Information</h2>
            <p className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
              {course.description || "No description available"}
            </p>
          </div>

          <div
            className={`rounded-lg p-6 shadow-md ${border} cursor-pointer ${hoverBg} transition-colors`}
            onClick={() => navigate(`/course/${courseId}/modules`)}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Modules</h2>
              <span
                className="icon-wrapper"
                style={{ "--icon-color": iconColors[theme] }}
              >
                <BookOpen size={24} />
              </span>
            </div>
            <p className="mt-2">View all modules for this course.</p>
          </div>

          <div
            className={`rounded-lg p-6 shadow-md ${border} cursor-pointer ${hoverBg} transition-colors`}
            onClick={() => navigate(`/course/${courseId}/assignments`)}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Assignments</h2>
              <span
                className="icon-wrapper"
                style={{ "--icon-color": iconColors[theme] }}
              >
                <ClipboardList size={24} />
              </span>
            </div>
            <p className="mt-2">View all assignments for this course.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHome;
