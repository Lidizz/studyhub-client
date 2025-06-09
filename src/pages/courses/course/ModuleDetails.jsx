import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { themeConfig } from "../../../themeConfig";

export default function ModuleDetails() {
    const { courseId, moduleId } = useParams();
    const navigate = useNavigate();
    const { theme } = useSelector((state) => state.theme);
    const { bg, text, border } = themeConfig[theme];
    const [module, setModule] = useState(null);
    const [resources, setResources] = useState([]);
    const [loadingModule, setLoadingModule] = useState(true);
    const [loadingResources, setLoadingResources] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoadingModule(true);
        axios.get(`http://localhost:8080/api/courses/${courseId}/modules`)
            .then(res => setModule(res.data))
            .catch(err => setError(err.message || "Module not found"))
            .finally(() => setLoadingModule(false));
    }, [courseId, moduleId]);

    useEffect(() => {
        setResources([]);
        setLoadingResources(true);
        axios.get(`http://localhost:8080/api/modules/${moduleId}/resources`)
            .then(res => setResources(res.data))
            .catch(() => setError("Resource not found for module"))
            .finally(() => setLoadingResources(false));
    }, [moduleId]);

    const handleDownload = async (resId, fileName) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/modules/${moduleId}/resources/${resId}/download`,
                { responseType: 'blob' }
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


    if (loadingModule || loadingResources)
        return <div className="p-6">Loading module...</div>;

    if (error)
        return (
            <>
                <div className="p-6 text-red-600">Error: {error}</div>
                <button
                    onClick={() => navigate(`/courses/${courseId}/modules/${moduleId}/ResourceCreate`)}
                    className="flex items-center rounded-lg p-6 shadow-md text-purple-600 hover:text-purple-800 hover:scale-105 hover:shadow-lg border border-gray-200"
                >
                    Create Resource
                </button>
            </>
        );

    if (error)
        return <div className="p-6 text-red-600">Error: {error}</div>;

    return (
        <div className={`min-h-screen ${bg} ${text} p-6`}>
            <button
                onClick={() => navigate(-1)}
                className={`text-purple-600 hover:text-purple-800 mb-4 flex items-center ${theme === 'light' ? 'text-[#9333ea] hover:text-[#7b2cbf]' : 'text-[#f9fafb] hover:text-[#d8b4fe]'}`}
            >
                <ArrowLeft className="mr-2" /> Back to Modules
            </button>

            <button
                onClick={() => navigate(`/courses/${courseId}/modules/${moduleId}/ModulesEdit`)}
                className="flex items-center rounded-lg p-6 shadow-md text-purple-600 hover:text-purple-800 hover:scale-105 hover:shadow-lg border border-gray-200"
            >
                Edit Modules
            </button>

            <div className={`bg-white p-6 rounded-lg shadow-md border max-w-2xl ${border}`}>
                <h1 className="text-2xl font-bold mb-4">{module.title}</h1>
                <p className="mb-2 text-gray-600">
                    <strong>Description:</strong> {module.description}
                </p>
                <p className="mb-2 text-gray-600">
                    <strong>Module No:</strong> {module.moduleNumber}
                </p>

                <div className="mt-6">
                    <h2 className="text-xl font-bold mb-2 text-gray-600">Resources</h2>

                    {resources.length === 0 ? (
                        <p className="text-gray-500">No resources found.</p>
                    ) : (
                        <ul className="list-disc pl-5 space-y-2">
                            {resources.map((res) => (
                                <li key={res.id}>
                                    <p><strong>{res.title}</strong></p>
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
                                            onClick={() => handleDownload(res.id, res.originalFileName)}
                                            className="text-blue-400 hover:text-purple-800 flex items-center"
                                        >
                                            Download resource
                                        </button>
                                    ) : (
                                        <p className="text-sm text-gray-500 mt-1">
                                            No resources found.
                                        </p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}