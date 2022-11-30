import React, { useState } from "react";
import { useAuth } from "../utils/useAuth.jsx";
import Popup from 'reactjs-popup';
import "./user_form_styles.css";

const initialValues = {
    currentEmail: "",
    currentPassword: "",
};

const submitValidators = {
    boolEmail: false,
    boolPassword: false,
}

export default function LoginPopUp(props) {
    const [ values, setValues ] = useState(initialValues);
    const [passwordShown, setPasswordShown] = useState(false);
    const { login } = useAuth();

    const handleInputChange = (e) => {
        const {className, value} = e.target;
        setValues(
            {
                ...values,
                [className]: value,
            });
        lengthChecker(values.currentEmail, values.currentPassword)
        submitableValidate()
    };

    async function lengthChecker(email, password) {
        if (email.length >= 3 && password.length >= 3) {
            submitValidators.boolEmail = true;
            submitValidators.boolPassword = true;
        } else {
            submitValidators.boolEmail = false;
            submitValidators.boolPassword = false;
        }
    }

    async function sendLoginCredentials(event) {
        event.preventDefault();
        var loginFormData = new FormData();

        loginFormData.append("email", values.currentEmail);
        loginFormData.append("password", values.currentPassword);

        login(loginFormData);
    }

    const [loginButtonStatus, setLoginButtonStatus] = useState(true)
    async function submitableValidate() {
        const areTrue = Object.values(submitValidators).every(
            value => value === true
        );
        setLoginButtonStatus(!areTrue)
    };


    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    return (
        <Popup trigger={props.children} closeOnDocumentClick position="bottom right">
            <div>
                <h2 className="form-title">Login</h2>
                <form className="submit-form" autoComplete="off">
                    <fieldset>
                        <div className="input-field">
                            <label htmlFor="currentEmail">Email</label>
                            <input type="text" 
                                autoComplete="off" 
                                id="currentEmail" 
                                className="currentEmail" 
                                value={values.currentEmail} 
                                onChange={handleInputChange}
                                placeholder="Enter Email..."
                                >
                            </input>
                        </div>
                        <div className="input-field">
                            <label htmlFor="currentPassword">Password</label>
                            <div className="password-field">
                                <input type={passwordShown ? "text" : "password"}
                                        autoComplete="current-password" 
                                        id="currentPassword" 
                                        className="currentPassword" 
                                        value={values.currentPassword} 
                                        onChange={handleInputChange} 
                                        placeholder="Enter Password..."
                                    >
                                </input>
                                <button type="button" className="password-toggle" onClick={togglePassword}>Show</button>
                            </div>
                        </div>
                        <button disabled={loginButtonStatus} type="button" onClick={sendLoginCredentials} className="button-default">Sign In</button>
                    </fieldset>
                </form>
            </div>
        </Popup>
    );
}