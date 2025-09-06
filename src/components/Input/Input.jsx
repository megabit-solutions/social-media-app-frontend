import React from "react";
import styles from "./Input.module.css";

const Input = React.forwardRef(({ label = "", ...props }, ref) => {
    const input = <input ref={ref} className={styles.input} {...props} />;
    return label ? (
        <label className={styles.label}>
            <p>{label}</p>
            {input}
        </label>
    ) : (
        input
    );
});

export default Input;
