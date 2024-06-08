import { Controller, Post, Body, Get, UseGuards, Param, Patch, Delete, Query, Req } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './service/user.service';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Request } from 'express';
import { payloadService } from '../decode';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly payloadService: payloadService
  ) { }

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.userService.create({
      ...createUserDto,
      companyId: createUserDto.companyId || payload.companyId
    });
  }

  @Get()
  async getAll(
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.userService.findAll(payload.companyId);
  }

  @Get(':id')
  async getById(
    @Param('id') id: string,
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.userService.findById(id, payload.companyId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request) {
    const payload = await this.payloadService.decode(req);
    return this.userService.update(id, updateUserDto, payload.companyId);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.userService.delete(id, payload.companyId);
  }
}
