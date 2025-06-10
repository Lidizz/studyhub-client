import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { themeConfig } from "../../themeConfig";
import { iconColors } from "../../utils/styles.js";
import React from "react";

const CourseCard = ({ id, title, department, credits }) => {
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);
  const { bg, text, border, hoverBg } = themeConfig[theme];

  const handleCourseClick = () => navigate(`/course/${id}`);

  const handleCourseClick2 = () => navigate(`/courses/${id}/CourseEdit`);

  return (
    <div className="relative w-full">
      <button
        onClick={handleCourseClick2}
        className="absolute top-2 right-2 bg-blue-500 text-white rounded px-2 py-1 text-sm shadow"
      >
        Edit
      </button>
      <button onClick={handleCourseClick} className="w-full">
        <div
          className={`rounded-lg p-6 shadow-md cursor-pointer transition-all duration-200 ${bg} ${text} ${border} ${hoverBg} hover:shadow-lg`}
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className={`text-xl font-semibold ${text}`}>{title}</h3>
          </div>
          <p className={text}>{department}</p>
          <div className="space-y-3">
            <div className="flex items-left">
              <span
                className="icon-wrapper"
                style={{ "--icon-color": iconColors[theme] }}
              >
                <BookOpen size={18} className={`mr-2 ${text}`} />
              </span>
              <span className={text}>{credits} Credit Points</span>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default CourseCard;
