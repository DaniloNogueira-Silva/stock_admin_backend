import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateClientsDto {

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