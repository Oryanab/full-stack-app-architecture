import { Document, Schema, model } from 'mongoose';
import { Call } from '../types';

export interface CallDocument extends Call, Document {
    createdAt: Date;
    updatedAt: Date;
    call_category: Schema.Types.ObjectId;
    organization_id: Schema.Types.ObjectId;
}

const callSchema = new Schema<CallDocument>(
    {
        caller_name: {
            type: String,
            required: true
        },
        caller_telephone: {
            type: String,
            required: true
        },
        call_desciption: {
            type: String,
            required: true
        },
        caller_voice_note: {
            type: String,
            required: false
        },
        call_category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
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

const CallModel = model<CallDocument>('Call', callSchema);

export default CallModel;
