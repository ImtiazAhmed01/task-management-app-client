import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/authProvider";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

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
                {/* Left Section: Website Title & Username (if logged in) */}
                <div className="flex items-center gap-4">
                    <NavLink to="/" className="text-2xl font-bold text-[#3F0113]">
                        Task Management Application
                    </NavLink>

                </div>

                {/* Middle Section: Add/Edit Task if logged in */}
                {user && (
                    <div className="flex items-center gap-4">
                        <NavLink to="/addtask" className="btn btn-outline border-[#BC6C25] text-[#BC6C25] hover:bg-[#BC6C25] hover:text-white">
                            Add Task
                        </NavLink>
                        <NavLink to="/edittask" className="btn btn-outline border-[#BC6C25] text-[#BC6C25] hover:bg-[#BC6C25] hover:text-white">
                            Edit Task
                        </NavLink>
                    </div>
                )}

                {/* Right Section: User Actions */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <button onClick={toggleTheme} className="btn btn-outline px-3 py-1">
                                {theme === "light" ? "🌙 " : "☀️ "}
                            </button>
                            <span className="text-lg font-semibold text-[#3F0113]">
                                {user.displayName}
                            </span>
                            <button
                                className="btn bg-[#DDA15E] text-[#3F0113] border-none hover:bg-[#BC6C25]"
                                onClick={handleLogout}
                            >
                                Log Out
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <button onClick={toggleTheme} className="btn btn-outline px-3 py-1">
                                {theme === "light" ? "🌙 " : "☀️ "}
                            </button>
                            <NavLink to="/register" className="btn btn-outline border-[#BC6C25] text-[#BC6C25] hover:bg-[#BC6C25] hover:text-white">
                                Sign Up
                            </NavLink>
                            <NavLink to="/login" className="btn btn-outline border-[#BC6C25] text-[#BC6C25] hover:bg-[#BC6C25] hover:text-white">
                                Log In
                            </NavLink>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
