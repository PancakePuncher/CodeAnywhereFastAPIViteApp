import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [authed, setAuthed] = useState(false);

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

    return <AuthContext.Provider value={{authed, login}}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}
