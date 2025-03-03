import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) return <p>Loading...</p>;

    return user ? children : <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
