import { Injectable, Logger, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { SupplierRepository } from '../supplier.repository';
import { CreateSupplierDto } from '../dtos/create-supplier.dto';
import * as dotenv from 'dotenv';
import { UpdateSupplierDto } from '../dtos/update-supplier.dto';
import { Supplier } from '../entity/supplier.interface';

dotenv.config();

@Injectable()
export class SupplierService {
  private readonly logger = new Logger(SupplierService.name);

  constructor(private readonly supplierRepository: SupplierRepository) { }

  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    try {
      const name = createSupplierDto.name ? await this.supplierRepository.findByName(createSupplierDto.name, createSupplierDto.companyId) : null;

      if (name) {
        throw new Error('Supplier already exists with this name');
      }

      const createdSupplier = await this.supplierRepository.create({ ...createSupplierDto });

      return createdSupplier;
    } catch (error) {
      this.logger.error(`Error creating Supplier: ${error.message}`, error.stack);
      throw new UnprocessableEntityException('Erro ao cadastrar o produto', error.message);
    }
  }

  async findAll(companyId: string): Promise<Supplier[]> {
    try {
      const foundSuppliers = await this.supplierRepository.findAll(companyId);
      return foundSuppliers;
    } catch (error) {
      this.logger.error(`Error finding all Suppliers: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao buscar os produtos', error.message);
    }
  }

  async findByName(name: string, companyId: string): Promise<Supplier> {
    try {
      const foundSupplier = await this.supplierRepository.findByName(name, companyId);
      return foundSupplier;
    } catch (error) {
      this.logger.error(`Error finding Supplier: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao buscar o produto', error.message);
    }
  }

  async findById(id: string, companyId: string): Promise<Supplier> {
    try {
      const foundSupplier = await this.supplierRepository.findById(id, companyId);
      return foundSupplier;
    } catch (error) {
      this.logger.error(`Error finding Supplier: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao buscar o produto', error.message);
    }
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto, companyId: string): Promise<Supplier> {
    try {

      const name = updateSupplierDto.name ? await this.supplierRepository.findByName(updateSupplierDto.name, companyId) : null;

      if (name) {
        throw new Error('Supplier already exists with this name');
      }

      const updatedSupplier = await this.supplierRepository.update(id, updateSupplierDto, companyId);
      return updatedSupplier;
    } catch (error) {
      this.logger.error(`Error updating Supplier: ${error.message}`, error.stack);
      throw new UnprocessableEntityException('Erro ao atualizar o produto', error.message);
    }
  }

  async delete(id: string, companyId: string): Promise<void> {
    try {
      await this.supplierRepository.delete(id, companyId);
      return;
    } catch (error) {
      this.logger.error(`Error deleting Supplier: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao remover o produto', error.message);
    }
  }
};
