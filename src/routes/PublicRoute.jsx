// components/PublicRoute.js
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children }) => {
    const { status } = useSelector((state) => state.auth);
    const isAuthenticated = status === 'authenticated';

    // Si el usuario está autenticado, redirigir al dashboard
    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // Si no está autenticado, mostrar el componente children
    return children;
};

export default PublicRoute;