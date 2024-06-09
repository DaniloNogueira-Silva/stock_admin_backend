import { Document } from 'mongoose';

export interface SalesOrder extends Document {
  readonly companyId: string;
  readonly clientId: string;
  readonly total: number;
  readonly created_at: Date;
}