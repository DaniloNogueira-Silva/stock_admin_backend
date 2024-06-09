import { Controller, Post, Body, Get, UseGuards, Param, Patch, Delete, Req } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CategoryService } from './service/categories.service';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Request } from 'express';
import { payloadService } from '../decode';

@UseGuards(AuthGuard)
@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly payloadService: payloadService
  ) { }

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.categoryService.create({
      ...createCategoryDto,
      companyId: payload.companyId
    });
  }

  @Get()
  async getAll(
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.categoryService.findAll(payload.companyId);
  }

  @Get('/name/:name')
  async getByName(
    @Param('name') name: string,
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.categoryService.findByName(name, payload.companyId);
  }

  @Get(':id')
  async getById(
    @Param('id') id: string,
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.categoryService.findById(id, payload.companyId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Req() req: Request) {
    const payload = await this.payloadService.decode(req);
    return this.categoryService.update(id, updateCategoryDto, payload.companyId);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.categoryService.delete(id, payload.companyId);
  }
}
