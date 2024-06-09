import { Injectable, Inject, UnprocessableEntityException, NotFoundException } from '@nestjs/common';
import { CreateSupplierDto } from './dtos/create-supplier.dto';
import { UpdateSupplierDto } from './dtos/update-supplier.dto';
import { Supplier } from './entity/supplier.interface';
import mongoose from 'mongoose';

@Injectable()
export class SupplierRepository {
  constructor(@Inject('SUPPLIER_MODEL') private supplierModel) { }

  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    const createdSupplier = new this.supplierModel(createSupplierDto);
    return createdSupplier.save();
  }

  async findAll(companyId: string): Promise<Supplier[]> {
    return this.supplierModel.find({
      companyId: companyId
    }).exec();
  }

  async findByName(name: string, companyId: string): Promise<Supplier> {
    const suppliers = await this.supplierModel.find({
      name: name,
      companyId: companyId
    }).exec();

    return suppliers[0];
  }


  async update(id: string, updatedSupplierDto: UpdateSupplierDto, companyId: string): Promise<Supplier> {

    const foundSupplier = await this.supplierModel.findOne({ _id: id, companyId: companyId }).exec();

    if (!foundSupplier) {
      throw new NotFoundException('Supplier not found');
    }

    const updatedSupplier = await this.supplierModel.findByIdAndUpdate(id, updatedSupplierDto, { new: true }).exec();

    if (!updatedSupplier) {
      throw new Error('Supplier not found');
    }

    return updatedSupplier;
  }

  async delete(id: string, companyId: string): Promise<void> {
    const foundSupplier = await this.supplierModel.findOne({ _id: id, companyId: companyId }).exec();

    if (!foundSupplier) {
      throw new NotFoundException('Supplier not found');
    }

    const result = await this.supplierModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new Error('Supplier not found');
    }
  }

  async findById(id: string, companyId: string): Promise<Supplier> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new UnprocessableEntityException('Invalid id');
    }
    const objectId = new mongoose.Types.ObjectId(id);
    const foundedSupplier = await this.supplierModel.findOne({ _id: objectId, companyId: companyId }).exec();
    return foundedSupplier;
  }
}
