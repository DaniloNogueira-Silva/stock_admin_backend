import { Injectable, Inject, UnprocessableEntityException, NotFoundException } from '@nestjs/common';
import { CreatePurchaseOrderDto } from './dtos/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dtos/update-purchase-order.dto';
import { PurchaseOrder } from './entity/purchase-order.interface';
import mongoose from 'mongoose';
import { CreatePurchaseOrderItemDto } from './dtos/create-purchase-order-item.dto';
import { PurchaseOrderItem } from './entity/purchase-order-item.interface';
import { UpdatePurchaseOrderItemDto } from './dtos/update-purchase-order-item.dto';

@Injectable()
export class PurchaseOrderRepository {
  constructor(
    @Inject('PURCHASE_ORDER_MODEL') private purchaseOrderModel,
    @Inject('PURCHASE_ORDER_ITEM_MODEL') private purchaseOrderItemModel,
    @Inject('PRODUCT_MODEL') private productModel,

  ) { }

  async create(createPurchaseOrderDto: CreatePurchaseOrderDto): Promise<PurchaseOrder> {

    const createdPurchaseOrder = new this.purchaseOrderModel({
      ...createPurchaseOrderDto,
      status: 'Em aberto'
    });
    return createdPurchaseOrder.save();
  }

  async findAll(companyId: string): Promise<PurchaseOrder[]> {
    return this.purchaseOrderModel.find({
      companyId: companyId
    }).exec();
  }

  async update(id: string, updatedPurchaseOrderDto: UpdatePurchaseOrderDto, companyId: string): Promise<PurchaseOrder> {

    const foundPurchaseOrder = await this.purchaseOrderModel.findOne({ _id: id, companyId: companyId }).exec();

    if (!foundPurchaseOrder || foundPurchaseOrder.status === 'Finalizado') {
      throw new NotFoundException('PurchaseOrder not found');
    }

    const updatedPurchaseOrder = await this.purchaseOrderModel.findByIdAndUpdate(id, updatedPurchaseOrderDto, { new: true }).exec();

    if (!updatedPurchaseOrder) {
      throw new Error('PurchaseOrder not found');
    }

    return updatedPurchaseOrder;
  }

  async delete(id: string, companyId: string): Promise<void> {
    const foundPurchaseOrder = await this.purchaseOrderModel.findOne({ _id: id, companyId: companyId }).exec();

    if (!foundPurchaseOrder) {
      throw new NotFoundException('PurchaseOrder not found');
    }

    await this.purchaseOrderItemModel.deleteMany({ purchaseOrderId: id, companyId: companyId }).exec();
    const result = await this.purchaseOrderModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new Error('PurchaseOrder not found');
    }
  }

  async findById(id: string, companyId: string): Promise<PurchaseOrder> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new UnprocessableEntityException('Invalid id');
    }
    const objectId = new mongoose.Types.ObjectId(id);
    const foundedPurchaseOrder = await this.purchaseOrderModel.findOne({ _id: objectId, companyId: companyId }).exec();
    return foundedPurchaseOrder;
  }


  // Repositórios de itens de pedidos

  async createItems(createPurchaseOrderItemDto: CreatePurchaseOrderItemDto): Promise<PurchaseOrderItem> {
    const foundOrder = await this.findById(createPurchaseOrderItemDto.purchaseOrderId, createPurchaseOrderItemDto.companyId);

    if (!foundOrder) {
      throw new NotFoundException('Order not found');
    }

    const foundProduct = await this.productModel.findOne({ _id: createPurchaseOrderItemDto.productId, companyId: createPurchaseOrderItemDto.companyId }).exec();

    if (!foundProduct) {
      throw new NotFoundException('Product not found');
    }

    const createdPurchaseOrderItem = await this.purchaseOrderItemModel({
      ...createPurchaseOrderItemDto,
      total: foundProduct.price * createPurchaseOrderItemDto.quantity
    });
    return createdPurchaseOrderItem.save();
  }

  async findAllItems(companyId: string, purchaseOrderId: string): Promise<PurchaseOrderItem[]> {
    return this.purchaseOrderItemModel.find({
      companyId: companyId,
      purchaseOrderId: purchaseOrderId
    }).exec();
  }

  async findItemById(id: string, companyId: string): Promise<PurchaseOrderItem> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new UnprocessableEntityException('Invalid id');
    }
    const objectId = new mongoose.Types.ObjectId(id);
    const foundedPurchaseOrder = await this.purchaseOrderItemModel.findOne({ _id: objectId, companyId: companyId }).exec();
    return foundedPurchaseOrder;
  }

  async updateItem(id: string, updatePurchaseOrderItemDto: UpdatePurchaseOrderItemDto, companyId: string): Promise<PurchaseOrderItem> {

    const purchaseOrderItemModel = await this.purchaseOrderItemModel.findOne({ _id: id, companyId: companyId }).exec();
    const foundPurchaseOrder = await this.findById(updatePurchaseOrderItemDto.purchaseOrderId, updatePurchaseOrderItemDto.companyId);

    if (!foundPurchaseOrder || foundPurchaseOrder.status === 'Finalizado') {
      throw new NotFoundException('PurchaseOrder not found');
    }

    if (!purchaseOrderItemModel) {
      throw new NotFoundException('purchaseOrderItemModel not found');
    }

    const updatedPurchaseOrder = await this.purchaseOrderItemModel.findByIdAndUpdate(id, updatePurchaseOrderItemDto, { new: true }).exec();

    if (!updatedPurchaseOrder) {
      throw new Error('PurchaseOrder not found');
    }

    return updatedPurchaseOrder;
  }

  async deleteItem(id: string, companyId: string): Promise<void> {
    const foundPurchaseOrder = await this.purchaseOrderItemModel.findOne({ _id: id, companyId: companyId }).exec();

    if (!foundPurchaseOrder) {
      throw new NotFoundException('PurchaseOrder not found');
    }

    const result = await this.purchaseOrderItemModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new Error('PurchaseOrder not found');
    }
  }
}
