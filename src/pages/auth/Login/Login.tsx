import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import styles from './Login.module.css';
import vector from "../../../assets/vectorRigth.svg";
import useAuthStore from '../../../stores/useAuthStore';
import usePostRequest from '../../../hook/usePostRequest';
import ButtonPDF from '../../../components/CreatePDF/CreateButton';

interface LoginResponse {
  jwt: string;
  user: {
    id: string;
    email: string;
    isAdmin: boolean;
    isVerified: boolean;
    name: string;
    password: string;
  };
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const { postRequest, loading } = usePostRequest<LoginResponse>('/login');
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await postRequest(formData);
    console.log(response);  // Añadir este log
    if (response) {
      const { jwt, user } = response.data;
      setAuth(jwt, user);
      toast.success('Login exitoso');
      navigate('/dashboard');
    } else {
      toast.error('Error en el login. Por favor, intente nuevamente.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.vectorContainer}>
        <img src={vector} alt="Background Vectors" />
      </div>
      <div className={styles.formContainer}>
        <h2>Login de Usuario</h2>
        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <FaUser className={styles.icon} />
            <input 
              type="email" 
              name="email" 
              placeholder="Correo Electrónico" 
              value={formData.email} 
              onChange={handleChange} 
            />
          </div>
          <div className={styles.inputGroup}>
            <FaLock className={styles.icon} />
            <input 
              type="password" 
              name="password" 
              placeholder="Contraseña" 
              value={formData.password} 
              onChange={handleChange} 
            />
          </div>
          <button className={styles.loginButton} type="submit" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>
        <div className={styles.footer}>
          <a href="/forgot-password" className={styles.link}>¿Olvidaste tu contraseña?</a>
          <a href="/register" className={styles.link}>Crea tu cuenta</a>
        </div>
      </div>

    </div>
  );
};

export default Login;
