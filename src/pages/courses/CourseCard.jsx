import { Calendar, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CourseCard({ id, title, instructor, nextDeadline, totalModules}) {
    const navigate = useNavigate();


    const handleCourseClick = () => {
        navigate(`/course/${id}`); // Navigate to the course home page
    };

    return (
        <button onClick={handleCourseClick} className="w-full">
            <div className="bg-white rounded-lg p-6 shadow-md cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{title}</h3>


                </div>
                <p className="text-gray-600 mb-4">{instructor}</p>

                <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                        <Calendar size={18} className="mr-2" />
                        <span>Next deadline: {nextDeadline}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                        <BookOpen size={18} className="mr-2" />
                        <span>{totalModules} modules</span>
                    </div>


                    <div className="mt-4">
                        <div //className="w-full bg-gray-200 rounded-full h-2">
                            className="bg-gradient-to-r from-pink-500 to-blue-500 h-2 rounded-full">

                        </div>
                    </div>
                </div>
            </div>



        </button>
    );
}
