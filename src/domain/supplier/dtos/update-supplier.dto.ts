import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateSupplierDto {

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    contact?: string;

    @IsString()
    @IsOptional()
    created_at?: string;
}