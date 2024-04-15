import { OrganizationPlan } from '../types';
import { TypeOf, object, string, z } from 'zod';

export const registerOrganizationValidator = object({
    body: object({
        organization_name: string({
            required_error: 'Organization name is required'
        }),
        organization_logo: string({
            required_error: 'Organization logo is required'
        }),
        organization_domain: string({
            required_error: 'Organization domain is required'
        }),
        organization_plan: z.enum(
            [
                OrganizationPlan.BRONZE,
                OrganizationPlan.SILVER,
                OrganizationPlan.GOLD
            ],
            {
                required_error: 'organization plan is required'
            }
        ),
        organization_telephone: string({
            required_error: 'mobile number is required'
        })
            .min(10, { message: 'Must be a valid mobile number' })
            .max(14, { message: 'Must be a valid mobile number' }),
        organization_support_email: string({
            required_error: 'Organization support email is required'
        }),
        organization_owner: string({
            required_error: 'organization owner is required'
        })
    })
        .strict()
        .refine(
            (data) =>
                !data.organization_domain.includes(
                    data.organization_owner.split('@')[1]
                ),
            {
                message:
                    'organization owner email must be under the organization domain',
                path: ['organization_owner']
            }
        )
});

export const editOrganizationValidator = object({
    body: object({
        organization_name: string({
            required_error: 'Organization name is required'
        }),
        organization_logo: string({
            required_error: 'Organization logo is required'
        }),
        organization_plan: z.enum(
            [
                OrganizationPlan.BRONZE,
                OrganizationPlan.SILVER,
                OrganizationPlan.GOLD
            ],
            {
                required_error: 'organization plan is required'
            }
        ),
        organization_telephone: string({
            required_error: 'mobile number is required'
        })
            .min(10, { message: 'Must be a valid mobile number' })
            .max(14, { message: 'Must be a valid mobile number' }),
        organization_support_email: string({
            required_error: 'Organization support email is required'
        })
    }).strict()
});

export type RegisterOrganizationValidator = TypeOf<
    typeof registerOrganizationValidator
>;
export type EditOrganizationValidator = TypeOf<
    typeof registerOrganizationValidator
>;
