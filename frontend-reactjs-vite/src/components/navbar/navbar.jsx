import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/useAuth";

export default function Nav() {

    const { authed, logout } = useAuth()

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/create">Create New User</Link>
                </li>
                <li>
                {authed
                ? <Link to="/login" onClick={ logout() }>Logout</Link>
                : <Link to="/login">Login</Link>
                }
                </li>
            </ul>
        </nav>
    );
    }