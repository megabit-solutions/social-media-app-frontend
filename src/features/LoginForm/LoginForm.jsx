import styles from './LoginForm.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useLoginMutation } from '../../services/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router';
import { selectAccessToken, setCredentials } from '../auth/authSlice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../auth/schemas';
import { useEffect } from 'react';
import ErrorMessage from '../../components/FormErrorMessage/ErrorMessage';

const LoginForm = ({ onSwitch }, ...props) => {
    const [login, { isError, error, isSuccess, data }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
        defaultValues: {
            identifier: '',
            password: '',
        },
    });

    const onSubmit = async (data) => {
        await login(data);
        reset();
    };

    useEffect(() => {
        if (isSuccess && data) {
            console.log(data);
            const { data: userData } = data || {};
            const { accessToken, user } = userData;
            if (accessToken && user) {
                dispatch(setCredentials({ accessToken, user }));
                const to = location.state?.from?.pathname || '/dashboard';
                navigate(to, { replace: true });
            }
        }
    }, [isSuccess, data, dispatch, navigate, location.state]);
    return (
        <form
            className={styles.form}
            {...props}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <h2 className={styles.heading}>Welcome Back!</h2>
            <p className={styles.subheading}>Stay close, stay connected.</p>
            <fieldset>
                <Input
                    type="text"
                    label="Email / Username"
                    autoComplete="true"
                    aria-invalid={!!errors?.identifier}
                    aria-describedby={
                        errors?.identifier ? 'identifier-error' : undefined
                    }
                    {...register('identifier')}
                />
                {errors?.identifier && (
                    <ErrorMessage field={errors?.identifier} />
                )}
                <Input
                    type="password"
                    label="Password"
                    autoComplete="true"
                    aria-invalid={!!errors?.password}
                    aria-describedby={
                        errors?.password ? 'password-error' : undefined
                    }
                    {...register('password')}
                />
                {errors?.password && <ErrorMessage field={errors?.password} />}
            </fieldset>

            <Button
                id={styles.forgotLink}
                type="button"
                variant="hyperlink"
                label="Forgot Password?"
                size="sm"
            />
            <Button
                id={styles.btn}
                type="submit"
                variant="primary"
                label="Login"
                size="md"
            />
            {isError && (
                <p style={{ color: 'crimson' }}>
                    {error?.data?.message || 'Registration failed'}
                </p>
            )}
            <p id={styles.signupLink}>
                Don't have an account?
                <Link to={'/signup'}>
                    <Button
                        type="button"
                        variant="hyperlink"
                        label="Sign-up Here"
                        size="sm"
                        onClick={onSwitch}
                    />
                </Link>
            </p>
        </form>
    );
};

export default LoginForm;
