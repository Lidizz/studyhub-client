import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useSelector } from 'react-redux';
import { themeConfig } from '../../../themeConfig';
import { iconColors } from '../../../utils/styles';

const CourseCreate = () => {

    const navigate = useNavigate();
    const { theme } = useSelector((state) => state.theme);
    const { bg, text, accentBg, border } = themeConfig[theme];
    const [code, setCode] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [department, setDepartment] = React.useState('');
    const [credits, setCredits] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [error, setError] = React.useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            axios.post(`http://localhost:8080/api/courses`, {
                code,
                title,
                department,
                credits,
                startDate,
                endDate,
            });
           setCode('');
           setTitle('');
           setDepartment('');
           setCredits('');
           setStartDate('');
           setEndDate('');
           setMessage('Course  created');
           setError('');

        } catch (err) {
            setError('Could not create course'); setMessage(''); console.error(err);
        }
    };

    const handleGoBack = () => navigate(`/courses`);

    return (
        <div className={`relative min-h-screen ${bg} ${text}`}>
            <button onClick={handleGoBack} className={`absolute top-4 left-4 flex items-center space-x-2 ${theme === 'light' ? 'text-[#9333ea] hover:text-[#7b2cbf]' : 'text-[#f9fafb] hover:text-[#d8b4fe]'}`}>
                <span className="icon-wrapper" style={{ '--icon-color': iconColors[theme] }}>
                    <ArrowLeft size={18} className={`mr-2 ${text}`} />
                </span>
                Back to Courses
            </button>

            <div className="max-w-2xl mx-auto px-6 py-8">
                <form onSubmit={handleSubmit} className={`max-w-md mx-auto mt-16 p-6 rounded-lg shadow-md ${bg} ${border}`}>
                    <div className={`bg-opacity-20 ${theme === 'light' ? 'bg-[#9333ea]' : 'bg-[#38bdf8]'} p-4 rounded mb-6`}>
                        <h1 className={`text-center text-2xl font-medium ${text}`}>Create Course</h1>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="code" className={`block text-sm font-medium ${text}`}>Course Code (6 characters):</label>
                        <input
                            type="text" id="code" name="code" className={`w-full px-4 py-2 rounded-md border ${theme === 'light' ? 'bg-light-bg border-light-accent' : 'bg-dark-bg border-dark-accent'} ${text} focus:outline-none focus:ring-2 focus:ring-[#9333ea]`}
                            required value={code} onChange={(e) => setCode(e.target.value)}
                        />
                    </div>


                    <div className="mb-4">
                        <label htmlFor="title" className={`block text-sm font-medium ${text}`}>Title (4 characters):</label>
                        <input
                            type="text" id="title" name="title" className={`w-full px-4 py-2 rounded-md border ${theme === 'light' ? 'bg-light-bg border-light-accent' : 'bg-dark-bg border-dark-accent'} ${text} focus:outline-none focus:ring-2 focus:ring-[#9333ea]`}
                            required value={title} onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="department" className={`block text-sm font-medium ${text}`}>Department:</label>
                        <input
                            type="text" id="department" name="department" className={`w-full px-4 py-2 rounded-md border ${theme === 'light' ? 'bg-light-bg border-light-accent' : 'bg-dark-bg border-dark-accent'} ${text} focus:outline-none focus:ring-2 focus:ring-[#9333ea]`}
                            required value={department} onChange={(e) => setDepartment(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="credits" className={`block text-sm font-medium ${text}`}>Credits:</label>
                        <input
                            type="number" id="credits" name="credits" className={`w-full px-4 py-2 rounded-md border ${theme === 'light' ? 'bg-light-bg border-light-accent' : 'bg-dark-bg border-dark-accent'} ${text} focus:outline-none focus:ring-2 focus:ring-[#9333ea]`}
                            min="0" required value={credits} onChange={(e) => setCredits(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="startdate" className={`block text-sm font-medium ${text}`}>Start Date:</label>
                        <input
                            type="date" id="startdate" name="startdate" className={`w-full px-4 py-2 rounded-md border ${theme === 'light' ? 'bg-light-bg border-light-accent' : 'bg-dark-bg border-dark-accent'} ${text} focus:outline-none focus:ring-2 focus:ring-[#9333ea]`}
                            min="0" required value={startDate} onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="enddate" className={`block text-sm font-medium ${text}`}>End Date:</label>
                        <input
                            type="date" id="enddate" name="enddate" className={`w-full px-4 py-2 rounded-md border ${theme === 'light' ? 'bg-light-bg border-light-accent' : 'bg-dark-bg border-dark-accent'} ${text} focus:outline-none focus:ring-2 focus:ring-[#9333ea]`}
                            min="0" required value={endDate} onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>

                    <div className="flex space-x-4">
                        <button type="button" onClick={handleGoBack} className={`px-6 py-2 rounded-md ${theme === 'light' ? 'bg-light-bg text-[#9333ea] border border-light-accent hover:bg-gray-200' : 'bg-dark-bg text-[#f9fafb] border border-dark-accent hover:bg-gray-700'} transition-colors`}>
                            Cancel
                        </button>
                        <button type="submit" className={`px-6 py-2 rounded-md ${accentBg} ${theme === 'light' ? 'text-light-bg' : 'text-dark-bg'} hover:bg-[#7b2cbf] transition-colors font-medium`}>
                            Submit
                        </button>
                    </div>
                    {error && <p className={`mt-4 ${theme === 'light' ? 'text-red-600' : 'text-red-400'}`}>{error}</p>}
                    {message && <p className={`mt-4 ${theme === 'light' ? 'text-green-700' : 'text-green-400'}`}>{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default CourseCreate;
