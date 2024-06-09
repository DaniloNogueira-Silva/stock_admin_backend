import { Injectable, Logger, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { LocalizationRepository } from '../localizations.repository';
import { CreateLocalizationDto } from '../dtos/create-localization.dto';
import * as dotenv from 'dotenv';
import { UpdateLocalizationDto } from '../dtos/update-localization.dto';
import { localization } from '../entity/localization.interface';

dotenv.config();

@Injectable()
export class LocalizationService {
  private readonly logger = new Logger(LocalizationService.name);

  constructor(private readonly localizationRepository: LocalizationRepository) { }

  async create(createLocalizationDto: CreateLocalizationDto): Promise<localization> {
    try {
      const address = createLocalizationDto.address ? await this.localizationRepository.findByAddress(createLocalizationDto.address, createLocalizationDto.companyId) : null;

      if (address) {
        throw new Error('Localization already exists with this address');
      }

      const createdLocalization = await this.localizationRepository.create({ ...createLocalizationDto });

      return createdLocalization;
    } catch (error) {
      this.logger.error(`Error creating Localization: ${error.message}`, error.stack);
      throw new UnprocessableEntityException('Erro ao cadastrar o produto', error.message);
    }
  }

  async findAll(companyId: string): Promise<localization[]> {
    try {
      const foundLocalizations = await this.localizationRepository.findAll(companyId);
      return foundLocalizations;
    } catch (error) {
      this.logger.error(`Error finding all Localizations: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao buscar os produtos', error.message);
    }
  }

  async findByAddress(address: string, companyId: string): Promise<localization> {
    try {
      const foundLocalization = await this.localizationRepository.findByAddress(address, companyId);
      return foundLocalization;
    } catch (error) {
      this.logger.error(`Error finding Localization: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao buscar o produto', error.message);
    }
  }

  async findById(id: string, companyId: string): Promise<localization> {
    try {
      const foundLocalization = await this.localizationRepository.findById(id, companyId);
      return foundLocalization;
    } catch (error) {
      this.logger.error(`Error finding Localization: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao buscar o produto', error.message);
    }
  }

  async update(id: string, updateLocalizationDto: UpdateLocalizationDto, companyId: string): Promise<localization> {
    try {

      const address = updateLocalizationDto.address ? await this.localizationRepository.findByAddress(updateLocalizationDto.address, companyId) : null;

      if (address) {
        throw new Error('Localization already exists with this address');
      }

      const updatedLocalization = await this.localizationRepository.update(id, updateLocalizationDto, companyId);
      return updatedLocalization;
    } catch (error) {
      this.logger.error(`Error updating Localization: ${error.message}`, error.stack);
      throw new UnprocessableEntityException('Erro ao atualizar o produto', error.message);
    }
  }

  async delete(id: string, companyId: string): Promise<void> {
    try {
      await this.localizationRepository.delete(id, companyId);
      return;
    } catch (error) {
      this.logger.error(`Error deleting Localization: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao remover o produto', error.message);
    }
  }
};
