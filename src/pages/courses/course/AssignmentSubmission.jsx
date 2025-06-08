import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Upload,
    X,
    Calendar,
    CheckCircle,
} from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { themeConfig } from "../../../themeConfig";
import { iconColors } from "../../../utils/styles";

const AssignmentSubmission = () => {
    const { courseId, assignmentId } = useParams();
    const navigate = useNavigate();
    const { theme } = useSelector((state) => state.theme);
    const { bg, text, accentBg, border } = themeConfig[theme];
    const [submission, setSubmission] = useState({ text: "", fileName: "No file chosen" });
    const [assignment, setAssignment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:8080/api/courses/${courseId}/assignments/${assignmentId}`)
            .then((response) => {
                setAssignment(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message || "Assignment not found");
                setLoading(false);
            });
    }, [courseId, assignmentId]);

    if (loading) return <div className="p-6">Loading assignment...</div>;
    if (error) return <div className="p-6 text-red-600">Error: {error}</div>;
    if (!assignment) return <div className="p-6">Assignment not found!</div>;

    const handleGoBack = () => navigate(`/course/${courseId}/assignments`);
    const handleFileChange = (e) =>
        setSubmission((prev) => ({ ...prev, fileName: e.target.files[0]?.name || "No file chosen" }));
    const clearFile = () => setSubmission((prev) => ({ ...prev, fileName: "No file chosen" }));
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("text", submission.text);
        if (e.target.assignmentFile.files[0])
            formData.append("file", e.target.assignmentFile.files[0]);
        try {
            await axios.post(
                `http://localhost:8080/api/courses/${courseId}/submissions/${assignmentId}/student/${JSON.parse(localStorage.getItem("user"))?.id}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            alert("Assignment submitted!");
        } catch (err) {
            console.error("Submission error:", err);
            alert("Failed to submit assignment");
        }
    };

    return (
        <div className={`min-h-screen ${bg} ${text}`}>
            <div className="max-w-7xl mx-auto px-6 py-8">
                <button
                    onClick={handleGoBack}
                    className={`flex items-center mb-6 ${
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
                    Back to Assignments
                </button>
                <div className={`rounded-lg shadow-md ${border}`}>
                    <div
                        className={`border-b ${
                            theme === "light"
                                ? "border-gray-200 bg-[#e0e7ff]"
                                : "border-gray-700 bg-[#1e40af]"
                        } p-6`}
                    >
                        <h1
                            className={`text-2xl font-bold ${
                                theme === "light" ? "text-[#4c1d95]" : "text-[#bfdbfe]"
                            }`}
                        >
                            {assignment.title}
                        </h1>
                        <p className={text}>{assignment.description || "No description available"}</p>
                        <div className="flex flex-wrap items-center gap-6 text-sm">
                            <div className="flex items-center text-gray-600">
                <span
                    className="icon-wrapper"
                    style={{ "--icon-color": iconColors[theme] }}
                >
                  <Calendar size={18} className="w-4 h-4 mr-2" />
                </span>
                                <span>
                  Due: {assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : "N/A"}
                </span>
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className={`block text-sm font-medium ${text}`}>
                                    Your Answer
                                </label>
                                <textarea
                                    value={submission.text}
                                    onChange={(e) =>
                                        setSubmission((prev) => ({ ...prev, text: e.target.value }))
                                    }
                                    className={`w-full px-4 py-2 rounded-md border ${
                                        theme === "light"
                                            ? "bg-light-bg border-light-accent"
                                            : "bg-dark-bg border-dark-accent"
                                    } ${text} focus:outline-none focus:ring-2 focus:ring-[#9333ea]`}
                                    rows="6"
                                    placeholder="Type your answer..."
                                />
                            </div>
                            <div>
                                <label className={`block text-sm font-medium ${text}`}>
                                    Upload Your File
                                </label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="file"
                                        id="assignmentFile"
                                        name="assignmentFile"
                                        className="hidden"
                                        onChange={handleFileChange}
                                        accept=".pdf,.doc,.docx,.zip,.txt"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            document.getElementById("assignmentFile").click()
                                        }
                                        className={`px-4 py-2 border ${border} ${
                                            theme === "light" ? "text-[#9333ea]" : "text-[#38bdf8]"
                                        } rounded-lg hover:${accentBg} flex items-center gap-2`}
                                    >
                    <span
                        className="icon-wrapper"
                        style={{ "--icon-color": iconColors[theme] }}
                    >
                      <Upload size={18} className="w-5 h-5" />
                    </span>
                                        Choose File
                                    </button>
                                    <span
                                        className={`text-gray-600 truncate flex-1 ${text}`}
                                    >
                    {submission.fileName}
                  </span>
                                    {submission.fileName !== "No file chosen" && (
                                        <button
                                            type="button"
                                            onClick={clearFile}
                                            className={`${
                                                theme === "light"
                                                    ? "text-gray-500 hover:text-gray-700"
                                                    : "text-gray-400 hover:text-gray-200"
                                            }`}
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                                <p
                                    className={`text-sm ${
                                        theme === "light" ? "text-gray-500" : "text-gray-400"
                                    } mt-2`}
                                >
                                    Accepted formats: PDF, DOC, DOCX, ZIP, TXT (Max 10MB)
                                </p>
                            </div>
                            <div className="flex items-center justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={handleGoBack}
                                    className={`px-6 py-2 rounded-lg ${
                                        theme === "light"
                                            ? "border-gray-300 text-[#9333ea] hover:bg-gray-200"
                                            : "border-gray-600 text-[#f9fafb] hover:bg-gray-700"
                                    }`}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={`px-6 py-2 rounded-md ${accentBg} ${
                                        theme === "light" ? "text-light-bg" : "text-dark-bg"
                                    } hover:bg-[#7b2cbf] focus:outline-none focus:ring-2 focus:ring-[#9333ea] transition-colors`}
                                >
                                    Submit Assignment
                                </button>
                            </div>
                        </form>
                    </div>
                    {assignment.status === "completed" && (
                        <div
                            className={`border-t ${
                                theme === "light"
                                    ? "border-gray-200 bg-gray-50"
                                    : "border-gray-700 bg-[#1e293b]"
                            } p-6`}
                        >
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <span className={text}>Assignment submitted successfully</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AssignmentSubmission;