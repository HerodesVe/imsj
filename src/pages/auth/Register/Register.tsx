import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import styles from './Register.module.css';
import vector from "../../../assets/vectorLeft.svg";
import usePostRequest from '../../../hook/usePostRequest';
import Modal from '../../../components/Modal/Modal';


const Register: React.FC = () => {
  const navigate = useNavigate();
  const { data, error, loading, postRequest } = usePostRequest('/user');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Todos los campos son obligatorios");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Email no es válido");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return false;
    }
    return true;
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;
    const success = await postRequest(formData);
    if (success) {
      toast.success("Registro exitoso");
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
        navigate('/');
      }, 3000); // Cierra el modal y redirige después de 3 segundos
    } else {
      toast.error("Error en el registro. Por favor, intente nuevamente.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Registro de Usuario</h2>
        <form className={styles.form} onSubmit={handleRegister}>
          <div className={styles.inputGroup}>
            <FaUser className={styles.icon} />
            <input 
              type="text" 
              name="name" 
              placeholder="Nombre de Usuario" 
              value={formData.name} 
              onChange={handleChange} 
            />
          </div>
          <div className={styles.inputGroup}>
            <FaEnvelope className={styles.icon} />
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
          <button className={styles.registerButton} type="submit" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrar'}
          </button>
        </form>
      </div>
      <div className={styles.vectorContainer}>
        <img src={vector} alt="Vectores de Fondo" />
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Registro Exitoso</h2>
        <p>Su registro está en revisión. Recibirá una notificación una vez que haya sido aprobado.</p>
      </Modal>
    </div>
  );
};

export default Register;
