import React from "react"
import LoadingSpinner from "./Loading/LoadingSpinner"
import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated,isLoading } = useAuth();

    console.log(isAuthenticated,"PROTECTED ROUTE")

    if (isLoading) {
        return <LoadingSpinner/>
    }
    if(!isAuthenticated){
        return <Navigate to='/login'/>
    }

    return children;
}

export default ProtectedRoute