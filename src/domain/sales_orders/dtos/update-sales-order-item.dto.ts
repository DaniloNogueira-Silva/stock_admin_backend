import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateSalesOrderItemDto {

    @IsString()
    @IsOptional()
    companyId?: string;

    @IsString()
    @IsOptional()
    salesOrderId?: string;

    @IsString()
    @IsOptional()
    productId?: Date;

    @IsNumber()
    @IsOptional()
    quantity?: string;

    @IsNumber()
    @IsOptional()
    total?: number;
}