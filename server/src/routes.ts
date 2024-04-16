import { Express, Request, Response } from 'express';
import validateRequest from './middlewares/validateRequest.middleware';
import {
    authRegisterValidator,
    authLoginValidator
} from './validators/auth.validator';
import {
    authRegisterHandler,
    authLoginHandler,
    authSessionHandler,
    getGeneralUsersHandler
} from './controllers/auth.controller';
import authenticateUser from './middlewares/authenticateUser.middleware';
import validateUserRegistation from './middlewares/validateUserRegistation.middleware';
import validateAdmin from './middlewares/validateAdmin.middleware';
import {
    editOrganizationHandler,
    getOrganizationHandler,
    getOrganizationsHandler,
    registerOrganizationHandler,
    toggleEnableOrganizationHandler
} from './controllers/organization.controller';
import validateOwner from './middlewares/validateOwner.middleware';
import validateMongoId from './middlewares/validateMongoId.middleware';
import {
    createCategoryHandler,
    deleteCategoryHandler,
    editCategoryHandler,
    getCategoriesHandler,
    getCategoryHandler
} from './controllers/category.controller';
import {
    createAnnouncementHandler,
    deleteAnnouncementHandler,
    editAnnouncementHandler,
    getAnnouncementHandler,
    getAnnouncementsHandler
} from './controllers/announcement.controller';
import validateOrganization from './middlewares/validateOrganization.middleware';
import {
    editOrganizationValidator,
    registerOrganizationValidator
} from './validators/organization.validator';
import { categoryValidator } from './validators/category.validators';
import { announcementsValidator } from './validators/announcement.validator';

const routes = (app: Express) => {
    // Health
    app.get('/healthcheck', (req: Request, res: Response) =>
        res.sendStatus(200)
    );

    // User Managemant
    app.post(
        '/api/register',
        [
            validateRequest(authRegisterValidator),
            validateOrganization,
            validateUserRegistation
        ],
        authRegisterHandler
    );

    app.post(
        '/api/login',
        validateRequest(authLoginValidator),
        authLoginHandler
    );

    app.get('/api/session', authenticateUser, authSessionHandler);

    app.get(
        '/api/users/general',
        [authenticateUser, validateAdmin],
        getGeneralUsersHandler
    );

    app.get(
        '/api/users/organization',
        [authenticateUser, validateOwner],
        getOrganizationsHandler
    );

    // Orgnizations:
    app.post(
        '/api/orgnizations',
        [
            validateRequest(registerOrganizationValidator),
            authenticateUser,
            validateAdmin
        ],
        registerOrganizationHandler
    );

    app.get(
        '/api/orgnizations',
        [authenticateUser, validateAdmin],
        getOrganizationsHandler
    );

    app.get(
        '/api/orgnizations/:id',
        [authenticateUser, validateMongoId],
        getOrganizationHandler
    );

    app.patch(
        '/api/orgnizations/:id',
        [authenticateUser, validateMongoId, validateAdmin],
        toggleEnableOrganizationHandler
    );

    app.put(
        '/api/orgnizations/:id',
        [
            validateRequest(editOrganizationValidator),
            authenticateUser,
            validateMongoId,
            validateOwner
        ],
        editOrganizationHandler
    );

    // Categories

    app.post(
        '/api/categories',
        [validateRequest(categoryValidator), authenticateUser],
        createCategoryHandler
    );

    app.get('/api/categories', authenticateUser, getCategoriesHandler);

    app.get(
        '/api/categories/:id',
        [authenticateUser, validateMongoId],
        getCategoryHandler
    );

    app.delete(
        '/api/categories/:id',
        [authenticateUser, validateMongoId, validateOwner],
        deleteCategoryHandler
    );

    app.put(
        '/api/categories/:id',
        [validateRequest(categoryValidator), authenticateUser, validateMongoId],
        editCategoryHandler
    );

    // Announcements
    app.post(
        '/api/announcements',
        [validateRequest(announcementsValidator), authenticateUser],
        createAnnouncementHandler
    );

    app.get('/api/announcements', authenticateUser, getAnnouncementsHandler);

    app.get(
        '/api/announcements/:id',
        [authenticateUser, validateMongoId],
        getAnnouncementHandler
    );

    app.delete(
        '/api/announcements/:id',
        [authenticateUser, validateMongoId, validateOwner],
        deleteAnnouncementHandler
    );

    app.put(
        '/api/announcements/:id',
        [
            validateRequest(announcementsValidator),
            authenticateUser,
            validateMongoId
        ],
        editAnnouncementHandler
    );
};

export default routes;
