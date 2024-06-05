import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../../public/logo.png';
import logobps from '../../../public/logo-bps.svg';
import { FaFilePdf } from 'react-icons/fa';
import style from './pdf.module.css';
import moment from 'moment-timezone';

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
  nroDocumentoMedico?: string;
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

interface GenerateStyledPDFProps {
  data: Data;
}

const timeZone = 'America/Montevideo';

const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  return moment.tz(dateString, timeZone).format('DD/MM/YYYY');
};

const GenerateStyledPDF: React.FC<GenerateStyledPDFProps> = ({ data }) => {
  const [logoBase64, setLogoBase64] = useState<string>('');
  const [logobpsBase64, setLogobpsBase64] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const convertToBase64 = (url: string, callback: (base64: string) => void) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/png');
        callback(dataURL);
      };
    };

    convertToBase64(logo, setLogoBase64);
    convertToBase64(logobps, setLogobpsBase64);
    
    // Set current date
    const now = moment.tz(timeZone).format('DD/MM/YYYY');
    setCurrentDate(now);
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Añadir primer logo
    if (logoBase64) {
      doc.addImage(logoBase64, 'PNG', 10, 10, 55, 23);
    }

    // Añadir fecha
    doc.setFontSize(12);
    doc.text(currentDate, 170, 20);

    // Título centrado horizontalmente con margen superior
    doc.setFontSize(25);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(56, 59, 69); // Ajuste del color del título en formato RGB
    const titleText = "Detalle de Certificado del\nTrabajador";
    const titleX = pageWidth / 2;
    doc.text(titleText, titleX, 70, { align: 'center' }); // Margen superior de 30px

    // Añadir segundo logo centrado horizontalmente debajo del título
    if (logobpsBase64) {
      const logobpsWidth = 35;
      const logobpsHeight = 20;
      const logobpsX = (pageWidth - logobpsWidth) / 2;
      doc.addImage(logobpsBase64, 'PNG', logobpsX, 90, logobpsWidth, logobpsHeight); // Más pegado al título
    }

    // Añadir tabla con información con margen inferior de 30px al segundo logo
    const marginTop = 120; // Ajuste para bajar más la tabla
    const tableRows = [
      ["Código País", data.paisDocumento?.codPais || ""],
      ["País", data.paisDocumento?.descPais || ""],
      ["Código Documento", data.tipoDocumento?.codTipoDocumento || ""],
      ["Tipo Documento", data.tipoDocumento?.descTipoDocumento || ""],
      ["Nro Documento", data.nroDocumento || ""],
      ["Nombre Completo", data.nombreCompleto || ""],
      ["Tipo de documento del médico", data.tipoDocumentoMedico?.descTipoDocumento || ""],
      ["Nro documento del médico", data?.nroDocumentoMedico || ""],
      ["Nombre completo del médico", data.nombreCompletoMedico || ""],
      ["Fecha de vigencia", formatDate(data.infoEstado?.fechaVigencia)],
      ["Certificado desde", formatDate(data.fechaCertificacionDesde)],
      ["Certificado hasta", formatDate(data.fechaCertificacionHasta)],
      ["Fecha de Actualización", formatDate(data.fechaActualizacion)],
      ["Institución", data.institucion?.descInstitucion || ""],
      ["Estado", data.infoEstado?.estado?.descEstado || ""],
      ["Fecha egreso int.", data?.isInternacion ? formatDate(data?.infoInternacion?.fechaEgreso) : ""],
      ["Patología", data?.infoPatologia?.esExcepcion === "true" ? "Si" : "No"],
      ["Fecha de Reintegro", formatDate(data.infoReintegroAnticipado?.fechaReintegro)],
      ["Reintegro anticipado", data.infoReintegroAnticipado?.esReintegroAnticipado ? "Sí" : "No"],
      ["Es Excepción", data.infoPatologia?.esExcepcion ? "Sí" : "No"],
      ["Internación", data.infoInteracion?.esInternacion ? "Sí" : "No"]
    ];

    (doc as any).autoTable({
      startY: marginTop,
      body: tableRows,
      theme: 'plain',
      styles: {
        textColor: [0, 0, 0],
        fontSize: 12,
        cellPadding: 5
      },
      alternateRowStyles: {
        fillColor: [240, 248, 255] // Color azul claro para filas alternadas
      },
      columnStyles: {
        0: { halign: 'left', cellWidth: 90 }, // Alineación de los labels a la izquierda
        1: { halign: 'left', cellWidth: 90 }  // Alineación de la información a la izquierda
      },
      didDrawCell: (data) => {
        if (data.row.index % 2 === 0) {
          data.cell.styles.fillColor = [255, 255, 255]; // Color blanco para filas alternadas
        }
      }
    });

    // Descarga el PDF
    doc.save("certificado.pdf");
  };

  return (
    <div className={style.container__button}>   
      <button className={style.exportButton} onClick={generatePDF} disabled={!logoBase64 || !logobpsBase64}>
        <FaFilePdf size={25} color="white" />
        Exportar a PDF
      </button>
    </div>
  );
};

export default GenerateStyledPDF;
