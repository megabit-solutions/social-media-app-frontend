import styles from './SignupForm.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../auth/schemas';
import { useSignupMutation } from '../../services/authApi';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { selectAccessToken, setCredentials } from '../auth/authSlice';
import ErrorMessage from '../../components/FormErrorMessage/ErrorMessage';
import { Link } from 'react-router';

const SignupForm = ({onSwitch}, ...props) => {
    const [signup, { isError, error, isSuccess, data }] = useSignupMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const cred = useSelector(selectAccessToken);
    console.log(cred);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signupSchema),
        mode: 'onChange',
        defaultValues: {
            fullName: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            dateOfBirth: '',
            gender: '',
        },
    });

    const onSubmit = async (data) => {
        // eslint-disable-next-line no-unused-vars
        const { confirmPassword, ...body } = data;
        await signup(body);
        reset();
    };

    useEffect(() => {
        if (isSuccess && data) {
            console.log(data);
            const { data: userData, message } = data || {};
            const { accessToken, user } = userData;
            if (accessToken && user) {
                console.log('working');
                dispatch(setCredentials({ accessToken, user }));
                const to = location.state?.from?.pathname || '/dashboard';
                navigate(to, { replace: true });
            } else {
                navigate('/login', {
                    replace: true,
                    state: {
                        notice:
                            message ||
                            'Registration successful. Please sign in.',
                    },
                });
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
            <h2 className={styles.heading}>Share Your Moments</h2>
            <p className={styles.subheading}>Welcome To SocialApp</p>
            <fieldset className={styles["group-text"]}>
                <Input
                    type="text"
                    label="Full name"
                    autoComplete="true"
                    aria-invalid={!!errors?.fullName}
                    aria-describedby={
                        errors?.fullName ? 'fullName-error' : undefined
                    }
                    {...register('fullName')}
                />
                {errors?.fullName && <ErrorMessage field={errors?.fullName} />}
                <Input
                    type="email"
                    label="email"
                    autoComplete="true"
                    aria-invalid={!!errors?.email}
                    aria-describedby={errors?.email ? 'email-error' : undefined}
                    {...register('email')}
                />
                {errors?.email && <ErrorMessage field={errors?.email} />}

                <Input
                    type="text"
                    label="username"
                    autoComplete="true"
                    aria-invalid={!!errors?.username}
                    aria-describedby={
                        errors?.username ? 'username-error' : undefined
                    }
                    {...register('username')}
                />
                {errors?.username && <ErrorMessage field={errors?.username} />}
                <Input
                    type="password"
                    label="password"
                    autoComplete="true"
                    aria-invalid={!!errors?.password}
                    aria-describedby={
                        errors?.password ? 'password-error' : undefined
                    }
                    {...register('password')}
                />
                {errors?.password && <ErrorMessage field={errors?.password} />}
                <Input
                    type="password"
                    label="confirm password"
                    autoComplete="true"
                    aria-invalid={!!errors?.confirmPassword}
                    aria-describedby={
                        errors?.confirmPassword
                            ? 'confirmPassword-error'
                            : undefined
                    }
                    {...register('confirmPassword')}
                />
                {errors?.confirmPassword && (
                    <ErrorMessage field={errors?.confirmPassword} />
                )}
            </fieldset>
            <div className={styles["row-groups"]}>
                <fieldset
                    className={styles["group-gender"]}
                    aria-describedby={
                        errors?.gender ? 'gender-error' : undefined
                    }>
                        <legend>Gender:</legend>
                        <label>
                            <input
                                type="radio"
                                value="male"
                                name="gender"
                            />
                            Male
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="male"
                                name="gender"
                            />
                            Female
                        </label>
                </fieldset>
                
                <fieldset
                    className={styles["group-dob"]}
                    aria-describedby={
                        errors?.dateOfBirth? 'dateOfBirth-error' : undefined
                    }>
                    <Input
                        type="date"
                        label="date of birth"
                        autoComplete="bday"
                        aria-invalid={!!errors?.dateOfBirth}
                        aria-describedby={
                            errors?.dateOfBirth ? 'dateOfBirth-error' : undefined
                        }
                        {...register('dateOfBirth')}
                    />
                    {errors?.dateOfBirth && (
                        <ErrorMessage field={errors?.dateOfBirth} />
                    )}
                </fieldset>
            </div>
            <Button
                type="submit"
                variant="primary"
                label="Create Account"
                size="md"
            />
            {isError && (
                <p style={{ color: 'crimson' }}>
                    {error?.data?.message || 'Registration failed'}
                </p>
            )}
            <p id={styles.signupLink}>
                Already have an account?
                <Link to={'/login'}>
                    <Button
                        type="button"
                        variant="hyperlink"
                        label="Login Here"
                        size="sm"
                        onClick={onSwitch}
                    />
                </Link>
            </p>
        </form>
    );
};

export default SignupForm;
