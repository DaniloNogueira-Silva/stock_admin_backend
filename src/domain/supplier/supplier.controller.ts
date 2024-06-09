import { Controller, Post, Body, Get, UseGuards, Param, Patch, Delete, Req } from '@nestjs/common';
import { CreateSupplierDto } from './dtos/create-supplier.dto';
import { SupplierService } from './service/supplier.service';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateSupplierDto } from './dtos/update-supplier.dto';
import { Request } from 'express';
import { payloadService } from '../decode';

@UseGuards(AuthGuard)
@Controller('suppliers')
export class SupplierController {
  constructor(
    private readonly supplierService: SupplierService,
    private readonly payloadService: payloadService
  ) { }

  @Post()
  async create(
    @Body() createSupplierDto: CreateSupplierDto,
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.supplierService.create({
      ...createSupplierDto,
      companyId: payload.companyId
    });
  }

  @Get()
  async getAll(
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.supplierService.findAll(payload.companyId);
  }

  @Get('/name/:name')
  async getByName(
    @Param('name') name: string,
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.supplierService.findByName(name, payload.companyId);
  }

  @Get(':id')
  async getById(
    @Param('id') id: string,
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.supplierService.findById(id, payload.companyId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
    @Req() req: Request) {
    const payload = await this.payloadService.decode(req);
    return this.supplierService.update(id, updateSupplierDto, payload.companyId);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.supplierService.delete(id, payload.companyId);
  }
}
