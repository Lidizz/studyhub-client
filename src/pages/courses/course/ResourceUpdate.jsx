import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import { useSelector } from 'react-redux';
import { themeConfig } from '../../../themeConfig';
import { iconColors } from '../../../utils/styles';
import React, {useEffect, useState} from "react";

const ResourceUpdate = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { theme } = useSelector((state) => state.theme);
    const { bg, text, accentBg, border } = themeConfig[theme];
    const [resources, setResources] = useState([]);
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [error, setError] = React.useState('');
    const {resourceId } = useParams();
    const {moduleId} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/modules/${moduleId}/resources`)
            .then((response) => {
                console.log('Full response:', response.data); // See the structure
                setResources(response.data);
            })
            .catch((error) => setError(error))
            .finally(() => setError(null));
    }, [moduleId]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.put(
                `http://localhost:8080/api/modules/${moduleId}/resources/${resourceId}`,
                {
                    title,
                    content,
                }
            );
            setMessage('Resource updated successfully');
            setError('');

            setTitle('');
            setContent('');
        } catch (error) {
            console.log(error);
            setError('An error occurred while updating the resource');
            setMessage('');
        }
    };

    const handleGoBack = () => navigate(`/course/${courseId}/modules`);

    return (
        <div className={`relative min-h-screen ${bg} ${text}`}>
            <button
                onClick={handleGoBack}
                className={`absolute top-4 left-4 flex items-center space-x-2 ${
                    theme === 'light'
                        ? 'text-[#9333ea] hover:text-[#7b2cbf]'
                        : 'text-[#f9fafb] hover:text-[#d8b4fe]'
                }`}
            >
                <span
                    className="icon-wrapper"
                    style={{ '--icon-color': iconColors[theme] }}
                >
                    <ArrowLeft size={18} className={`mr-2 ${text}`} />
                </span>
                Back to Modules
            </button>
            <div className="max-w-2xl mx-auto px-6 py-8">
                <form
                    onSubmit={handleSubmit}
                    className={`max-w-md mx-auto mt-16 p-6 rounded-lg shadow-md ${bg} ${border}`}>
                    <div
                        className={`bg-opacity-20 ${
                            theme === 'light'
                                ? 'bg-[#9333ea]'
                                : 'bg-[#38bdf8]'
                        } p-4 rounded mb-6`}>
                        <h1 className={`text-center text-2xl font-medium ${text}`}>
                            Update Resource
                        </h1>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="title" className={`block text-sm font-medium ${text}`}>Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className={`w-full px-4 py-2 rounded-md border ${theme === 'light' ? 'bg-light-bg border-light-accent' : 'bg-dark-bg border-dark-accent'} ${text} focus:outline-none focus:ring-2 focus:ring-[#9333ea]`}
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className={`block text-sm font-medium ${text}`}>Resource content:</label>
                        <input
                            type="text"
                            id="content"
                            name="content"
                            className={`w-full px-4 py-2 rounded-md border ${theme === 'light' ? 'bg-light-bg border-light-accent' : 'bg-dark-bg border-dark-accent'} ${text} focus:outline-none focus:ring-2 focus:ring-[#9333ea]`}
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="moduleId" className={`block text-sm font-medium ${text}`}>Module ID:</label>
                        <input type="text" id="moduleId" className="w-full px-3 py-2 border rounded" value={moduleId || ''} readOnly/>
                    </div>

                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className={`px-6 py-2 rounded-md ${accentBg} ${theme === 'light' ? 'text-light-bg' : 'text-dark-bg'} hover:bg-[#7b2cbf] transition-colors font-medium`}
                        >
                            Update Resource
                        </button>
                        <button
                            type="button"
                            onClick={handleGoBack}
                            className={`px-6 py-2 rounded-md ${
                                theme === 'light'
                                    ? 'bg-light-bg text-[#9333ea] border border-light-accent hover:bg-gray-200'
                                    : 'bg-dark-bg text-[#f9fafb] border border-dark-accent hover:bg-gray-700'
                            } transition-colors`}
                        >
                            Cancel
                        </button>
                    </div>

                    {error && (
                        <p className={`mt-4 ${theme === 'light' ? 'text-red-600' : 'text-red-400'}`}>
                            {error}
                        </p>
                    )}
                    {message && (
                        <p className={`mt-4 ${theme === 'light' ? 'text-green-700' : 'text-green-400'}`}>
                            {message}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ResourceUpdate;