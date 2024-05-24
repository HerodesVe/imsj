import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';

const ProtectedRoute: React.FC = () => {
  const { jwt } = useAuthStore();
  
  return jwt ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
