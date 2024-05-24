import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Importar toast
import TableComponent from "../../components/TableComponent/TableComponent";
import styles from "./Dashboard.module.css";
import DetailsView from "../../components/DetailsView/DetailsView";
import { FaSearch } from "react-icons/fa";
import Calendario from "../../components/Calendar/Calendar";
import { FiCheck } from "react-icons/fi";
import useAuthStore from '../../stores/useAuthStore';

// Función para obtener la fecha de hoy en formato YYYY-MM-DD
const getFormattedDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

const initialValue = {
  nroOrganizacion: "0000003500665",
  idUsuario: "IMSJ_P",
  fechaDesde: getFormattedDate(yesterday), // Fecha de ayer
  fechaHasta: getFormattedDate(today)      // Fecha de hoy
};

const Dashboard = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [filter, setFilter] = useState(initialValue);
  const [data, setData] = useState([]);
  const { jwt } = useAuthStore(); // Obtener el JWT del store de autenticación

  const columns = [
    { campo: "tipoDocumento.descTipoDocumento", label: "Tipo de Documento" },
    { campo: "paisDocumento.descPais", label: "País Documento" },
    { campo: "nroDocumento", label: "Documento" },
    { campo: "nombreCompleto", label: "Nombre Completo" },
    { campo: "fechaCertificacionDesde", label: "Certificado Desde" },
  ];

  const handleViewClick = (row) => {
    setSelectedData(row);
  };

  const handleBackClick = () => {
    setSelectedData(null);
  };

  const renderButton = (row) => (
    <button className={styles.customButton} onClick={() => handleViewClick(row)}>
      <FaSearch size={20}/>
    </button>
  );

  const callSoapService = async () => {
    try {
      const response = await axios.post(
        `http://hostnick.ddns.net:6010/uruguay/sendSoapRequest`,
        filter,
        {
          headers: {
            Authorization: jwt, // Incluir el JWT en los encabezados
          },
        }
      );

      // Verificar si hay errores en la respuesta
      const errores = response.data["soap:Envelope"]["soap:Body"]["ns2:obtenerCertificacionesOrganizacionResponse"]["resultObtenerCertificacionesOrganizacion"]["colErrores"];
      if (errores) {
        toast.error(`Error: ${errores.descripcion}`);
        return;
      }

      const certData = response.data["soap:Envelope"]["soap:Body"]["ns2:obtenerCertificacionesOrganizacionResponse"]["resultObtenerCertificacionesOrganizacion"]["colCertificaciones"];
      setData(certData || []);
    } catch (error) {
      console.error(error);
      toast.error('Error en la solicitud. Por favor, intente nuevamente.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter(prevFilter => ({
      ...prevFilter,
      [name]: value
    }));
  };

  // useEffect to call the soap service when the component mounts
  useEffect(() => {
    callSoapService();
  }, []); // Empty dependency array ensures this runs once after the initial render

  return (
    <div className={styles.container}>
      <h1>Obtener Certificados de Trabajadores</h1>
      <hr />
      {selectedData ? (
        <DetailsView data={selectedData} onBack={handleBackClick} />
      ) : (
        <>
          <div className={styles.container__1}>
            <div className={styles.container__calendar}>
              <Calendario
                label={"Desde:"}
                name={"fechaDesde"}
                onChange={handleChange}
                placeholder={"Selecciona una Fecha"}
                value={filter.fechaDesde}
                />
              <Calendario
                label={"Hasta:"}
                name={"fechaHasta"}
                onChange={handleChange}
                placeholder={"Selecciona una Fecha"}
                value={filter.fechaHasta}
                />
            </div>
            <div className={styles.container__button}>
              <button onClick={callSoapService}> <FiCheck fontSize={"1rem"}/> Consultar </button>
            </div>
          </div>
          <TableComponent 
            columns={columns} 
            data={data} 
            renderButton={renderButton} 
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
