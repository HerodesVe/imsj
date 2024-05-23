import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Buscar" />
      </div>
      <div className={styles.userProfile}>
        {/* <img src="path-to-profile-image" alt="Profile" /> */}
        <p>Logo</p>
      </div>
    </header>
  );
};

export default Header;
