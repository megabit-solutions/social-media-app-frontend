import { z } from 'zod';

const RESERVED_USERNAMES = new Set([
    'admin',
    'root',
    'support',
    'help',
    'system',
    'owner',
    'test',
]);
const WEAK_PASSWORDS = new Set([
    'password',
    '12345678',
    'qwerty',
    'letmein',
    'admin123',
    'iloveyou',
]);

export const signupSchema = z
    .object({
        fullName: z
            .string()
            .trim()
            .min(3, 'Name must be at least 3 characters')
            .max(70, 'Name must be at most 70 characters'),
        username: z
            .string()
            .trim()
            .toLowerCase()
            .min(3, 'Username must be at least 3 characters')
            .max(30, 'Username must be at most 30 characters')
            .regex(
                /^[a-z0-9._-]+$/,
                'Only letters, numbers, dot, underscore, hyphen'
            )
            .refine(
                (u) => !RESERVED_USERNAMES.has(u),
                'This username is reserved'
            ),

        email: z
            .email('Please enter a valid email')
            .max(254, 'Email is too long'),

        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .max(128, 'Password must be at most 128 characters')
            .refine(
                (p) => p.trim() === p,
                'Password cannot start or end with spaces'
            )
            .refine(
                (p) => /[a-z]/.test(p),
                'Include at least one lowercase letter'
            )
            .refine(
                (p) => /[A-Z]/.test(p),
                'Include at least one uppercase letter'
            )
            .refine((p) => /[0-9]/.test(p), 'Include at least one number')
            .refine(
                (p) => /[^A-Za-z0-9]/.test(p),
                'Include at least one symbol'
            )
            .refine(
                (p) => !WEAK_PASSWORDS.has(p.toLowerCase()),
                'This password is too common'
            ),

        confirmPassword: z.string(),

        dateOfBirth: z.coerce
            .date({
                required_error: 'Date of birth is required',
                invalid_type_error: 'Please enter a valid date',
            })
            .max(new Date(), 'Date of birth cannot be in the future'),

        gender: z.enum(['male', 'female'], {
            required_error: 'Please select a gender',
        }),
    })
    .refine((d) => d.password === d.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    })
    .superRefine((data, ctx) => {
        // Age window: 13–120
        const today = new Date();
        const midnight = (x) =>
            new Date(x.getFullYear(), x.getMonth(), x.getDate());
        const t = midnight(today);
        const d = midnight(data.dateOfBirth);

        const age =
            t.getFullYear() -
            d.getFullYear() -
            (t.getMonth() < d.getMonth() ||
            (t.getMonth() === d.getMonth() && t.getDate() < d.getDate())
                ? 1
                : 0);

        if (age < 13) {
            ctx.addIssue({
                code: 'custom',
                path: ['dateOfBirth'],
                message: 'You must be at least 13 years old',
            });
        } else if (age > 120) {
            ctx.addIssue({
                code: 'custom',
                path: ['dateOfBirth'],
                message: 'Please enter a realistic date of birth',
            });
        }
    })
    .strict();
