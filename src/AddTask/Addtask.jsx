import React, { useState } from 'react';
import axios from 'axios';

const Addtask = ({ setTasks }) => {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');

    const addTask = () => {
        if (!newTaskTitle) return;  // Validation to ensure title is entered
        axios.post('http://localhost:5000/tasks', {
            title: newTaskTitle,
            description: newTaskDescription,
            category: 'To-Do',  // Default to 'To-Do'
        })
            .then((res) => {
                setTasks(prevTasks => [...prevTasks, res.data]);
                setNewTaskTitle('');
                setNewTaskDescription('');
            })
            .catch((err) => console.error("Error adding task:", err));
    };

    return (
        <div className="add-task-container">
            <input
                type="text"
                placeholder="Task Title (Max 50 characters)"
                value={newTaskTitle}
                maxLength="50"
                onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <textarea
                placeholder="Task Description (Max 200 characters)"
                value={newTaskDescription}
                maxLength="200"
                onChange={(e) => setNewTaskDescription(e.target.value)}
            />
            <button className='btn btn-primary' onClick={addTask}>Add Task</button>
        </div>
    );
};

export default Addtask;
