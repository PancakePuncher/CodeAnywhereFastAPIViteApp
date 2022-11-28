import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../utils/useAuth";
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
                    <NavLink
                        className = "Nav-Link"
                        to="/create"
                        style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                        }
                    >
                    Create Account
                    </NavLink>
                </li>
                }
                <li>
                {authed
                    ? <NavLink
                        className = "Nav-Link"                    
                        to="/login"
                        onClick={ logout() }
                        style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                        }
                    >
                    Logout
                    </NavLink>
                    : <NavLink
                        className = "Nav-Link"
                        to="/login"
                        style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                        }
                    >
                    Login
                    </NavLink>
                }           
                </li>
            </ul>
        </nav>
    );
    }