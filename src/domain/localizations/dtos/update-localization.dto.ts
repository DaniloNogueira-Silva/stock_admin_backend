import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateLocalizationDto {

    @IsString()
    @IsOptional()
    address?: string;
}