import React from 'react';
import styles from './InputField.module.css';

interface InputFieldProps {
  label: string;
  value: string;
  className?: string; // Añadir className aquí
}

const InputField: React.FC<InputFieldProps> = ({ label, value, className }) => {
  return (
    <div className={`${styles.inputField} ${className}`}>
      <label>{label}</label>
      <input type="text" value={value} readOnly />
    </div>
  );
};

export default InputField;
