import React from 'react';
import GenerateStyledPDF from './CreatePDF'; // Ajusta la ruta según tu estructura de carpetas
import style from './pdf.module.css'

interface Data {
  nombreCompleto: string;
  tipoDocumento: string;
  nroDocumento: string;
  pais: string;
  codPais: string;
  certificadoDesde: string;
  certificadoHasta: string;
  fechaActualizacion: string;
  institucion: string;
  estado: string;
  fechaIngreso: string;
  patologia: string;
  esExcepcion: string;
  internacion: string;
  fechaReintegro: string;
  reintegroAnticipado: string;
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
