import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader } from '../context/ToastContext';

const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    // Create a minimal inline loader or import properly
    if (loading) return <div>Loading...</div>;

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
