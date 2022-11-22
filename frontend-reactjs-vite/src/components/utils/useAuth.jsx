import * as React from "react";
import axios from "axios";
import { authState } from "../atoms/atoms.jsx";
import { useRecoilState } from 'recoil';

export const AuthContext = React.createContext(null);

export default function AuthProvider({ children }) {

    const [authed, setAuthed] = useRecoilState(authState);

  function login(loginFormData) {
    axios.post("https://port-8000-reactfastapiapp-pancakepuncher802511.codeanyapp.com/user/login", loginFormData, {
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true
        })
        .then((response) => setAuthed(true))
            .catch((error) => setAuthed(false))
  }

  function checkAuth() {
    axios.get("https://port-8000-reactfastapiapp-pancakepuncher802511.codeanyapp.com/user/auth", {
        withCredentials: true
        })
        .then((response) => {setAuthed(true), console.log(response.data)})
            .catch((error) => {setAuthed(false), console.log(error.response)})
  }
  console.log(authed)
  return <AuthContext.Provider value={{login, checkAuth}}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return React.useContext(AuthContext);
}
