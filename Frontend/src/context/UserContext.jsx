import { Children } from "react";
import { createContext, useState } from "react";
import React from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const updateUser = (userData) => {
        setUser(userData)
    }
    const clearUser = () => {
        setUser(null)
    }
    return (
        <UserContext.Provider
            value={{ user, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    )
}