import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/user/me", {
                    withCredentials: true
                });
                setUserData(res.data.user);
            } catch (err) {
                setUserData(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post(
                "http://localhost:8000/api/user/login",
                { username, password },
                { withCredentials: true }
            );
            if (response.data) {
                setUserData(response.data.user);
                console.log("login successful");
                toast.success("Login successful");
                navigate("/home");
            }
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);
            toast.error("user not exist")
        }
    };

    const register = async (name, username, password) => {
        try {
            const response = await axios.post(
                "http://localhost:8000/api/user/register",
                { name, username, password },
                { withCredentials: true }
            );
            if (response.data) {
                setUserData(response.data.user);
                console.log("registration successful");
                navigate("/login");
                toast.success("User Registered");
            }
        } catch (error) {
            console.error("Register error:", error.response?.data || error.message);
            alert("Registration failed. Try again.");
        }
    };



    async function logout() {

        await axios.post("http://localhost:8000/api/user/logout", {}, { withCredentials: true });
        setUserData(null);
        navigate("/login");
        toast.info("Logged out");


    };

    return (
        <AuthContext.Provider value={{ userData, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);
