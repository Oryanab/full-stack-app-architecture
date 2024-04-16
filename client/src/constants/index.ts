import { TypeOf, object, string } from 'zod';

export const HEADER_NAME = 'User name:';

export const loginSchema = object({
    email: string().min(1, { message: 'Email is required' }),
    password: string().min(1, { message: 'Password is required' })
});

export const registerSchema = object({
    username: string().min(1, { message: 'Username is required' }),
    email: string()
        .min(1, { message: 'Email is required' })
        .email('Not a valid email'),
    password: string()
        .min(1, { message: 'Password is required' })
        .min(6, 'Password too short - should be 6 chars minimum')
        .max(20, 'Password must be at most 20 characters long')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and no spaces'
        ),
    password_cofirm: string().min(1, {
        message: 'Password cofirm is required'
    }),
    organization_name: string().min(1, {
        message: 'Organization name is required'
    })
}).refine((data) => data.password === data.password_cofirm, {
    message: 'Passwords do not match',
    path: ['passwordConfirm']
});

export type LoginSchema = TypeOf<typeof loginSchema>;
export type RegisterSchema = TypeOf<typeof registerSchema>;
