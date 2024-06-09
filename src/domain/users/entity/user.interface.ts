import { Document } from 'mongoose';

export interface User extends Document {
  readonly companyId: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
}