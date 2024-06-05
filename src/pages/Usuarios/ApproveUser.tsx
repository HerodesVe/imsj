import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCheck, FaEdit, FaEye, FaEyeSlash, FaRandom, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import TableComponent from "../../components/TableComponent/TableComponent";
import Modal from "../../components/Modal/Modal";
import styles from "./ApproveUser.module.css";
import useAuthStore from "../../stores/useAuthStore";

const columns = [
  { campo: "name", label: "Nombre" },
  { campo: "email", label: "Email" },
  { campo: "acciones", label: "Acciones" },
];

const ApproveUser: React.FC = () => {
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});
  const { jwt } = useAuthStore();
  const [filter, setFilter] = useState("todos");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const fetchUsers = async (queryParam = "") => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://192.168.0.75:3000/user${queryParam}`, {
        headers: {
          Authorization: jwt,
        },
      });

      setData(response.data);
      toast.success("Datos actualizados correctamente");
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Error al actualizar los datos");
    } finally {
      setIsLoading(false);
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
    setPassword("");
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openConfirmationModal = (action: () => void) => {
    setConfirmAction(() => action);
    setConfirmationModalIsOpen(true);
  };

  const closeConfirmationModal = () => {
    setConfirmationModalIsOpen(false);
  };

  const approveUser = async (isVerified: boolean) => {
    if (selectedUser) {
      try {
        await axios.patch(
          `http://192.168.0.75:3000/user/${selectedUser.id}`,
          { isVerified },
          {
            headers: {
              Authorization: jwt,
            },
          }
        );
        console.log(isVerified ? "Usuario aprobado:" : "Verificación removida:", selectedUser);
        closeModal();
        closeConfirmationModal();
        fetchUsers();
        toast.success(isVerified ? "Usuario aprobado correctamente" : "Verificación removida correctamente");
      } catch (error) {
        console.error(isVerified ? "Error approving user:" : "Error removing verification:", error);
        toast.error(isVerified ? "Error al aprobar el usuario" : "Error al remover la verificación");
      }
    }
  };

  const updatePassword = async () => {
    if (selectedUser && password) {
      try {
        await axios.post(
          `http://192.168.0.75:3000/change-password`,
          { email: selectedUser.email, newPassword: password },
          {
            headers: {
              Authorization: jwt,
            },
          }
        );
        console.log("Contraseña actualizada:", selectedUser);
        closeModal();
        fetchUsers();
        toast.success("Contraseña actualizada correctamente");
      } catch (error) {
        console.error("Error updating password:", error);
        toast.error("Error al actualizar la contraseña");
      }
    }
  };

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let generatedPassword = "";
    for (let i = 0; i < 8; i++) {
      generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(generatedPassword);
  };

  const renderButton = (row: { [key: string]: any }) => (
    <div className={styles.actionButtons}>
      {!row.isVerified ? (
        <button className={`${styles.actionButton} p-button p-component p-button-text`} onClick={() => { setSelectedUser(row); openConfirmationModal(() => approveUser(true)); }}>
          <FaCheck size={24} />
        </button>
      ) : (
        <button className={`${styles.actionButton} p-button p-component p-button-text`} onClick={() => { setSelectedUser(row); openConfirmationModal(() => approveUser(false)); }}>
          <FaTimes size={24} />
        </button>
      )}
      <button className={`${styles.actionButton} p-button p-component p-button-text`} onClick={() => openModal(row)}>
        <FaEdit size={24} />
      </button>
    </div>
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
      {isLoading ? (
        <div className={styles.loader}>Cargando...</div>
      ) : (
        <TableComponent columns={columns} data={data} renderButton={renderButton} />
      )}
      <Modal isOpen={modalIsOpen} onClose={closeModal}>
        {selectedUser && !selectedUser.isVerified ? (
          <div>
            <div
              style={{
                display: "flex",
                gap: "1rem",
              }}
            >
              <div className={styles.modalIcon}>
                <FaCheck size={24} />
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
              <button onClick={() => approveUser(true)} className={`${styles.modalButton} ${styles.modalButtonAccept}`}>
                Aceptar
              </button>
              <button onClick={closeModal} className={`${styles.modalButton} ${styles.modalButtonCancel}`}>
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className={styles.modalTitle}>Editar Contraseña</h2>
            <div className={styles.modalInputContainer}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.modalInput}
                placeholder="Nueva contraseña"
              />
              <div className={`${styles.inputIcon} ${styles.eye}`} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              <div className={`${styles.inputIcon} ${styles.generate}`} onClick={generatePassword}>
                <FaRandom />
              </div>
            </div>
            <div className={styles.modalActions}>
              <button onClick={updatePassword} className={`${styles.modalButton} ${styles.modalButtonAccept}`}>
                Guardar
              </button>
              <button onClick={closeModal} className={`${styles.modalButton} ${styles.modalButtonCancel}`}>
                Cancelar
              </button>
            </div>
          </div>
        )}
      </Modal>
      <Modal isOpen={confirmationModalIsOpen} onClose={closeConfirmationModal}>
        <div>
          <h2>Confirmación</h2>
          <p>¿Estás seguro de que quieres {selectedUser?.isVerified ? 'quitar la verificación' : 'verificar'} a {selectedUser?.name}?</p>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: ".5rem",
            }}
          >
            <button onClick={confirmAction} className={`${styles.modalButton} ${styles.modalButtonAccept}`}>
              Sí
            </button>
            <button onClick={closeConfirmationModal} className={`${styles.modalButton} ${styles.modalButtonCancel}`}>
              No
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ApproveUser;
