import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateSalesOrderDto {

    @IsString()
    @IsOptional()
    clientId?: string;

    @IsNumber()
    @IsOptional()
    total?: number;
}