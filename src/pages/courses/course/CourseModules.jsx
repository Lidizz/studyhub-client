import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
//import {CourseCard} from "../CourseCard.jsx";
//import ModuleDetails from "./pages/courses/course/ModuleDetails";




export function CourseModules() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const user = JSON.parse(localStorage.getItem("user"));
  //const instructorId = user?.id;
  //const studentId = user?.id;
  const [modules, setModules] = useState([]);

  useEffect(() => {



    if (!courseId) {
      setError("No module ID found");
      setLoading(false);
      return;
    }

    axios.get(`http://localhost:8080/api/courses/${courseId}/modules`)

        .then(response => {
          setModules(response.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching module:', err);
          setError('Error fetching modules');
          setLoading(false);
        });
  }, [courseId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="relative min-h-screen bg-gray-100 rounded-lg">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-4 text-purple-600">
        <button
          onClick={handleGoBack}
          className="flex items-center mb-4 text-purple-600 hover:text-purple-800"
        >
          <ArrowLeft className="mr-2" /> Back to Course
        </button>
          <button
              onClick={() => navigate(`/course/${courseId}/modules/ModulesCreate`)}

              className="flex items-center rounded-lg p-6 shadow-md text-purple-600 hover:text-purple-800 hover:scale-105 hover:shadow-lg border border-gray-200"
          >
            Create Module
          </button>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Modules for {courseId}
        </h1>
        <div className="grid grid-cols-1 gap-6">
          {modules.map((module) => (
              <div
                  key={module.id}
                  className="bg-white rounded-lg p-6 shadow-md border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => navigate(`/courses/${courseId}/modules/${module.id}`)}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {module.title}
                </h3>
                <p className="text-gray-600 mb-2 line-clamp-2">
                  {module.description}
                </p>
              </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default CourseModules;
