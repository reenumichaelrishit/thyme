import { Navigate } from "react-router";
import { useAuth } from "../AuthContext";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { authToken } = useAuth()

    if (!authToken) {
        return <Navigate to="/" replace />
    }

    return <>{children}</>;
}