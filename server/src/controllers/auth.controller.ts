import { Request, Response } from 'express';
import logger from '../utils/logger.utils';
import {
    authRegister,
    validatePassword,
    getGeneralUsers,
    getUsersByOrganization
} from '../services/auth.service';
import { omit } from 'lodash';
import {
    AuthLoginValidator,
    AuthRegisterValidator
} from '../validators/auth.validator';
import { signJwtToken } from '../utils/jwt.utils';
import config from 'config';
import { UserRole } from '../types';

export const authRegisterHandler = async (
    req: Request<
        {},
        {},
        Omit<
            AuthRegisterValidator['body'],
            | 'passwordConfirm'
            | 'verified'
            | 'role'
            | 'restrict'
            | 'organization_name'
        > & { role: UserRole; organization_id: string }
    >,
    res: Response
) => {
    try {
        const user = await authRegister(req.body);
        return res.status(200).send(omit(user, 'password'));
    } catch (e: any) {
        logger.error(e.message);
        return res.status(400).send(e.message);
    }
};

export const authLoginHandler = async (
    req: Request<{}, {}, AuthLoginValidator['body']>,
    res: Response
) => {
    const { email, password } = req.body;
    const user = await validatePassword(email, password);

    if (!user) {
        return res.status(401).send('Invalid email or password');
    }

    const accessToken = signJwtToken(
        {
            ...user
        },
        { expiresIn: config.get<string>('accessTokenTtl') }
    );

    res.cookie('accessToken', accessToken, {
        maxAge: 900000,
        httpOnly: true,
        domain: 'localhost',
        path: '/',
        sameSite: 'strict',
        secure: false
    });

    res.status(200).send(`${user.username} logged in Successfully`);
};

export const getGeneralUsersHandler = async (req: Request, res: Response) => {
    try {
        const users = await getGeneralUsers();
        return res.status(200).send(users);
    } catch (e: any) {
        logger.error(e.message);
        return res.status(400).send(e.message);
    }
};

export const getUsersByOrganizationHandler = async (
    req: Request,
    res: Response
) => {
    try {
        const users = await getUsersByOrganization(
            res.locals.user.organization_id as string
        );
        return res.status(200).send(users);
    } catch (e: any) {
        logger.error(e.message);
        return res.status(400).send(e.message);
    }
};

export const authSessionHandler = (req: Request, res: Response) => {
    return res.send(res.locals.user);
};
