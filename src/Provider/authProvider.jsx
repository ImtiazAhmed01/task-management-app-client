import { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from "firebase/auth";
import { auth } from "../../firebase.init";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    // Function to save user data in the database
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

    // Function to create user
    const createUser = async (email, password, userDetails) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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

            setUser(updatedUser);
            localStorage.setItem("userProfile", JSON.stringify(updatedUser));

            // Save user in database
            await saveUserToDatabase(updatedUser);

            return newUser;
        } catch (error) {
            console.error("Error creating user:", error.message);
            throw error;
        }
    };

    const signOutUser = async () => {
        try {
            await signOut(auth);
            setUser(null);
            localStorage.removeItem("userProfile");
        } catch (error) {
            console.error("Sign-out error:", error.message);
        }
    };

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            setUser(user);
            localStorage.setItem("userProfile", JSON.stringify(user));
            return user;
        } catch (error) {
            console.error("Google Sign-In error:", error.message);
            throw error;
        }
    };

    const signInUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                localStorage.setItem("userProfile", JSON.stringify(currentUser));
            } else {
                setUser(null);
                localStorage.removeItem("userProfile");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                createUser,
                signInUser,
                signOutUser,
                signInWithGoogle,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
