import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Provider/authProvider";
import { Bounce, toast, ToastContainer } from "react-toastify";

const Register = () => {
    const { signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");

    // Save user to database function
    const saveUserToDatabase = async (user) => {
        try {
            const response = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    firstName: user.firstName, // add firstName
                    lastName: user.lastName,   // add lastName
                }),
            });

            const data = await response.json();
            console.log("User saved:", data);
        } catch (error) {
            console.error("Error saving user:", error.message);
        }
    };

    // Create user function
    const createUser = async (email, password, userDetails) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
            const newUser = userCredential.user;

            const displayName = `${userDetails.firstName} ${userDetails.lastName}`;

            await updateProfile(newUser, {
                displayName,
                photoURL: userDetails.photoURL,
            });

            const updatedUser = {
                ...newUser,
                displayName,
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                photoURL: userDetails.photoURL,
            };

            // Save user to localStorage and call saveUserToDatabase
            localStorage.setItem("userProfile", JSON.stringify(updatedUser));
            await saveUserToDatabase(updatedUser);

            return newUser;
        } catch (error) {
            console.error("Error creating user:", error.message);
            throw error;
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            navigate("/");
        } catch (error) {
            console.error("Google login failed:", error.message);
        }
    };

    const validatePassword = (password) => {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const isLongEnough = password.length >= 6;

        if (!hasUppercase) {
            setPasswordError("Password must contain at least one uppercase letter.");
            return false;
        }

        if (!hasLowercase) {
            setPasswordError("Password must contain at least one lowercase letter.");
            return false;
        }

        if (!isLongEnough) {
            setPasswordError("Password must be at least 6 characters long.");
            return false;
        }

        setPasswordError(""); // Clear error if validation passes
        return true;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const fname = e.target.fname.value;
        const lname = e.target.lname.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const imageURL = e.target.imageURL.value;

        if (!validatePassword(password)) {
            toast.error("Invalid password. Please check the requirements.", {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
            return;
        }

        try {
            await createUser(email, password, { firstName: fname, lastName: lname, photoURL: imageURL });

            toast.success("User created successfully!", {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });

            navigate("/");
        } catch (error) {
            toast.error("Error creating user. Please try again.", {
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
        <div>
            <form onSubmit={handleRegister} className="w-full max-w-lg mx-auto my-7">
                <h1 className="text-5xl font-bold mb-5 ml-2">Register here!</h1>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="fname"
                            placeholder="Your first name"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                            required
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lname"
                            placeholder="Your last name"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                            required
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Image URL
                    </label>
                    <input
                        type="text"
                        name="imageURL"
                        placeholder="Enter your image URL"
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                    />
                </div>
                <div className="mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter your password"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-3 text-gray-700"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    {passwordError && (
                        <p className="text-red-500 text-xs italic mt-2">{passwordError}</p>
                    )}
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
                        Register
                    </button>
                </div>
                <div className="mt-3">
                    <hr />
                    <button onClick={handleGoogleSignIn} className="btn mt-5 btn-ghost btn-outline
                    ">
                        Login with Google <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        </svg>
                    </button>
                </div>
                <div className="mt-6 text-xl">
                    Already have an account? <Link to="/login">Login now</Link>
                </div>
            </form>

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

export default Register;
