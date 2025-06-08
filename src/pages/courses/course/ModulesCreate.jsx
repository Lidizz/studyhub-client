import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import { useSelector } from 'react-redux';
import { themeConfig } from '../../../themeConfig';

const ModulesCreate = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { theme } = useSelector((state) => state.theme);
    const { bg, text, accentBg } = themeConfig[theme];
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [moduleNumber, setModuleNumber] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            axios.post(
                `http://localhost:8080/api/courses/${courseId}/modules`,
                {
                    courseId,
                    title,
                    description,
                    moduleNumber,
                }
            );
            setTitle('');
            setDescription('');
            setModuleNumber('');
            setMessage('Module submitted');
            setError('');
        } catch (err) {
            setTitle('');
            setDescription('');
            setModuleNumber('');
            setError('Could not create module');
            setMessage('');
            console.error(err);
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className={`relative min-h-screen ${bg} ${text}`}>
            <button
                onClick={handleGoBack}
                className={`absolute top-4 left-4 flex items-center space-x-2 ${theme === 'light' ? 'text-gray-700 hover:text-gray-900' : 'text-gray-300 hover:text-gray-100'} transition-colors`}
            >
                <ArrowLeft className="w-5 h-5" /> Back to Modules
            </button>
            <div className="max-w-2xl mx-auto px-6 py-8">
                <form onSubmit={handleSubmit} className={`max-w-md mx-auto mt-16 p-6 rounded-lg shadow-md ${bg}`}>
                    <div className={`bg-${theme}-accent p-4 rounded mb-6`}>
                        <h1 className={`text-center text-2xl font-medium ${text}`}>
                            Create Module
                        </h1>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="title" className={`block text-sm font-medium ${text}`}>
                            Title:
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className={`w-full px-3 py-2 border rounded ${theme === 'light' ? 'bg-white border-gray-300' : 'bg-gray-800 border-gray-600'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                            required
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className={`block text-sm font-medium ${text}`}>
                            Description:
                        </label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            className={`w-full px-3 py-2 border rounded ${theme === 'light' ? 'bg-white border-gray-300' : 'bg-gray-800 border-gray-600'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                            required
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="modulenr" className={`block text-sm font-medium ${text}`}>
                            Module Number:
                        </label>
                        <input
                            type="number"
                            id="modulenr"
                            name="modulenr"
                            className={`w-full px-3 py-2 border rounded ${theme === 'light' ? 'bg-white border-gray-300' : 'bg-gray-800 border-gray-600'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                            min="0"
                            required
                            value={moduleNumber}
                            onChange={(event) => setModuleNumber(event.target.value)}
                        />
                    </div>
                    <div className="flex space-x-4">
                        <button
                            type="button"
                            onClick={handleGoBack}
                            className={`px-6 py-2 rounded-lg border ${theme === 'light' ? 'border-gray-300 text-gray-700 hover:bg-gray-50' : 'border-gray-600 text-gray-200 hover:bg-gray-700'} transition-colors`}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`px-6 py-2 rounded-lg ${accentBg} ${text} hover:${theme === 'light' ? 'bg-gray-700' : 'bg-purple-700'} transition-colors font-medium`}
                        >
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

export default ModulesCreate;