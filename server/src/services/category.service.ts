import { CategoryValidator } from '../validators/category.validators';
import logger from '../utils/logger.utils';
import CategoryModel, { CategoryDocument } from '../models/category.model';

export const createCategory = async (
    input: CategoryValidator['body'],
    user_id: string,
    organization_id: string
): Promise<CategoryDocument> => {
    try {
        const category = await CategoryModel.create({
            ...input,
            user_id,
            organization_id
        });
        return category;
    } catch (e: any) {
        logger.error(e);
        throw new Error('Failed to create category, please try again later');
    }
};

export const getCategories = async (
    organization_id: string
): Promise<CategoryDocument[]> => {
    try {
        const categories = await CategoryModel.find({ organization_id });
        return categories;
    } catch (e: any) {
        logger.error(e);
        throw new Error('Failed to get categories, please try again later');
    }
};

export const getCategory = async (id: string): Promise<CategoryDocument> => {
    try {
        const category = await CategoryModel.findById(id);
        return category;
    } catch (e: any) {
        logger.error(e);
        throw new Error('Failed to get category, please try again later');
    }
};

export const deleteCategory = async (id: string) => {
    try {
        return await CategoryModel.findByIdAndDelete(id);
    } catch (e: any) {
        logger.error(e);
        throw new Error('Failed to delete category, please try again later');
    }
};

export const editCategory = async (
    id: string,
    input: CategoryValidator['body']
): Promise<CategoryDocument> => {
    try {
        const category = await CategoryModel.findByIdAndUpdate(id, input);
        return category;
    } catch (e: any) {
        logger.error(e);
        throw new Error('Failed to edit category, please try again later');
    }
};
