import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
    const { status } = useSelector((state) => state.auth);

    return status === "authenticated" ? <Outlet /> : <Navigate to="/login" />
}