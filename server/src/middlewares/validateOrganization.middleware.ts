import { Request, Response, NextFunction } from 'express';
import OrganizationModel from 'src/models/organization.model';
import { AuthRegisterValidator } from 'src/validators/auth.validator';

const validateOrganization = async (
    req: Request<
        {},
        {},
        Omit<
            AuthRegisterValidator['body'],
            'passwordConfirm' | 'verified' | 'role' | 'restrict'
        > & { organization_id: string }
    >,
    res: Response,
    next: NextFunction
) => {
    const { organization_name } = req.body;
    const organization = await OrganizationModel.findOne({ organization_name });
    if (!organization) {
        return res.status(404).send('invalid organization');
    }

    delete req.body.organization_name;
    req.body.organization_id = organization.id;
    next();
};

export default validateOrganization;
