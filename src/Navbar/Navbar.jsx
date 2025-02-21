import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/authProvider";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for mobile menu toggle

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [isOpen, setIsOpen] = useState(false); // State for mobile menu

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleLogout = async () => {
        try {
            await signOutUser();
            console.log("User logged out successfully");
            navigate("/");
        } catch (error) {
            console.error("Logout error:", error.message);
            alert("Failed to log out. Please try again.");
        }
    };

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <div className="sticky top-0 z-50 shadow-md bg-[#BC6C25]/40">
            <nav className="navbar px-4 py-3 flex justify-between items-center">
                {/* Left Section: Logo & Menu Button (Mobile) */}
                <div className="flex items-center gap-4">
                    <NavLink to="/" className="text-2xl font-bold text-[#3F0113]">
                        TaskForce
                    </NavLink>
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-[#3F0113] text-2xl sm:hidden"
                    >
                        {isOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>

                {/* Middle Section: Navigation Links (Hidden on Mobile) */}
                <div className="hidden sm:flex items-center gap-4">
                    {user && (
                        <>
                            <NavLink to="/addtask" className="btn btn-outline border-[#BC6C25] text-[#BC6C25] hover:bg-[#BC6C25] hover:text-white">
                                Add Task
                            </NavLink>
                            <NavLink to="/edittask" className="btn btn-outline border-[#BC6C25] text-[#BC6C25] hover:bg-[#BC6C25] hover:text-white">
                                Edit Task
                            </NavLink>
                        </>
                    )}
                </div>

                {/* Right Section: User Actions */}
                <div className="hidden sm:flex items-center gap-4">
                    <button onClick={toggleTheme} className="btn btn-outline px-3 py-1">
                        {theme === "light" ? "🌙 " : "☀️ "}
                    </button>

                    {user ? (
                        <>
                            <span className="text-lg font-semibold text-[#3F0113]">
                                {user.displayName}
                            </span>
                            <button
                                className="btn bg-[#DDA15E] text-[#3F0113] border-none hover:bg-[#BC6C25]"
                                onClick={handleLogout}
                            >
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/register" className="btn btn-outline border-[#BC6C25] text-[#BC6C25] hover:bg-[#BC6C25] hover:text-white">
                                Sign Up
                            </NavLink>
                            <NavLink to="/login" className="btn btn-outline border-[#BC6C25] text-[#BC6C25] hover:bg-[#BC6C25] hover:text-white">
                                Log In
                            </NavLink>
                        </>
                    )}
                </div>
            </nav>

            {/* Mobile Menu (Dropdown) */}
            {isOpen && (
                <div className="sm:hidden bg-white shadow-md p-4">
                    {user && (
                        <>
                            <NavLink to="/addtask" className="block text-[#BC6C25] py-2">
                                Add Task
                            </NavLink>
                            <NavLink to="/edittask" className="block text-[#BC6C25] py-2">
                                Edit Task
                            </NavLink>
                        </>
                    )}

                    <button onClick={toggleTheme} className="w-full text-left py-2">
                        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                    </button>

                    {user ? (
                        <>
                            <span className="block text-center font-semibold text-[#3F0113] py-2">
                                {user.displayName}
                            </span>
                            <button
                                className="w-full bg-[#DDA15E] text-[#3F0113] py-2 rounded-md hover:bg-[#BC6C25]"
                                onClick={handleLogout}
                            >
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/register" className="block text-[#BC6C25] py-2">
                                Sign Up
                            </NavLink>
                            <NavLink to="/login" className="block text-[#BC6C25] py-2">
                                Log In
                            </NavLink>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Navbar;
