import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import MyProject from './pages/MyProject';
import Login from './pages/auth/Login/Login';


import MainStructure from './components/MainStructure/MainStructure';
import Register from './pages/auth/Register/Register';
import ApproveUser from './pages/Usuarios/ApproveUser';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<MainStructure><Dashboard /></MainStructure>} />
        <Route path="/approved-user" element={<MainStructure><ApproveUser /></MainStructure>} />
        <Route path="/my-project" element={<MainStructure><MyProject /></MainStructure>} />
        {/* Puedes agregar más rutas aquí */}
      </Routes>
    </Router>
  );
}

export default App;
