import React from "react"
// import { useAuth } from "../hooks/useAuth"
import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated,isLoading } = useAuth();

    console.log(isAuthenticated,"PROTECTED ROUTE")

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if(!isAuthenticated){
        return <Navigate to='/login'/>
    }

    return children;
}

export default ProtectedRoute