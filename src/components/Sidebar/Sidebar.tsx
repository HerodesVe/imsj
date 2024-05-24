import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { MdMenu } from 'react-icons/md';
import { routes } from '../../data/routes';
import logo from '../../../public/logo.png';
import useAuthStore from '../../stores/useAuthStore'; // Importar el store de autenticación

const Sidebar = ({ isOpen, toggleSidebar }: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearAuth, user } = useAuthStore(); // Obtener la función `clearAuth` y `user` del store

  const handleLogout = () => {
    clearAuth(); // Limpiar el JWT
    navigate('/'); // Redirigir al login
  };

  // Filtrar rutas basadas en el rol del usuario
  const filteredRoutes = routes.filter(route => {
    // Mostrar todas las rutas a los administradores
    if (user?.isAdmin) return true;

    // Mostrar solo ciertas rutas a los usuarios no administradores
    // Añade más condiciones según tus necesidades
    return route.path !== '/approved-user';
  });

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <div className={styles.toggleButton} onClick={toggleSidebar}>
        {isOpen && <img className={styles.logo} src={logo} alt="IMSJ" />}
      </div>
      <nav className={styles.nav}>
        {filteredRoutes.map((route) => (
          <Link
            key={route.path}
            to={route.path}
            className={`${styles.navItem} ${location.pathname === route.path ? styles.active : ""}`}
          >
            <route.icon className={styles.navIcon} />
            <span className={styles.navItemText}>{route.name}</span>
          </Link>
        ))}
      </nav>
      <button className={styles.logoutButton} onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default Sidebar;
