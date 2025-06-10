import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import CourseGrid from "./pages/courses/CourseGrid.jsx";
import { themeConfig } from "./themeConfig";
import CourseHome from "./pages/courses/course/CourseHome.jsx";
import CourseModules from "./pages/courses/course/CourseModules.jsx";
import CourseAssignment from "./pages/courses/course/CourseAssignment.jsx";
import AssignmentSubmission from "./pages/courses/course/AssignmentSubmission.jsx";
import ModuleDetails from "./pages/courses/course/ModuleDetails";
import ModulesCreate from "./pages/courses/course/ModulesCreate.jsx";
import CourseCreate from "./pages/courses/course/CourseCreate.jsx";
import CourseEdit from "./pages/courses/course/CourseEdit.jsx";
import ResourceCreate from "./pages/courses/course/ResourceCreate.jsx";
import ModulesEdit from "./pages/courses/course/ModulesEdit.jsx";
import ResourceUpdate from "./pages/courses/course/ResourceUpdate.jsx";

const LoggedInLayout = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);
  const { bg, text } = themeConfig[theme];
  return (
    <div className={`min-h-screen ${bg} ${text}`}>
      <Header />
      <div className="flex pt-[4rem]">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 ml-16 md:ml-20 lg:ml-64">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  const { theme } = useSelector((state) => state.theme);
  const { bg, text } = themeConfig[theme];

  return (
    <div className={`min-h-screen ${bg} ${text}`}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <LoggedInLayout>
              <Dashboard />
            </LoggedInLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <LoggedInLayout>
              <Profile />
            </LoggedInLayout>
          }
        />
        <Route
          path="/courses"
          element={
            <LoggedInLayout>
              <CourseGrid />
            </LoggedInLayout>
          }
        />
        <Route
          path="/courses/create"
          element={
            <LoggedInLayout>
              <CourseCreate />
            </LoggedInLayout>
          }
        />
        <Route
          path="/courses/:courseId/CourseEdit"
          element={
            <LoggedInLayout>
              <CourseEdit />
            </LoggedInLayout>
          }
        />
        <Route
          path="/schedule"
          element={
            <LoggedInLayout>
              <div>Schedule Page (TBD)</div>
            </LoggedInLayout>
          }
        />
        <Route
          path="/groups"
          element={
            <LoggedInLayout>
              <div>Groups Page (TBD)</div>
            </LoggedInLayout>
          }
        />
        <Route
          path="/course/:courseId"
          element={
            <LoggedInLayout>
              <CourseHome />
            </LoggedInLayout>
          }
        />
        <Route
          path="/course/:courseId/modules"
          element={
            <LoggedInLayout>
              <CourseModules />
            </LoggedInLayout>
          }
        />
        <Route
          path="/courses/:courseId/modules/:moduleId"
          element={
            <LoggedInLayout>
              <ModuleDetails />
            </LoggedInLayout>
          }
        />
        <Route
          path="/course/:courseId/modules/ModulesCreate"
          element={
            <LoggedInLayout>
              <ModulesCreate />
            </LoggedInLayout>
          }
        />
        <Route
          path="/courses/:courseId/modules/:moduleId/ResourceCreate"
          element={
            <LoggedInLayout>
              <ResourceCreate />
            </LoggedInLayout>
          }
        />
        <Route
          path="/courses/:courseId/modules/:moduleId/ModulesEdit"
          element={
            <LoggedInLayout>
              <ModulesEdit />
            </LoggedInLayout>
          }
        />
        <Route
          path="/courses/:courseId/modules/:moduleId/resources/:resourceId/ResourceUpdate"
          element={
            <LoggedInLayout>
              <ResourceUpdate />
            </LoggedInLayout>
          }
        />
        <Route
          path="/course/:courseId/assignments"
          element={
            <LoggedInLayout>
              <CourseAssignment />
            </LoggedInLayout>
          }
        />
        <Route
          path="/course/:courseId/assignments/:assignmentId"
          element={
            <LoggedInLayout>
              <AssignmentSubmission />
            </LoggedInLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
