import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../types';

const validateAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (res.locals.user.role !== UserRole.ADMIN) {
            return res.status(403).send('Admin access only');
        }
        next();
    } catch (err) {
        return res.status(500).send('interval server error');
    }
};

export default validateAdmin;
