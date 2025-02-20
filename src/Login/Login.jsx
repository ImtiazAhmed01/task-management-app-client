/* eslint-disable react/no-unescaped-entities */
import 'react-toastify/dist/ReactToastify.css';

import { useContext, useRef, useState } from "react";
import { AuthContext } from "../Provider/authProvider";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import Swal from 'sweetalert2';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';



const Login = () => {
    const auth = getAuth()
    const { signInUser, signInWithGoogle } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const emailref = useRef();

    const handleForgetPassword = () => {
        console.log('get me email address');
        const email = emailref.current.value;
        if (!email) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please provide a valid email address!',
            });
        } else {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Password reset email sent. Please check your email.',
                    });
                })
                .catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `Failed to send password reset email: ${error.message}`,
                    });
                });
        }
    };
    // const emailref=useRef()

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            navigate("/");
            toast.success('Login successful!', {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
        } catch (error) {
            console.error("Google login failed:", error.message);
            toast.error('Google login failed. Please try again.', {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!email || !password) {
            toast.error('Please enter both email and password.', {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
            return;
        }

        try {
            const userCredential = await signInUser(email, password);
            const user = userCredential.user;

            if (user) {
                navigate('/');
                toast.success('Login successful!', {
                    position: "top-center",
                    autoClose: 5000,
                    theme: "light",
                    transition: Bounce,
                });
            }
        } catch (error) {
            console.error("Login failed:", error.message);
            toast.error('Invalid email or password. Please try again.', {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <h1 className="text-5xl font-bold">Login now & learn the world!</h1>

                <form onSubmit={handleLogin} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="email"
                            ref={emailref}
                            name="email"
                            className="input input-bordered"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="password"
                                name="password"
                                className="input input-bordered w-full pr-10"
                                required
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
                                onClick={togglePasswordVisibility}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d={showPassword
                                        ? "M15 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z M2 12s2.75-5.5 10-5.5S22 12 22 12s-2.75 5.5-10 5.5S2 12 2 12z"
                                        : "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"}
                                />
                            </svg>
                        </div>
                        <label className="label label-text-alt link link-hover"
                            onClick={handleForgetPassword}>
                            Forgot password?

                        </label>
                    </div>

                    <div className="form-control mt-6">
                        <button
                            type="submit"
                            className="btn"
                            style={{
                                backgroundColor: "#BC6C25",
                                color: "#3F0113",
                                border: "none",
                                transition: "background-color 0.3s, color 0.3s",
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#3F0113";
                                e.target.style.color = "#BC6C25";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "#BC6C25";
                                e.target.style.color = "#3F0113";
                            }}
                        >
                            Login
                        </button>
                    </div>

                    <div className="mt-3">
                        <hr />
                        <button type="button" onClick={handleGoogleSignIn} className="btn mt-5 btn-ghost btn-outline">
                            Login with Google<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="form-control mt-6">
                        <h3 className="text-xl">
                            Don't have an account? <Link to="/register">Register now</Link>
                        </h3>
                    </div>
                </form>
            </div>

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="bounce"
            />
        </div>
    );
};

export default Login;
