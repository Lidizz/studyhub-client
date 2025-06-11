import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { themeConfig } from "../../themeConfig.js";
import { iconColors } from "../../utils/styles.js";

const ModuleDetails = () => {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);
  const { bg, text, border, accentBg } = themeConfig[theme];
  const [module, setModule] = useState(null);
  const [resources, setResources] = useState([]);
  const [loadingModule, setLoadingModule] = useState(true);
  const [loadingResources, setLoadingResources] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role;

  useEffect(() => {
    setLoadingModule(true);
    axios
        .get(`http://localhost:8080/api/courses/${courseId}/modules`)
        .then((res) => setModule(res.data))
        .catch((err) => setError(err.message || "Module not found"))
        .finally(() => setLoadingModule(false));
  }, [courseId, moduleId]);

  useEffect(() => {
    setResources([]);
    setLoadingResources(true);
    axios
        .get(`http://localhost:8080/api/modules/${moduleId}/resources`)
        .then((res) => setResources(res.data))
        .catch(() => setError("Resource not found for module"))
        .finally(() => setLoadingResources(false));
  }, [moduleId]);

  const handleDownload = async (resId, fileName) => {
    try {
      const response = await axios.get(
          `http://localhost:8080/api/modules/${moduleId}/resources/${resId}/download`,
          { responseType: "blob" },
      );
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName || `file`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error while downloading: ", err);
      alert("Failed to download resource");
    }
  };

  const deleteResource = async (resId) => {
    if (confirm("Are you sure you want to delete this resource?") === true) {
      try {
        await axios.delete(
            `http://localhost:8080/api/modules/${moduleId}/resources/${resId}`,
        );
        alert("Resource deleted successfully.");
        window.location.reload();
      } catch (err) {
        alert("Error:" + err.message);
      }
    }
  };

  if (loadingModule || loadingResources)
    return <div className="p-6">Loading module...</div>;

  if (error)
    return (
        <div className="p-6 text-red-600">Error: {error}</div>
    );

  return (
      <div className={`min-h-screen ${bg} ${text} p-6`}>
        <button
            onClick={() => navigate(`/course/${courseId}/modules`)}
            className={`mb-4 flex items-center ${
                theme === "light" ? "text-[#9333ea] hover:text-[#7b2cbf]" : "text-[#f9fafb] hover:text-[#d8b4fe]"
            }`}
        >
        <span
            className="icon-wrapper"
            style={{ "--icon-color": iconColors[theme] }}
        >
          <ArrowLeft size={18} className={`mr-2 ${text}`} />
        </span>
          Back to Modules
        </button>
        {(userRole === "INSTRUCTOR" || userRole === "ADMIN") && (
            <div className="flex justify-end mb-4">
              <button
                  onClick={() =>
                      navigate(`/courses/${courseId}/modules/${moduleId}/ResourceCreate`)
                  }
                  className={`px-6 py-2 rounded-md ${accentBg} ${
                      theme === "light" ? "text-light-bg" : "text-dark-bg"
                  } hover:bg-[#7b2cbf] transition-colors`}
              >
                Create Resource
              </button>
            </div>
        )}
        <div
            className={`bg-white p-6 rounded-lg shadow-md border max-w-2xl ${border}`}
        >
          <div className="mt-0">
            <h2 className="text-xl font-bold mb-2 text-gray-600">Resources</h2>

            {resources.length === 0 ? (
                <p className="text-gray-500">No resources found.</p>
            ) : (
                <ul className="list-disc pl-5 space-y-2">
                  {resources.map((res) => (
                      <li key={res.id}>
                        <p>
                          <strong>{res.title}</strong>
                        </p>
                        {res.content && (
                            <p className="text-sm text-gray-600 whitespace-pre-wrap mt-1">
                              {res.content}
                            </p>
                        )}
                        {res.originalFileName && (
                            <p className="text-xs text-gray-400 italic">
                              {res.originalFileName}
                            </p>
                        )}

                        {res.originalFileName ? (
                            <button
                                onClick={() =>
                                    handleDownload(res.id, res.originalFileName)
                                }
                                className="text-blue-600 hover:text-blue-800 flex items-center"
                            >
                              Download Resource
                            </button>
                        ) : (
                            (userRole === "INSTRUCTOR" || userRole === "ADMIN") && (
                                <button
                                    className="text-blue-600 hover:text-blue-800 flex items-center"
                                    onClick={() =>
                                        navigate(
                                            `/courses/${courseId}/modules/${moduleId}/resources/${res.id}/ResourceUpdate`
                                        )
                                    }
                                >
                                  Update Resource
                                </button>
                            )
                        )}
                        {(userRole === "INSTRUCTOR" || userRole === "ADMIN") && (
                            <button
                                className="text-red-600 hover:text-red-800 flex items-center"
                                onClick={() => deleteResource(res.id)}
                            >
                              Delete Resource
                            </button>
                        )}
                      </li>
                  ))}
                </ul>
            )}
          </div>
        </div>
      </div>
  );
};

export default ModuleDetails;