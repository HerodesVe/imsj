import React from "react";
import ExcelJS from "exceljs";
import styles from "./GenerateButtonExcel.module.css";
import { FaFileExcel } from "react-icons/fa6";


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

interface GenerateExcelButtonProps {
  data: Data[];
}

const GenerateExcelButton: React.FC<GenerateExcelButtonProps> = ({ data }) => {
  const exportToExcel = async (dataToExport: Data[], filename: string, sheetName: string) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet(sheetName);

    const headerStyle = {
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "232C3D" },
      },
      font: {
        color: { argb: "FFFFFFFF" },
        bold: true,
        size: 13,
      },
      alignment: {
        vertical: "middle",
        horizontal: "center",
      },
      border: {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      },
    };

    const headers = Object.keys(dataToExport[0]);
    headers.forEach((header, index) => {
      const cell = sheet.getCell(1, index + 1);
      cell.value = header.replace(/_/g, " ");
      cell.fill = headerStyle.fill;
      cell.font = headerStyle.font;
      cell.alignment = headerStyle.alignment;
      cell.border = headerStyle.border;

      sheet.getColumn(index + 1).width = header.length + 12;
    });

    dataToExport.forEach((item, rowIndex) => {
      headers.forEach((header, colIndex) => {
        const cell = sheet.getCell(rowIndex + 2, colIndex + 1);
        cell.value = item[header as keyof Data];
        cell.border = headerStyle.border;
        cell.alignment = {
          vertical: "middle",
          horizontal: "center",
        };

        const maxLength = Math.max(
          header.length,
          ...dataToExport.map((item) => {
            const value = item[header as keyof Data];
            return value ? value.toString().length : 0;
          })
        );

        const column = sheet.getColumn(colIndex + 1);
        column.width = maxLength + 5;
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.xlsx`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const generateFileName = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    return `Detalles_certificado${formattedDate}`;
  };

  const handleExportClick = () => {
    const filename = generateFileName();

    const transformedData = data.map((item) => {
      console.log("Item:", item);
      return {
        "Código de País": item.paisDocumento?.codPais || "",
        "País": item.paisDocumento?.descPais || "",
        "Código de Documento": item.tipoDocumento?.codTipoDocumento || "",
        "Tipo de Documento": item.tipoDocumento?.descTipoDocumento || "",
        "Número de Documento": item.nroDocumento || "",
        "Nombre Completo": item.nombreCompleto || "",
        "Código de Documento Médico": item.tipoDocumentoMedico?.codTipoDocumento || "",
        "Tipo de Documento Médico": item.tipoDocumentoMedico?.descTipoDocumento || "",
        "Nombre Completo Médico": item.nombreCompletoMedico || "",
        "Fecha de Vigencia": item.infoEstado?.fechaVigencia || "",
        "Estado": item.infoEstado?.estado?.descEstado || "",
        "Fecha de Certificación Desde": item.fechaCertificacionDesde || "",
        "Fecha de Certificación Hasta": item.fechaCertificacionHasta || "",
        "Fecha de Actualización": item.fechaActualizacion || "",
        "Institución": item.institucion?.descInstitucion || "",
        "Fecha de Egreso de Internación": item.infoInteracion?.fechaEgresoInternacion || "",
        "Es Internación": item.infoInteracion?.esInternacion ? "Sí" : "No",
        "Patología": item.infoPatologia?.patologia || "",
        "Es Excepción": item.infoPatologia?.esExcepcion ? "Sí" : "No",
        "Fecha de Reintegro": item.infoReintegroAnticipado?.fechaReintegro || "",
        "Es Reintegro Anticipado": item.infoReintegroAnticipado?.esReintegroAnticipado ? "Sí" : "No",
      };
    });

    exportToExcel(transformedData, filename, "Vista 1");
  };

  return (
    <button className={styles.exportButton} onClick={handleExportClick}>
      <FaFileExcel size={15} color="white" />
      DESCARGAR EXCEL
    </button>
  );
};

export default GenerateExcelButton;
