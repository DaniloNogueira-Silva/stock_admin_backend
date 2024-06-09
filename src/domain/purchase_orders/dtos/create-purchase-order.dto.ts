import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CreatePurchaseOrderItemDto } from "./create-purchase-order-item.dto";

export class CreatePurchaseOrderDto {

    @IsString()
    @IsOptional()
    companyId: string;

    @IsString()
    @IsNotEmpty()
    supplierId: string;

    @IsString()
    @IsNotEmpty()
    expect_delivery_date: Date;

    @IsString()
    @IsOptional()
    status: string;

    @IsNumber()
    @IsOptional()
    total: number;

    @IsNotEmpty()
    items: CreatePurchaseOrderItemDto[]
}