import React from 'react';
import { cloneElement } from 'react';
import styles from './Input.module.css';

const Input = React.forwardRef(
    ({ label = '', ErrorMsg = null, ...props }, ref) => {
        // console.log([styles.input, {...props}].join(' '));
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
                {ErrorMsg}
            </div>
        );
    }
);

export default Input;
