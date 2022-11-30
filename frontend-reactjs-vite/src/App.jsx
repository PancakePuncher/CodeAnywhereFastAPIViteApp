import { Routes, Route } from "react-router-dom";
import Home from "./components/home/home.jsx";
import Unauthed from "./components/unauthed/unauthed.jsx";
import Nav from "./components/navbar/navbar.jsx";
import RequireAuth from "./components/utils/requireAuth.jsx";
import AuthProvider from "./components/utils/useAuth.jsx";

export default function App() {

    return (
        <>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');
            </style>
            <AuthProvider>
                <Nav />
                <Routes>
                    <Route index element={<Unauthed />} />
                    <Route index path="unauthed" element={<Unauthed />} />
                        <Route 
                            path="home"
                            element={
                            <RequireAuth>
                                <Home />
                            </RequireAuth>
                            }
                        />
                </Routes>
            </AuthProvider>
        </>
    );
}