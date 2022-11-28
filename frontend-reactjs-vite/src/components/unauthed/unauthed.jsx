import { useAuth } from "../utils/useAuth";
import { Navigate } from "react-router-dom";

export default function Unauthed() {

    const { authed } = useAuth();

    if (authed) {
        return <Navigate to="/home" replace />;
    }

    return (
        <>
        <div>
          <h1>Please Sign-In or Create a New Account!</h1>
        </div>
      </>
    );
}