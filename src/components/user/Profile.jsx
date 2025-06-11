import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { themeConfig } from "../../themeConfig.js";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);
  const { bg, text, border, accentBg } = themeConfig[theme];

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 md:p-6 ${bg} ${text}`}
    >
      <div
        className={`w-full max-w-md p-6 md:p-8 rounded-lg shadow-md ${bg} ${border}`}
      >
        <h2
          className={`text-2xl md:text-3xl font-bold text-center ${text} gradient-text`}
        >
          User Profile
        </h2>

        <div className="space-y-4 text-sm md:text-base">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>First Name:</strong> {user.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {user.lastName}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className={`mt-6 w-full py-2 px-4 rounded-md ${accentBg} ${theme === "light" ? "text-light-bg" : "text-dark-bg"} hover:bg-[#7b2cbf] focus:outline-none focus:ring-2 focus:ring-[#9333ea] transition-colors`}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
