import React from 'react';
import styles from './GenderInput.module.css';
import ErrorMessage from '../../FormErrorMessage/ErrorMessage';

const GenderInput = React.forwardRef(
    ({ name, errors, type, ...props }, ref) => {
        return (
            <>
                <fieldset
                    className={styles['group-gender']}
                    aria-describedby={
                        errors?.gender ? 'gender-error' : undefined
                    }
                >
                    <legend>Gender:</legend>
                    <label htmlFor="male-gender">
                        <input
                            id="male-gender"
                            type={type}
                            value="male"
                            name={name}
                            ref={ref}
                            {...props}
                        />
                        Male
                    </label>
                    <label htmlFor="female-gender">
                        <input
                            id="female-gender"
                            type={type}
                            value="female"
                            name={name}
                            ref={ref}
                            {...props}
                        />
                        Female
                    </label>
                    {errors?.gender && (
                        <ErrorMessage name={name} field={errors.gender} />
                    )}
                </fieldset>
            </>
        );
    }
);

export default GenderInput;
