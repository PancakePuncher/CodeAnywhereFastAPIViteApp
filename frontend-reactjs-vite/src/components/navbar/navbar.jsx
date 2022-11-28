import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../utils/useAuth";
import LoginPopUp from "../user_components/popupLogin.jsx";
import CreatePopUp from "../user_components/popupCreate.jsx";
import "./navbar.css";

export default function Nav() {

    let activeStyle = {
        backgroundColor: "#555555",
    }

    const { authed, logout } = useAuth()

    return (
        <nav className="nav">
            <h1 className="site-title">
                PancakePuncher's Apps
            </h1>
            <ul>
                <li>
                    <LoginPopUp />
                </li>
                <li>
                    <NavLink
                        className = "Nav-Link"
                        to="/home"
                        style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                        }
                    >
                    Home
                    </NavLink>
                </li>
                {authed ? null
                : <li>
                   <CreatePopUp className="popup">
                        <Link
                            className = "Nav-Link"
                            to="/unauthed"
                        >
                        Create Account
                        </Link>
                    </CreatePopUp>
                </li>
                }
                <li>
                {authed
                    ? <Link
                        className = "Nav-Link"                    
                        to="/unauthed"
                        onClick={() => logout() }
                    >
                    Logout
                    </Link>
                    : 
                    <LoginPopUp className="popup">
                        <Link
                            className = "Nav-Link"
                            // to="/home"
                        >
                        Login
                        </Link>
                    </LoginPopUp>
                }           
                </li>
            </ul>
        </nav>
    );
    }