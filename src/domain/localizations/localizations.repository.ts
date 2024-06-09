import { Injectable, Inject, UnprocessableEntityException, NotFoundException } from '@nestjs/common';
import { CreateLocalizationDto } from './dtos/create-localization.dto';
import { UpdateLocalizationDto } from './dtos/update-localization.dto';
import { localization } from './entity/localization.interface';
import mongoose from 'mongoose';

@Injectable()
export class LocalizationRepository {
  constructor(@Inject('LOCALIZATION_MODEL') private localizationModel) { }

  async create(createLocalizationDto: CreateLocalizationDto): Promise<localization> {
    const createdLocalization = new this.localizationModel(createLocalizationDto);
    return createdLocalization.save();
  }

  async findAll(companyId: string): Promise<localization[]> {
    return this.localizationModel.find({
      companyId: companyId
    }).exec();
  }

  async findByAddress(address: string, companyId: string): Promise<localization> {
    const localizations = await this.localizationModel.find({
      address: address,
      companyId: companyId
    }).exec();

    return localizations[0];
  }


  async update(id: string, updatedLocalizationDto: UpdateLocalizationDto, companyId: string): Promise<localization> {

    const foundLocalization = await this.localizationModel.findOne({ _id: id, companyId: companyId }).exec();

    if (!foundLocalization) {
      throw new NotFoundException('Localization not found');
    }

    const updatedLocalization = await this.localizationModel.findByIdAndUpdate(id, updatedLocalizationDto, { new: true }).exec();

    if (!updatedLocalization) {
      throw new Error('Localization not found');
    }

    return updatedLocalization;
  }

  async delete(id: string, companyId: string): Promise<void> {
    const foundLocalization = await this.localizationModel.findOne({ _id: id, companyId: companyId }).exec();

    if (!foundLocalization) {
      throw new NotFoundException('Localization not found');
    }

    const result = await this.localizationModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new Error('Localization not found');
    }
  }

  async findById(id: string, companyId: string): Promise<localization> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new UnprocessableEntityException('Invalid id');
    }
    const objectId = new mongoose.Types.ObjectId(id);
    const foundedLocalization = await this.localizationModel.findOne({ _id: objectId, companyId: companyId }).exec();
    return foundedLocalization;
  }
}
