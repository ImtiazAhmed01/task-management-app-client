import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/authProvider";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo1 from '../assets/task2.png'

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
        <div className="sticky top-0 z-50 shadow-md bg-[#BC6C25]/90">
            <nav className="navbar px-4 py-3 flex justify-between items-center">

                <div className="flex items-center gap-4">
                    <NavLink to="/home" className="text-2xl font-bold text-[#FFFF00] flex gap-2">
                        <img src={logo1} alt="" />TaskForce
                    </NavLink>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-[#FFFF00] text-2xl sm:hidden"
                    >
                        {isOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>

                {/* Middle Section: Navigation Links (Hidden on Mobile) */}
                <div className="hidden sm:flex items-center gap-4">

                    <NavLink to="/" className="btn btn-outline border-[#FFFF00] text-[#FFFF00] hover:bg-[#FFFF00] hover:text-black">Welcome Message</NavLink>

                    <button
                        onClick={() => navigate(user ? "/home" : "/register")}
                        className="btn btn-outline border-[#FFFF00] text-[#FFFF00] hover:bg-[#FFFF00] hover:text-black"
                    >
                        Manage Your Tasks
                    </button>
                </div>

                {/* Right Section: User Actions */}
                <div className="hidden sm:flex items-center gap-4">
                    <button onClick={toggleTheme} className="btn btn-outline px-3 py-1">
                        {theme === "light" ? "🌙 " : "☀️ "}
                    </button>

                    {user ? (
                        <>
                            <span className="text-lg font-semibold text-[#FFFF00]">
                                {user.displayName}
                            </span>
                            <button
                                className="btn bg-[#DDA15E] text-[#FFFF00] border-none hover:bg-[#FFFF00] hover:text-black"
                                onClick={handleLogout}
                            >
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/register" className="btn btn-outline border-[#FFFF00] hover:bg-[#FFFF00] ">
                                Sign Up
                            </NavLink>
                            <NavLink to="/login" className="btn btn-outline border-[#FFFF00]  hover:bg-[#FFFF00] ">
                                Log In
                            </NavLink>
                        </>
                    )}
                </div>
            </nav>

            {/* Mobile Menu (Dropdown) */}
            {isOpen && (
                <div className="sm:hidden bg-[#BC6C25]/90 shadow-md p-4">
                    {user && (
                        <>
                            <NavLink to="/" className="btn btn-outline border-[#FFFF00] text-[#FFFF00] hover:bg-[#FFFF00] hover:text-black">Welcome Message</NavLink>

                            <button
                                onClick={() => navigate(user ? "/home" : "/register")}
                                className="btn btn-outline border-[#FFFF00] text-[#FFFF00] hover:bg-[#FFFF00] hover:text-black"
                            >
                                Manage Your Tasks
                            </button>
                        </>
                    )}

                    <button onClick={toggleTheme} className="w-full text-left py-2">
                        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                    </button>

                    {user ? (
                        <>
                            <span className="block text-center font-semibold text-[#FFFF00] py-2">
                                {user.displayName}
                            </span>
                            <button
                                className="w-full bg-[#DDA15E] text-[#FFFF00] py-2 rounded-md hover:bg-[#FFFF00]"
                                onClick={handleLogout}
                            >
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/register" className="block text-[#FFFF00] py-2">
                                Sign Up
                            </NavLink>
                            <NavLink to="/login" className="block text-[#FFFF00] py-2">
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
