import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Welcome = () => {
    const navigate = useNavigate();

    // Animation Variants
    const fadeIn = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const listItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: { delay: i * 0.2, duration: 0.5 }
        })
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6"
            initial="hidden"
            animate="visible"
        >
            <motion.h1
                className="text-4xl font-bold text-gray-800 mb-4"
                variants={fadeIn}
            >
                Welcome to <span className="text-blue-500">TaskForce</span>
            </motion.h1>

            <motion.p
                className="text-lg text-gray-600 max-w-2xl"
                variants={fadeIn}
            >
                TaskForce is your **ultimate task management solution**, designed to boost productivity,
                keep you organized, and help you stay on top of your goals. Whether you're managing personal projects
                or working with a team, TaskForce makes task tracking seamless and efficient.
            </motion.p>

            {/* Benefits Section */}
            <motion.div
                className="bg-white p-6 rounded-lg shadow-lg mt-6 max-w-lg"
                variants={fadeIn}
            >
                <motion.h2
                    className="text-2xl font-semibold text-gray-800 mb-3"
                    variants={fadeIn}
                >
                    Why Use a Task Management App?
                </motion.h2>

                <motion.ul
                    className="text-gray-600 text-left list-disc list-inside space-y-2"
                    initial="hidden"
                    animate="visible"
                >
                    {[
                        "✔ Better organization – Keep track of tasks with clear categories.",
                        "✔ Improved productivity – Stay focused with a structured workflow.",
                        "✔ Seamless collaboration – Work efficiently with teams.",
                        "✔ Time management – Meet deadlines with reminders and progress tracking.",
                        "✔ Access anywhere – Cloud-based and always available."
                    ].map((text, i) => (
                        <motion.li
                            key={i}
                            custom={i}
                            variants={listItemVariants}
                        >
                            {text}
                        </motion.li>
                    ))}
                </motion.ul>
            </motion.div>

            {/* Buttons */}
            <motion.div
                className="mt-6 flex gap-4"
                variants={fadeIn}
            >
                <motion.button
                    onClick={() => navigate("/register")}
                    className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Register
                </motion.button>

                <motion.button
                    onClick={() => navigate("/login")}
                    className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow hover:bg-gray-800 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Log In
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default Welcome;
