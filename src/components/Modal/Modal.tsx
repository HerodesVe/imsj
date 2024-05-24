import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css'; // Asegúrate de tener los estilos necesarios

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.modalContent}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
