import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCheck } from "react-icons/fa";
import TableComponent from "../../components/TableComponent/TableComponent";
import Modal from "../../components/Modal/Modal";
import styles from "./ApproveUser.module.css";
import useAuthStore from "../../stores/useAuthStore";

const columns = [
  { campo: "name", label: "Nombre" },
  { campo: "email", label: "Email" },
];

const ApproveUser: React.FC = () => {
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const { jwt } = useAuthStore(); // Obtener el JWT del store de autenticación

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://hostnick.ddns.net:6010/user", {
        headers: {
          Authorization: jwt, // Incluir el JWT en los encabezados
        },
      });

      // Filtrar usuarios que no están verificados
      const unverifiedUsers = response.data.filter((user: any) => !user.isVerified);
      setData(unverifiedUsers);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [jwt]);

  const openModal = (user: { [key: string]: any }) => {
    setSelectedUser(user);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const approveUser = async () => {
    if (selectedUser) {
      try {
        await axios.patch(
          `http://hostnick.ddns.net:6010/user/${selectedUser.id}`,
          { isVerified: true },
          {
            headers: {
              Authorization: jwt, // Incluir el JWT en los encabezados
            },
          }
        );
        console.log("Usuario aprobado:", selectedUser);
        closeModal();
        fetchUsers(); // Volver a obtener los datos de los usuarios
      } catch (error) {
        console.error("Error approving user:", error);
      }
    }
  };

  const renderButton = (row: { [key: string]: any }) => (
    <button className="p-button p-component p-button-text" onClick={() => openModal(row)}>
      <FaCheck size={20} />
    </button>
  );

  return (
    <div>
      <h1 className={styles.title}>Aprobar Usuarios</h1>
      <hr />
      <TableComponent columns={columns} data={data} renderButton={renderButton} />
      <Modal isOpen={modalIsOpen} onClose={closeModal}>
        <div
          style={{
            display: "flex",
            gap: ".5rem",
          }}
        >
          <div className={styles.modalIcon}>
            <FaCheck size={20} />
          </div>
          <h2>Confirmación</h2>
        </div>
        <p>¿Estás seguro de que quieres aprobar a {selectedUser?.name}?</p>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: ".5rem",
          }}
        >
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
