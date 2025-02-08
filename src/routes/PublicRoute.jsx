import { useSelector } from "react-redux"

export const PublicRoute = ({ children }) => {

    const { status } = useSelector((state) => state.auth);

    return status === 'authenticated' ? <Navigate to='/' replace /> : children;
}