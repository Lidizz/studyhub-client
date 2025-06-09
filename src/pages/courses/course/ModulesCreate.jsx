import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import { useSelector } from 'react-redux';
import { themeConfig } from '../../../themeConfig';
import { iconColors } from '../../../utils/styles';

const ModulesCreate = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { theme } = useSelector((state) => state.theme);
    const { bg, text, accentBg, border } = themeConfig[theme];
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [moduleNumber, setModuleNumber] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [error, setError] = React.useState('');
    const [moduleId, setModuleId] = React.useState('');
    const [type, setType] = React.useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (type === 'create'){
                await axios.post(
                   ` http://localhost:8080/api/courses/${courseId}/modules`,{
                    courseId,
                        title,
                        description,
                        moduleNumber,
                }
            );
                setTitle('');
                setDescription('');
                setModuleNumber('');
                setMessage('Module created');
                setError('');
            } else {
                setTitle('');
                setDescription('');
                setModuleNumber('');
                setError('Could not create module');
                setMessage('');

            }


            if (type === 'update') {
                await axios.put('http://localhost:8080/api/courses/${courseId}/modules/{moduleId}',
                {
                    courseId,
                        title,
                        description,
                        moduleNumber,
                        moduleId,

                }
            );
                setTitle('');
                setDescription('');
                setModuleNumber('');
                setMessage('Module updated');
                setError('');
            }

            if(type === 'delete') {
                await axios.delete('http://localhost:8080/api/courses/${courseId}/modules/{moduleId}',)

                setTitle('');
                setDescription('');
                setModuleNumber('');
                setMessage('Module deleted');
                setError('');

            }

        } catch (error) {
            setError('Error');

            console.log(error);

        }

    };

    const handleGoBack = () => navigate(`/course/${courseId}/modules`);

    return (
        <div className={`relative min-h-screen ${bg} ${text}`}>
            <button onClick={handleGoBack} className={`absolute top-4 left-4 flex items-center space-x-2 ${theme === 'light' ? 'text-[#9333ea] hover:text-[#7b2cbf]' : 'text-[#f9fafb] hover:text-[#d8b4fe]'}`}>
                <span className="icon-wrapper" style={{ '--icon-color': iconColors[theme] }}>
                    <ArrowLeft size={18} className={`mr-2 ${text}`} />
                </span>
                Back to Modules
            </button>
            <div className="max-w-2xl mx-auto px-6 py-8">
                <form onSubmit={handleSubmit} className={`max-w-md mx-auto mt-16 p-6 rounded-lg shadow-md ${bg} ${border}`}>
                    <div className={`bg-opacity-20 ${theme === 'light' ? 'bg-[#9333ea]' : 'bg-[#38bdf8]'} p-4 rounded mb-6`}>
                        <h1 className={`text-center text-2xl font-medium ${text}`}>Create Module</h1>
                    </div>
                    <button type="button" onClick={() => setType('create')}>Create</button>
                    <button type="button" onClick={() => setType('update')}>Update</button>
                    <button type="button" onClick={() => setType('delete')}>Delete</button>
                    <div className="mb-4">
                        <label htmlFor="title" className={`block text-sm font-medium ${text}`}>Title:</label>
                        <input
                            type="text" id="title" name="title" className={`w-full px-4 py-2 rounded-md border ${theme === 'light' ? 'bg-light-bg border-light-accent' : 'bg-dark-bg border-dark-accent'} ${text} focus:outline-none focus:ring-2 focus:ring-[#9333ea]`}
                            required value={title} onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className={`block text-sm font-medium ${text}`}>Description:</label>
                        <input
                            type="text" id="description" name="description" className={`w-full px-4 py-2 rounded-md border ${theme === 'light' ? 'bg-light-bg border-light-accent' : 'bg-dark-bg border-dark-accent'} ${text} focus:outline-none focus:ring-2 focus:ring-[#9333ea]`}
                            required value={description} onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="modulenr" className={`block text-sm font-medium ${text}`}>Module Number:</label>
                        <input
                            type="number" id="modulenr" name="modulenr" className={`w-full px-4 py-2 rounded-md border ${theme === 'light' ? 'bg-light-bg border-light-accent' : 'bg-dark-bg border-dark-accent'} ${text} focus:outline-none focus:ring-2 focus:ring-[#9333ea]`}
                            min="0" required value={moduleNumber} onChange={(e) => setModuleNumber(e.target.value)}
                        />
                    </div>
                    {(type === 'update' || type === 'delete') && (
                        <div className="mb-4">
                            <label htmlFor="moduleId" className={`block text-sm font-medium ${text}`}>
                                Module ID:
                            </label>
                            <input
                                type="text"
                                id="moduleId"
                                name="moduleId"
                                className={`w-full px-3 py-2 border rounded ${theme === 'light' ? 'bg-white border-gray-300' : 'bg-gray-800 border-gray-600'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                                value={moduleId}
                                onChange={(event) => setModuleId(event.target.value)}
                                required={type === 'update' || type === 'delete'}
                            />
                        </div>
                    )}
                    <div className="flex space-x-4">
                        <button type="submit" className={`px-6 py-2 rounded-md ${accentBg} ${theme === 'light' ? 'text-light-bg' : 'text-dark-bg'} hover:bg-[#7b2cbf] transition-colors font-medium`}>
                            Submit
                        </button>
                        <button type="button" onClick={handleGoBack} className={`px-6 py-2 rounded-md ${theme === 'light' ? 'bg-light-bg text-[#9333ea] border border-light-accent hover:bg-gray-200' : 'bg-dark-bg text-[#f9fafb] border border-dark-accent hover:bg-gray-700'} transition-colors`}>
                            Cancel
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