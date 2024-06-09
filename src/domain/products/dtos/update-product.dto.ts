import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductDto {

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsOptional()
    price?: string;

    @IsString()
    @IsOptional()
    categoryId?: string;

    @IsNumber()
    @IsOptional()
    quantity?: number

    @IsString()
    @IsOptional()
    code?: string;

    @IsString()
    @IsOptional()
    localizationId?: string;

    @IsString()
    @IsOptional()
    image_url?: string;
}