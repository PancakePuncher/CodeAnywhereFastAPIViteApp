import React, { useState, useEffect } from "react";
import axios from "axios";
import Popup from 'reactjs-popup';
import "./user_form_styles.css";

const submitValidators = {
    isEmailValid: false,
    isUsernameValid: false,
    isPasswordStrong: false,
    isPasswordMatching: false,
};

export default function CreatePopUp(props) {


    const [validEmail, setValidEmail] = useState("");
    const [createEmail, setCreateEmail] = useState("");
    const emailChangeValid = (e, v) => {
        const handleChange = (e) => {
            setCreateEmail(e.target.value);
        };
        function validateValue(v) {
            if (v.length === 0) {
                setValidEmail("");
            } else if (/\S+@\S+\.\S+/.test(v)) {
                setValidEmail("Valid Email!");
                submitValidators.isEmailValid = true
            } else {
                setValidEmail("Invalid Email!");
                submitValidators.isEmailValid = false
            }
        };
        handleChange(e);
        validateValue(v);
        submitableValidate();
    };

    const [validUsername, setValidUsername] = useState("");
    const [createUsername, setCreateUsername] = useState("");
    const usernameChangeValid = (e, v) => {
        const handleChange = (e) => {
            setCreateUsername(e.target.value);
        };
        function validateValue(v) {
            if (v.length === 0) {
                setValidUsername("");
            } else if (v.length <=28 && v.length >= 8) {
                setValidUsername("Valid Username!");
                submitValidators.isUsernameValid = true
            } else {
                setValidUsername("Invalid Username");
                submitValidators.isUsernameValid = false
            }
        };
        handleChange(e);
        validateValue(v);
        submitableValidate();
    };

    const [validPasswords, setValidPasswords] = useState("");
    const [validPasswordStrength, setValidPasswordStrength] = useState("");
    const [createPassword1, setCreatePassword1] = useState("");
    const password1ChangeValid = (e, v) => {
        const handleChange = (e) => {
            setCreatePassword1(e.target.value);
        };
        function validateStrength(v) {
            const strongRegEx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})")
            if (v.length === 0) {
                setValidPasswordStrength("")
            } else if (strongRegEx.test(v)) {
                setValidPasswordStrength("Password meets strength requirements!")
                submitValidators.isPasswordStrong = true;
            } else {
                setValidPasswordStrength("Password too weak!")
                submitValidators.isPasswordStrong = false;
            }
        };
        function validateValue(v) {
            if (createPassword1 === "" || createPassword2 === "") {
                setValidPasswords("");
            } else if (v === createPassword2) {
                setValidPasswords("Passwords match!");
                submitValidators.isPasswordMatching = true;
            } else {
                setValidPasswords("Passwords do not match!");
                submitValidators.isPasswordMatching = false;
            }
        };
        handleChange(e);
        validateValue(v);
        validateStrength(v);
        submitableValidate();
    };

    const [createPassword2, setCreatePassword2] = useState("");
    const password2ChangeValid = (e, v) => {
        const handleChange = (e) => {
            setCreatePassword2(e.target.value);
        };
        function validateValue(v) {
            if (createPassword1 === "" || createPassword2 === "") {
                setValidPasswords("");
            } else if (v === createPassword1) {
                setValidPasswords("Passwords match!");
                submitValidators.isPasswordMatching = true;
            } else {
                setValidPasswords("Passwords do not match!");
                submitValidators.isPasswordMatching = false;
            }
        };
        handleChange(e);
        validateValue(v);
        submitableValidate();
    };

    useEffect(() => {
        validPasswords;
        validUsername;
        validEmail;
        validPasswordStrength;
    });

    const [createButtonStatus, setCreateButtonStatus] = useState(true)
    const submitableValidate = () => {
        const areTrue = Object.values(submitValidators).every(
            value => value === true
        );
        setCreateButtonStatus(!areTrue)
    };

    async function sendCreateCredentials(event) {
        event.preventDefault()
        var createFormData = new FormData();

        createFormData.append("email", createEmail);
        createFormData.append("username", createUsername);
        createFormData.append("password", createPassword1);

        await axios.post("https://port-8000-reactfastapiapp-pancakepuncher802511.codeanyapp.com/user/create", createFormData, {
            headers: {
                'Content-Type': 'multipart/form-data',
        }})
            .then((response) => {
                setActionResponse(response.status)})
                .catch((error) => { 
                    setActionResponse(error.response.status)});
    };

    const [passwordNewShown, setNewPasswordShown] = useState(false);
    const toggleNewPassword = () => {
        setNewPasswordShown(!passwordNewShown);
    };

    const [passwordVerifyShown, setVerifyPasswordShown] = useState(false);
    const toggleVerifyPassword = () => {
        setVerifyPasswordShown(!passwordVerifyShown);
    };

    const [ hideShowToggleNewStyle, setHideShowToggleNewStyle] = useState(false)
    const [ hideShowToggleVerifyStyle, setHideShowToggleVerifyStyle] = useState(false)
    const onFocusNew = () => setHideShowToggleNewStyle(true)
    const onBlurNew = () => setHideShowToggleNewStyle(false)
    const onFocusVerify = () => setHideShowToggleVerifyStyle(true)
    const onBlurVerify = () => setHideShowToggleVerifyStyle(false)

    return (
        <Popup trigger={props.children} closeOnDocumentClick position="bottom right">
            <div>
                <h2 className="form-title">Create New User</h2>
                <form className="submit-form" onSubmit={sendCreateCredentials} autoComplete="off">
                    <fieldset>
                        <div className="input-field">
                            <label htmlFor="createEmail">Email<sup>*</sup></label>
                            <input type="text" 
                                name="email"
                                id="createEmail" 
                                className="createEmail" 
                                value={createEmail} 
                                onChange={event => emailChangeValid(event, event.target.value)}
                                placeholder="Enter Email..."
                                />
                            <h4>{validEmail}</h4>
                        </div>
                        <div className="input-field">
                            <label htmlFor="createUsername">Username<sup>*</sup></label>
                            <input type="text"
                                autoComplete="new-username"
                                id="createUsername" 
                                className="createUsername" 
                                value={createUsername} 
                                onChange={event => usernameChangeValid(event, event.target.value)}
                                placeholder="Enter Username..."
                                />
                            <h4>{validUsername}</h4>
                        </div>
                        <div className="input-field">
                            <label htmlFor="createPassword1">Password<sup>*</sup></label>
                            <div className="password-field">
                                <input type={passwordNewShown ? "text" : "password"}
                                    autoComplete="new-password"
                                    id="createPassword1" 
                                    className="createPassword1" 
                                    value={createPassword1} 
                                    onChange={event => password1ChangeValid(event, event.target.value)}
                                    placeholder="Enter Password..."
                                    onFocus={onFocusNew}
                                    onBlur={onBlurNew}/>
                                <button type="button" className={hideShowToggleNewStyle ? "password-toggle-focus" : "password-toggle"} onClick={toggleNewPassword}>Show</button>
                            </div>
                            <h4>{validPasswordStrength}</h4>
                        </div>
                        <div className="input-field">
                            <label htmlFor="createPassword2">Verify Password<sup>*</sup></label>
                            <div className="password-field">
                                <input type={passwordVerifyShown ? "text" : "password"}
                                    autoComplete="new-password"
                                    id="createPassword2" 
                                    className="createPassword2" 
                                    value={createPassword2} 
                                    onChange={event => password2ChangeValid(event, event.target.value)}
                                    placeholder="Verify Password..."
                                    onFocus={onFocusVerify}
                                    onBlur={onBlurVerify}/>
                                <button type="button" className={hideShowToggleVerifyStyle ? "password-toggle-focus" : "password-toggle"} onClick={toggleVerifyPassword}>Show</button>
                            </div>
                            <h4>{validPasswords}</h4>
                        </div>
                        <button disabled={createButtonStatus} type="submit" value="Create User" className="button-default">Create User</button>
                    </fieldset>
                </form>
            </div>
      </Popup>
    )
}