import * as mongoose from 'mongoose';

export const LocalizationSchema = new mongoose.Schema({
  companyId: { type: String, required: true },
  address: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});