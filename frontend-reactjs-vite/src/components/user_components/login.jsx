import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from "../utils/useAuth.jsx";

const initialValues = {
    currentEmail: "",
    currentPassword: "",
};

export default function LoginComponent() {
    const navigate = useNavigate();
    const [values, setValues] = useState(initialValues);
    const { authed, login } = useAuth();

    const handleInputChange = (e) => {
        const {className, value} = e.target;
        setValues(
            {
                ...values,
                [className]: value,
            });
    };

    async function sendLoginCredentials(event) {
        event.preventDefault();
        var loginFormData = new FormData();

        loginFormData.append("email", values.currentEmail);
        loginFormData.append("password", values.currentPassword);

        login(loginFormData);
    }

    if (authed) {
        return <Navigate to="/home" replace />;
    }

    return (
        <div>
            <form autoComplete="off">
                <fieldset>
                    <div>
                        <label htmlFor="currentEmail">Email: </label>
                        <input type="text" id="currentEmail" className="currentEmail" value={values.currentEmail} onChange={handleInputChange}></input>
                    </div>
                    <div>
                        <label htmlFor="currentPassword">Password: </label>
                        <input type="password" id="currentPassword" className="currentPassword" value={values.currentPassword} onChange={handleInputChange}></input>
                    </div>
                    <button type="button" onClick={sendLoginCredentials}>Sign In</button>
                </fieldset>
            </form>
        </div>
    );
}
