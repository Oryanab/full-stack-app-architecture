import { Request, Response, NextFunction } from 'express';
import config from 'config';
import OrganizationModel from '../models/organization.model';
import UserModel from '../models/user.model';
import { UserRole } from '../types';

const validateUserRegistation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, organization_id } = req.body;
        const admins = config.get<any>('admins');
        const isAdmin = admins.includes(email);
        const organization = await OrganizationModel.findById(organization_id);
        const user = await UserModel.findOne({ email });
        if (!organization) {
            return res.status(403).send('Organization does not exist');
        }
        if (
            (user && isAdmin) ||
            (user && user.organization_id === organization_id)
        ) {
            return res.status(403).send('User already exist');
        }
        const isOwner = organization?.organization_owner === email;
        req.body.role = isAdmin
            ? UserRole.ADMIN
            : isOwner
              ? UserRole.OWNER
              : UserRole.USER;
        next();
    } catch (err) {
        return res.status(500).send(`internal server error: ${err.message}`);
    }
};

export default validateUserRegistation;
