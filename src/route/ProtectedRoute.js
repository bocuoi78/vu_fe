import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

export const ProtectedRoute = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    // console.log(token);
    // Check if the user is authenticated
    if (!token) {
        // If not authenticated, redirect to the login page
        // navigate("/login", { replace: true });
        return <Navigate to="/dang-nhap" />;
    }

    // If authenticated, render the child routes
    return <Outlet />;
};