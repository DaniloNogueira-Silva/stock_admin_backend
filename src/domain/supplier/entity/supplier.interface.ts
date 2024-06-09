import { Document } from 'mongoose';

export interface Supplier extends Document {
  readonly companyId: string;
  readonly name: string;
  readonly address: string;
  readonly contact: string;
  readonly created_at: Date;
}