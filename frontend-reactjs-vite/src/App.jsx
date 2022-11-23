import { Routes, Route } from "react-router-dom";
import Home from "./components/home/home.jsx";
import LoginComponent from "./components/user_components/login.jsx";
import CreateComponent from "./components/user_components/create.jsx"
import RequireAuth from "./components/utils/requireAuth.jsx";
import AuthProvider from "./components/utils/useAuth.jsx";

export default function App() {

    return (
        <>
            <AuthProvider>
                <Routes>
                    <Route index element={<LoginComponent />} />
                    <Route path="login" element={<LoginComponent />} />
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