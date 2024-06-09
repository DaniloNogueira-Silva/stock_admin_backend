import { Document } from 'mongoose';

export interface PurchaseOrder extends Document {
  readonly companyId: string;
  readonly supplierId: string;
  readonly total: number;
  readonly status: string;
  readonly expect_delivery_date: Date;
  readonly created_at: Date;
}