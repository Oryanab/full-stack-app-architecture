import { Request, Response } from 'express';
import {
    EditOrganizationValidator,
    RegisterOrganizationValidator
} from '../validators/organization.validator';
import {
    editOrganization,
    getOrganization,
    getOrganizations,
    registerOrganization,
    toggleEnableOrganization
} from '../services/organization.service';
import logger from '../utils/logger.utils';

export const registerOrganizationHandler = async (
    req: Request<{}, {}, RegisterOrganizationValidator['body']>,
    res: Response
) => {
    try {
        const organization = await registerOrganization(req.body);
        return res.status(200).send(organization);
    } catch (e: any) {
        logger.error(e.message);
        return res.status(400).send(e.message);
    }
};

export const getOrganizationsHandler = async (req: Request, res: Response) => {
    try {
        const organizations = await getOrganizations();
        return res.status(200).send(organizations);
    } catch (e: any) {
        logger.error(e.message);
        return res.status(400).send(e.message);
    }
};

export const getOrganizationHandler = async (
    req: Request<{ id: string }, {}, {}>,
    res: Response
) => {
    try {
        const organization = await getOrganization(req.params.id);
        if (!organization) {
            return res.status(404).send('organization not found');
        }
        return res.status(200).send(organization);
    } catch (e: any) {
        logger.error(e.message);
        return res.status(400).send(e.message);
    }
};

export const toggleEnableOrganizationHandler = async (
    req: Request<{ id: string }, {}, {}>,
    res: Response
) => {
    try {
        const organization = await toggleEnableOrganization(req.params.id);
        if (!organization) {
            return res.status(404).send('organization not found');
        }
        return res.status(200).send(organization);
    } catch (e: any) {
        logger.error(e.message);
        return res.status(400).send(e.message);
    }
};

export const editOrganizationHandler = async (
    req: Request<{ id: string }, {}, EditOrganizationValidator['body']>,
    res: Response
) => {
    try {
        const organization = await editOrganization(req.params.id, req.body);
        if (!organization) {
            return res.status(404).send('organization not found');
        }
        return res.status(200).send(organization);
    } catch (e: any) {
        logger.error(e.message);
        return res.status(400).send(e.message);
    }
};
