import React from "react";
import { FaFilePdf } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import styles from "./DetailsView.module.css";
import InputField from "../InputField/InputField";
import RadioInput from "../RadioInput/RadioInput";

interface DetailsViewProps {
  data: { [key: string]: any };
  onBack: () => void;
}

const DetailsView: React.FC<DetailsViewProps> = ({ data, onBack }) => {

  console.log(data)

  return (
    <div className={styles.detailsContainer}>
      <button className={styles.backButton} onClick={onBack}>
        <FaArrowLeftLong size={25} />
        Volver
      </button>
      <h2>Detalle de Certificado de Trabajador</h2>
      <div className={styles.form}>
        <div style={{ display: "flex", gap: "20px", width: "50%" }}>
          <InputField
            label="Código País"
            value={data?.paisDocumento?.codPais || ""}
          />
          <InputField
            label="País"
            value={data?.paisDocumento?.descPais || ""}
          />
        </div>

        <div style={{ display: "flex", gap: "20px", width: "80%" }}>
          <InputField
            label="Código Documento"
            value={data?.tipoDocumento?.codTipoDocumento || ""}
          />
          <InputField
            label="Tipo Documento"
            value={data?.tipoDocumento?.descTipoDocumento || ""}
          />
          <InputField label="Nro Documento" value={data?.nroDocumento || ""} />
          <InputField
            label="Nombre Completo"
            value={data?.nombreCompleto || ""}
          />
        </div>
        <div style={{ display: "flex", gap: "20px", width: "80%" }}>
          <InputField
            label="Tipo de documento del médico"
            value={data?.tipoDocumentoMedico?.descTipoDocumento || ""}
          />
          <InputField
            label="Nro documento del médico"
            value={data?.tipoDocumentoMedico?.codTipoDocumento || ""}
          />
          <InputField
            label="Nombre completo del médico"
            value={data?.nombreCompletoMedico || ""}
          />
          <InputField
            label="Fecha de vigencia"
            value={data?.infoEstado?.fechaVigencia || ""}
          />
        </div>
        <div style={{ display: "flex", gap: "20px", width: "70%" }}>
          <InputField
            label="Certificado desde"
            value={data?.fechaCertificacionDesde || ""}
          />
          <InputField
            label="Certificado hasta"
            value={data?.fechaCertificacionHasta || ""}
          />
          <InputField
            label="Fecha de actuación"
            value={data?.fechaActualizacion || ""}
          />
          <InputField
            label="Institución"
            value={data?.institucion?.descInstitucion || ""}
          />
        </div>

        <div style={{ display: "flex", gap: "20px", width: "60%" }}>
          <InputField
            label="Estado"
            value={data?.infoEstado?.estado?.descEstado || ""}
          />
          <InputField
            label="Fecha egreso int."
            value={data?.infoInteracion?.fechaEgresoInternacion || ""}
          />
          <InputField
            label="Patología"
            value={data?.infoPatologia?.patologia || ""}
          />
        </div>
        {/* <div style={{ display: "flex", gap: "20px", width: "70%" }}>
          <RadioInput
            options={[
              {
                label: "Es Excepción",
                checked: data?.infoPatologia?.esExcepcion || false,
              },
              {
                label: "Internación",
                checked: data?.infoInteracion?.esInternacion || false,
              },
            ]}
          />
        </div> */}

        <div style={{ display: "flex", gap: "20px", width: "50%" }}>
          <InputField
            label="Fecha de Reintegro"
            value={data?.infoReintegroAnticipado?.fechaReintegro || ""}
          />
          <RadioInput
            options={[
              {
                label: "Reintegro anticipado",
                checked:
                  data?.infoReintegroAnticipado?.esReintegroAnticipado || false,
              },
              {
                label: "Es Excepción",
                checked: data?.infoPatologia?.esExcepcion || false,
              },
              {
                label: "Internación",
                checked: data?.infoInteracion?.esInternacion || false,
              },
            ]}
          />
          
        </div>
      </div>
      <button className={styles.exportButton}>
        <FaFilePdf size={25} color="white" />
        Exportar a PDF
      </button>
    </div>
  );
};

export default DetailsView;
