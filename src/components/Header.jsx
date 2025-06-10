import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../store/themeSlice";
import { themeConfig } from "../themeConfig";

const Header = () => {
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const { bg, text, border } = themeConfig[theme];

  const handleThemeToggle = () => {
    dispatch(setTheme(theme === "light" ? "dark" : "light"));
  };

  return (
    <header
      className={`shadow-lg px-4 py-4 fixed top-0 left-0 right-0 z-50 ${bg} ${text} ${border} min-h-[4rem] flex items-center justify-between`}
    >
      <div className="cursor-pointer" onClick={() => navigate("/dashboard")}>
        <h1 className="text-xl md:text-2xl font-bold gradient-text">
          StudyHub
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleThemeToggle}
          className={`px-3 py-1 rounded-md ${theme === "light" ? "bg-gray-200 text-gray-800" : "bg-gray-700 text-gray-200"} focus:outline-none focus:ring-2 focus:ring-purple-500`}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        <div className="cursor-pointer" onClick={() => navigate("/profile")}>
          <img
            src="src/assets/profile-placeholder.jpg"
            alt="Profile"
            className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
