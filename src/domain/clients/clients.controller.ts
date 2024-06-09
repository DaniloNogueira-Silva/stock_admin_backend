import { Controller, Post, Body, Get, UseGuards, Param, Patch, Delete, Req } from '@nestjs/common';
import { CreateClientsDto } from './dtos/create-clients.dto';
import { ClientsService } from './service/clients.service';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateClientsDto } from './dtos/update-clients.dto';
import { Request } from 'express';
import { payloadService } from '../decode';

@UseGuards(AuthGuard)
@Controller('clients')
export class ClientsController {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly payloadService: payloadService
  ) { }

  @Post()
  async create(
    @Body() createClientsDto: CreateClientsDto,
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.clientsService.create({
      ...createClientsDto,
      companyId: payload.companyId
    });
  }

  @Get()
  async getAll(
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.clientsService.findAll(payload.companyId);
  }

  @Get('/name/:name')
  async getByName(
    @Param('name') name: string,
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.clientsService.findByName(name, payload.companyId);
  }

  @Get(':id')
  async getById(
    @Param('id') id: string,
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.clientsService.findById(id, payload.companyId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientsDto: UpdateClientsDto,
    @Req() req: Request) {
    const payload = await this.payloadService.decode(req);
    return this.clientsService.update(id, updateClientsDto, payload.companyId);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.clientsService.delete(id, payload.companyId);
  }
}
