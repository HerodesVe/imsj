import React, { useState } from "react";

import styles from "./MainStructure.module.css";
import Sidebar from "../Sidebar/Sidebar";
// import Header from '../Header/Header';

const MainStructure = ({ children }: any) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`${styles.mainContent} ${isOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
        {/* <Header /> */}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default MainStructure;
