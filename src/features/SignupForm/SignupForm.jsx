import styles from '../LoginForm/Form.module.css' ;
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

const SignupForm = (...props) => {
    return (
        <form className={styles.form} {...props}>
            <h2 className={styles.heading}>Share Your Moments</h2>
            <p className={styles.subheading}>Welcome To SocialApp</p>
            <Input type="text" placeholder="Enter your name" required autoComplete="true" />
            <Input type="email" placeholder="Enter your email" required autoComplete="true" />
            <Input type="text" placeholder="Pick a username" required autoComplete="true" />
            <Input type="password" placeholder="Enter your password" required autoComplete="true" />
            <Input type="password" placeholder="Enter password again" required autoComplete="true" />
            <br></br>
            <Button type="submit" variant="primary" label="Create Account" size="md" />
            <p id={styles.signupLink}>Already have an account?
                <Button type="button" variant="hyperlink" label="Login Here" size="sm" />
            </p>
        </form>
    );

}

export default SignupForm;