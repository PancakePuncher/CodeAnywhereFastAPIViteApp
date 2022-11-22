import * as React from "react";
import axios from "axios";

export const AuthContext = React.createContext(null);

// export function useAuth() {
//   const [authed, setAuthed] = React.useState(false);

//   return {
//     authed,
//     login(loginFormData) {
//       return (
//         axios.post("https://port-8000-reactfastapiapp-pancakepuncher802511.codeanyapp.com/user/login", loginFormData, {
//             headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             withCredentials: true
//             })
//             .then((response) => {
//                 setAuthed(true)})
//                 .catch((error) => {
//                     setAuthed(false)})
//       );
//     },
//     logout() {
//       return new Promise((res) => {
//         axios.get("https://port-8000-reactfastapiapp-pancakepuncher802511.codeanyapp.com/user/logout",
//             {withCredentials: true})
//             .then((response) => {
//                 setAuthed(false)})
//                 .catch((error) => {
//                     setAuthed(false)});
//         res();
//       });
//     },
//     checkAuth() {
//         return new Promise((res) => {
//           axios.post("https://port-8000-reactfastapiapp-pancakepuncher802511.codeanyapp.com/user/auth", {
//               withCredentials: true
//               })
//               .then((response) => {
//                   setAuthed(true)})
//                   .catch((error) => {
//                       setAuthed(false)});
//           res();
//         });
//       },
//   };
// }

export function AuthProvider({ children }) {

  const [authed, setAuthed] = React.useState(false);

  async function login(loginFormData) {
    await axios.post("https://port-8000-reactfastapiapp-pancakepuncher802511.codeanyapp.com/user/login", loginFormData, {
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true
        })
        .then((response) => {
            setAuthed(true)})
            .catch((error) => {
                setAuthed(false)})
  }

  return <AuthContext.Provider value={{login}}>{children}</authContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}
