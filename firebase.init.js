// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDs3tCJtV-se8T-fJbCb6mch3do0VzTE48",
    authDomain: "task-management-applicat-abc53.firebaseapp.com",
    projectId: "task-management-applicat-abc53",
    storageBucket: "task-management-applicat-abc53.firebasestorage.app",
    messagingSenderId: "149250120554",
    appId: "1:149250120554:web:11a1276cf038e6b3a06313"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app;