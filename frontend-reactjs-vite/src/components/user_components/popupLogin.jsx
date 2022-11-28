import React, { useState } from "react";
import { useAuth } from "../utils/useAuth.jsx";
import Popup from 'reactjs-popup';

const initialValues = {
    currentEmail: "",
    currentPassword: "",
};

export default function LoginPopUp(props) {
    const [ values, setValues ] = useState(initialValues);
    const { login } = useAuth();

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

    return (
        <Popup trigger={props.children} closeOnDocumentClick position="bottom right">
            <div>
                <form autoComplete="off">
                    <fieldset>
                        <div>
                            <label htmlFor="currentEmail">Email: </label>
                            <input type="text" autoComplete="current-email" id="currentEmail" className="currentEmail" value={values.currentEmail} onChange={handleInputChange}></input>
                        </div>
                        <div>
                            <label htmlFor="currentPassword">Password: </label>
                            <input type="password" autoComplete="current-password" id="currentPassword" className="currentPassword" value={values.currentPassword} onChange={handleInputChange}></input>
                        </div>
                        <button type="button" onClick={sendLoginCredentials}>Sign In</button>
                    </fieldset>
                </form>
            </div>
        </Popup>
    );
}