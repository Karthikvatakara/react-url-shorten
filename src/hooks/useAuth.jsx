import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../constants";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${API}/auth/validate`, { withCredentials: true });
                console.log(response, "response in the useAuth");
                console.log(response?.data?.isValid, "is valid");
                
                // Update the state
                setIsAuthenticated(response.data.isValid);
                console.log(isAuthenticated,"isautenticated")
            } catch (error) {
                console.error("authentication error", error);
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    // Add a log to observe the updated state on re-render
    useEffect(() => {
        console.log(isAuthenticated, "Updated isAuthenticated");
    }, [isAuthenticated]);

    return isAuthenticated;
};
