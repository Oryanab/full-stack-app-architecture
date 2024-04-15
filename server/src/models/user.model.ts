import { Document, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';
import logger from '../utils/logger.utils';
import { User } from '../types';

export interface UserDocument extends User, Document {
    createdAt: Date;
    updatedAt: Date;
    organization_id: Schema.Types.ObjectId;
    comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        },
        verified: {
            type: Boolean,
            default: false
        },
        restrict: {
            type: Boolean,
            default: false
        },
        organization_id: {
            type: Schema.Types.ObjectId,
            ref: 'Organization',
            required: true
        }
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next: (err?: Error) => void) {
    const user = this as UserDocument;
    if (!user.isModified('password')) {
        next();
        return;
    }
    const salt = await bcrypt.genSalt(config.get<number>('hashSalt'));
    user.password = bcrypt.hashSync(user.password, salt);
    const admins = config.get<any>('admins');
    if (admins.includes(user.email)) {
        user.verified = true;
    }
    next();
});

userSchema.methods.comparePassword = async function (
    password: string
): Promise<boolean> {
    const user = this as UserDocument;
    return await bcrypt.compare(password, user.password).catch((e: any) => {
        logger.error(e);
        return false;
    });
};

const UserModel = model<UserDocument>('User', userSchema);

export default UserModel;
