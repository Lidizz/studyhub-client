import axios from 'axios';
import { API_BASE_URL } from '../config';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// User Controller (/api/users)
export const registerUser = async (userData) => {
    return api.post('/users/register', userData);
};

export const loginUser = async (email, password) => {
    return api.post('/users/login', { email, password });
};

export const getUserById = async (id) => {
    return api.get(`/users/${id}`);
};

export const getUserByEmail = async (email) => {
    return api.get(`/users/email/${email}`);
};

export const updateUser = async (id, userData) => {
    return api.put(`/users/${id}`, userData);
};

export const deleteUser = async (id) => {
    return api.delete(`/users/${id}`);
};

// Course Controller (/api/courses)
export const createCourse = async (courseData) => {
    return api.post('/courses', courseData);
};

export const getCourseById = async (id) => {
    return api.get(`/courses/${id}`);
};

export const getCoursesByDepartment = async (department) => {
    return api.get(`/courses/department/${department}`);
};

export const getCoursesSummaryByDepartment = async (department) => {
    return api.get(`/courses/department/${department}/summary`);
};

export const getCoursesForStudent = async (studentId) => {
    return api.get(`/courses/student/${studentId}`);
};

export const getCoursesSummaryForStudent = async (studentId) => {
    return api.get(`/courses/student/${studentId}/summary`);
};

export const getActiveCoursesForUser = async (userId) => {
    return api.get(`/courses/user/${userId}/active`);
};

export const enrollStudentInCourse = async (enrollmentData) => {
    return api.post('/courses/enroll', enrollmentData);
};

export const updateCourse = async (id, courseData) => {
    return api.put(`/courses/${id}`, courseData);
};

export const deleteCourse = async (id) => {
    return api.delete(`/courses/${id}`);
};

// Assignment Controller (/api/courses/{courseId}/assignments)
export const createAssignment = async (courseId, assignmentData) => {
    return api.post(`/courses/${courseId}/assignments`, assignmentData);
};

export const getAssignmentsByCourse = async (courseId) => {
    return api.get(`/courses/${courseId}/assignments`);
};

export const updateAssignment = async (courseId, assignmentId, assignmentData) => {
    return api.put(`/courses/${courseId}/assignments/${assignmentId}`, assignmentData);
};

export const deleteAssignment = async (courseId, assignmentId) => {
    return api.delete(`/courses/${courseId}/assignments/${assignmentId}`);
};

// Module Controller (/api/courses/{courseId}/modules)
export const createModule = async (courseId, moduleData) => {
    return api.post(`/courses/${courseId}/modules`, moduleData);
};

export const getModulesByCourse = async (courseId) => {
    return api.get(`/courses/${courseId}/modules`);
};

export const updateModule = async (courseId, moduleId, moduleData) => {
    return api.put(`/courses/${courseId}/modules/${moduleId}`, moduleData);
};

export const deleteModule = async (courseId, moduleId) => {
    return api.delete(`/courses/${courseId}/modules/${moduleId}`);
};

// Resource Controller (/api/modules/{moduleId}/resources)
export const createResource = async (moduleId, resourceData) => {
    return api.post(`/modules/${moduleId}/resources`, resourceData);
};

export const uploadFileResource = async (moduleId, file, title) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    return api.post(`/modules/${moduleId}/resources/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

export const getResourcesByModule = async (moduleId) => {
    return api.get(`/modules/${moduleId}/resources`);
};

export const downloadFileResource = async (moduleId, resourceId) => {
    return api.get(`/modules/${moduleId}/resources/${resourceId}/download`, {
        responseType: 'blob', // For file downloads
    });
};

export const updateResource = async (moduleId, resourceId, resourceData) => {
    return api.put(`/modules/${moduleId}/resources/${resourceId}`, resourceData);
};

export const deleteResource = async (moduleId, resourceId) => {
    return api.delete(`/modules/${moduleId}/resources/${resourceId}`);
};

// Submission Controller (/api/courses/{courseId}/submissions)
export const submitAssignment = async (courseId, assignmentId, studentId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/courses/${courseId}/submissions/${assignmentId}/student/${studentId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

export const downloadSubmission = async (courseId, assignmentId, studentId) => {
    return api.get(`/courses/${courseId}/submissions/${assignmentId}/student/${studentId}/download`, {
        responseType: 'blob', // For file downloads
    });
};

export const getSubmissionsByStudent = async (courseId, studentId) => {
    return api.get(`/courses/${courseId}/submissions/student/${studentId}`);
};

export const updateSubmission = async (courseId, assignmentId, studentId, submissionData) => {
    return api.put(`/courses/${courseId}/submissions/${assignmentId}/student/${studentId}`, submissionData);
};

export const getCoursesForInstructor = async (instructorId) => {
    return api.get(`/courses/instructor/${instructorId}`);
};

export const getSubmissionsByAssignment = async (courseId, assignmentId) => {
    return api.get(`/courses/${courseId}/submissions/${assignmentId}/submissions`);
};
export const getSubmissionsByCourse = async (courseId) => {
    return api.get(`/courses/${courseId}/submissions`);
};

export const gradeSubmission = async (courseId, assignmentId, studentId, gradeData) => {
    return api.put(`/courses/${courseId}/submissions/${assignmentId}/student/${studentId}/grade`, gradeData);
};

export const getAssignmentWithSubmissions = async (courseId, assignmentId) => {
    return api.get(`/courses/${courseId}/assignments/${assignmentId}/details`);
};

export const getCoursesSummaryForInstructor = async (instructorId) => {
    return api.get(`/courses/instructor/${instructorId}/summary`);
};



export default api;