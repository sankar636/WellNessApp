import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
// import { jwtDecode } from "jwt-decode";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        contact: '',
        role: '',
        _id: ''
    });
    const [loading, setLoading] = useState(true);

    const updateUser = (userData) => {
        setUser(prev => ({
            ...prev,
            ...userData
        }));
    };

    const logoutUser = () => {
        localStorage.removeItem("token");
        setUser({
            username: '',
            email: '',
            contact: '',
            role: '',
            _id: ''
        });
    };

    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = localStorage.getItem("token");
            
            if (token) {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/me`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    updateUser(response.data.user);
                } catch (error) {
                    console.error("Auth check failed:", error);
                    logoutUser();
                }
            }
            setLoading(false);
        };

        checkAuthStatus();
    }, []);

    return (
        <UserDataContext.Provider value={{ 
            user, 
            setUser: updateUser,
            updateUser,
            logoutUser,
            loading 
        }}>
            {children}
        </UserDataContext.Provider>
    );
};

export default UserContext;