import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {

    @IsString()
    @IsOptional()
    companyId: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}