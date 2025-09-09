import styles from './SignupForm.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../auth/schemas';
import { useSignupMutation } from '../../services/authApi';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { setCredentials } from '../auth/authSlice';
import { Link } from 'react-router';
import GenderInput from '../../components/Input/GenderInput/GenderInput';

const SignupForm = ({ onSwitch }, ...props) => {
    const [signup, { isError, error, isSuccess, data }] = useSignupMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
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
            <fieldset className={styles['input-set']}>
                <Input
                    type="text"
                    label="Full name"
                    autoComplete="name"
                    aria-invalid={!!errors?.fullName}
                    aria-describedby={
                        errors?.fullName ? 'fullName-error' : undefined
                    }
                    field={errors?.fullName}
                    {...register('fullName')}
                />
                <Input
                    type="email"
                    label="email"
                    autoComplete="email"
                    aria-invalid={!!errors?.email}
                    aria-describedby={errors?.email ? 'email-error' : undefined}
                    field={errors?.email}
                    {...register('email')}
                />
                <Input
                    type="text"
                    label="username"
                    autoComplete="username"
                    aria-invalid={!!errors?.username}
                    aria-describedby={
                        errors?.username ? 'username-error' : undefined
                    }
                    field={errors?.username}
                    {...register('username')}
                />
                <Input
                    type="password"
                    label="password"
                    autoComplete="new-password"
                    aria-invalid={!!errors?.password}
                    aria-describedby={
                        errors?.password ? 'password-error' : undefined
                    }
                    field={errors?.password}
                    {...register('password')}
                />
                <Input
                    type="password"
                    label="confirm password"
                    autoComplete="new-password"
                    aria-invalid={!!errors?.confirmPassword}
                    aria-describedby={
                        errors?.confirmPassword
                            ? 'confirmPassword-error'
                            : undefined
                    }
                    field={errors?.confirmPassword}
                    {...register('confirmPassword')}
                />

                <GenderInput
                    aria-invalid={!!errors?.gender}
                    aria-describedby={
                        errors?.gender ? 'gender-error' : undefined
                    }
                    errors={errors}
                    type="radio"
                    autoComplete="sex"
                    {...register('gender')}
                />

                <Input
                    // className={styles['group-dob']}
                    type="date"
                    label="date of birth"
                    autoComplete="bday"
                    aria-invalid={!!errors?.dateOfBirth}
                    aria-describedby={
                        errors?.dateOfBirth ? 'dateOfBirth-error' : undefined
                    }
                    field={errors?.dateOfBirth}
                    {...register('dateOfBirth')}
                />
            </fieldset>
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
