import React, { useState } from "react";
import { AuthProvider, AuthContext } from "../utils/useAuth.jsx";
import { useContext } from 'react';

const initialValues = {
    currentEmail: "",
    currentPassword: "",
};

export default function LoginComponent() {

    const [values, setValues] = useState(initialValues);
    const authContext = useContext(AuthContext);
    const { login } = AuthProvider();

    const handleInputChange = (e) => {
        const {className, value} = e.target;
        setValues(
            {
                ...values,
                [className]: value,
            });
    };

  async function sendLoginCredentials(event) {
    event.preventDefault()
    var loginFormData = new FormData();

    loginFormData.append("email", values.currentEmail);
    loginFormData.append("password", values.currentPassword);

    login(loginFormData).then(() => {
        navigate("/home");
      });

  }


  return (
    <div>
      <form onSubmit={sendLoginCredentials} autoComplete="off">
        <fieldset>
          <div>
              <label htmlFor="currentEmail">Email: </label>
              <input type="text" id="currentEmail" className="currentEmail" value={values.currentEmail} onChange={handleInputChange}></input>
          </div>
          <div>
              <label htmlFor="currentPassword">Password: </label>
              <input type="password" id="currentPassword" className="currentPassword" value={values.currentPassword} onChange={handleInputChange}></input>
          </div>
          <input type="submit" value="Sign in"></input>
        </fieldset>
      </form>
    </div>
  )
}