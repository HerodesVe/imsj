import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import MyProject from './pages/MyProject';
import Login from './pages/auth/Login/Login';
import MainStructure from './components/MainStructure/MainStructure';
import Register from './pages/auth/Register/Register';
import ApproveUser from './pages/Usuarios/ApproveUser';
import useAuthStore from './stores/useAuthStore';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';


const App: React.FC = () => {
  const navigate = useNavigate();
  const { jwt } = useAuthStore();

  useEffect(() => {
    if (jwt) {
      navigate('/dashboard');
    }
  }, [jwt, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<MainStructure><Dashboard /></MainStructure>} />
        <Route path="/approved-user" element={<MainStructure><ApproveUser /></MainStructure>} />
        <Route path="/my-project" element={<MainStructure><MyProject /></MainStructure>} />
        {/* Puedes agregar más rutas protegidas aquí */}
      </Route>
    </Routes>
  );
};

const WrappedApp: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
