import { Controller, Post, Body, Get, UseGuards, Param, Patch, Delete, Req } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductService } from './service/products.service';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Request } from 'express';
import { payloadService } from '../decode';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly payloadService: payloadService
  ) { }

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.productService.create({
      ...createProductDto,
      companyId: payload.companyId
    });
  }

  @Get()
  async getAll(
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.productService.findAll(payload.companyId);
  }

  @Get('/name/:name')
  async getByName(
    @Param('name') name: string,
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.productService.findByName(name, payload.companyId);
  }

  @Get('/code/:code')
  async getByCode(
    @Param('code') code: string,
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.productService.findByCode(code, payload.companyId);
  }

  @Get(':id')
  async getById(
    @Param('id') id: string,
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.productService.findById(id, payload.companyId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Req() req: Request) {
    const payload = await this.payloadService.decode(req);
    return this.productService.update(id, updateProductDto, payload.companyId);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.productService.delete(id, payload.companyId);
  }
}
