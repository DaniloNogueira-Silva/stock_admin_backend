import * as mongoose from 'mongoose';

export const SalesOrderItemSchema = new mongoose.Schema({
  companyId: { type: String, required: true },
  salesOrderId: { type: String, required: true },
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
});