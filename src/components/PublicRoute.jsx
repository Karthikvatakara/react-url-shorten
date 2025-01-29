import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import LoadingSpinner from "./Loading/LoadingSpinner";

const PublicRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if(isLoading){
        return <LoadingSpinner/>
    }

    if(isAuthenticated){
        return <Navigate to="/" replace />
    }

    return children;
}

export default PublicRoute