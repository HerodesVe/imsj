import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import TableComponent from "../../components/TableComponent/TableComponent";
import Modal from "../../components/Modal/Modal";
import styles from "./ApproveUser.module.css";

const mockData = [
  { id: 1, nombre: "John Doe", email: "john@example.com", role: "User" },
  { id: 2, nombre: "Jane Smith", email: "jane@example.com", role: "Admin" },
  { id: 3, nombre: "Sam Wilson", email: "sam@example.com", role: "User" },
  // Añade más usuarios si lo deseas
];

const columns = [
  { campo: "nombre", label: "Nombre" },
  { campo: "email", label: "Email" },
  { campo: "role", label: "Role" },
];

const ApproveUser: React.FC = () => {
  const [data, setData] = useState(mockData);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const openModal = (user: { [key: string]: any }) => {
    setSelectedUser(user);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const approveUser = () => {
    console.log("Usuario aprobado:", selectedUser);
    closeModal();
  };

  const renderButton = (row: { [key: string]: any }) => (
    <button className="p-button p-component p-button-text" onClick={() => openModal(row)}>
      <FaCheck size={20} />
    </button>
  );

  return (
    <div>
      <h1>Aprobar Usuarios</h1>
      <TableComponent columns={columns} data={data} renderButton={renderButton} />
      <Modal isOpen={modalIsOpen} onClose={closeModal}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            // justifyContent: "center",
            gap: ".5rem",
          }}
        >
          <div className={styles.modalIcon}>
            <FaCheck size={20} />
          </div>
          <h2>Confirmación</h2>
        </div>
        <p>¿Estás seguro de que quieres aprobar a {selectedUser?.nombre}?</p>
        <div style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: ".5rem",
            
        }}>
          <button onClick={approveUser} className={`${styles.modalButton} ${styles.modalButtonAccept}`}>
            Aceptar
          </button>
          <button onClick={closeModal} className={`${styles.modalButton} ${styles.modalButtonCancel}`}>
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ApproveUser;
