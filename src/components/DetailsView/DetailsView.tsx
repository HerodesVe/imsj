import React from "react";
import { FaFilePdf } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import styles from "./DetailsView.module.css";
import InputField from "../InputField/InputField";
import RadioInput from "../RadioInput/RadioInput";
import ButtonPDF from "../CreatePDF/CreateButton";
import moment from "moment-timezone";
import GenerateExcelButton from "../../pages/Dashboard/components/GenerateButtonExcel";

interface Data {
  paisDocumento?: {
    codPais?: string;
    descPais?: string;
  };
  tipoDocumento?: {
    codTipoDocumento?: string;
    descTipoDocumento?: string;
  };
  nroDocumento?: string;
  nombreCompleto?: string;
  tipoDocumentoMedico?: {
    descTipoDocumento?: string;
    codTipoDocumento?: string;
  };
  nombreCompletoMedico?: string;
  nroDocumentoMedico?: string;
  infoEstado?: {
    fechaVigencia?: string;
    estado?: {
      descEstado?: string;
    };
  };
  fechaCertificacionDesde?: string;
  fechaCertificacionHasta?: string;
  fechaActualizacion?: string;
  institucion?: {
    descInstitucion?: string;
  };
  infoInteracion?: {
    fechaEgresoInternacion?: string;
    esInternacion?: string;
  };
  infoPatologia?: {
    esExcepcion?: string;
  };
  infoReintegroAnticipado?: {
    fechaReintegro?: string;
    esReintegroAnticipado?: boolean;
  };
}

interface DetailsViewProps {
  data: Data;
  onBack: () => void;
}

const timeZone = "America/Montevideo";

const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  return moment.tz(dateString, timeZone).format("DD/MM/YYYY");
};

const DetailsView: React.FC<DetailsViewProps> = ({ data, onBack }) => {
  console.log(data);
  
  // Check if esInternacion is 'true'

  const isInternacion = data?.infoInternacion?.esInternacion === "true";

  return (
    <div className={styles.detailsContainer}>
      <button className={styles.backButton} onClick={onBack}>
        <FaArrowLeftLong size={25} />
        Volver
      </button>
      <h2>Detalle de Certificado de Trabajador</h2>
      <div className={styles.form}>
        <div style={{ display: "flex", gap: "20px", width: "50%" }}>
          <InputField label="Código País" value={data?.paisDocumento?.codPais || ""} />
          <InputField label="País" value={data?.paisDocumento?.descPais || ""} />
        </div>

        <div style={{ display: "flex", gap: "20px", width: "80%" }}>
          <InputField label="Código Documento" value={data?.tipoDocumento?.codTipoDocumento || ""} />
          <InputField label="Tipo Documento" value={data?.tipoDocumento?.descTipoDocumento || ""} />
          <InputField label="Nro Documento" value={data?.nroDocumento || ""} />
          <InputField label="Nombre Completo" value={data?.nombreCompleto || ""} />
        </div>
        <div style={{ display: "flex", gap: "20px", width: "80%" }}>
          <InputField
            label="Tipo Doc. Médico"
            value={data?.tipoDocumentoMedico?.descTipoDocumento || ""}
          />
          <InputField
            label="Nro documento del médico"
            value={data?.nroDocumentoMedico || ""}
          />
          <InputField
            label="Nombre completo del médico"
            value={data?.nombreCompletoMedico || ""}
          />
          <InputField
            label="Fecha de vigencia"
            value={formatDate(data?.infoEstado?.fechaVigencia)}
          />
        </div>
        <div style={{ display: "flex", gap: "20px", width: "70%" }}>
          <InputField label="Certificado desde" value={formatDate(data?.fechaCertificacionDesde)} />
          <InputField label="Certificado hasta" value={formatDate(data?.fechaCertificacionHasta)} />
          <InputField label="Fecha de actualización" value={formatDate(data?.fechaActualizacion)} />
          <InputField 
            label="Institución" 
            value={data?.institucion?.descInstitucion || ""} 
            className={styles.institucionInput}  
          />
        </div>

        <div style={{ display: "flex", gap: "20px", width: "60%" }}>
          <InputField label="Estado" value={data?.infoEstado?.estado?.descEstado || ""} />
          
          <InputField label="Fecha egreso int." value={isInternacion ? formatDate(data?.infoInternacion?.fechaEgreso) : ""} />
          <InputField label="Patología" value={data?.infoPatologia?.esExcepcion === "true" ? "Si" : "No"} />
        </div>
        <div style={{ display: "flex", gap: "20px", width: "50%" }}>
          <InputField label="Fecha de Reintegro" value={formatDate(data?.infoReintegroAnticipado?.fechaReintegro)} />
          <RadioInput
            options={[
              {
                label: "Reintegro anticipado",
                checked: data?.infoReintegroAnticipado?.esReintegroAnticipado || false,
              },
              {
                label: "Es Excepción",
                checked: data?.infoPatologia?.esExcepcion === "true",
              },
              {
                label: "Internación",
                checked: isInternacion,
              },
            ]}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "20px",
          }}
        >
          <ButtonPDF data={data} />
        </div>
      </div>
    </div>
  );
};

export default DetailsView;
