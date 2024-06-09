import * as mongoose from 'mongoose';

export const PurchaseOrderSchema = new mongoose.Schema({
  companyId: { type: String, required: true },
  supplierId: { type: String, required: true },
  total: { type: Number, required: false },
  status: { type: String, required: true },
  expect_delivery_date: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
});