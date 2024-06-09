import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateClientsDto {

    @IsString()
    @IsOptional()
    companyId: string;

    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsString()
    @IsOptional()
    contact?: string;

    @IsString()
    @IsOptional()
    created_at?: string;
}