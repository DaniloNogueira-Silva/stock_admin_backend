import { Document } from 'mongoose';

export interface PurchaseOrderItem extends Document {
  readonly companyId: string;
  readonly purchaseOrderId: string;
  readonly productId: string;
  readonly quantity: number;
  readonly total: number;

  readonly created_at: Date;
}