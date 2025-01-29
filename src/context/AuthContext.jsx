import axios from "axios";
import {  createContext, useContext, useEffect, useState } from "react";
import { API } from "../constants";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);

    const checkAuth = async() => {
        try{
            const response = await axios.get(`${API}/auth/validate`,{ withCredentials: true})
            setIsAuthenticated(response.data.isValid);
        }catch(error){
            setIsAuthenticated(false);
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        checkAuth();
    },[]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated,isLoading,checkAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);