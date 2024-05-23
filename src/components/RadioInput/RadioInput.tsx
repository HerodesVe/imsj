import React from 'react';
import styles from './RadioInput.module.css';

interface RadioOption {
  label: string;
  checked: boolean;
}

interface RadioInputProps {
  options: RadioOption[];
}

const RadioInput: React.FC<RadioInputProps> = ({ options }) => {
  return (
    <div className={styles.radioGroup}>
      {options.map((option, index) => (
        <div key={index} className={styles.radioOption}>
          <input
            type="radio"
            checked={option.checked}
            readOnly
            className={styles.radioButton}
          />
          <label>{option.label}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioInput;
