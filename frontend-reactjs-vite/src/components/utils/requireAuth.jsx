import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from "./useAuth.jsx";

export default function RequireAuth({ children }) {
    const { authed } = useAuth();
    const location = useLocation();

    if (!authed) {
        return <Navigate to="/login" state={{path: location.pathname}} />
    }

    return children;
  }
