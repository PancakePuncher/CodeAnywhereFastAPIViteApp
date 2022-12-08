import { Routes, Route } from "react-router-dom";
import Home from "./components/home/home.jsx";
import Unauthed from "./components/unauthed/unauthed.jsx";
import Nav from "./components/navbar/navbar.jsx";
import RequireAuth from "./components/utils/requireAuth.jsx";
import AuthProvider from "./components/utils/useAuth.jsx";

export default function App() {

    return (
        <>
            <AuthProvider>
                <Nav />
                <Routes>
                    <Route index element={
                        <RequireAuth>
                            <Home />
                        </RequireAuth>} 
                    />
                    <Route 
                        path="home"
                        element={
                        <RequireAuth>
                            <Home />
                        </RequireAuth>
                        }
                    />
                    <Route path="unauthed" element={<Unauthed/>}/>
                </Routes>
            </AuthProvider>
        </>
    );
}