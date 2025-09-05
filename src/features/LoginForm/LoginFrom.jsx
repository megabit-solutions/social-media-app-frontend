import styles from './LoginForm.module.css';
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

const LoginForm = () => {
    return (
        <form className={styles.form}>
            <h2 className={styles.heading}>Hello Again!</h2>
            <p className={styles.subheading}>Welcome To SocialApp</p>
            <Input type="text" placeholder="Email or username" required autoComplete="true" />
            <Input type="password" placeholder="Password" required autoComplete="true" />
            <Button id={styles.forgotLink} type="button" variant="hyperlink" label="Forgot Password?" size="sm" />
            <Button type="submit" variant="primary" label="Login" size="md" />
            <p id={styles.signupLink}>Don't have an account?
                <Button type="button" variant="hyperlink" label="Sign up" size="sm" />
            </p>
        </form>
    );

}

export default LoginForm;