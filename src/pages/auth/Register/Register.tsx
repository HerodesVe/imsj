import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import styles from './Register.module.css';
import vector from "../../../assets/vectorLeft.svg"

const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica de registro
    navigate('/dashboard'); // Redirige a la página del dashboard después de registrarse
  };

  return (
    <div className={styles.container}>
     
      <div className={styles.formContainer}>
        <h2>User Register</h2>
        <form className={styles.form} onSubmit={handleRegister}>
          <div className={styles.inputGroup}>
            <FaUser className={styles.icon} />
            <input type="text" placeholder="Username" />
          </div>
          <div className={styles.inputGroup}>
            <FaEnvelope className={styles.icon} />
            <input type="email" placeholder="Email@gmail.com" />
          </div>
          <div className={styles.inputGroup}>
            <FaLock className={styles.icon} />
            <input type="password" placeholder="Password" />
          </div>
          <button className={styles.registerButton} type="submit">Register</button>
        </form>
      </div>
      <div className={styles.vectorContainer}>
        <img src={vector} alt="Background Vectors" />
      </div>
    </div>
  );
};

export default Register;
