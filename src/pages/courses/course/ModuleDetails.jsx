import React, { useEffect, useState } from "react";
import {useParams, useNavigate} from "react-router-dom";
import {ArrowLeft} from "lucide-react";
import axios from "axios";

export default function ModuleDetails () {
    const {courseId, moduleId} = useParams();
    const navigate = useNavigate();
    const[module, setModule] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/courses/${courseId}/modules/${moduleId}`)
            .then((response) => {
                setModule(response.data);
                setLoading(false);
            })

            .catch(err => {
                setError(err.message || "module not found");
                setLoading(false);
            });
    }, [courseId, moduleId]);

    if (loading) return <div className="p-6">Loading module...</div>;
    if (error) return <div className="p-6 text-red-600">Error loading module: {error}</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <button
                onClick={() => navigate(-1)}
                className="text-purple-600 hover:text-purple-800 mb-4 flex items-center"
            >
                <ArrowLeft className="mr-2" />Back to modules
            </button>

            <div className="bg-white p-6 rounded-lg shadow-md border max-w-2xl">
                <h1 className="text-2xl font-bold mb-4">{module.title}</h1>
                <p className="mb-2 text-gray-600">
                    <strong>Title:</strong>{module.title}
                </p>
                <p className="mb-2 text-gray-600">
                    <strong>Description:</strong>{module.description}
                </p>
                <p className="mb-2 text-gray-600">
                    <strong>Module Number:</strong>{module.moduleNumber}
                </p>

            </div>
        </div>
    );

}