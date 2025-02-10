import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/api/auth/user", { withCredentials: true })
            .then(res => setUser(res.data))
            .catch(() => setUser(null));
    }, []);

    const logout = () => {
        axios.get("http://localhost:5000/api/auth/logout", { withCredentials: true })
            .then(() => setUser(null));
    };

    return (
        <AuthContext.Provider value={{ user, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
