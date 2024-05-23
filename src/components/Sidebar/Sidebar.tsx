import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { MdMenu } from 'react-icons/md';
import { routes } from '../../data/routes';
import logo from '../../../public/logo.png'

const Sidebar = ({ isOpen, toggleSidebar }:any) => {
  const location = useLocation();

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <div className={styles.toggleButton} onClick={toggleSidebar}>
        <MdMenu fontSize={"3rem"} width={"200px"}/>
        {isOpen && <img className={styles.logo} src={logo} alt="IMSJ" /> }
      </div>
      <nav className={styles.nav}>
        {routes.map(route => (
          <Link
            key={route.path}
            to={route.path}
            className={`${styles.navItem} ${location.pathname === route.path ? styles.active : ''}`}
          >
            <route.icon className={styles.navIcon} />
            <span className={styles.navItemText}>{route.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;