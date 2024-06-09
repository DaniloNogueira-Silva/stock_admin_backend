import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
  companyId: { type: String, required: true },
  name: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});