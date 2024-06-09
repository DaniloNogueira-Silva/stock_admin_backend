import { Document } from 'mongoose';

export interface Product extends Document {
  readonly companyId: string;
  readonly name: string;
  readonly description: string;
  readonly quantity: number;
  readonly price: number;
  readonly code: string;
  readonly categoryId: string;
  readonly localizationId: string;
  readonly image_url: string;
  readonly created_at: Date;
}