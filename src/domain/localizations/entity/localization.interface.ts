import { Document } from 'mongoose';

export interface localization extends Document {
  readonly companyId: string;
  readonly address: string;
  readonly created_at: Date;
}