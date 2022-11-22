import { useLocation, Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil';
import { useAuth } from "./useAuth.jsx"
import { authState } from "../atoms/atoms.jsx";

export default function RequireAuth({ children }) {
    const { checkAuth } = useAuth()
    const location = useLocation();
    const authed = useRecoilValue(authState)

    if (authed == null) {
        checkAuth()
        if (!authed && authed != null) {
            return <Navigate to="/login" state={{path: location.pathname}}/>
        } else {
            return children;
        }
    }
  }
