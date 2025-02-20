import React from "react";
import { motion } from "framer-motion";
import axios from "axios";

const TaskCard = ({ task }) => {
    const handleDelete = async () => {
        await axios.delete(`http://localhost:5000/tasks/${task._id}`);
        window.location.reload(); // Refresh after delete
    };

    const handleDragStart = (event) => {
        event.dataTransfer.setData("taskId", task._id);
    };

    return (
        <motion.div
            draggable
            onDragStart={handleDragStart}
            className="bg-white p-3 rounded-md shadow-md mb-2 flex justify-between items-center cursor-grab active:cursor-grabbing"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
        >
            <div>
                <h3 className="font-semibold text-gray-700">{task.title}</h3>
                <p className="text-sm text-gray-500">{task.description}</p>
            </div>
            <button onClick={handleDelete} className="text-red-500">🗑</button>
        </motion.div>
    );
};

export default TaskCard;
