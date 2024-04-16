import { Request, Response } from 'express';
import { CategoryValidator } from '../validators/category.validators';
import {
    createCategory,
    getCategories,
    getCategory,
    deleteCategory,
    editCategory
} from '../services/category.service';
import logger from '../utils/logger.utils';

export const createCategoryHandler = async (
    req: Request<{}, {}, CategoryValidator['body']>,
    res: Response
) => {
    try {
        const category = await createCategory(
            req.body,
            res.locals.user._id as string,
            res.locals.user.organization_id as string
        );
        return res.status(200).send(category);
    } catch (e: any) {
        logger.error(e.message);
        return res.status(400).send(e.message);
    }
};

export const getCategoriesHandler = async (req: Request, res: Response) => {
    try {
        const category = await getCategories(
            res.locals.user.organization_id as string
        );
        return res.status(200).send(category);
    } catch (e: any) {
        logger.error(e.message);
        return res.status(400).send(e.message);
    }
};

export const getCategoryHandler = async (
    req: Request<{ id: string }, {}, {}>,
    res: Response
) => {
    try {
        const category = await getCategory(req.params.id);
        if (!category) {
            return res.status(404).send('category not found');
        }
        return res.status(200).send(category);
    } catch (e: any) {
        logger.error(e.message);
        return res.status(400).send(e.message);
    }
};

export const deleteCategoryHandler = async (
    req: Request<{ id: string }, {}, {}>,
    res: Response
) => {
    try {
        const category = await getCategory(req.params.id);
        if (!category) {
            return res.status(404).send('category not found');
        }
        await deleteCategory(req.params.id);
        return res.status(200).send('deleted successfully');
    } catch (e: any) {
        logger.error(e.message);
        return res.status(400).send(e.message);
    }
};

export const editCategoryHandler = async (
    req: Request<{ id: string }, {}, CategoryValidator['body']>,
    res: Response
) => {
    try {
        const category = await getCategory(req.params.id);
        if (!category) {
            return res.status(404).send('category not found');
        }
        const updatedCategory = await editCategory(req.params.id, req.body);
        return res.status(200).send(updatedCategory);
    } catch (e: any) {
        logger.error(e.message);
        return res.status(400).send(e.message);
    }
};
