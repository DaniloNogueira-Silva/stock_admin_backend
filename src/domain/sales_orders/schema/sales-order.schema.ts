import * as mongoose from 'mongoose';

export const SalesOrderSchema = new mongoose.Schema({
  companyId: { type: String, required: true },
  clientId: { type: String, required: true },
  total: { type: Number, required: false },
  created_at: { type: Date, default: Date.now },
});