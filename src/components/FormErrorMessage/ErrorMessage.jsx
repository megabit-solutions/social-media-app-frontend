const ErrorMessage = ({ field }) => {
    return (
        <p id={field} role="alert">
            {field.message}
        </p>
    );
};

export default ErrorMessage;
