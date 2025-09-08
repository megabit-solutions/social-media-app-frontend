import React from 'react';
import styles from './Input.module.css';
import ErrorMessage from '../FormErrorMessage/ErrorMessage';

const Input = React.forwardRef(
    ({ label = '', field = null, name, ...props }, ref) => {
        const input = (
            <input
                ref={ref}
                className={styles.input}
                id={name}
                name={name}
                {...props}
            />
        );
        return (
            <div className={styles.group}>
                {input}
                {label ? (
                    <label className={styles.label} htmlFor={name}>
                        {label}
                    </label>
                ) : (
                    <></>
                )}
                {field && <ErrorMessage name={name} field={field} />}
            </div>
        );
    }
);

export default Input;
