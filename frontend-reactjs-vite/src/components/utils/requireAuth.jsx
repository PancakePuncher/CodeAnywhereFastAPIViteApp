import { useAuth } from "./useAuth";
import { useLocation } from 'react-router-dom'

export default function RequireAuth({ children }) {
    const { authed } = useAuth();
    const location = useLocation();
    
    // If authed is false, run code inside if statement, which navigates user to the login page
    /*
        When you use replace inside <Navigate> you are telling the history stack to replace the 
        current URL you are in with the new route that you are being redirected to.
        
        A good way to use replace is inside your Login page. When the user gets redirected to the
        Login page, once the user logs in successfully, we want to prevent the user from being able to
        click the back button on the brower, and be routed back to the login page. 
        
        It is best to place your replace inside the navigate() call in <LoginComponent>.
    */
    /* 
        state={{path: location.pathname}} is what helps the login page re-route the user back to the 
        protected page once they successfully log in. Keep this inside this <Navigate>.
        
    */
    if (!authed) {
        return <Navigate to="/login" state={{path: location.pathname} />
    }
  
    // else, return children components
    return children;
  }
