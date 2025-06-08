import React, {useState,useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, X, Calendar, CheckCircle , Plus } from "lucide-react";
import { getAssignmentsByCourse, createAssignment, submitAssignment, getSubmissionsByStudent,getSubmissionsByAssignment,
    getSubmissionsByCourse, updateAssignment, deleteAssignment     } from '../../../services/api';

const AssignmentSubmission = () => {
    const {courseId, assignmentId} = useParams();
    const navigate = useNavigate();

    //Get user
    const user = JSON.parse(localStorage.getItem("user"));
    const studentId = user?.id;
    const userRole = user?.role || 'STUDENT';

    const [assignments, setAssignments] = useState([]);
    const [assignment, setAssignment] = useState(null);
    const [courseSubmissions, setCourseSubmissions] = useState([]);
    const [editAssignment, setEditAssignment] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [assignmentSubmissions, setAssignmentSubmissions] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [submission, setSubmission] = useState({
        text: '',
        fileName: 'No file chosen',
        grade: null,
        feedback: null
    });

    const [newAssignment, setNewAssignment] = useState({
        courseId: courseId,
        title: '',
        description: '',
        dueDate: ''
    });

    useEffect(() => {
        if (courseId) {
            console.log('Fetching assignments...');
            fetchAssignments();
        }
    }, [courseId]);

    const fetchAssignments = async () => {
        setLoading(true);
        try {
            const response = await getAssignmentsByCourse(courseId);
            setAssignments(response.data);

            if (userRole === 'STUDENT' && studentId) {
                fetchSubmissions();
            } else if (userRole === 'INSTRUCTOR') {
                fetchCourseSubmissions();
            }

        } catch (err) {
            console.error('Error fetching assignments:', err);
            setError('Error fetching assignments');
        } finally {
            setLoading(false);
        }
    };

    const fetchSubmissions = async () => {
        try {
            const response = await getSubmissionsByStudent(courseId, studentId);
            setSubmissions(response.data);

            if (assignmentId) {
                const currentSubmission = response.data.find(s => s.assignmentid.toString() === assignmentId);
                if (currentSubmission) {
                    setSubmission(prev => ({
                        ...prev,
                        grade: currentSubmission.grade,
                        feedback: currentSubmission.feedback
                    }));
                }
            }

        } catch (err) {
            if (err.response?.status !== 404) {
                console.error('Error fetching submissions:', err);
            }
        }
    };

    const fetchCourseSubmissions = async () => {
        try {
            const response = await getSubmissionsByCourse(courseId);
            setCourseSubmissions(response.data);
            console.log('Course submissions:', response.data);
        } catch (err) {
            console.error('Error fetching course submissions:', err);
        }
    };

    useEffect(() => {
        if (assignmentId && assignments.length > 0) {
            const foundAssignment = assignments.find(a => a.id.toString() === assignmentId);
            setAssignment(foundAssignment);
        }
    }, [assignmentId, assignments]);

    const handleGoBack = () => {
        navigate(`/course/${courseId}/assignments`);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSubmission(prev => ({
                ...prev,
                fileName: file.name
            }));
        }
    };

    const clearFile = () => {
        setSubmission(prev => ({
            ...prev,
            fileName: 'No file chosen'
        }));
        const fileInput = document.getElementById('assignmentFile');
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({courseId, assignmentId, studentId});

        if (!submission.fileName || submission.fileName === 'No file chosen') {
            alert('Please select a file to submit');
            return;
        }
        try {
            // Get the file from the file input
            const fileInput = document.getElementById('assignmentFile');
            const file = fileInput.files[0];

            if (!file) {
                alert('Please select a file to submit');
                return;
            }

            console.log('Submitting assignment:', {
                courseId,
                assignmentId,
                studentId,
                fileName: file.name
            });

            await submitAssignment(courseId, assignmentId, studentId, file);
            alert('Assignment submitted successfully!');

            fetchSubmissions();

            // Clear form
            setSubmission({text: '', fileName: 'No file chosen'});
            fileInput.value = '';

        } catch (err) {
            console.error('Error submitting assignment:', err);
            alert('Error submitting assignment: ' + (err.response?.data?.message || err.message));
        }
    };

    const handleCreateAssignment = async (e) => {
        e.preventDefault();

        try {
            console.log('Creating assignment:', newAssignment);
            await createAssignment(courseId, newAssignment);
            alert('Assignment created successfully!');

            // Reset form
            setNewAssignment({courseId: courseId,title: '', description: '', dueDate: ''});

            // Refresh assignments list
            fetchAssignments();

        } catch (err) {
            console.error('Error creating assignment:', err);
            alert('Error creating assignment: ' + (err.response?.data?.message || err.message));
        }
    };

    const handleEditAssignment = (assignmentToEdit) => {
        setEditAssignment(assignmentToEdit);
        setNewAssignment({
            courseId: courseId,
            title: assignmentToEdit.title,
            description: assignmentToEdit.description,
            dueDate: assignmentToEdit.dueDate.slice(0, 16) // Format for datetime-local input
        });
    };

    const cancelEdit = () => {
        setEditAssignment(null);
        setNewAssignment({courseId: courseId, title: '', description: '', dueDate: ''});
    };

    const handleUpdateAssignment = async (e) => {
        e.preventDefault();

        try {
            console.log('Updating assignment:', newAssignment);
            await updateAssignment(editAssignment.courseId, editAssignment.id, newAssignment);
            alert('Assignment updated successfully!');

            // Reset form and editing mode
            setNewAssignment({courseId: courseId,title: '', description: '', dueDate: ''});
            setEditAssignment(null);

            // Refresh assignments list
            fetchAssignments();
        } catch (err) {
            console.error('Error updating assignment:', err);
            alert('Error updating assignment: ' + (err.response?.data?.message || err.message));
        }
    };

    const handleDeleteAssignment = async (assignmentId) => {
        try {
            await deleteAssignment(courseId, assignmentId);
            alert('Assignment deleted successfully!');
            setShowDeleteConfirm(null);
            fetchAssignments();
        } catch (err) {
            console.error('Error deleting assignment:', err);
            alert('Error deleting assignment: ' + (err.response?.data?.message || err.message));
        }
    };

    if (loading && userRole === 'STUDENT') {
        return (
            <div className="min-h-screen bg-gray-100 rounded-lg">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <p>Loading assignment...</p>
                </div>
            </div>
        );
    }

    if (error && userRole === 'STUDENT') {
        return (
            <div className="min-h-screen bg-gray-100 rounded-lg">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <p className="text-red-600">{error}</p>
                    <button onClick={fetchAssignments} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 rounded-lg">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <button
                    onClick={handleGoBack}
                    className="flex items-center mb-6 text-purple-600 hover:text-purple-800"
                >
                    <ArrowLeft className="mr-2"/>
                    <span>Back to Assignments</span>
                </button>

                {userRole === 'STUDENT' && assignmentId && assignment && (
                    <div className="bg-white rounded-lg shadow-md border border-gray-200">
                        <div className="border-b border-gray-200 bg-purple-50 p-6">
                            <h1 className="text-2xl font-bold text-purple-900 mb-2">
                                {assignment.title}
                            </h1>
                            <p className="text-gray-600 mb-4">
                                {assignment.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-6 text-sm">
                                <div className="flex items-center text-gray-600">
                                    <Calendar className="w-4 h-4 mr-2"/>
                                    <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                                </div>
                                <div className="text-gray-600">
                                    Created: {new Date(assignment.created_at).toLocaleDateString()}
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
                                        onChange={(e) => setSubmission(prev => ({
                                            ...prev,
                                            text: e.target.value
                                        }))}
                                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                                            className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors flex items-center gap-2"
                                        >
                                            <Upload className="w-5 h-5"/>
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
                                                <X className="w-5 h-5"/>
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
                                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                                    >
                                        Submit Assignment
                                    </button>
                                </div>
                            </form>
                            {/* Grade and Feedback Section */}
                            <div className="border-t border-gray-200 pt-6 mt-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Instructor Feedback</h3>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
                                    <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-md">
                                        <span className="text-gray-500 italic">
                                            {submission.grade || 'Not graded yet'}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Feedback</label>
                                    <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-md">
                                        <p className="text-gray-500 italic">
                                            {submission.feedback || 'No feedback yet'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {userRole === 'INSTRUCTOR' && (
                    <div className="space-y-6">
                        {/* Assignment List for Instructors */}
                        <div className="bg-white rounded-lg shadow-md border border-gray-200">
                            <div className="border-b border-gray-200 bg-blue-50 p-6">
                                <h2 className="text-xl font-bold text-blue-900">Course Assignments</h2>
                            </div>
                            <div className="p-6">
                                {assignments.length === 0 ? (
                                    <p className="text-gray-600">No assignments created yet.</p>
                                ) : (
                                    <div className="space-y-4">
                                        {assignments.map((assignmentItem) => (
                                            <div key={assignmentItem.id} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                            {assignmentItem.title}
                                                        </h3>
                                                        <p className="text-gray-600 mb-2">
                                                            {assignmentItem.description}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            Due: {new Date(assignmentItem.dueDate).toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-2 ml-4">
                                                        <button
                                                            onClick={() => handleEditAssignment(assignmentItem)}
                                                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => setShowDeleteConfirm(assignmentItem.id)}
                                                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Delete Confirmation Modal */}
                        {showDeleteConfirm && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg p-6 max-w-md mx-4">
                                    <h3 className="text-lg font-semibold mb-4">Delete Assignment</h3>
                                    <p className="text-gray-600 mb-6">
                                        Are you sure you want to delete this assignment?
                                    </p>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setShowDeleteConfirm(null)}
                                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => handleDeleteAssignment(showDeleteConfirm)}
                                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Create/Edit Assignment Form */}
                        <div className="bg-white rounded-lg shadow-md border border-gray-200">
                            <div className="border-b border-gray-200 bg-purple-50 p-6">
                                <h1 className="text-2xl font-bold text-purple-900 mb-2">
                                    {editAssignment ? "Edit Assignment" : "Create New Assignment"}
                                </h1>
                                <p className="text-gray-600">
                                    {editAssignment ? "Update assignment details" : "Create assignment for the course"}
                                </p>
                            </div>
                            <div className="p-6">
                                <form onSubmit={editAssignment ? handleUpdateAssignment : handleCreateAssignment} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-700">
                                            Assignment title
                                        </label>
                                        <input
                                            type="text"
                                            value={newAssignment.title}
                                            onChange={(e) => setNewAssignment(prev => ({
                                                ...prev,
                                                title: e.target.value
                                            }))}
                                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            placeholder="Type your assignment title"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-700">
                                            Description
                                        </label>
                                        <textarea
                                            value={newAssignment.description}
                                            onChange={(e) => setNewAssignment(prev => ({
                                                ...prev,
                                                description: e.target.value
                                            }))}
                                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            rows="4"
                                            placeholder="Enter assignment description..."
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-700">
                                            Due Date & Time
                                        </label>
                                        <input
                                            type="datetime-local"
                                            value={newAssignment.dueDate}
                                            onChange={(e) => setNewAssignment(prev => ({
                                                ...prev,
                                                dueDate: e.target.value
                                            }))}
                                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center justify-end gap-4">
                                        <button
                                            type="button"
                                            onClick={editAssignment ? cancelEdit : handleGoBack}
                                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            {editAssignment ? 'Cancel Edit' : 'Cancel'}
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center gap-2"
                                        >
                                            <Plus className="w-4 h-4"/>
                                            {editAssignment ? 'Update Assignment' : 'Create Assignment'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AssignmentSubmission;