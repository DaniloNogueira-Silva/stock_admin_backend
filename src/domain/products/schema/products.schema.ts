import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  companyId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  code: { type: String, required: false },
  categoryId: { type: String, required: true },
  localizationId: { type: String, required: false },
  created_at: { type: Date, default: Date.now },
});