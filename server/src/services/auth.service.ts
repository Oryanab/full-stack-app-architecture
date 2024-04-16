import { FilterQuery } from 'mongoose';
import UserModel, { UserDocument } from '../models/user.model';
import { omit } from 'lodash';
import logger from '../utils/logger.utils';
import { UserRole } from '../types';
import { AuthRegisterValidator } from '../validators/auth.validator';

export const authRegister = async (
    input: Omit<
        AuthRegisterValidator['body'],
        | 'passwordConfirm'
        | 'verified'
        | 'role'
        | 'restrict'
        | 'organization_name'
    > & { role: UserRole; organization_id: string }
): Promise<Omit<UserDocument, 'password'>> => {
    try {
        const user = await UserModel.create(input);
        return omit(user.toJSON(), 'password');
    } catch (e: any) {
        logger.error(e);
        throw new Error('Failed to register user, please try again later');
    }
};

export const validatePassword = async (
    email: string,
    password: string
): Promise<Omit<UserDocument, 'password'> | null> => {
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return null;
        }
        const isValid = await user.comparePassword(password);
        if (!isValid) return null;

        return omit(user.toJSON(), 'password');
    } catch (e: any) {
        logger.error(e);
        throw new Error('Failed to validate password, please try again later');
    }
};

export const getGeneralUsers = async (): Promise<UserDocument[]> => {
    try {
        const users = await UserModel.find();
        return users;
    } catch (e: any) {
        logger.error(e);
        throw new Error('Failed to find users, please try again later');
    }
};

export const getUsersByOrganization = async (
    organization_id: string
): Promise<UserDocument[]> => {
    try {
        const users = await UserModel.find({ organization_id });
        return users;
    } catch (e: any) {
        logger.error(e);
        throw new Error('Failed to find users, please try again later');
    }
};

export const findUser = (query: FilterQuery<UserDocument>) => {
    try {
        return UserModel.findOne(query).lean();
    } catch (e: any) {
        logger.error(e);
        throw new Error('Failed to find user, please try again later');
    }
};
