import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePurchaseOrderItemDto {

    @IsString()
    @IsOptional()
    companyId: string;

    @IsString()
    @IsOptional()
    purchaseOrderId: string;

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