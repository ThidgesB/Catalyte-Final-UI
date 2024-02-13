import React from 'react';
import styles from './Input.module.css';

/**
 * Custom component for input fields and error messages
 */
const Input = ({
  label, name, value, onChange, type, error
}) => (
  <div className={styles['input-container']}>
    <label htmlFor={name}>{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
    />
    <div className={styles['input-error']}>{error}</div>
  </div>
);

export default Input;
