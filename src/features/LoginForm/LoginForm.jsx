import styles from './Form.module.css';
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

const LoginForm = (...props) => {
    return (
        <form className={styles.form} {...props}>
            <h2 className={styles.heading}>Welcome Back!</h2>
            <p className={styles.subheading}>Stay close, stay connected.</p>
            <Input type="text" placeholder="Email or username" required autoComplete="true" />
            <Input type="password" placeholder="Password" required autoComplete="true" />
            <Button id={styles.forgotLink} type="button" variant="hyperlink" label="Forgot Password?" size="sm" />
            <Button id={styles.btn} type="submit" variant="primary" label="Login" size="md" />
            <p id={styles.signupLink}>Don't have an account?
                <Button type="button" variant="hyperlink" label="Sign-up Here" size="sm" />
            </p>
        </form>
    );
}

export default LoginForm;