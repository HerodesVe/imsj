import React, { useState } from "react";
import axios from "axios";
import TableComponent from "../../components/TableComponent/TableComponent";
import styles from "./Dashboard.module.css";
import DetailsView from "../../components/DetailsView/DetailsView";
import { FaSearch } from "react-icons/fa";
import Calendario from "../../components/Calendar/Calendar";
import { FiCheck } from "react-icons/fi";

const initialValue = {
  nroOrganizacion: "0000003500665",
  idUsuario: "IMSJ_P",
  fechaDesde: "2024-04-01",
  fechaHasta: "2024-04-28"
}

const Dashboard = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [filter, setFilter] = useState(initialValue);
  const [data, setData] = useState([]);

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
      const response = await axios.post(`http://localhost:8080/api/sendSoapRequest`, filter);
      const certData = response.data["soap:Envelope"]["soap:Body"]["ns2:obtenerCertificacionesOrganizacionResponse"]["resultObtenerCertificacionesOrganizacion"]["colCertificaciones"];
      setData(certData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter(prevFilter => ({
      ...prevFilter,
      [name]: value
    }));
  };

  return (
    <div className={styles.container}>
      <h1>Obtener Certificados de Trabajadores</h1>
      <hr />
      <DetailsView onBack={handleBackClick} />
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
