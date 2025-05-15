import { Navigate } from "react-router";

export function ProtectedRoute({authToken, children}: { authToken: string; children: React.ReactNode; }) {
    if (!authToken) {
        return <Navigate to="/" replace />
    }

    return <>{children}</>;
}