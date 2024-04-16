import { Request, Response } from 'express';
import {
    createAnnouncement,
    getAnnouncement,
    getAnnouncements,
    deleteAnnouncement,
    editAnnouncement
} from '../services/announcement.service';
import logger from '../utils/logger.utils';
import { AnnouncementsValidator } from '../validators/announcement.validator';

export const createAnnouncementHandler = async (
    req: Request<{}, {}, AnnouncementsValidator['body']>,
    res: Response
) => {
    try {
        const announcement = await createAnnouncement(
            req.body,
            res.locals.user._id as string,
            res.locals.user.organization_id as string
        );
        return res.status(200).send(announcement);
    } catch (e: any) {
        logger.error(e.message);
        return res.status(400).send(e.message);
    }
};

export const getAnnouncementsHandler = async (req: Request, res: Response) => {
    try {
        const announcements = await getAnnouncements(
            res.locals.user.organization_id as string
        );
        return res.status(200).send(announcements);
    } catch (e: any) {
        logger.error(e.message);
        return res.status(400).send(e.message);
    }
};

export const getAnnouncementHandler = async (
    req: Request<{ id: string }, {}, {}>,
    res: Response
) => {
    try {
        const announcement = await getAnnouncement(req.params.id);
        if (!announcement) {
            return res.status(404).send('announcement not found');
        }
        return res.status(200).send(announcement);
    } catch (e: any) {
        logger.error(e.message);
        return res.status(400).send(e.message);
    }
};

export const deleteAnnouncementHandler = async (
    req: Request<{ id: string }, {}, {}>,
    res: Response
) => {
    try {
        const announcement = await getAnnouncement(req.params.id);
        if (!announcement) {
            return res.status(404).send('announcement not found');
        }
        await deleteAnnouncement(req.params.id);
        return res.status(200).send('deleted successfully');
    } catch (e: any) {
        logger.error(e.message);
        return res.status(400).send(e.message);
    }
};

export const editAnnouncementHandler = async (
    req: Request<{ id: string }, {}, AnnouncementsValidator['body']>,
    res: Response
) => {
    try {
        const announcement = await getAnnouncement(req.params.id);
        if (!announcement) {
            return res.status(404).send('announcement not found');
        }
        const updatedAnnouncement = await editAnnouncement(
            req.params.id,
            req.body
        );
        return res.status(200).send(updatedAnnouncement);
    } catch (e: any) {
        logger.error(e.message);
        return res.status(400).send(e.message);
    }
};
