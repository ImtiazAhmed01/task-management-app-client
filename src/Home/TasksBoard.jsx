import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskColumn from "./TaskColumn";

const TaskBoard = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await axios.get("http://localhost:5000/tasks");
        setTasks(response.data);
    };

    const updateTaskCategory = async (taskId, newCategory) => {
        await axios.put(`http://localhost:5000/tasks/${taskId}`, { category: newCategory });
        fetchTasks(); // Refresh the list after update
    };

    return (
        <div className="grid grid-cols-3 gap-4 p-5">
            {["To Do", "In Progress", "Done"].map((category) => (
                <TaskColumn
                    key={category}
                    category={category}
                    tasks={tasks.filter(task => task.category === category)}
                    updateTaskCategory={updateTaskCategory}
                />
            ))}
        </div>
    );
};

export default TaskBoard;
