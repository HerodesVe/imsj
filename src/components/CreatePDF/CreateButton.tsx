import React from 'react';
import GenerateStyledPDF from './CreatePDF'; // Ajusta la ruta según tu estructura de carpetas

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

const ButtonPDF: React.FC = () => {
  const data: Data = {
    nombreCompleto: 'Jose Manuel Hernandez Vasquez',
    tipoDocumento: 'DNI',
    nroDocumento: '303825555',
    pais: 'Peru',
    codPais: '555',
    certificadoDesde: '07/05/2024',
    certificadoHasta: '07/05/2026',
    fechaActualizacion: '07/05/2024',
    institucion: 'Institucion',
    estado: 'Lima',
    fechaIngreso: '07/05/2024',
    patologia: 'Ninguna',
    esExcepcion: 'Si',
    internacion: 'No',
    fechaReintegro: '07/05/2024',
    reintegroAnticipado: 'No',
  };

  return (
    <div className="App">
      <h1>Generate and Download PDF Example</h1>
      <GenerateStyledPDF data={data} />
    </div>
  );
};

export default ButtonPDF;
