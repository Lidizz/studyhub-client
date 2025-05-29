import React from 'react';

const ModulesEditForm = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        console.log('Form data:', data);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded">
            <div className="mb-4">
                <h1 className="text-center text-2xl font-medium text-gray-700">Create module</h1>
                <label htmlFor="name" className="block text-gray-700 mb-2">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="w-full px-3 py-2 border rounded"
                    required
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
                />
            </div>

            <button type="submit"
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                    >

                    Submit
            </button>
        </form>

    );
};

export default ModulesEditForm;