import React from "react";
import TaskCard from "./TaskCard";

const TaskColumn = ({ category, tasks, updateTaskCategory }) => {
    const handleDrop = (event) => {
        const taskId = event.dataTransfer.getData("taskId");
        updateTaskCategory(taskId, category);
    };

    const allowDrop = (event) => event.preventDefault();

    return (
        <div
            className="bg-gray-100 p-4 rounded-md min-h-[300px]"
            onDragOver={allowDrop}
            onDrop={handleDrop}
        >
            <h2 className="font-bold text-lg mb-2">{category}</h2>
            {tasks.map(task => (
                <TaskCard key={task._id} task={task} />
            ))}
        </div>
    );
};

export default TaskColumn;
