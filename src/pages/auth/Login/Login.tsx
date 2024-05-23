import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import styles from './Login.module.css';
import vector from "../../../assets/vectorRigth.svg"

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica de autenticación
    navigate('/dashboard'); // Redirige a la página del dashboard después de hacer login
  };

  return (
    <div className={styles.container}>
      <div className={styles.vectorContainer}>
        <img src={vector} alt="Background Vectors" />
      </div>
      <div className={styles.formContainer}>
        <h2>User Login</h2>
        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <FaUser className={styles.icon} />
            <input type="text" placeholder="Username" />
          </div>
          <div className={styles.inputGroup}>
            <FaLock className={styles.icon} />
            <input type="password" placeholder="Password" />
          </div>
          <button className={styles.loginButton} type="submit">Login</button>
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
