import * as mongoose from 'mongoose';

export const PurchaseOrderItemSchema = new mongoose.Schema({
  companyId: { type: String, required: true },
  purchaseOrderId: { type: String, required: true },
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
});