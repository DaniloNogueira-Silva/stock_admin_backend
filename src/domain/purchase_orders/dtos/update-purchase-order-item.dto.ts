import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdatePurchaseOrderItemDto {

    @IsString()
    @IsOptional()
    companyId?: string;

    @IsString()
    @IsOptional()
    purchaseOrderId?: string;

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