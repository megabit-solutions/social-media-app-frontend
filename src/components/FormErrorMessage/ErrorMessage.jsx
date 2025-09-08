const ErrorMessage = ({ name, field }) => {
    return (
        <p id={`${name}-error`} role="alert">
            {field.message}
        </p>
    );
};

export default ErrorMessage;
