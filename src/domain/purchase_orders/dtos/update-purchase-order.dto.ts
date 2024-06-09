import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdatePurchaseOrderDto {

    @IsString()
    @IsOptional()
    supplierId?: string;

    @IsString()
    @IsOptional()
    expect_delivery_date?: Date;

    @IsString()
    @IsOptional()
    status?: string;

    @IsNumber()
    @IsOptional()
    total?: number;
}