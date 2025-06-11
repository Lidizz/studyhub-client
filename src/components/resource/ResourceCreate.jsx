import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import { themeConfig } from "../../themeConfig.js";
import { iconColors } from "../../utils/styles.js";

const ResourceCreate = () => {
  const { moduleId, courseId } = useParams();
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);
  const { bg, text, accentBg, border } = themeConfig[theme];
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [resourceType, setResourceType] = useState("TEXT");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role;

  // Restrict access to instructors only
  if (userRole !== "INSTRUCTOR" && userRole !== "ADMIN") {
    navigate(`/courses/${courseId}/modules/${moduleId}`);
    return null;
  }

  const createResource = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
          `http://localhost:8080/api/modules/${moduleId}/resources`,
          {
            moduleId: moduleId,
            title: title,
            type: resourceType,
            content: content,
          },
      );
      setTitle("");
      setContent("");
      setMessage("Resource has been created.");
      setError("");
    } catch (err) {
      setTitle("");
      setContent("");
      setError("Could not create resource");
      setMessage("");
      console.error(err);
    }
  };

  const uploadResource = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("moduleId", moduleId);
    formData.append("title", title);
    formData.append("file", file);

    try {
      await axios.post(
          `http://localhost:8080/api/modules/${moduleId}/resources/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
      );
      setTitle("");
      setContent("");
      setMessage("Resource has been uploaded.");
      setError("");
    } catch (err) {
      setTitle("");
      setContent("");
      setError("Could not upload resource");
      setMessage("");
      console.error(err);
    }
  };

  const handleGoBack = () => {
    navigate(`/courses/${courseId}/modules/${moduleId}`);
  };

  return (
      <div className={`relative min-h-screen ${bg} ${text}`}>
        <button
            onClick={handleGoBack}
            className={`absolute top-4 left-4 flex items-center space-x-2 ${
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
          Back to Modules
        </button>
        <div className="max-w-2xl mx-auto px-6 py-8">
          <form
              onSubmit={resourceType === "TEXT" ? createResource : uploadResource}
              className={`max-w-md mx-auto mt-16 p-6 rounded-lg shadow-md ${bg} ${border}`}
          >
            <div
                className={`bg-opacity-20 ${
                    theme === "light" ? "bg-[#9333ea]" : "bg-[#38bdf8]"
                } p-4 rounded mb-6`}
            >
              <h1 className={`text-center text-2xl font-medium ${text}`}>
                Create Resource
              </h1>
            </div>

            <div className="mb-4">
              <label
                  htmlFor="title"
                  className={`block text-sm font-medium ${text}`}
              >
                Resource Title:
              </label>
              <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter resource title"
                  className={`w-full px-4 py-2 rounded-md border ${
                      theme === "light"
                          ? "bg-light-bg border-light-accent"
                          : "bg-dark-bg border-dark-accent"
                  } ${text} focus:outline-none focus:ring-2 focus:ring-[#9333ea]`}
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                  htmlFor="type"
                  className={`block text-sm font-medium ${text}`}
              >
                Resource Type:
              </label>
              <select
                  id="type"
                  name="type"
                  className={`w-full px-4 py-2 rounded-md border ${
                      theme === "light"
                          ? "bg-light-bg border-light-accent"
                          : "bg-dark-bg border-dark-accent"
                  } ${text} focus:outline-none focus:ring-2 focus:ring-[#9333ea]`}
                  value={resourceType}
                  onChange={(e) => setResourceType(e.target.value)}
              >
                <option value="TEXT">TEXT</option>
                <option value="FILE">FILE</option>
              </select>
            </div>

            {resourceType === "TEXT" && (
                <div className="mb-4">
                  <label
                      htmlFor="content"
                      className={`block text-sm font-medium ${text}`}
                  >
                    Content of Resource:
                  </label>
                  <textarea
                      id="content"
                      name="content"
                      placeholder="Enter resource content"
                      className={`w-full px-4 py-2 rounded-md border ${
                          theme === "light"
                              ? "bg-light-bg border-light-accent"
                              : "bg-dark-bg border-dark-accent"
                      } ${text} focus:outline-none focus:ring-2 focus:ring-[#9333ea] h-40 resize-y`}
                      required
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                  />
                </div>
            )}

            {resourceType === "FILE" && (
                <div className="mb-4">
                  <label
                      htmlFor="file"
                      className={`block text-sm font-medium ${text}`}
                  >
                    Upload File:
                  </label>
                  <input
                      type="file"
                      id="file"
                      name="file"
                      className={`w-full px-4 py-2 rounded-md border ${
                          theme === "light"
                              ? "bg-light-bg border-light-accent"
                              : "bg-dark-bg border-dark-accent"
                      } ${text}`}
                      onChange={(e) => setFile(e.target.files[0])}
                      required
                  />
                </div>
            )}

            <div className="mb-4">
              <button
                  type="submit"
                  className={`w-full px-6 py-2 rounded-md ${accentBg} ${
                      theme === "light" ? "text-light-bg" : "text-dark-bg"
                  } hover:bg-[#7b2cbf] transition-colors font-medium`}
              >
                Submit
              </button>
            </div>

            {error && (
                <p
                    className={`mt-4 ${
                        theme === "light" ? "text-red-600" : "text-red-400"
                    }`}
                >
                  {error}
                </p>
            )}
            {message && (
                <p
                    className={`mt-4 ${
                        theme === "light" ? "text-green-700" : "text-green-400"
                    }`}
                >
                  {message}
                </p>
            )}

            <div className="flex justify-end mt-6">
              <button
                  type="button"
                  onClick={handleGoBack}
                  className={`px-6 py-2 rounded-md ${
                      theme === "light"
                          ? "bg-light-bg text-[#9333ea] border border-light-accent hover:bg-gray-200"
                          : "bg-dark-bg text-[#f9fafb] border border-dark-accent hover:bg-gray-700"
                  } transition-colors`}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default ResourceCreate;