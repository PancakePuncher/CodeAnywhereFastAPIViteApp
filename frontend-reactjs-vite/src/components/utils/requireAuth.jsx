import { useEffect } from "react";
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from "./useAuth.jsx";

export default function RequireAuth({ children }) {
    const { authed, setAuthed, checkAuth } = useAuth();
    const location = useLocation();

    useEffect(() => {
        if (authed == null) {
            checkAuth().then(response => setAuthed(response));
        };
    }, []);

    if (!authed) {
        return <Navigate to="/unauthed" state={{path: location.pathname}} />
    }

    return children;
  }
