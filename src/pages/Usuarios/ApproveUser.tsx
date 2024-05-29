import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
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
  const [filter, setFilter] = useState("todos");

  const fetchUsers = async (queryParam = "") => {
    try {
      const response = await axios.get(`http://hostnick.ddns.net:6010/user${queryParam}`, {
        headers: {
          Authorization: jwt, // Incluir el JWT en los encabezados
        },
      });

      setData(response.data);
      toast.success("Datos actualizados correctamente");
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Error al actualizar los datos");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [jwt]);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    let queryParam = "";
    if (newFilter === "verificados") {
      queryParam = "?isVerified=true";
    } else if (newFilter === "sinVerificar") {
      queryParam = "?isVerified=false";
    }
    fetchUsers(queryParam);
  };

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
        toast.success("Usuario aprobado correctamente");
      } catch (error) {
        console.error("Error approving user:", error);
        toast.error("Error al aprobar el usuario");
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
      <div className={styles.filterContainer}>
        <div
          className={`${styles.filter} ${filter === "todos" ? styles.active_filter : ""}`}
          onClick={() => handleFilterChange("todos")}
        >
          Todos
        </div>
        <div
          className={`${styles.filter} ${filter === "verificados" ? styles.active_filter : ""}`}
          onClick={() => handleFilterChange("verificados")}
        >
          Verificados
        </div>
        <div
          className={`${styles.filter} ${filter === "sinVerificar" ? styles.active_filter : ""}`}
          onClick={() => handleFilterChange("sinVerificar")}
        >
          Sin Verificar
        </div>
      </div>
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
