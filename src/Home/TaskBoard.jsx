import React, { useState, useEffect } from "react";
import {
    DndContext,
    closestCenter,
    useDroppable,
    useDraggable,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
    DragOverlay,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import TaskForm from "./TaskForm";
import TaskCard from "./TaskCard";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const initialTasks = {
    "To-Do": [],
    "In Progress": [],
    Done: [],
};

const Column = ({ category, children }) => {
    const { setNodeRef } = useDroppable({ id: category });

    return (
        <div ref={setNodeRef} className="bg-gray-100 p-4 rounded-lg shadow-md min-h-[300px] w-full sm:w-[30%]">
            <h2 className="text-xl font-semibold text-gray-700 mb-2 text-center">{category}</h2>
            {children}
        </div>
    );
};

const TaskBoard = () => {
    const [tasks, setTasks] = useState(initialTasks);
    const [activeTask, setActiveTask] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 10 } }) // Adjusted for better touch response
    );

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/tasks");
            const organizedTasks = { "To-Do": [], "In Progress": [], Done: [] };
            data.forEach((task) => organizedTasks[task.category].push(task));
            setTasks(organizedTasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const handleDragStart = (event) => {
        const { active } = event;
        const foundTask = Object.values(tasks)
            .flat()
            .find((task) => task._id === active.id);

        setActiveTask(foundTask);
    };

    const handleDragEnd = async (event) => {
        setActiveTask(null);
        const { active, over } = event;
        if (!over) return;

        const sourceCategory = Object.keys(tasks).find(category =>
            tasks[category].some(task => task._id === active.id)
        );
        const destinationCategory = over.id;

        if (!sourceCategory || !destinationCategory || sourceCategory === destinationCategory) return;

        const newTasks = { ...tasks };
        const movedTask = newTasks[sourceCategory].find(task => task._id === active.id);

        newTasks[sourceCategory] = newTasks[sourceCategory].filter(task => task._id !== active.id);
        newTasks[destinationCategory].push(movedTask);
        movedTask.category = destinationCategory;

        setTasks(newTasks);

        try {
            await axios.put(`http://localhost:5000/tasks/${movedTask._id}`, {
                category: destinationCategory,
            });

            socket.emit("task-updated", { id: movedTask._id, category: destinationCategory });
        } catch (error) {
            console.error("Error updating task category in the database:", error);
        }
    };

    useEffect(() => {
        fetchTasks();

        socket.on("task-updated", (updatedTask) => {
            setTasks(prevTasks => {
                const newTasks = { ...prevTasks };

                Object.keys(newTasks).forEach(category => {
                    newTasks[category] = newTasks[category].filter(task => task._id !== updatedTask.id);
                });

                newTasks[updatedTask.category].push(updatedTask);
                return newTasks;
            });
        });

        return () => {
            socket.off("task-updated");
        };
    }, []);

    return (
        <motion.div className="max-w-5xl mx-auto p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Task Management</h1>
            <TaskForm fetchTasks={fetchTasks} />

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className="flex flex-col sm:flex-row gap-6">
                    {Object.keys(tasks).map((category) => (
                        <Column key={category} category={category}>
                            <SortableContext items={tasks[category].map(task => task._id)} strategy={verticalListSortingStrategy}>
                                {tasks[category].map((task) => (
                                    <TaskCard key={task._id} task={task} fetchTasks={fetchTasks} />
                                ))}
                            </SortableContext>
                        </Column>
                    ))}
                </div>

                {/* Drag Overlay */}
                <DragOverlay>
                    {activeTask ? (
                        <motion.div
                            className="bg-white shadow-xl p-3 rounded-lg border"
                            initial={{ scale: 1 }}
                            animate={{ scale: 1.1 }}
                            exit={{ scale: 1 }}
                        >
                            {activeTask.title}
                        </motion.div>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </motion.div>
    );
};

export default TaskBoard;
