import { z } from 'zod';

const usernamePattern = /^[a-z0-9._-]{3,30}$/i;
const emailString = z.email().max(254);
const usernameString = z.string().regex(usernamePattern);

export const loginSchema = z
    .object({
        identifier: z
            .string()
            .trim()
            .toLowerCase()
            .min(1, 'Enter your email or username')
            .max(254, 'Identifier is too long')
            .refine(
                (val) =>
                    emailString.safeParse(val).success ||
                    usernameString.safeParse(val).success,
                'Enter a valid email or username'
            ),
        password: z
            .string()
            .min(1, 'Password is required')
            .max(128, 'Too long'),
    })
    .strict()
    .transform(({ identifier, password }) => {
        return emailString.safeParse(identifier).success
            ? { email: identifier, password }
            : { username: identifier, password };
    });
