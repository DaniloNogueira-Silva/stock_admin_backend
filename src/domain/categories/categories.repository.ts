import { Injectable, Inject, UnprocessableEntityException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Category } from './entity/category.interface';
import mongoose from 'mongoose';

@Injectable()
export class CategoryRepository {
  constructor(@Inject('CATEGORY_MODEL') private categoryModel) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  async findAll(companyId: string): Promise<Category[]> {
    return this.categoryModel.find({
      companyId: companyId
    }).exec();
  }

  async findByName(name: string, companyId: string): Promise<Category> {
    const categorys = await this.categoryModel.find({
      name: name,
      companyId: companyId
    }).exec();

    return categorys[0];
  }


  async update(id: string, updatedCategoryDto: UpdateCategoryDto, companyId: string): Promise<Category> {

    const foundCategory = await this.categoryModel.findOne({ companyId: companyId }).exec();

    if (!foundCategory) {
      throw new NotFoundException('Category not found');
    }

    const updatedCategory = await this.categoryModel.findByIdAndUpdate(id, updatedCategoryDto, { new: true }).exec();

    if (!updatedCategory) {
      throw new Error('Category not found');
    }

    return updatedCategory;
  }

  async delete(id: string, companyId: string): Promise<void> {
    const foundCategory = await this.categoryModel.findOne({ companyId: companyId }).exec();

    if (!foundCategory) {
      throw new NotFoundException('Category not found');
    }

    const result = await this.categoryModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new Error('Category not found');
    }
  }

  async findById(id: string, companyId: string): Promise<Category> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new UnprocessableEntityException('Invalid id');
    }
    const objectId = new mongoose.Types.ObjectId(id);
    const foundedCategory = await this.categoryModel.findOne({ _id: objectId, companyId: companyId }).exec();
    return foundedCategory;
  }
}
