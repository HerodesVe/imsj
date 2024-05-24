import { Calendar } from "primereact/calendar";
import defaultStyle from "./Calendar.module.css"; // Asegúrate de importar los estilos adecuados
import { addLocale } from "primereact/api";
import moment from 'moment';

export default function InputCalendar({
  label,
  style,
  value,
  name,
  onChange,
  placeholder,
  marginRightLabel, // Agrega la nueva propiedad aquí
  ...otherProps
}) {
  // Define el estilo del label de manera condicional para incluir el margen derecho
  const labelStyle = {
    marginRight: marginRightLabel ? `${marginRightLabel}px` : "0px", // Utiliza marginRightLabel si está disponible
  };
  
  addLocale("es", {
    firstDayOfWeek: 1,
    showMonthAfterYear: true,
    dayNames: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    monthNamesShort: [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ],
    today: "Hoy",
    clear: "Limpiar",
  });

  const handleDateChange = (e) => {
    const formattedDate = moment(e.value).format('YYYY-MM-DD'); // Formato para almacenar
    onChange({ target: { name, value: formattedDate } });
  };

  return (
    <div className={defaultStyle.InputTextalingCalendar} style={style}>
      {label && (
        <label className={defaultStyle.Labelaling} style={labelStyle}>
          <strong>{label}</strong>
        </label>
      )}
      <Calendar
        name={name}
        value={moment(value).toDate()} // Convertir el valor a objeto Date
        onChange={handleDateChange}
        placeholder={placeholder}
        locale="es"
        className={defaultStyle.InputalingCalendar}
        showIcon
        inputClassName={defaultStyle.CalendarInput}
        dateFormat="dd/mm/yy" // Establecer el formato de fecha visual
        {...otherProps} // Pasa cualquier otra prop adicional al componente Calendar
      />
    </div>
  );
}
