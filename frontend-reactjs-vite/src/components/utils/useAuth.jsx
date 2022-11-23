import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [authed, setAuthed] = useState(null);

    useEffect(() => {
        checkAuth().then(response => setAuthed(response));
    }, []);

    async function login(loginFormData) {
        await axios.post("https://port-8000-reactfastapiapp-pancakepuncher802511.codeanyapp.com/user/login", loginFormData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: true
        })
            .then((response) => {setAuthed(true)})
            .catch((error) => {setAuthed(false)});
    }

    function checkAuth() {
        return axios.get("https://port-8000-reactfastapiapp-pancakepuncher802511.codeanyapp.com/user/auth", {
            withCredentials: true
        })
            .then((response) => {
                return true;
            })
            .catch((error) => {
                return false;
            });
    }

    function logout() {
        return axios.get("https://port-8000-reactfastapiapp-pancakepuncher802511.codeanyapp.com/user/logout", {
            withCredentials: true
        })
            .then((response) => {
                setauthed(false)
                return true;
            })
            .catch((error) => {
                return false;
            });
    }

    return <AuthContext.Provider value={{authed, login, logout}}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}
