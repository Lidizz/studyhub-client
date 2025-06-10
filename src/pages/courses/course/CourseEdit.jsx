import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import { themeConfig } from "../../../themeConfig";
import { iconColors } from "../../../utils/styles";

const CourseEdit = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { theme } = useSelector((state) => state.theme);
  const { bg, text, accentBg, border } = themeConfig[theme];
  const [code, setCode] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [credits, setCredits] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");
  const [dateError, setDateError] = React.useState("");
  const [formErrors, setFormErrors] = React.useState({
    code: "",
    title: "",
    department: "",
    credits: "",
  });

  // Fetch course data on component mount
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/courses/${courseId}`);
        const course = response.data;
        setCode(course.code);
        setTitle(course.title);
        setDepartment(course.department);
        setDescription(course.description);
        setCredits(course.credits);
        setStartDate(course.startDate);
        setEndDate(course.endDate);
      } catch (err) {
        setError("Could not fetch course data");
        console.error(err);
      }
    };
    fetchCourse();
  }, [courseId]);

  // Form validation function
  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Course code validation
    if (code.length !== 6) {
      errors.code = "Course code must be exactly 6 characters";
      isValid = false;
    }

    // Title validation
    if (title.length < 4) {
      errors.title = "Title must be at least 4 characters";
      isValid = false;
    }

    // Department validation
    if (department.length < 2) {
      errors.department = "Department must be at least 2 characters";
      isValid = false;
    }

    // Credits validation
    const creditsNum = parseInt(credits);
    if (isNaN(creditsNum) || creditsNum < 1 || creditsNum > 30) {
      errors.credits = "Credits must be between 1 and 30";
      isValid = false;
    }

    // Date validation
    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      setDateError("End date must be later than start date");
      isValid = false;
    } else {
      setDateError("");
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      alert("Please fix the form errors before submitting.");
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/courses/${courseId}`, {
        code,
        title,
        department,
        description,
        credits,
        startDate,
        endDate,
      });
      setMessage("Course updated");
      setError("");
      setFormErrors({
        code: "",
        title: "",
        department: "",
        credits: "",
      });
    } catch (err) {
      setError("Could not update course");
      setMessage("");
      console.error(err);
    }
  };

  const handleGoBack = () => navigate(`/courses`);

  return (
      <div className={`relative min-h-screen ${bg} ${text}`}>
        <button
            onClick={handleGoBack}
            className={`absolute top-4 left-4 flex items-center space-x-2 ${theme === "light" ? "text-[#9333ea] hover:text-[#7b2cbf]" : "text-[#f9fafb] hover:text-[#d8b4fe]"}`}
        >
        <span
            className="icon-wrapper"
            style={{ "--icon-color": iconColors[theme] }}
        >
          <ArrowLeft size={18} className={`mr-2 ${text}`} />
        </span>
          Back to Courses
        </button>

        <div className="max-w-2xl mx-auto px-6 py-8">
          <form
              onSubmit={handleSubmit}
              className={`max-w-md mx-auto mt-16 p-6 rounded-lg shadow-md ${bg} ${border}`}
          >
            <div
                className={`bg-opacity-20 ${theme === "light" ? "bg-[#9333ea]" : "bg-[#38bdf8]"} p-4 rounded mb-6`}
            >
              <h1 className={`text-center text-2xl font-medium ${text}`}>
                Update Course
              </h1>
            </div>

            <div className="mb-4">
              <label
                  htmlFor="code"
                  className={`block text-sm font-medium ${text}`}
              >
                Course Code:
              </label>
              <input
                  type="text"
                  id="code"
                  name="code"
                  placeholder="Enter 6-character (e.g., CS101A)"
                  className={`w-full px-4 py-2 rounded-md border ${theme === "light" ? "bg-light-bg border-light-accent" : "bg-dark-bg border-dark-accent"} ${text} focus:outline-none focus:ring-2 focus:ring-[#9333ea]`}
                  required
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setFormErrors({ ...formErrors, code: "" });
                  }}
              />
              {formErrors.code && (
                  <p className={`text-sm ${theme === "light" ? "text-red-600" : "text-red-400"}`}>
                    {formErrors.code}
                  </p>
              )}
            </div>

            <div className="mb-4">
              <label
                  htmlFor="title"
                  className={`block text-sm font-medium ${text}`}
              >
                Title:
              </label>
              <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter course title (min. 4 characters)"
                  className={`w-full px-4 py-2 rounded-md border ${theme === "light" ? "bg-light-bg border-light-accent" : "bg-dark-bg border-dark-accent"} ${text} focus:outline-none focus:ring-2 focus:ring-[#9333ea]`}
                  required
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setFormErrors({ ...formErrors, title: "" });
                  }}
              />
              {formErrors.title && (
                  <p className={`text-sm ${theme === "light" ? "text-red-600" : "text-red-400"}`}>
                    {formErrors.title}
                  </p>
              )}
            </div>

            <div className="mb-4">
              <label
                  htmlFor="department"
                  className={`block text-sm font-medium ${text}`}
              >
                Department:
              </label>
              <input
                  type="text"
                  id="department"
                  name="department"
                  placeholder="Enter department name (min. 2 characters)"
                  className={`w-full px-4 py-2 rounded-md border ${theme === "light" ? "bg-light-bg border-light-accent" : "bg-dark-bg border-dark-accent"} ${text} focus:outline-none focus:ring-2 focus:ring-[#9333ea]`}
                  required
                  value={department}
                  onChange={(e) => {
                    setDepartment(e.target.value);
                    setFormErrors({ ...formErrors, department: "" });
                  }}
              />
              {formErrors.department && (
                  <p className={`text-sm ${theme === "light" ? "text-red-600" : "text-red-400"}`}>
                    {formErrors.department}
                  </p>
              )}
            </div>

            <div className="mb-4">
              <label
                  htmlFor="description"
                  className={`block text-sm font-medium ${text}`}
              >
                Description:
              </label>
              <input
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Enter course description"
                  className={`w-full px-4 py-2 rounded-md border ${theme === "light" ? "bg-light-bg border-light-accent" : "bg-dark-bg border-dark-accent"} ${text} focus:outline-none focus:ring-2 focus:ring-[#9333ea]`}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                  htmlFor="credits"
                  className={`block text-sm font-medium ${text}`}
              >
                Credits:
              </label>
              <input
                  type="number"
                  id="credits"
                  name="credits"
                  placeholder="Enter number of credits (between 1-30)"
                  className={`w-full px-4 py-2 rounded-md border ${theme === "light" ? "bg-light-bg border-light-accent" : "bg-dark-bg border-dark-accent"} ${text} focus:outline-none focus:ring-2 focus:ring-[#9333ea]`}
                  min="0"
                  required
                  value={credits}
                  onChange={(e) => {
                    setCredits(e.target.value);
                    setFormErrors({ ...formErrors, credits: "" });
                  }}
              />
              {formErrors.credits && (
                  <p className={`text-sm ${theme === "light" ? "text-red-600" : "text-red-400"}`}>
                    {formErrors.credits}
                  </p>
              )}
            </div>

            <div className="mb-4">
              <label
                  htmlFor="startdate"
                  className={`block text-sm font-medium ${text}`}
              >
                Start Date:
              </label>
              <input
                  type="date"
                  id="startdate"
                  name="startdate"
                  placeholder="Select course start date"
                  className={`w-full px-4 py-2 rounded-md border ${theme === "light" ? "bg-light-bg border-light-accent" : "bg-dark-bg border-dark-accent"} ${text} focus:outline-none focus:ring-2 focus:ring-[#9333ea]`}
                  required
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    if (dateError) setDateError("");
                  }}
              />
            </div>

            <div className="mb-4">
              <label
                  htmlFor="enddate"
                  className={`block text-sm font-medium ${text}`}
              >
                End Date:
              </label>
              <input
                  type="date"
                  id="enddate"
                  name="enddate"
                  placeholder="Select course end date"
                  className={`w-full px-4 py-2 rounded-md border ${theme === "light" ? "bg-light-bg border-light-accent" : "bg-dark-bg border-dark-accent"} ${text} focus:outline-none focus:ring-2 focus:ring-[#9333ea]`}
                  required
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    if (dateError) setDateError("");
                  }}
              />
            </div>

            {/* Date validation error message */}
            {dateError && (
                <div
                    className={`mb-4 text-sm ${theme === "light" ? "text-red-600" : "text-red-400"}`}
                >
                  {dateError}
                </div>
            )}

            <div className="mb-4">
              <button
                  type="submit"
                  className={`w-full px-6 py-2 rounded-md ${accentBg} ${theme === "light" ? "text-light-bg" : "text-dark-bg"} hover:bg-[#7b2cbf] transition-colors font-medium`}
              >
                Submit
              </button>
            </div>

            {error && (
                <p
                    className={`mt-4 ${theme === "light" ? "text-red-600" : "text-red-400"}`}
                >
                  {error}
                </p>
            )}
            {message && (
                <p
                    className={`mt-4 ${theme === "light" ? "text-green-700" : "text-green-400"}`}
                >
                  {message}
                </p>
            )}

            <div className="flex justify-end mt-6">
              <button
                  type="button"
                  onClick={handleGoBack}
                  className={`px-6 py-2 rounded-md ${theme === "light" ? "bg-light-bg text-[#9333ea] border border-light-accent hover:bg-gray-200" : "bg-dark-bg text-[#f9fafb] border border-dark-accent hover:bg-gray-700"} transition-colors`}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default CourseEdit;