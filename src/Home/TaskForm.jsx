import React, { useState } from "react";
import axios from "axios";

const TaskForm = ({ fetchTasks }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return alert("Title is required!");

        const newTask = { title, description, category: "To-Do" };
        await axios.post("http://localhost:5000/tasks", newTask);
        fetchTasks();
        setTitle("");
        setDescription("");
    };

    return (
        <form className="mb-4 flex gap-2" onSubmit={handleSubmit}>
            <input
                type="text"
                className="border p-2 rounded w-full"
                placeholder="Task Title (max 50 chars)"
                maxLength={50}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                className="border p-2 rounded w-full"
                placeholder="Description (optional, max 200 chars)"
                maxLength={200}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button className="bg-[#BC6C25]/90 text-white px-4 py-2 rounded">Add Task</button>
        </form>
    );
};

export default TaskForm;
