import { Express, Request, Response } from 'express';
import validateRequest from './middlewares/validateRequest.middleware';
import {
    authRegisterValidator,
    authLoginValidator
} from './validators/auth.validator';
import {
    authRegisterHandler,
    authLoginHandler,
    authSessionHandler
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

const routes = (app: Express) => {
    // Health
    app.get('/healthcheck', (req: Request, res: Response) =>
        res.sendStatus(200)
    );

    // Auth
    app.post(
        '/api/register',
        [
            validateRequest(authRegisterValidator),
            validateMongoId,
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

    // GET users - admins
    // GET users by orgnization - owners

    // Orgnizations:
    app.post(
        '/api/orgnizations',
        [authenticateUser, validateAdmin],
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
        [authenticateUser, validateMongoId, validateOwner],
        editOrganizationHandler
    );

    // categories

    app.post('/api/categories', authenticateUser, createCategoryHandler);

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
        [authenticateUser, validateMongoId],
        editCategoryHandler
    );
};

export default routes;
