import { Controller, Post, Body, Get, UseGuards, Param, Patch, Delete, Req } from '@nestjs/common';
import { CreatePurchaseOrderDto } from './dtos/create-purchase-order.dto';
import { PurchaseOrderService } from './service/purchase-order.service';
import { AuthGuard } from '../auth/auth.guard';
import { UpdatePurchaseOrderDto } from './dtos/update-purchase-order.dto';
import { Request } from 'express';
import { payloadService } from '../decode';
import { UpdatePurchaseOrderItemDto } from './dtos/update-purchase-order-item.dto';

@UseGuards(AuthGuard)
@Controller('purchase-order')
export class PurchaseOrderController {
  constructor(
    private readonly purchaseorderService: PurchaseOrderService,
    private readonly payloadService: payloadService
  ) { }

  @Post()
  async create(
    @Body() createPurchaseOrderDto: CreatePurchaseOrderDto,
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.purchaseorderService.create({
      ...createPurchaseOrderDto,
      companyId: payload.companyId
    });
  }

  @Get()
  async getAll(
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.purchaseorderService.findAll(payload.companyId);
  }

  @Get(':id')
  async getById(
    @Param('id') id: string,
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.purchaseorderService.findById(id, payload.companyId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePurchaseOrderDto: UpdatePurchaseOrderDto,
    @Req() req: Request) {
    const payload = await this.payloadService.decode(req);
    return this.purchaseorderService.update(id, updatePurchaseOrderDto, payload.companyId);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.purchaseorderService.delete(id, payload.companyId);
  }

  // Controllers dos items

  @Get('/items/all/:id')
  async getAllItems(
    @Req() req: Request,
    @Param('id') id: string
  ) {
    const payload = await this.payloadService.decode(req);
    return this.purchaseorderService.findAllItems(id, payload.companyId);
  }

  @Get('/items/:id')
  async getItemsById(
    @Param('id') id: string,
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.purchaseorderService.findItemById(id, payload.companyId);
  }

  @Patch('/items/:id')
  async updateItems(
    @Param('id') id: string,
    @Body() updatePurchaseOrderItemDto: UpdatePurchaseOrderItemDto,
    @Req() req: Request) {
    const payload = await this.payloadService.decode(req);
    return this.purchaseorderService.updateItem(id, updatePurchaseOrderItemDto, payload.companyId);
  }

  @Delete('/items/:id')
  async deleteItems(
    @Param('id') id: string,
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.purchaseorderService.deleteItem(id, payload.companyId);
  }
}
