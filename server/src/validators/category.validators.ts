import { CategoryPriority } from 'src/types';
import { TypeOf, object, string, z } from 'zod';

export const categoryValidator = object({
    body: object({
        category_name: string({
            required_error: 'category name is required'
        }),
        category_description: string({
            required_error: 'category description is required'
        })
            .min(6, 'description too short - should be 6 chars minimum')
            .max(140, 'description must be at most 140 characters long')
            .regex(
                /^(.|\s)*[a-zA-Z]+(.|\s)*$/,
                'Decription cannot indluce spcecial chars'
            ),
        category_priority: z.enum(
            [
                CategoryPriority.LOW,
                CategoryPriority.MEDIUN,
                CategoryPriority.HIGH
            ],
            {
                required_error: 'category priority is required'
            }
        )
    }).strict()
});

export type CategoryValidator = TypeOf<typeof categoryValidator>;
