import { Injectable, Inject, UnprocessableEntityException, NotFoundException } from '@nestjs/common';
import { CreateSalesOrderDto } from './dtos/create-sales-order.dto';
import { UpdateSalesOrderDto } from './dtos/update-sales-order.dto';
import { SalesOrder } from './entity/sales-order.interface';
import mongoose from 'mongoose';
import { CreateSalesOrderItemDto } from './dtos/create-sales-order-item.dto';
import { SalesOrderItem } from './entity/sales-order-item.interface';
import { UpdateSalesOrderItemDto } from './dtos/update-sales-order-item.dto';

@Injectable()
export class SalesOrderRepository {
  constructor(
    @Inject('SALES_ORDER_MODEL') private salesOrderModel,
    @Inject('SALES_ORDER_ITEM_MODEL') private salesOrderItemModel,
    @Inject('PRODUCT_MODEL') private productModel,

  ) { }

  async create(createSalesOrderDto: CreateSalesOrderDto): Promise<SalesOrder> {

    const createdSalesOrder = new this.salesOrderModel({
      ...createSalesOrderDto,
      status: 'Em aberto'
    });
    return createdSalesOrder.save();
  }

  async findAll(companyId: string): Promise<SalesOrder[]> {
    return this.salesOrderModel.find({
      companyId: companyId
    }).exec();
  }

  async update(id: string, updatedSalesOrderDto: UpdateSalesOrderDto, companyId: string): Promise<SalesOrder> {

    const foundSalesOrder = await this.salesOrderModel.findOne({ _id: id, companyId: companyId }).exec();

    if (!foundSalesOrder) {
      throw new NotFoundException('SalesOrder not found');
    }

    const updatedSalesOrder = await this.salesOrderModel.findByIdAndUpdate(id, updatedSalesOrderDto, { new: true }).exec();

    if (!updatedSalesOrder) {
      throw new Error('SalesOrder not found');
    }

    return updatedSalesOrder;
  }

  async delete(id: string, companyId: string): Promise<void> {
    const foundSalesOrder = await this.salesOrderModel.findOne({ _id: id, companyId: companyId }).exec();

    if (!foundSalesOrder) {
      throw new NotFoundException('SalesOrder not found');
    }

    await this.salesOrderItemModel.deleteMany({ salesOrderId: id, companyId: companyId }).exec();
    const result = await this.salesOrderModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new Error('SalesOrder not found');
    }
  }

  async findById(id: string, companyId: string): Promise<SalesOrder> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new UnprocessableEntityException('Invalid id');
    }
    const objectId = new mongoose.Types.ObjectId(id);
    const foundedSalesOrder = await this.salesOrderModel.findOne({ _id: objectId, companyId: companyId }).exec();
    return foundedSalesOrder;
  }


  // Repositórios de itens de pedidos

  async createItems(createSalesOrderItemDto: CreateSalesOrderItemDto): Promise<SalesOrderItem> {
    const foundOrder = await this.findById(createSalesOrderItemDto.salesOrderId, createSalesOrderItemDto.companyId);

    if (!foundOrder) {
      throw new NotFoundException('Order not found');
    }

    const foundProduct = await this.productModel.findOne({ _id: createSalesOrderItemDto.productId, companyId: createSalesOrderItemDto.companyId }).exec();

    if (!foundProduct) {
      throw new NotFoundException('Product not found');
    }

    const newQuantity = foundProduct.quantity - createSalesOrderItemDto.quantity;

    if(newQuantity < 0) {
      throw new NotFoundException('Quantity invalid');
    }
    await this.productModel.findByIdAndUpdate(
      foundProduct._id,
      { quantity: newQuantity }
    );

    const createdSalesOrderItem = await this.salesOrderItemModel({
      ...createSalesOrderItemDto,
      total: foundProduct.price * createSalesOrderItemDto.quantity
    });
    return createdSalesOrderItem.save();
  }

  async findAllItems(companyId: string, salesOrderId: string): Promise<SalesOrderItem[]> {
    return this.salesOrderItemModel.find({
      companyId: companyId,
      salesOrderId: salesOrderId
    }).exec();
  }

  async findItemById(id: string, companyId: string): Promise<SalesOrderItem> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new UnprocessableEntityException('Invalid id');
    }
    const objectId = new mongoose.Types.ObjectId(id);
    const foundedSalesOrder = await this.salesOrderItemModel.findOne({ _id: objectId, companyId: companyId }).exec();
    return foundedSalesOrder;
  }

  async updateItem(id: string, updateSalesOrderItemDto: UpdateSalesOrderItemDto, companyId: string): Promise<SalesOrderItem> {

    const salesOrderItemModel = await this.salesOrderItemModel.findOne({ _id: id, companyId: companyId }).exec();
    const foundSalesOrder = await this.findById(updateSalesOrderItemDto.salesOrderId, updateSalesOrderItemDto.companyId);

    if (!foundSalesOrder ) {
      throw new NotFoundException('SalesOrder not found');
    }

    if (!salesOrderItemModel) {
      throw new NotFoundException('salesOrderItemModel not found');
    }

    const updatedSalesOrder = await this.salesOrderItemModel.findByIdAndUpdate(id, updateSalesOrderItemDto, { new: true }).exec();

    if (!updatedSalesOrder) {
      throw new Error('SalesOrder not found');
    }

    return updatedSalesOrder;
  }

  async deleteItem(id: string, companyId: string): Promise<void> {
    const foundSalesOrder = await this.salesOrderItemModel.findOne({ _id: id, companyId: companyId }).exec();

    if (!foundSalesOrder) {
      throw new NotFoundException('SalesOrder not found');
    }

    const result = await this.salesOrderItemModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new Error('SalesOrder not found');
    }
  }
}
