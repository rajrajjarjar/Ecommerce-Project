import { createContext, useContext, useState } from "react";


const AuthContext = createContext();
export function AuthProvider({ children }) {
    const [isLoggedin, setLoggedIn] = useState(
        localStorage.getItem("token") !== null
    );
    function login(token) {
        localStorage.setItem("token", token);
        setLoggedIn(true);

    }
    function logout() {
        localStorage.removeItem("token");
        setLoggedIn(false);
    }
    return (
        <AuthContext.Provider value={{ isLoggedin, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

export function useAuth() {
    return useContext(AuthContext);
}

