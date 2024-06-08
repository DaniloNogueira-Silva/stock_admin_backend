import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Types } from "../enum/types.enum";

export class CreateCompanyDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    document: string;

    @IsString()
    @IsOptional()
    image_url?: string;

    @IsString()
    @IsNotEmpty()
    type: Types;

    @IsBoolean()
    @IsNotEmpty()
    is_active: boolean;
}
