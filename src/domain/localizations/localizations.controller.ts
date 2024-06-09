import { Controller, Post, Body, Get, UseGuards, Param, Patch, Delete, Req } from '@nestjs/common';
import { CreateLocalizationDto } from './dtos/create-localization.dto';
import { LocalizationService } from './service/localizations.service';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateLocalizationDto } from './dtos/update-localization.dto';
import { Request } from 'express';
import { payloadService } from '../decode';

@UseGuards(AuthGuard)
@Controller('localizations')
export class LocalizationController {
  constructor(
    private readonly localizationService: LocalizationService,
    private readonly payloadService: payloadService
  ) { }

  @Post()
  async create(
    @Body() createLocalizationDto: CreateLocalizationDto,
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.localizationService.create({
      ...createLocalizationDto,
      companyId:payload.companyId
    });
  }

  @Get()
  async getAll(
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.localizationService.findAll(payload.companyId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLocalizationDto: UpdateLocalizationDto,
    @Req() req: Request) {
    const payload = await this.payloadService.decode(req);
    return this.localizationService.update(id, updateLocalizationDto, payload.companyId);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Req() req: Request
  ) {
    const payload = await this.payloadService.decode(req);
    return this.localizationService.delete(id, payload.companyId);
  }
}
