import React from 'react';
import styles from './InputField.module.css';

interface InputFieldProps {
  label: string;
  value: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, value }) => {
  return (
    <div className={styles.inputField}>
      <label>{label}</label>
      <input type="text" value={value} readOnly />
    </div>
  );
};

export default InputField;
