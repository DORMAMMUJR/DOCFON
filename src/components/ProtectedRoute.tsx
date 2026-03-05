import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

interface ProtectedRouteProps {
    children: React.ReactNode;
    /** Si es true, requiere rol admin. Por defecto solo requiere estar autenticado. */
    adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
    const { token, isAdmin } = useAuthStore();
    const location = useLocation();

    if (!token) {
        // No autenticado → redirigir a login conservando la ruta de destino
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (adminOnly && !isAdmin()) {
        // Autenticado pero sin rol admin
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
