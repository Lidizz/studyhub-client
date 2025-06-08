import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { themeConfig } from '../../themeConfig';

export function CourseCard({
                               id,
                               title,
                               department,
                               totalModules,
                           }) {
    const navigate = useNavigate();
    const { theme } = useSelector((state) => state.theme);
    const { bg, text, hoverBg } = themeConfig[theme];
    const hoverClass = theme === 'light' ? 'hover:bg-gray-200' : hoverBg;

    const handleCourseClick = () => {
        navigate(`/course/${id}`);
    };

    return (
        <button onClick={handleCourseClick} className="w-full">
            <div className={`rounded-lg p-6 shadow-md cursor-pointer transform transition-all duration-200 ${bg} ${text} ${hoverClass} hover:shadow-lg border border-transparent hover:border-${theme}-accent`}>
                <div className="flex justify-between items-start mb-4">
                    <h3 className={`text-xl font-semibold ${text}`}>{title}</h3>
                </div>
                <p className={text}>{department}</p>
                <div className="space-y-3">
                    <div className="flex items-left">
                        <BookOpen size={18} className={`mr-2 ${text}`} />
                        <span className={text}>{totalModules} modules</span>
                    </div>
                </div>
            </div>
        </button>
    );
}
