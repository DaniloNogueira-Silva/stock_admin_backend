import { Document } from 'mongoose';

export interface Category extends Document {
  readonly companyId: string;
  readonly name: string;
  readonly created_at: Date;
}