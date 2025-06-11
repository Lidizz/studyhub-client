import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home, BookOpen, Calendar, Users } from "lucide-react";
import { themeConfig } from "../../themeConfig.js";
import { iconColors } from "../../utils/styles.js";

const Sidebar = () => {
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { bg, text, border, accentBg } = themeConfig[theme];

  const navItems = [
    { icon: <Home size={24} />, label: "Dashboard", path: "/dashboard" },
    { icon: <BookOpen size={24} />, label: "Courses", path: "/courses" },
    { icon: <Calendar size={24} />, label: "Schedule", path: "/schedule" },
    { icon: <Users size={24} />, label: "Groups", path: "/groups" },
  ];

  return (
    <nav
      className={`fixed top-[4rem] bottom-0 ${isCollapsed ? "w-16" : "w-20 md:w-64"} ${bg} ${text} ${border} transition-all duration-300`}
    >
      <ul className="flex flex-col items-center md:items-start gap-6 pt-6 px-2 md:px-4">
        {navItems.map((item) => (
          <li key={item.label} className="w-full">
            <button
              onClick={() => navigate(item.path)}
              className={`flex ${isCollapsed ? "flex-col items-center" : "md:flex-row md:items-center"} gap-2 p-2 w-full text-sm md:text-base rounded-lg border-2 border-transparent hover:${accentBg} hover:border-2 hover:scale-105 transition-all duration-200`}
            >
              <span
                className="icon-wrapper"
                style={{ "--icon-color": iconColors[theme] }}
              >
                {item.icon}
              </span>
              {!isCollapsed && (
                <span className="hidden md:inline">{item.label}</span>
              )}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute bottom-4 left-4 md:hidden p-2 rounded-full bg-gray-700 text-white"
      >
        {isCollapsed ? ">" : "<"}
      </button>
    </nav>
  );
};

export default Sidebar;
