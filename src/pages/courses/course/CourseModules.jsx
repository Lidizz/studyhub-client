import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const modulesData = {
  APP2000: [
    {
      id: "APP2000-M1",
      title: "Module 1: Intro to App Dev",
      content: "Why app?",
    },
    { id: "APP2000-M2", title: "Module 2: React Basics", content: "..." },
    { id: "APP2000-M3", title: "Module 3: React Basics 2", content: "..." },
    // ... more modules
  ],
  OBJ2100: [
    // ... modules for OBJ2100
  ],
  // ... modules for other courses
};

export function CourseModules() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const modules = modulesData[courseId] || []; // Get modules for the course

  return (
    <div className="min-h-screen bg-gray-100 rounded-lg">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <button
          onClick={handleGoBack}
          className="flex items-center mb-4 text-purple-600 hover:text-purple-800"
        >
          <ArrowLeft className="mr-2" /> Back to Course
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Modules for {courseId}
        </h1>
        <div className="grid grid-cols-1 gap-6">
          {modules.map((module) => (
            <div
              key={module.id}
              className="bg-white rounded-lg p-6 shadow-md border border-gray-200"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {module.title}
              </h3>
              <p className="text-gray-600">{module.content}</p>
              {/* Add more module details or links here */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseModules;
