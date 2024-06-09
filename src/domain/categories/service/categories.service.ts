import { Injectable, Logger, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CategoryRepository } from '../categories.repository';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import * as dotenv from 'dotenv';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { Category } from '../entity/category.interface';

dotenv.config();

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);

  constructor(private readonly categoryRepository: CategoryRepository) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const name = createCategoryDto.name ? await this.categoryRepository.findByName(createCategoryDto.name, createCategoryDto.companyId) : null;

      if (name) {
        throw new Error('Category already exists with this name');
      }

      const createdCategory = await this.categoryRepository.create({ ...createCategoryDto });

      return createdCategory;
    } catch (error) {
      this.logger.error(`Error creating Category: ${error.message}`, error.stack);
      throw new UnprocessableEntityException('Erro ao cadastrar o produto', error.message);
    }
  }

  async findAll(companyId: string): Promise<Category[]> {
    try {
      const foundCategorys = await this.categoryRepository.findAll(companyId);
      return foundCategorys;
    } catch (error) {
      this.logger.error(`Error finding all Categorys: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao buscar os produtos', error.message);
    }
  }

  async findByName(name: string, companyId: string): Promise<Category> {
    try {
      const foundCategory = await this.categoryRepository.findByName(name, companyId);
      return foundCategory;
    } catch (error) {
      this.logger.error(`Error finding Category: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao buscar o produto', error.message);
    }
  }

  async findById(id: string, companyId: string): Promise<Category> {
    try {
      const foundCategory = await this.categoryRepository.findById(id, companyId);
      return foundCategory;
    } catch (error) {
      this.logger.error(`Error finding Category: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao buscar o produto', error.message);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto, companyId: string): Promise<Category> {
    try {

      const name = updateCategoryDto.name ? await this.categoryRepository.findByName(updateCategoryDto.name, companyId) : null;

      if (name) {
        throw new Error('Category already exists with this name');
      }

      const updatedCategory = await this.categoryRepository.update(id, updateCategoryDto, companyId);
      return updatedCategory;
    } catch (error) {
      this.logger.error(`Error updating Category: ${error.message}`, error.stack);
      throw new UnprocessableEntityException('Erro ao atualizar o produto', error.message);
    }
  }

  async delete(id: string, companyId: string): Promise<void> {
    try {
      await this.categoryRepository.delete(id, companyId);
      return;
    } catch (error) {
      this.logger.error(`Error deleting Category: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao remover o produto', error.message);
    }
  }
};
