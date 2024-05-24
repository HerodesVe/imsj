import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';

interface ProtectedRouteProps {
  allowedRoles: boolean[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { jwt, user } = useAuthStore();

  if (!jwt) {
    return <Navigate to="/" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.isAdmin)) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

