import React from 'react';
import styles from './Input.module.css';
import ErrorMessage from '../FormErrorMessage/ErrorMessage';

const Input = React.forwardRef(
    ({ label = '', field = null, children, ...props }, ref) => {
        const input = <input ref={ref} className={styles.input} {...props} />;
        return (
            <div className={styles.group}>
                {input}
                {label ? (
                    <label
                        className={styles.label}
                        htmlFor={props.htmlFor ?? ''}
                    >
                        {label}
                    </label>
                ) : (
                    <></>
                )}
                {field && <ErrorMessage field={field} />}
            </div>
        );
    }
);

export default Input;
