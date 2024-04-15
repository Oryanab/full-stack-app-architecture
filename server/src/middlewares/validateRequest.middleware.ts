import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import logger from '../utils/logger.utils';

const validateRequest =
    (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params
            });
            next();
        } catch (e: any) {
            logger.error(e.issues ? e.issues : e);
            return res.status(400).send(e.issues ? e.issues : e);
        }
    };

export default validateRequest;
