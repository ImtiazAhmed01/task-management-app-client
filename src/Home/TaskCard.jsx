import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import axios from "axios";

const TaskCard = ({ task, fetchTasks }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task._id });
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({ title: task.title, description: task.description });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`https://taskforce-management.vercel.app/tasks/${task._id}`);
            fetchTasks(); // Refresh the tasks after deletion
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleEdit = async () => {
        try {
            await axios.put(`https://taskforce-management.vercel.app/tasks/${task._id}`, editedTask);
            fetchTasks(); // Refresh the tasks after editing
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <>
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
                    <p className="text-gray-600">{task.dueDate?.split("T")[0] || "No due date"}</p>

                </div>
                <div className="flex gap-2">
                    <button onClick={() => setIsEditing(true)} className="text-blue-500 text-xl"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                        <path fill="#E57373" d="M42.583,9.067l-3.651-3.65c-0.555-0.556-1.459-0.556-2.015,0l-1.718,1.72l5.664,5.664l1.72-1.718C43.139,10.526,43.139,9.625,42.583,9.067"></path><path fill="#FF9800" d="M4.465 21.524H40.471999999999994V29.535H4.465z" transform="rotate(134.999 22.469 25.53)"></path><path fill="#B0BEC5" d="M34.61 7.379H38.616V15.392H34.61z" transform="rotate(-45.02 36.61 11.385)"></path><path fill="#FFC107" d="M6.905 35.43L5 43 12.571 41.094z"></path><path fill="#37474F" d="M5.965 39.172L5 43 8.827 42.035z"></path>
                    </svg></button>
                    <button onClick={handleDelete} className="text-red-500 text-xl"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
                        <path d="M 20.5 4 A 1.50015 1.50015 0 0 0 19.066406 6 L 14.640625 6 C 12.796625 6 11.086453 6.9162188 10.064453 8.4492188 L 7.6972656 12 L 7.5 12 A 1.50015 1.50015 0 1 0 7.5 15 L 40.5 15 A 1.50015 1.50015 0 1 0 40.5 12 L 40.302734 12 L 37.935547 8.4492188 C 36.913547 6.9162187 35.202375 6 33.359375 6 L 28.933594 6 A 1.50015 1.50015 0 0 0 27.5 4 L 20.5 4 z M 8.9726562 18 L 11.125 38.085938 C 11.425 40.887937 13.77575 43 16.59375 43 L 31.40625 43 C 34.22325 43 36.574 40.887938 36.875 38.085938 L 39.027344 18 L 8.9726562 18 z"></path>
                    </svg></button>
                </div>
            </motion.div>

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
                        <input
                            type="text"
                            value={editedTask.title}
                            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                            className="w-full border p-2 rounded mb-3"
                        />
                        <textarea
                            value={editedTask.description}
                            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                            className="w-full border p-2 rounded mb-3"
                        />
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                            <button onClick={handleEdit} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TaskCard;
