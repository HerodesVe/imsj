// ButtonPDF.tsx
import React from 'react';
import GenerateStyledPDF from './CreatePDF'; // Ajusta la ruta según tu estructura de carpetas
import style from './pdf.module.css';

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
    esInternacion?: boolean;
  };
  infoPatologia?: {
    patologia?: string;
    esExcepcion?: boolean;
  };
  infoReintegroAnticipado?: {
    fechaReintegro?: string;
    esReintegroAnticipado?: boolean;
  };
}

interface ButtonPDFProps {
  data: Data;
}

const ButtonPDF: React.FC<ButtonPDFProps> = ({ data }) => {
  return (
    <div className={style.button}>
      <GenerateStyledPDF data={data} />
    </div>
  );
};

export default ButtonPDF;
