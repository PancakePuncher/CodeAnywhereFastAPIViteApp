import React, { useState } from "react";
// We only need to import useAuth because useAuth is a function that calls React.useContext(AuthContext)
import { useAuth } from "../utils/useAuth.jsx";

const initialValues = {
    currentEmail: "",
    currentPassword: "",
};

export default function LoginComponent() {
    const [values, setValues] = useState(initialValues);
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
    event.preventDefault()
    var loginFormData = new FormData();

    loginFormData.append("email", values.currentEmail);
    loginFormData.append("password", values.currentPassword);

    login(loginFormData).then(() => {
        navigate("/home", {replace: true});
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
