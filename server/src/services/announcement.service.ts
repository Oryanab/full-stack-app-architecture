import { AnnouncementsValidator } from '../validators/announcement.validator';
import logger from '../utils/logger.utils';
import AnnouncementModel, {
    AnnouncementDocument
} from '../models/announcement.model';

export const createAnnouncement = async (
    input: AnnouncementsValidator['body'],
    user_id: string,
    organization_id: string
): Promise<AnnouncementDocument> => {
    try {
        const announcement = await AnnouncementModel.create({
            ...input,
            user_id,
            organization_id
        });
        return announcement;
    } catch (e: any) {
        logger.error(e);
        throw new Error(
            'Failed to create announcement, please try again later'
        );
    }
};

export const getAnnouncements = async (
    organization_id: string
): Promise<AnnouncementDocument[]> => {
    try {
        const announcements = await AnnouncementModel.find({ organization_id });
        return announcements;
    } catch (e: any) {
        logger.error(e);
        throw new Error('Failed to find announcements, please try again later');
    }
};

export const getAnnouncement = async (
    id: string
): Promise<AnnouncementDocument> => {
    try {
        const announcement = await AnnouncementModel.findById(id);
        return announcement;
    } catch (e: any) {
        logger.error(e);
        throw new Error('Failed to find announcement, please try again later');
    }
};

export const deleteAnnouncement = async (id: string) => {
    try {
        return await AnnouncementModel.findByIdAndDelete(id);
    } catch (e: any) {
        logger.error(e);
        throw new Error(
            'Failed to delete announcement, please try again later'
        );
    }
};

export const editAnnouncement = async (
    id: string,
    input: AnnouncementsValidator['body']
): Promise<AnnouncementDocument> => {
    try {
        const announcement = await AnnouncementModel.findByIdAndUpdate(
            id,
            input
        );
        return announcement;
    } catch (e: any) {
        logger.error(e);
        throw new Error('Failed to edit announcement, please try again later');
    }
};
