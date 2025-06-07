import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {ArrowLeft} from "lucide-react";

const ModulesCreate = () => {
    const {courseId} = useParams();

    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [moduleNumber, setModuleNumber] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [error, setError] = React.useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post(
                `http://localhost:8080/api/courses/${courseId}/modules`, {


                    courseId: courseId,
                    title: title,
                    description: description,
                    moduleNumber: moduleNumber
                }
            );


            console.log('Module with number: ', moduleNumber, 'saved');

            // vi gjør så input feltet blir tomt
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
        navigate(-1); // Go back to the previous page
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
                        <form onSubmit={handleSubmit}
                              className="max-w-md mx-auto mt-16 p-6 bg-white"
                        >
                            <div className="mb-4">
                                <div className="bg-purple-100 p-4 rounded mb-6">

                                <h1 className="text-center text-2xl font-medium text-purple-900">
                        Create module</h1>
                        </div>
                                <label htmlFor="name" className="block text-gray-700 mb-2">
                                    Title:</label>

                                <input
                        type="text"
                        id="title"
                        name="title"
                        className="w-full px-3 py-2 border rounded"
                        required
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                                />

                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-gray-700 mb-2">Description:</label>

                                <input
                        type="text"
                        id="description"
                        name="description"
                        className="w-full px-3 py-2 border rounded"
                        required
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="modulenr" className="block text-gray-700 mb-2">Modulenumber:</label>
                                <input
                        type="number"
                        id="modulenr"
                        name="modulenr"
                        className="w-full px-3 py-2 border rounded"
                        min="0"
                        required
                        value={moduleNumber}
                        onChange={(event) => setModuleNumber(event.target.value)}
                                />
                            </div>
                            <button type="cancel"
                                    onClick={handleGoBack}

                                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                Cancel
                            </button>

                            <button type="submit"
                                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                            >

                    Submit
                            </button>
                            {error && (
                                <p className="mt-4 text-red-600">{error}</p>
                                )}
                            {message && (
                                <p className="mt-4 text-green-700">{message}</p>
                            )}
                        </form>
                    </div>

            </div>


        );
    };

export default ModulesCreate;

