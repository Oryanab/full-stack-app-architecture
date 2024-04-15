import { Document, Schema, model } from 'mongoose';
import { Category } from '../types';

export interface CategoryDocument extends Category, Document {
    createdAt: Date;
    updatedAt: Date;
    user_id: Schema.Types.ObjectId;
    organization_id: Schema.Types.ObjectId;
}

const categorySchema = new Schema<CategoryDocument>(
    {
        category_name: {
            type: String,
            required: true,
            unique: true
        },
        category_description: {
            type: String,
            required: true
        },
        category_priority: {
            type: String,
            required: true
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        organization_id: {
            type: Schema.Types.ObjectId,
            ref: 'Organization',
            required: true
        }
    },
    { timestamps: true }
);

const CategoryModel = model<CategoryDocument>('Category', categorySchema);

export default CategoryModel;
