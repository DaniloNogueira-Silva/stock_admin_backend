import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateLocalizationDto {

    @IsString()
    @IsOptional()
    companyId: string;

    @IsString()
    @IsNotEmpty()
    address: string;
}