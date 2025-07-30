import React, { createContext, useState } from "react";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        contact: '',
        role: ''
    });

    const updateUser = (userData) => {
        setUser(userData);
    };

    return (
        <UserDataContext.Provider value={{ user, setUser, updateUser }}>
            {children}
        </UserDataContext.Provider>
    );
};

export default UserContext;
