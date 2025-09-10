import styles from './Button.module.css';

const Button = ({
    variant = 'primary',
    size = 'even',
    label,
    icon,
    disabled,
    onClick,
    ...props
}) => {
    const classes = [
        styles.btn,
        styles[`btn-${variant}`],
        styles[`btn-${size}`],
        disabled && styles['btn-disabled'],
        icon && label ? styles['btn-with-icon'] : '',
        icon && !label ? styles['btn-icon-only'] : '',
    ].join(' ');
    return (
        <button className={classes} {...props} onClick={onClick}>
            {icon && <span className={styles['btn-icon']}>{icon}</span>}
            <p className={styles['btn-text']}>{label}</p>
        </button>
    );
};

export default Button;
