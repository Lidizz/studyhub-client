import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { themeConfig } from "../../themeConfig";
import { iconColors } from "../../utils/styles";

const CourseModules = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modules, setModules] = useState([]);
  const [course, setCourse] = useState(null);
  const { theme } = useSelector((state) => state.theme);
  const { bg, text, border, accentBg, hoverBg } = themeConfig[theme];
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role;
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/api/courses/${courseId}`)
      .then((response) => {
        setCourse(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching course:", err);
      });
  }, [courseId]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/api/courses/${courseId}/modules`)
      .then((response) => {
        setModules(response.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setModules([]);
          setError(null);
        } else {
          setError("Error fetching modules");
        }
        setLoading(false);
      });
  }, [courseId]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  const handleGoBack = () => navigate(`/course/${courseId}`);
  return (
    <div className={`relative min-h-screen ${bg} ${text}`}>
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
          {(userRole === "INSTRUCTOR" || userRole === "ADMIN") && (
            <button
              onClick={() =>
                navigate(`/course/${courseId}/modules/ModulesCreate`)
              }
              className={`px-6 py-2 rounded-md ${accentBg} ${theme === "light" ? "text-light-bg" : "text-dark-bg"} hover:bg-[#7b2cbf] transition-colors`}
            >
              {" "}
              Create Module{" "}
            </button>
          )}{" "}
        </div>
        {course && (
          <h1 className="text-3xl font-bold mb-4">
            {" "}
            Modules for {course.title}{" "}
          </h1>
        )}
        <div className="grid grid-cols-1 gap-6">
          {" "}
          {modules.length === 0 && (
            <div className={`text-center py-8 ${text}`}>
              {" "}
              No modules available.{" "}
            </div>
          )}{" "}
          {modules.map((module) => (
            <div
              key={module.id}
              className={`relative rounded-lg p-6 shadow-md ${border} cursor-pointer ${hoverBg} transition-colors ${bg} ${text}`}
            >
              {" "}
              {(userRole === "INSTRUCTOR" || userRole === "ADMIN") && (
                <button
                  onClick={() =>
                    navigate(
                      `/courses/${courseId}/modules/${module.id}/ModulesEdit`,
                    )
                  }
                  className="absolute top-2 right-2 bg-blue-500 text-white rounded px-2 py-1 text-sm shadow"
                >
                  {" "}
                  Edit{" "}
                </button>
              )}
              <div
                className={`cursor-pointer ${hoverBg} transition-colors`}
                onClick={() =>
                  navigate(`/courses/${courseId}/modules/${module.id}`)
                }
              >
                <h3 className={`text-xl font-bold ${text}`}>{module.title}</h3>{" "}
                <p className={`text-sm ${text}`}>
                  {" "}
                  {module.description || "Info in module"}{" "}
                </p>
              </div>
            </div>
          ))}{" "}
        </div>
      </div>
    </div>
  );
};
export default CourseModules;
