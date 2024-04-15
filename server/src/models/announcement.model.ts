import { Document, Schema, model } from 'mongoose';
import { Announcement } from '../types';

export interface AnnouncementDocument extends Announcement, Document {
    createdAt: Date;
    updatedAt: Date;
    announcement_category: Schema.Types.ObjectId;
    user_id: Schema.Types.ObjectId;
    organization_id: Schema.Types.ObjectId;
}

const announcementSchema = new Schema<AnnouncementDocument>(
    {
        announcement_title: {
            type: String,
            required: true
        },
        announcement_description: {
            type: String,
            required: true
        },
        announcement_category: {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        organization_id: {
            type: Schema.Types.ObjectId,
            ref: 'Organization',
            required: true
        }
    },
    { timestamps: true }
);

const AnnouncementModel = model<AnnouncementDocument>(
    'Announcement',
    announcementSchema
);

export default AnnouncementModel;
