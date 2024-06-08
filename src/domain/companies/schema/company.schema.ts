import * as mongoose from 'mongoose';

export const CompanySchema = new mongoose.Schema({
    name: { type: String, required: true },
    document: { type: String, required: true },
    image_url: { type: String, required: false },
    is_active: { type: Boolean, required: true },
    type: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
})