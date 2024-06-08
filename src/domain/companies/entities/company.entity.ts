import { Document } from "mongoose";

export class Company extends Document {
    readonly name: string;
    readonly document: string;
    readonly image_url: string;
    readonly type: string;
    readonly is_active: boolean;
    readonly created_at: Date
}
