import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from '../Provider/authProvider';

const TaskForm = ({ fetchTasks }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const { user } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return alert("Title is required!");
        if (!user) return alert("User not authenticated!");

        const newTask = {
            userId: user.uid, // Firebase user ID
            userEmail: user.email, // Save user email
            title,
            description,
            category: "To-Do",
            order: 0, // Default order will be updated on the backend
            dueDate: dueDate || null, // Store as ISO format or null
            createdAt: new Date().toISOString(),
            logs: [`Task created at ${new Date().toISOString()}`] // Initial log entry
        };

        await axios.post("https://taskforce-management.vercel.app/tasks", newTask);
        fetchTasks();
        setTitle("");
        setDescription("");
        setDueDate("");
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
                required
            />
            <input
                type="text"
                className="border p-2 rounded w-full"
                placeholder="Description (optional, max 200 chars)"
                maxLength={200}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="date"
                className="border p-2 rounded w-full"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <button className="bg-[#BC6C25]/90 text-white px-4 py-2 rounded">Add Task</button>
        </form>
    );
};

export default TaskForm;
