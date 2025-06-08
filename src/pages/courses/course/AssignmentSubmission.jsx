import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X, Calendar, CheckCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import { themeConfig } from '../../../themeConfig';
import {inputStyles, buttonStyles} from "../../../utils/styles.js"; // Adjusted path

const AssignmentSubmission = () => {
    const { courseId, assignmentId } = useParams();
    const navigate = useNavigate();
    const { theme } = useSelector((state) => state.theme);
    const { bg, text, accentBg } = themeConfig[theme];

    const [submission, setSubmission] = useState({
        text: '',
        fileName: 'No file chosen',
    });
    const assignment = {
        id: assignmentId || 'APP2000-A1',
        title: 'Assignment 1: First App',
        description: 'Create your first application using React and demonstrate your understanding of components, props, and state management.',
        dueDate: '2024-03-10',
        status: 'pending',
    };

    const handleGoBack = () => {
        navigate(`/course/${courseId}/assignments`);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSubmission((prev) => ({
                ...prev,
                fileName: file.name,
            }));
        }
    };

    const clearFile = () => {
        setSubmission((prev) => ({
            ...prev,
            fileName: 'No file chosen',
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting:', submission);
        alert('Assignment submitted successfully!');
    };

    return (
        <div className={`min-h-screen ${bg} ${text} rounded-lg`}>
            <div className="max-w-7xl mx-auto px-6 py-8">
                <button
                    onClick={handleGoBack}
                    className="flex items-center mb-6 text-purple-600 hover:text-purple-800"
                >
                    <ArrowLeft className="mr-2" />
                    <span>Back to Assignments</span>
                </button>
                <div className={`rounded-lg shadow-md border ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
                    <div className="border-b border-gray-200 bg-purple-50 p-6">
                        <h1 className="text-2xl font-bold text-purple-900 mb-2">
                            {assignment.title}
                        </h1>
                        <p className="text-gray-600 mb-4">
                            {assignment.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-6 text-sm">
                            <div className="flex items-center text-gray-600">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">
                                    Your Answer
                                </label>
                                <textarea
                                    value={submission.text}
                                    onChange={(e) => setSubmission((prev) => ({ ...prev, text: e.target.value }))}
                                    className={`w-full px-4 py-2 rounded-md border ${inputStyles[theme]} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                                    rows="6"
                                    placeholder="Type your answer here..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">
                                    Upload Your File
                                </label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="file"
                                        id="assignmentFile"
                                        className="hidden"
                                        onChange={handleFileChange}
                                        accept=".pdf,.doc,.docx,.zip,.txt"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => document.getElementById('assignmentFile').click()}
                                        className={`px-4 py-2 border ${theme === 'light' ? 'border-light-accent' : 'border-dark-accent'} text-${theme}-accent rounded-lg hover:${accentBg} transition-colors flex items-center gap-2`}
                                    >
                                        <Upload className="w-5 h-5" />
                                        <span>Choose File</span>
                                    </button>
                                    <span className="text-gray-600 truncate flex-1">
                                        {submission.fileName}
                                    </span>
                                    {submission.fileName !== 'No file chosen' && (
                                        <button
                                            type="button"
                                            onClick={clearFile}
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500 mt-2">
                                    Accepted formats: PDF, DOC, DOCX, ZIP, TXT (Max 10MB)
                                </p>
                            </div>
                            <div className="flex items-center justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={handleGoBack}
                                    className={`px-6 py-2 rounded-lg ${theme === 'light' ? 'border-gray-300 text-gray-700 hover:bg-gray-50' : 'border-gray-600 text-gray-200 hover:bg-gray-700'}`}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={`px-6 py-2 rounded-lg ${buttonStyles[theme]} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200`}
                                >
                                    Submit Assignment
                                </button>
                            </div>
                        </form>
                    </div>
                    {assignment.status === 'completed' && (
                        <div className="border-t border-gray-200 p-6 bg-gray-50">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <span className="font-medium text-gray-900">
                                    Assignment submitted successfully
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AssignmentSubmission;