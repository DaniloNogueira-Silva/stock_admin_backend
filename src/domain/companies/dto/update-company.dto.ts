import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateCompanyDto {
    @IsString()
    @IsOptional()
    name?: string;
    @IsString()
    @IsOptional()
    document?: string;
    @IsString()
    @IsOptional()
    image_url?: string;

    @IsString()
    @IsOptional()
    type?: string;

    @IsBoolean()
    @IsOptional()
    is_active?: boolean;
}
