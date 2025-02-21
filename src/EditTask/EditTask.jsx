import React, { useState, useEffect } from "react";
import axios from "axios";

const EditTask = ({ task, setTasks, setEditingTask }) => {
    // Ensure task is not undefined before accessing properties
    const [title, setTitle] = useState(task?.title || "");
    const [description, setDescription] = useState(task?.description || "");

    // Update state when `task` changes
    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
        }
    }, [task]);

    const handleUpdate = async () => {
        if (!task) {
            console.error("Error: No task selected for editing.");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:5000/tasks/${task._id}`, {
                title,
                description,
            });

            setTasks(prevTasks => prevTasks.map(t => (t._id === task._id ? response.data : t)));
            setEditingTask(null);
        } catch (err) {
            console.error("Error updating task:", err);
        }
    };

    if (!task) {
        return null; // Don't render if task is not set
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Edit Task</h2>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task title"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter task description"
                />
                <div className="modal-buttons">
                    <button className="btn btn-primary" onClick={handleUpdate}>
                        Save
                    </button>
                    <button className="btn btn-secondary" onClick={() => setEditingTask(null)}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditTask;
