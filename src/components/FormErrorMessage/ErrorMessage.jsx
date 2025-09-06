const ErrorMessage = ({ field }) => {
    return (
        <>
            {
                <p id={field} role="alert" style={{ color: 'crimson' }}>
                    {field.message}
                </p>
            }
        </>
    );
};

export default ErrorMessage;
