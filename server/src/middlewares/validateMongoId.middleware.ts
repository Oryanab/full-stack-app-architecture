import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';

const validateMongoId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return res.status(403).send('invalid paramenter found in request');
    }
    next();
};

export default validateMongoId;
