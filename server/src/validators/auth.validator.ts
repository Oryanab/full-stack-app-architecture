import { TypeOf, object, string } from 'zod';

export const authRegisterValidator = object({
    body: object({
        username: string({
            required_error: 'Username is required'
        }),
        password: string({
            required_error: 'Password is required'
        })
            .min(6, 'Password too short - should be 6 chars minimum')
            .max(20, 'Password must be at most 20 characters long')
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                'Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and no spaces'
            ),
        passwordConfirm: string({
            required_error: 'Password confirm is required'
        }),
        email: string({
            required_error: 'Email is required'
        }).email('Not a valid email'),
        organization_name: string({
            required_error: 'Organization is required'
        })
    })
        .strict()
        .refine((data) => data.password === data.passwordConfirm, {
            message: 'Passwords do not match',
            path: ['passwordConfirm']
        })
});

export const authLoginValidator = object({
    body: object({
        email: string({
            required_error: 'Email is required'
        }),
        password: string({
            required_error: 'Password is required'
        })
    }).strict()
});

export type AuthRegisterValidator = TypeOf<typeof authRegisterValidator>;
export type AuthLoginValidator = TypeOf<typeof authLoginValidator>;
