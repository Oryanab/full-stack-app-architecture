import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import { verifyJwtToken } from '../utils/jwt.utils';

const authenticateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const accessToken: string =
        get(req, 'cookies.accessToken') ||
        get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');

    if (!accessToken) {
        return res.status(403).send('Invalid user please register');
    }
    const { decoded, expired } = verifyJwtToken(accessToken);
    if (decoded && !expired) {
        res.locals.user = decoded;
        next();
        return;
    }
    return res.status(403).send('Session expired please login');
};

export default authenticateUser;
