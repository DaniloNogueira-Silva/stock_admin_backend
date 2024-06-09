import * as mongoose from 'mongoose';

export const SupplierSchema = new mongoose.Schema({
  companyId: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: false },
  contact: { type: String, required: false },
  created_at: { type: Date, default: Date.now },
});