import logger from '../utils/logger.utils';
import OrganizationModel, {
    OrganizationDocument
} from '../models/organization.model';
import { RegisterOrganizationValidator } from '../validators/organization.validator';

export const registerOrganization = async (
    input: RegisterOrganizationValidator['body']
): Promise<Omit<OrganizationDocument, 'password'>> => {
    try {
        const organization = await OrganizationModel.create(input);
        return organization;
    } catch (e: any) {
        logger.error(e);
        throw new Error('Failed to register user, please try again later');
    }
};

export const getOrganizations = async (): Promise<OrganizationDocument[]> => {
    try {
        const organization = await OrganizationModel.find();
        return organization;
    } catch (e: any) {
        logger.error(e);
        throw new Error('Failed to get organizations, please try again later');
    }
};

export const getOrganization = async (
    id: string
): Promise<OrganizationDocument> => {
    try {
        const organization = await OrganizationModel.findById(id);
        return organization;
    } catch (e: any) {
        logger.error(e);
        throw new Error('Failed to get organization, please try again later');
    }
};

export const toggleEnableOrganization = async (
    id: string
): Promise<OrganizationDocument> => {
    try {
        const organization = await OrganizationModel.findOneAndUpdate(
            { _id: id },
            [{ $set: { enabled: { $not: '$enabled' } } }]
        );
        return organization;
    } catch (e: any) {
        logger.error(e);
        throw new Error('Failed to get organization, please try again later');
    }
};

export const editOrganization = async (
    id: string,
    input: RegisterOrganizationValidator['body']
): Promise<OrganizationDocument> => {
    try {
        const organization = await OrganizationModel.findByIdAndUpdate(
            id,
            input
        );
        return organization;
    } catch (e: any) {
        logger.error(e);
        throw new Error('Failed to get organization, please try again later');
    }
};
