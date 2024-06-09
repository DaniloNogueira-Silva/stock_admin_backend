import { Injectable, Logger, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { ProductRepository } from '../products.repository';
import { CreateProductDto } from '../dtos/create-product.dto';
import * as dotenv from 'dotenv';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { Product } from '../entity/procuct.interface';

dotenv.config();

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(private readonly productRepository: ProductRepository) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const name = createProductDto.name ? await this.productRepository.findByName(createProductDto.name, createProductDto.companyId) : null;
      const code = createProductDto.code ? await this.productRepository.findByName(createProductDto.code, createProductDto.companyId) : null;

      if (name || code) {
        throw new Error('Product already exists with this name or code');
      }

      const createdProduct = await this.productRepository.create({ ...createProductDto });

      return createdProduct;
    } catch (error) {
      this.logger.error(`Error creating Product: ${error.message}`, error.stack);
      throw new UnprocessableEntityException('Erro ao cadastrar o produto', error.message);
    }
  }

  async findAll(companyId: string): Promise<Product[]> {
    try {
      const foundProducts = await this.productRepository.findAll(companyId);
      return foundProducts;
    } catch (error) {
      this.logger.error(`Error finding all Products: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao buscar os produtos', error.message);
    }
  }

  async findByCode(code: string, companyId: string): Promise<Product> {
    try {
      const foundProduct = await this.productRepository.findByCode(code, companyId);
      return foundProduct;
    } catch (error) {
      this.logger.error(`Error finding Product: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao buscar o produto', error.message);
    }
  }

  async findByName(name: string, companyId: string): Promise<Product> {
    try {
      const foundProduct = await this.productRepository.findByName(name, companyId);
      return foundProduct;
    } catch (error) {
      this.logger.error(`Error finding Product: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao buscar o produto', error.message);
    }
  }

  async findById(id: string, companyId: string): Promise<Product> {
    try {
      const foundProduct = await this.productRepository.findById(id, companyId);
      return foundProduct;
    } catch (error) {
      this.logger.error(`Error finding Product: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao buscar o produto', error.message);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto, companyId: string): Promise<Product> {
    try {

      const name = updateProductDto.name ? await this.productRepository.findByName(updateProductDto.name, companyId) : null;
      const code = updateProductDto.code ? await this.productRepository.findByName(updateProductDto.code, companyId) : null;

      if (name || code) {
        throw new Error('Product already exists with this name or code');
      }

      const updatedProduct = await this.productRepository.update(id, updateProductDto, companyId);
      return updatedProduct;
    } catch (error) {
      this.logger.error(`Error updating Product: ${error.message}`, error.stack);
      throw new UnprocessableEntityException('Erro ao atualizar o produto', error.message);
    }
  }

  async delete(id: string, companyId: string): Promise<void> {
    try {
      await this.productRepository.delete(id, companyId);
      return;
    } catch (error) {
      this.logger.error(`Error deleting Product: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao remover o produto', error.message);
    }
  }
};
