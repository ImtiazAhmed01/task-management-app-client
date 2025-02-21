import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Provider/authProvider";


const PrivateRoute = () => {
    const { user } = useContext(AuthContext);

    return user ? <Outlet /> : <Navigate to="/register" />;
};

export default PrivateRoute;
