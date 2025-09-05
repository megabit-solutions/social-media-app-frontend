import styles from './Input.module.css';

const Input = ({
    label = "",
    ...props
}) => {
    let fragment;
    let input = <input className = {styles.input} {...props} />;
    if (label != "") {
        fragment = <label className = {styles.label} ><p>{label}</p>{input}</label>
    } else {
        fragment = <>{input}</>;
    }
    return fragment;
}

export default Input;