import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../types';

const validateOwner = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (res.locals.user.role !== UserRole.OWNER) {
        return res.status(403).send('Owners access only');
    }
    next();
};

export default validateOwner;
