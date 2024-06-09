import { Injectable, Inject, UnprocessableEntityException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product } from './entity/procuct.interface';
import mongoose from 'mongoose';

@Injectable()
export class ProductRepository {
  constructor(@Inject('PRODUCT_MODEL') private productModel) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(companyId: string): Promise<Product[]> {
    return this.productModel.find({
      companyId: companyId
    }).exec();
  }

  async findByName(name: string, companyId: string): Promise<Product> {
    const products = await this.productModel.find({
      name: name,
      companyId: companyId
    }).exec();

    return products[0];
  }

  async findByCode(code: string, companyId: string): Promise<Product> {
    const products = await this.productModel.find({
      code: code,
      companyId: companyId
    }).exec();

    return products[0];
  }

  async update(id: string, updatedProductDto: UpdateProductDto, companyId: string): Promise<Product> {

    const foundProduct = await this.productModel.findOne({ companyId: companyId }).exec();

    if (!foundProduct) {
      throw new NotFoundException('Product not found');
    }

    const updatedProduct = await this.productModel.findByIdAndUpdate(id, updatedProductDto, { new: true }).exec();

    if (!updatedProduct) {
      throw new Error('Product not found');
    }

    return updatedProduct;
  }

  async delete(id: string, companyId: string): Promise<void> {
    const foundProduct = await this.productModel.findOne({ companyId: companyId }).exec();

    if (!foundProduct) {
      throw new NotFoundException('Product not found');
    }

    const result = await this.productModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new Error('Product not found');
    }
  }

  async findById(id: string, companyId: string): Promise<Product> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new UnprocessableEntityException('Invalid id');
    }
    const objectId = new mongoose.Types.ObjectId(id);
    const foundedProduct = await this.productModel.findOne({ _id: objectId, companyId: companyId }).exec();
    return foundedProduct;
  }
}
