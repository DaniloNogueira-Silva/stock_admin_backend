import { Controller, Post, Body, Get, UseGuards, Param, Patch, Delete, Req } from '@nestjs/common';
import { CreateSalesOrderDto } from './dtos/create-sales-order.dto';
import { SalesOrderService } from './service/sales-order.service';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateSalesOrderDto } from './dtos/update-sales-order.dto';
import { Request } from 'express';
import { payloadService } from '../decode';
import { UpdateSalesOrderItemDto } from './dtos/update-sales-order-item.dto';

@UseGuards(AuthGuard)
@Controller('sales-order')
export class SalesOrderController {
  constructor(
    private readonly salesorderService: SalesOrderService,
    private readonly payloadService: payloadService
  ) { }

  @Post()
  async create(
    @Body() createSalesOrderDto: CreateSalesOrderDto,
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.salesorderService.create({
      ...createSalesOrderDto,
      companyId: payload.companyId
    });
  }

  @Get()
  async getAll(
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.salesorderService.findAll(payload.companyId);
  }

  @Get(':id')
  async getById(
    @Param('id') id: string,
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.salesorderService.findById(id, payload.companyId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSalesOrderDto: UpdateSalesOrderDto,
    @Req() req: Request) {
    const payload = await this.payloadService.decode(req);
    return this.salesorderService.update(id, updateSalesOrderDto, payload.companyId);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.salesorderService.delete(id, payload.companyId);
  }

  // Controllers dos items

  @Get('/items/all/:id')
  async getAllItems(
    @Req() req: Request,
    @Param('id') id: string
  ) {
    const payload = await this.payloadService.decode(req);
    return this.salesorderService.findAllItems(id, payload.companyId);
  }

  @Get('/items/:id')
  async getItemsById(
    @Param('id') id: string,
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.salesorderService.findItemById(id, payload.companyId);
  }

  @Patch('/items/:id')
  async updateItems(
    @Param('id') id: string,
    @Body() updateSalesOrderItemDto: UpdateSalesOrderItemDto,
    @Req() req: Request) {
    const payload = await this.payloadService.decode(req);
    return this.salesorderService.updateItem(id, updateSalesOrderItemDto, payload.companyId);
  }

  @Delete('/items/:id')
  async deleteItems(
    @Param('id') id: string,
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.salesorderService.deleteItem(id, payload.companyId);
  }
}
