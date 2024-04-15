import { Document, Schema, model } from 'mongoose';
import { Organization, OrganizationPlan } from '../types';

export interface OrganizationDocument extends Organization, Document {
    createdAt: Date;
    updatedAt: Date;
}

const organizationSchema = new Schema<OrganizationDocument>(
    {
        organization_name: {
            type: String,
            required: true,
            unique: true
        },
        organization_logo: {
            type: String,
            required: true
        },
        organization_domain: {
            type: String,
            required: true,
            unique: true
        },
        organization_plan: {
            type: String,
            required: true
        },
        organization_telephone: {
            type: String,
            required: true
        },
        organization_support_email: {
            type: String,
            required: true
        },
        organization_owner: {
            type: String,
            required: true
        },
        max_users: {
            type: Number,
            default: 0
        },
        enabled: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

organizationSchema.pre('save', async function (next: (err?: Error) => void) {
    const user = this as OrganizationDocument;
    switch (user.organization_plan) {
        case OrganizationPlan.SILVER:
            user.max_users = 10;
            break;
        case OrganizationPlan.GOLD:
            user.max_users = 20;
            break;
        default:
            user.max_users = 5;
    }
    next();
});

const OrganizationModel = model<OrganizationDocument>(
    'Organization',
    organizationSchema
);

export default OrganizationModel;
