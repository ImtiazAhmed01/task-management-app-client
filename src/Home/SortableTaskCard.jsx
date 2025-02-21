import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";

const SortableTaskCard = ({ task }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task._id });

    return (
        <motion.div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{
                transform: CSS.Transform.toString(transform),
                transition,
            }}
            className="bg-white shadow-md p-3 rounded-lg border mb-2 cursor-grab"
        >
            <h3 className="text-md font-medium">{task.title}</h3>
            <p className="text-sm text-gray-500">{task.description}</p>
        </motion.div>
    );
};

export default SortableTaskCard;
