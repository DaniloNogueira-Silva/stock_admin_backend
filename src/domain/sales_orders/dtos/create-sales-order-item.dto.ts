import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSalesOrderItemDto {

    @IsString()
    @IsOptional()
    companyId: string;

    @IsString()
    @IsOptional()
    salesOrderId: string;

    @IsString()
    @IsNotEmpty()
    productId: Date;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsNumber()
    @IsOptional()
    total: number;
}