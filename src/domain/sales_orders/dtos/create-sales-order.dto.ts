import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateSalesOrderItemDto } from "./create-sales-order-item.dto";

export class CreateSalesOrderDto {

    @IsString()
    @IsOptional()
    companyId: string;

    @IsString()
    @IsOptional()
    clientId: string;

    @IsNumber()
    @IsOptional()
    total: number;

    @IsNotEmpty()
    items: CreateSalesOrderItemDto[]
}