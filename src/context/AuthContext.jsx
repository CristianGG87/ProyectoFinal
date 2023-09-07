import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthProviderComponent = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);

    useEffect

    return <AuthContext.Provider value={{ token, setToken }}>{children}</AuthContext.Provider>
}