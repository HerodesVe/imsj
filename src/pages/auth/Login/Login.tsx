import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import styles from './Login.module.css';
import vector from "../../../assets/vectorRigth.svg";
import useAuthStore from '../../../stores/useAuthStore';
import usePostRequest from '../../../hook/usePostRequest';
import Modal from '../../../components/Modal/Modal'; // Importar el componente Modal

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
  const { data, error, loading, postRequest } = usePostRequest<LoginResponse>('/login');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await postRequest(formData);
      if (response) {
        const { jwt, user } = response;
        if (user.isVerified) {
          setAuth(jwt, user);
          toast.success('Login exitoso');
          navigate('/dashboard');
        } else {
          setModalIsOpen(true); // Mostrar el modal si el usuario no está verificado
        }
      } else if (error) {
        toast.error(`Error en el login: ${error}`);
      }
    } catch (err) {
      toast.error('Error en el login. Por favor, intente nuevamente.');
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
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
          <a href="/register" className={styles.link}>Crea tu cuenta</a>
        </div>
      </div>

      <Modal isOpen={modalIsOpen} onClose={closeModal}>
        <div className={styles.container__modal}>
          <h2>Verificación Pendiente</h2>
          <p>Tu cuenta aún no ha sido verificada. Por favor, contacta al administrador.</p>
          <div className={styles.container__button}>
            <button onClick={closeModal} className={`${styles.modalButton} ${styles.modalButtonAccept}`}>
              Aceptar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
