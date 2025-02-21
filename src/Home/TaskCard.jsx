import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import axios from "axios";

const TaskCard = ({ task, fetchTasks }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task._id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/tasks/${task._id}`);
            fetchTasks(); // Refresh the tasks after deletion
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <motion.div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-white p-4 rounded-lg shadow-md mb-2 flex justify-between items-center border border-gray-300"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
        >
            <div>
                <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                <p className="text-gray-600">{task.description}</p>
            </div>
            <button onClick={handleDelete} className="text-red-500 text-xl">🗑</button>
        </motion.div>
    );
};

export default TaskCard;
