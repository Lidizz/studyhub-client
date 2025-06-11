import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  X,
  Calendar,
  CheckCircle,
  Plus,
} from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { themeConfig } from "../../themeConfig";
import { iconColors } from "../../utils/styles";

const AssignmentSubmission = () => {
  const { courseId, assignmentId } = useParams();
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);
  const { bg, text, accentBg, border } = themeConfig[theme];
  const user = JSON.parse(localStorage.getItem("user"));
  const studentId = user?.id;
  const userRole = user?.role || "STUDENT";
  const [submissionForm, setSubmissionForm] = useState({
    text: "",
    fileName: "No file chosen",
  });
  const [assignment, setAssignment] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submissionData, setSubmissionData] = useState({
    grade: null,
    feedback: null,
    isSubmitted: false,
    submittedFileName: null,
  });
  const [courseSubmissions, setCourseSubmissions] = useState([]);
  const [editAssignment, setEditAssignment] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showGrade, setShowGrade] = useState(false);
  const [gradeForm, setGradeForm] = useState({ grade: "", feedback: "" });
  const [newAssignment, setNewAssignment] = useState({
    courseId: courseId,
    title: "",
    description: "",
    dueDate: "",
  });
  const isCreateMode = assignmentId === "create";
  const fetchSpecificAssignment = async () => {
    if (!assignmentId || isCreateMode) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/courses/${courseId}/assignments/${assignmentId}`,
      );
      setAssignment(response.data);
      setError(null);
    } catch (err) {
      if (err.response?.status === 404) {
        setError("Assignment not found");
      } else {
        setError(err.message || "Assignment loading failed");
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (courseId) {
      if (userRole === "INSTRUCTOR") {
        fetchAssignments();
      } else if (userRole === "STUDENT" && assignmentId && !isCreateMode) {
        fetchSpecificAssignment();
        fetchSubmissions();
      }
    }
  }, [courseId, assignmentId, userRole]);
  useEffect(() => {
    if (
      userRole === "INSTRUCTOR" &&
      assignmentId &&
      !isCreateMode &&
      assignments.length > 0
    ) {
      const foundAssignment = assignments.find(
        (a) => a.id.toString() === assignmentId,
      );
      if (foundAssignment) {
        setAssignment(foundAssignment);
        fetchCourseSubmissions();
      }
    }
  }, [assignmentId, assignments, userRole]);
  useEffect(() => {
    if (isCreateMode) {
      setLoading(false);
      setError(null);
    }
  }, [isCreateMode]);
  useEffect(() => {
    if (
      userRole === "STUDENT" &&
      assignmentId !== "create" &&
      studentId &&
      courseId
    ) {
      fetchSubmissions();
    }
  }, [assignmentId, userRole, studentId, courseId]);
  useEffect(() => {
    if (assignmentId && assignments.length > 0) {
      const foundAssignment = assignments.find(
        (a) => a.id.toString() === assignmentId,
      );
      setAssignment(foundAssignment);
    }
  }, [assignmentId, assignments]);
  useEffect(() => {
    if (!assignment && assignmentId && !isCreateMode) {
      setLoading(true);
      axios
        .get(
          `http://localhost:8080/api/courses/${courseId}/assignments/${assignmentId}`,
        )
        .then((response) => {
          setAssignment(response.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err.response?.status === 404) {
            setError("Assignment not found");
          } else {
            setError(err.message || "Assignment loading failed");
          }
          setLoading(false);
        });
    }
  }, [courseId, assignmentId, assignment, isCreateMode]);
  useEffect(() => {
    if (isCreateMode) {
      setLoading(false);
      setError(null);
    }
  }, [isCreateMode]);
  const fetchAssignments = async () => {
    if (userRole !== "INSTRUCTOR") return;
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/courses/${courseId}/assignments`,
      );
      setAssignments(response.data);
      setError(null);
    } catch (err) {
      if (err.response?.status === 404) {
        setAssignments([]);
        setError(null);
      } else {
        setError(err.message || "Assignment not found");
      }
    } finally {
      setLoading(false);
    }
  };
  const fetchSubmissions = async () => {
    if (userRole !== "STUDENT" || !studentId) return;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/courses/${courseId}/submissions/student/${studentId}`,
      );
      setSubmissions(response.data);
      if (assignmentId && !isCreateMode) {
        const currentSubmission = response.data.find(
          (sub) =>
            sub.assignmentId && sub.assignmentId.toString() === assignmentId,
        );
        if (currentSubmission) {
          setSubmissionData({
            grade: currentSubmission.grade,
            feedback: currentSubmission.feedback,
            isSubmitted: !!currentSubmission.submittedFileName,
            submittedFileName: currentSubmission.submittedFileName,
          });
        } else {
          setSubmissionData({
            grade: null,
            feedback: null,
            isSubmitted: false,
            submittedFileName: null,
          });
        }
      }
    } catch (err) {
      if (err.response?.status !== 404) {
        console.error("Error fetching submissions:", err);
      }
    }
  };
  const fetchCourseSubmissions = async () => {
    if (userRole !== "INSTRUCTOR" || !assignmentId || isCreateMode) return;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/courses/${courseId}/submissions/${assignmentId}/submissions`,
      );
      setCourseSubmissions(response.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setCourseSubmissions([]);
      } else {
        console.error("Error fetching assignment submissions:", err);
        setCourseSubmissions([]);
      }
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSubmissionForm((prev) => ({ ...prev, fileName: file.name }));
    }
  };
  const clearFile = () => {
    setSubmissionForm((prev) => ({ ...prev, fileName: "No file chosen" }));
    const fileInput = document.getElementById("assignmentFile");
    if (fileInput) {
      fileInput.value = "";
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fileInput = document.getElementById("assignmentFile");
      const file = fileInput.files[0];
      if (!file) {
        alert("Please select a file to submit");
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      await axios.post(
        `http://localhost:8080/api/courses/${courseId}/submissions/${assignmentId}/student/${studentId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );
      alert("Assignment submitted successfully!");
      setSubmissionData((prev) => ({
        ...prev,
        isSubmitted: true,
        submittedFileName: file.name,
      }));
      await fetchSubmissions();
      setSubmissionForm({ text: "", fileName: "No file chosen" });
      fileInput.value = "";
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to submit assignment");
    }
  };
  const handleDownload = async () => {
    try {
      const currentSubmission = submissions.find(
        (sub) =>
          sub &&
          sub.assignmentId &&
          sub.assignmentId.toString() === assignmentId,
      );
      if (!currentSubmission) {
        alert("Submission not found");
        return;
      }
      const response = await axios.get(
        `http://localhost:8080/api/courses/${courseId}/submissions/${assignmentId}/student/${studentId}/download`,
        { responseType: "blob" },
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.setAttribute(
        "download",
        submissionData.submittedFileName ||
          currentSubmission.fileName ||
          "download",
      );
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
      alert("Failed to download file");
    }
  };
  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:8080/api/courses/${courseId}/assignments`,
        newAssignment,
      );
      alert("Assignment created successfully!");
      setNewAssignment({
        courseId: courseId,
        title: "",
        description: "",
        dueDate: "",
      });
      navigate(`/course/${courseId}/assignments`);
    } catch (err) {
      console.error("Error creating assignment:", err);
      alert(
        "Error creating assignment: " +
          (err.response?.data?.message || err.message),
      );
    }
  };
  const handleEditAssignment = (assignmentToEdit) => {
    setEditAssignment(assignmentToEdit);
    setNewAssignment({
      courseId: courseId,
      title: assignmentToEdit.title,
      description: assignmentToEdit.description,
      dueDate: assignmentToEdit.dueDate.slice(0, 16),
    });
  };
  const cancelEdit = () => {
    setEditAssignment(null);
    setNewAssignment({
      courseId: courseId,
      title: "",
      description: "",
      dueDate: "",
    });
  };
  const handleUpdateAssignment = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/api/courses/${editAssignment.courseId}/assignments/${editAssignment.id}`,
        newAssignment,
      );
      alert("Assignment updated successfully!");
      setNewAssignment({
        courseId: courseId,
        title: "",
        description: "",
        dueDate: "",
      });
      setEditAssignment(null);
      fetchAssignments();
    } catch (err) {
      console.error("Error updating assignment:", err);
      alert(
        "Error updating assignment: " +
          (err.response?.data?.message || err.message),
      );
    }
  };
  const handleDeleteAssignment = async (assignmentId) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/courses/${courseId}/assignments/${assignmentId}`,
      );
      alert("Assignment deleted successfully!");
      setShowDeleteConfirm(null);
      navigate(`/course/${courseId}/assignments`);
    } catch (err) {
      console.error("Error deleting assignment:", err);
      alert(
        "Error deleting assignment: " +
          (err.response?.data?.message || err.message),
      );
    }
  };
  const handleGradeSubmission = (submission) => {
    setSelectedSubmission(submission);
    setGradeForm({
      grade: submission.grade || "",
      feedback: submission.feedback || "",
    });
    setShowGrade(true);
  };
  const handleGrade = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/courses/${courseId}/submissions/${assignmentId}/student/${selectedSubmission.studentId}`,
        {
          grade: gradeForm.grade,
          feedback: gradeForm.feedback,
        },
      );
      alert("Grade and feedback saved successfully!");
      setShowGrade(false);
      fetchCourseSubmissions();
    } catch (err) {
      console.error("Error saving grade:", err);
      alert(
        "Failed to save grade: " + (err.response?.data?.message || err.message),
      );
    }
  };
  const handleDownloadSubmission = async (submission) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/courses/${courseId}/submissions/${assignmentId}/student/${submission.studentId}/download`,
        { responseType: "blob" },
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.setAttribute("download", submission.submittedFileName || "submission");
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
      alert("Failed to download file");
    }
  };
  const handleGoBack = () => navigate(`/course/${courseId}/assignments`);
  if (loading && !isCreateMode) {
    return <div className={`p-6 ${bg} ${text}`}>Loading assignment...</div>;
  }
  if (error && userRole === "STUDENT" && !isCreateMode) {
    return <div className={`p-6 text-red-600 ${bg}`}>Error: {error}</div>;
  }
  if (!assignment && assignmentId && !isCreateMode && userRole === "STUDENT") {
    return <div className={`p-6 ${bg} ${text}`}>Assignment not found!</div>;
  }
  return (
    <div className={`min-h-screen ${bg} ${text}`}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <button
          onClick={handleGoBack}
          className={`flex items-center mb-6 ${theme === "light" ? "text-[#9333ea] hover:text-[#7b2cbf]" : "text-[#f9fafb] hover:text-[#d8b4fe]"}`}
        >
          <span
            className="icon-wrapper"
            style={{ "--icon-color": iconColors[theme] }}
          >
            {" "}
            <ArrowLeft size={18} className={`mr-2 ${text}`} />{" "}
          </span>{" "}
          Back to Assignments
        </button>
        {/* Student Section */}{" "}
        {userRole === "STUDENT" &&
          assignmentId &&
          !isCreateMode &&
          assignment && (
            <div className={`rounded-lg shadow-md ${border}`}>
              <div
                className={`border-b ${theme === "light" ? "border-gray-200 bg-[#e0e7ff]" : "border-gray-700 bg-[#1e40af]"} p-6`}
              >
                <h1
                  className={`text-2xl font-bold ${theme === "light" ? "text-[#4c1d95]" : "text-[#bfdbfe]"}`}
                >
                  {" "}
                  {assignment.title}{" "}
                </h1>
                <p className={text}>
                  {" "}
                  {assignment.description || "No description available"}{" "}
                </p>
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center text-gray-600">
                    <span
                      className="icon-wrapper"
                      style={{ "--icon-color": iconColors[theme] }}
                    >
                      {" "}
                      <Calendar size={18} className="w-4 h-4 mr-2" />{" "}
                    </span>
                    <span>
                      {" "}
                      Due:{" "}
                      {assignment.dueDate
                        ? new Date(assignment.dueDate).toLocaleDateString()
                        : "N/A"}{" "}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className={`block text-sm font-medium ${text}`}>
                      {" "}
                      Upload Your File{" "}
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
                        className={`px-4 py-2 border ${border} ${theme === "light" ? "text-[#9333ea]" : "text-[#38bdf8]"} rounded-lg hover:${accentBg} flex items-center gap-2`}
                      >
                        <span
                          className="icon-wrapper"
                          style={{ "--icon-color": iconColors[theme] }}
                        >
                          {" "}
                          <Upload size={18} className="w-5 h-5" />{" "}
                        </span>{" "}
                        Choose File
                      </button>
                      <span className={`text-gray-600 truncate flex-1 ${text}`}>
                        {" "}
                        {submissionForm.fileName}{" "}
                      </span>{" "}
                      {submissionForm.fileName !== "No file chosen" && (
                        <button
                          type="button"
                          onClick={clearFile}
                          className={`${theme === "light" ? "text-gray-500 hover:text-gray-700" : "text-gray-400 hover:text-gray-200"}`}
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}{" "}
                    </div>
                    <p
                      className={`text-sm ${theme === "light" ? "text-gray-500" : "text-gray-400"} mt-2`}
                    >
                      {" "}
                      Accepted formats: PDF, DOC, DOCX, ZIP, TXT (Max 10MB){" "}
                    </p>
                  </div>
                  <div className="flex items-center justify gap-4">
                    {" "}
                    {/*<button*/} {/*  type="button"*/}{" "}
                    {/*  onClick={handleGoBack}*/}{" "}
                    {/*  className={`px-6 py-2 rounded-lg ${*/}{" "}
                    {/*    theme === "light"*/}{" "}
                    {/*      ? "border-gray-300 text-[#9333ea] hover:bg-gray-200"*/}{" "}
                    {/*      : "border-gray-600 text-[#f9fafb] hover:bg-gray-700"*/}{" "}
                    {/*  }`}*/} {/*>*/} {/*  Cancel*/} {/*</button>*/}
                    <button
                      type="submit"
                      className={`px-6 py-2 rounded-md ${accentBg} ${theme === "light" ? "text-light-bg" : "text-dark-bg"} hover:bg-[#7b2cbf] focus:outline-none focus:ring-2 focus:ring-[#9333ea] transition-colors`}
                    >
                      {" "}
                      Submit Assignment
                    </button>
                  </div>
                </form>
                {/* Submission Confirmation */}{" "}
                {submissionData.isSubmitted && (
                  <div
                    className={`mt-6 p-4 rounded-lg ${theme === "light" ? "bg-green-50 border-green-200" : "bg-green-900/20 border-green-700"} border`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="icon-wrapper"
                        style={{ "--icon-color": iconColors[theme] }}
                      >
                        {" "}
                        <CheckCircle
                          size={18}
                          className={`mr-2 ${text}`}
                        />{" "}
                      </span>{" "}
                      <h3
                        className={`font-semibold ${theme === "light" ? "text-green-800" : "text-green-400"}`}
                      >
                        {" "}
                        Assignment Submitted Successfully{" "}
                      </h3>
                    </div>
                    <div
                      className={`text-sm ${theme === "light" ? "text-green-700" : "text-green-300"}`}
                    >
                      {" "}
                      {/*<p className="mb-2">Your submission has been recorded:</p>*/}
                      <div
                        className={`p-3 rounded ${theme === "light" ? "bg-white border border-green-200" : "bg-gray-800 border border-green-600"}`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="icon-wrapper"
                            style={{ "--icon-color": iconColors[theme] }}
                          >
                            {" "}
                            <Upload size={18} className={`mr-2 ${text}`} />{" "}
                          </span>{" "}
                          <span className="font-medium">Uploaded File:</span>{" "}
                          <span
                            className={`${theme === "light" ? "text-gray-700" : "text-gray-300"}`}
                          >
                            {" "}
                            {submissionData.submittedFileName}{" "}
                          </span>
                          <button
                            onClick={handleDownload}
                            className={`ml-2 px-2 py-1 text-xs rounded transition-colors ${theme === "light" ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                          >
                            {" "}
                            Download
                          </button>
                        </div>
                        <p
                          className={`text-xs mt-2 ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}
                        >
                          {" "}
                          Submitted on: {new Date().toLocaleString()}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                )}{" "}
                {/* Grade and Feedback Display Section */}
                <div
                  className={`border-t ${theme === "light" ? "border-gray-200" : "border-gray-700"} pt-6 mt-6`}
                >
                  <h3 className={`text-lg font-semibold ${text} mb-4`}>
                    {" "}
                    Instructor Feedback{" "}
                  </h3>
                  <div className="mb-4">
                    <label className={`block text-sm font-medium ${text} mb-2`}>
                      {" "}
                      Grade{" "}
                    </label>
                    <div
                      className={`px-4 py-2 ${theme === "light" ? "bg-gray-50 border-gray-200" : "bg-gray-800 border-gray-600"} border rounded-md`}
                    >
                      <span
                        className={`${submissionData.grade ? (theme === "light" ? "text-green-600 font-semibold" : "text-green-400 font-semibold") : theme === "light" ? "text-gray-500" : "text-gray-400"} ${submissionData.grade ? "" : "italic"}`}
                      >
                        {" "}
                        {submissionData.grade || "Not graded yet"}{" "}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${text} mb-2`}>
                      {" "}
                      Feedback{" "}
                    </label>
                    <div
                      className={`px-4 py-3 ${theme === "light" ? "bg-gray-50 border-gray-200" : "bg-gray-800 border-gray-600"} border rounded-md min-h-[80px]`}
                    >
                      <p
                        className={`${submissionData.feedback ? text : theme === "light" ? "text-gray-500" : "text-gray-400"} ${submissionData.feedback ? "" : "italic"}`}
                      >
                        {" "}
                        {submissionData.feedback || "No feedback yet"}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}{" "}
        {/* Instructor Section */}{" "}
        {userRole === "INSTRUCTOR" && (
          <div className="space-y-6">
            {" "}
            {/* Assignment List */}
            <div className={`rounded-lg shadow-md ${border}`}>
              <div
                className={`border-b ${theme === "light" ? "border-gray-200 bg-[#e0e7ff]" : "border-gray-700 bg-[#1e40af]"} p-6`}
              >
                <h2
                  className={`text-xl font-bold ${theme === "light" ? "text-[#4c1d95]" : "text-[#bfdbfe]"}`}
                >
                  {" "}
                  Course Assignments{" "}
                </h2>
              </div>
              <div className="p-6">
                {" "}
                {assignments.length === 0 ? (
                  <p className={text}>No assignments created yet.</p>
                ) : (
                  <div className="space-y-4">
                    {" "}
                    {assignments.map((assignmentItem) => (
                      <div
                        key={assignmentItem.id}
                        className={`border ${border} rounded-lg p-4`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3
                              className={`text-lg font-semibold ${text} mb-2`}
                            >
                              {" "}
                              {assignmentItem.title}{" "}
                            </h3>
                            <p className={`${text} mb-2`}>
                              {" "}
                              {assignmentItem.description}{" "}
                            </p>
                            <p
                              className={`text-sm ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}
                            >
                              {" "}
                              Due:{" "}
                              {new Date(
                                assignmentItem.dueDate,
                              ).toLocaleString()}{" "}
                            </p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <button
                              onClick={() =>
                                handleEditAssignment(assignmentItem)
                              }
                              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                            >
                              {" "}
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                setShowDeleteConfirm(assignmentItem.id)
                              }
                              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                            >
                              {" "}
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}{" "}
                  </div>
                )}{" "}
              </div>
            </div>
            {/* Create/Edit Assignment */}
            <div className={`rounded-lg shadow-md ${border}`}>
              <div
                className={`border-b ${theme === "light" ? "border-gray-200 bg-[#e0e7ff]" : "border-gray-700 bg-[#1e40af]"} p-6`}
              >
                <h1
                  className={`text-2xl font-bold ${theme === "light" ? "text-[#4c1d95]" : "text-[#bfdbfe]"} mb-2`}
                >
                  {" "}
                  {editAssignment
                    ? "Edit Assignment"
                    : "Create New Assignment"}{" "}
                </h1>
                <p className={text}>
                  {" "}
                  {editAssignment
                    ? "Update assignment details"
                    : "Create assignment for the course"}{" "}
                </p>
              </div>
              <div className="p-6">
                <form
                  onSubmit={
                    editAssignment
                      ? handleUpdateAssignment
                      : handleCreateAssignment
                  }
                  className="space-y-6"
                >
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${text}`}>
                      {" "}
                      Assignment title{" "}
                    </label>
                    <input
                      type="text"
                      value={newAssignment.title}
                      onChange={(e) =>
                        setNewAssignment((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      className={`w-full px-4 py-2 rounded-md border ${theme === "light" ? "bg-light-bg border-light-accent" : "bg-dark-bg border-dark-accent"} ${text} focus:outline-none focus:ring-2 focus:ring-[#9333ea]`}
                      placeholder="Type your assignment title"
                      required
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${text}`}>
                      {" "}
                      Description{" "}
                    </label>
                    <textarea
                      value={newAssignment.description}
                      onChange={(e) =>
                        setNewAssignment((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      className={`w-full px-4 py-2 rounded-md border ${theme === "light" ? "bg-light-bg border-light-accent" : "bg-dark-bg border-dark-accent"} ${text} focus:outline-none focus:ring-2 focus:ring-[#9333ea]`}
                      rows="4"
                      placeholder="Enter assignment description..."
                      required
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${text}`}>
                      {" "}
                      Due Date & Time{" "}
                    </label>
                    <input
                      type="datetime-local"
                      value={newAssignment.dueDate}
                      onChange={(e) =>
                        setNewAssignment((prev) => ({
                          ...prev,
                          dueDate: e.target.value,
                        }))
                      }
                      className={`w-full px-4 py-2 rounded-md border ${theme === "light" ? "bg-light-bg border-light-accent" : "bg-dark-bg border-dark-accent"} ${text} focus:outline-none focus:ring-2 focus:ring-[#9333ea]`}
                      required
                    />
                  </div>
                  <div className="flex items-center justify-end gap-4">
                    <button
                      type="button"
                      onClick={editAssignment ? cancelEdit : handleGoBack}
                      className={`px-6 py-2 border ${border} ${text} rounded-lg hover:${accentBg} transition-colors`}
                    >
                      {" "}
                      {editAssignment ? "Cancel Edit" : "Cancel"}{" "}
                    </button>
                    <button
                      type="submit"
                      className={`px-6 py-2 ${accentBg} ${theme === "light" ? "text-light-bg" : "text-dark-bg"} rounded-lg hover:bg-[#7b2cbf] transition-colors font-medium flex items-center gap-2`}
                    >
                      <Plus className="w-4 h-4" />{" "}
                      {editAssignment
                        ? "Update Assignment"
                        : "Create Assignment"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {/* Instructor Submission Viewing Section */}{" "}
            {assignmentId && assignment && (
              <div className={`rounded-lg shadow-md ${border}`}>
                <div
                  className={`border-b ${theme === "light" ? "border-gray-200 bg-[#e0e7ff]" : "border-gray-700 bg-[#1e40af]"} p-6`}
                >
                  <h2
                    className={`text-xl font-bold ${theme === "light" ? "text-[#4c1d95]" : "text-[#bfdbfe]"}`}
                  >
                    {" "}
                    Submissions for: {assignment.title}{" "}
                  </h2>{" "}
                  <p className={text}>Review and grade student submissions</p>
                </div>
                <div className="p-6">
                  {" "}
                  {courseSubmissions.length === 0 ? (
                    <p className={text}>No submissions yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {" "}
                      {courseSubmissions.map((submission) => (
                        <div
                          key={submission.id}
                          className={`border ${border} rounded-lg p-4`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3
                                className={`text-lg font-semibold ${text} mb-2`}
                              >
                                {" "}
                                Student ID: {submission.studentId}{" "}
                              </h3>
                              <p
                                className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"} mb-2`}
                              >
                                {" "}
                                Submitted:{" "}
                                {new Date(
                                  submission.submissionDate,
                                ).toLocaleString()}{" "}
                              </p>
                              <p
                                className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"} mb-2`}
                              >
                                {" "}
                                File: {submission.submittedFileName}{" "}
                              </p>
                              <div className="flex gap-4">
                                <div>
                                  <span
                                    className={`text-sm font-medium ${text}`}
                                  >
                                    {" "}
                                    Grade:{" "}
                                  </span>
                                  <span
                                    className={`text-sm ${submission.grade ? (theme === "light" ? "text-green-600" : "text-green-400") : theme === "light" ? "text-gray-500" : "text-gray-400"}`}
                                  >
                                    {" "}
                                    {submission.grade || "Not graded"}{" "}
                                  </span>
                                </div>
                              </div>
                              {submission.feedback && (
                                <p
                                  className={`text-sm mt-2 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
                                >
                                  <span className="font-medium">Feedback:</span>{" "}
                                  {submission.feedback}
                                </p>
                              )}{" "}
                            </div>
                            <div className="flex gap-2 ml-4">
                              <button
                                onClick={() =>
                                  handleDownloadSubmission(submission)
                                }
                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                              >
                                {" "}
                                Download
                              </button>
                              <button
                                onClick={() =>
                                  handleGradeSubmission(submission)
                                }
                                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                              >
                                {" "}
                                Grade
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}{" "}
                    </div>
                  )}{" "}
                </div>
              </div>
            )}{" "}
          </div>
        )}{" "}
        {/*-------Delete confirm------*/}{" "}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`${bg} rounded-lg p-6 max-w-md mx-4`}>
              <h3 className={`text-lg font-semibold mb-4 ${text}`}>
                {" "}
                Delete Assignment{" "}
              </h3>{" "}
              <p className={`${text} mb-6`}>
                {" "}
                Are you sure you want to delete this assignment?{" "}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className={`px-4 py-2 border ${border} ${text} rounded hover:${accentBg}`}
                >
                  {" "}
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteAssignment(showDeleteConfirm)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  {" "}
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}{" "}
        {/* Grading Modal */}{" "}
        {showGrade && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`${bg} rounded-lg p-6 max-w-md mx-4 w-full`}>
              <h3 className={`text-lg font-semibold mb-4 ${text}`}>
                {" "}
                Grade Submission - Student ID:{" "}
                {selectedSubmission?.studentId}{" "}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${text} mb-2`}>
                    {" "}
                    Grade{" "}
                  </label>{" "}
                  <input
                    type="text"
                    value={gradeForm.grade}
                    onChange={(e) =>
                      setGradeForm((prev) => ({
                        ...prev,
                        grade: e.target.value,
                      }))
                    }
                    className={`w-full px-3 py-2 border ${border} rounded-md ${theme === "light" ? "bg-white" : "bg-gray-800"} ${text} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    placeholder="Enter grade (A, B, C, D, E, F)"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${text} mb-2`}>
                    {" "}
                    Feedback{" "}
                  </label>{" "}
                  <textarea
                    value={gradeForm.feedback}
                    onChange={(e) =>
                      setGradeForm((prev) => ({
                        ...prev,
                        feedback: e.target.value,
                      }))
                    }
                    className={`w-full px-3 py-2 border ${border} rounded-md ${theme === "light" ? "bg-white" : "bg-gray-800"} ${text} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    rows="4"
                    placeholder="Enter feedback for the student..."
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setShowGrade(false)}
                  className={`px-4 py-2 border ${border} ${text} rounded hover:${accentBg}`}
                >
                  {" "}
                  Cancel
                </button>
                <button
                  onClick={handleGrade}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  {" "}
                  Save Grade
                </button>
              </div>
            </div>
          </div>
        )}{" "}
      </div>
    </div>
  );
};
export default AssignmentSubmission;
