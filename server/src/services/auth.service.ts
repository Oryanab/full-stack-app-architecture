import { FilterQuery } from 'mongoose';
import UserModel, { UserDocument } from '../models/user.model';
import { omit } from 'lodash';
import logger from '../utils/logger.utils';
import { UserRole } from '../types';
import { AuthRegisterValidator } from '../validators/auth.validator';

export const authRegister = async (
    input: Omit<
        AuthRegisterValidator['body'],
        'passwordConfirm' | 'verified' | 'role' | 'restrict'
    > & { role: UserRole }
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
    const user = await UserModel.findOne({ email });
    if (!user) {
        return null;
    }
    const isValid = await user.comparePassword(password);
    if (!isValid) return null;

    return omit(user.toJSON(), 'password');
};

export const findUser = (query: FilterQuery<UserDocument>) => {
    return UserModel.findOne(query).lean();
};
