import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


export default function ProtectedRoute({ children }) {
    const { userData, loading } = useAuth();


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div>Loading...</div>
            </div>
        );
    }

    if (!userData) {


        return <Navigate to="/login" replace />;
    }

    return children;
}