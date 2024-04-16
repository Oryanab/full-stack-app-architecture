import mongoose from 'mongoose';
import { TypeOf, object, string, z } from 'zod';

export const announcementsValidator = object({
    body: object({
        announcement_title: string({
            required_error: 'announcement title is required'
        }),
        announcement_description: string({
            required_error: 'announcement description is required'
        })
            .min(6, 'description too short - should be 6 chars minimum')
            .max(140, 'description must be at most 140 characters long')
            .regex(
                /^(.|\s)*[a-zA-Z]+(.|\s)*$/,
                'Decription cannot indluce spcecial chars'
            ),
        announcement_category: z.instanceof(mongoose.Types.ObjectId, {
            message: 'announcement category is required'
        })
    }).strict()
});

export type AnnouncementsValidator = TypeOf<typeof announcementsValidator>;
