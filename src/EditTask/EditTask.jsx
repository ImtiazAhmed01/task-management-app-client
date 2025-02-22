import React from 'react';

const EditTask = () => {
    const fetchTasks = async () => {
        try {
            const { data } = await axios.get("https://taskforce-management.vercel.app/tasks");
            const organizedTasks = { "To-Do": [], "In Progress": [], Done: [] };
            data.forEach((task) => organizedTasks[task.category].push(task));
            setTasks(organizedTasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };
    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>

        </div>
    );
};

export default EditTask;