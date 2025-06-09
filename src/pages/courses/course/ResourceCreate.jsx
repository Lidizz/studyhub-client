import React, {useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

const ResourceCreate = () => {
    const { moduleId} = useParams();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [resourceType, setResourceType] = useState('TEXT');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const createResource = async (event) => {
        console.log(title, " + ", content, " + ", resourceType);

        event.preventDefault();
        try {
            await axios.post(
                `http://localhost:8080/api/modules/${moduleId}/resources`,
            {
                moduleId: moduleId,
                    title: title,
                type: resourceType,
                content: content,
            }
        );
            console.log('Resource created');

            setTitle('');
            setContent('');
            setMessage('Resource has been created.');
            setError('');
        } catch (err) {
            setTitle('');
            setContent('');
            setError('Could not create resource');
            setMessage('');
            console.error(err);
        }
    };

    const uploadResource = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("moduleId", moduleId);
        formData.append("title", title);
        formData.append("file", file);

        try {
            await axios.post(
                `http://localhost:8080/api/modules/${moduleId}/resources/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setTitle('');
            setContent('');
            setMessage('Resource has been uploaded.');
            setError('');
        } catch (err) {
            setTitle('');
            setContent('');
            setError('Could not upload resource');
            setMessage('');
            console.error(err);
        }
    };


    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="relative min-h-screen">
            <button
                onClick={handleGoBack}
                className="absolute top-4 left-4 flex items-center space-x-2 text-purple-600 hover:text-purple-800"
            >
                <ArrowLeft className="w-5 h-5" /> Back to Modules
            </button>

            <div className="max-w-2xl mx-auto px-6 py-8">
                <form
                    onSubmit={resourceType === "TEXT" ? createResource : uploadResource}
                    className="max-w-md mx-auto mt-16 p-6 bg-white"
                >
                    <div className="mb-4">
                        <div className="bg-purple-100 p-4 rounded mb-6">
                            <h1 className="text-center text-2xl font-medium text-purple-900">
                                Create a resource
                            </h1>
                        </div>
                        <label htmlFor="title" className="block text-gray-700 mb-2">
                            Resource Title:
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="w-full px-3 py-2 border rounded"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="type" className="block text-gray-700 mb-2">
                            Resource Type:
                        </label>
                        <select
                            id="type"
                            name="type"
                            className="w-full px-3 py-2 border rounded"
                            value={resourceType}
                            onChange={(e) => setResourceType(e.target.value)}>
                            <option value="TEXT">TEXT</option>
                            <option value="FILE">FILE</option>
                        </select>
                    </div>
                    {resourceType === "TEXT" && (
                        <div className="mb-4">
                            <label htmlFor="content" className="block text-gray-700 mb-2">
                                Content of resource:
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                className="w-full px-3 py-2 border rounded h-40 resize-y"
                                required
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                    )}
                    {resourceType === "FILE" && (
                        <div className="mb-4">
                            <label htmlFor="file" className="block text-gray-700 mb-2">
                                Upload File:
                            </label>
                            <input
                                type="file"
                                id="file"
                                name="file"
                                className="w-full"
                                onChange={(e) => setFile(e.target.files[0])}
                                required
                            />
                        </div>
                    )}

                    <div className="flex justify-start space-x-4">
                        <button
                            type="button"
                            onClick={handleGoBack}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">Submit
                        </button>
                    </div>

                    {error && <p className="mt-4 text-red-600">{error}</p>}
                    {message && <p className="mt-4 text-green-700">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default ResourceCreate;