import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router';
import { selectAccessToken } from '../features/auth/authSlice';

export default function RequireAuth() {
    const token = useSelector(selectAccessToken);
    const location = useLocation();
    if (!token) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }
    return <Outlet />;
}
