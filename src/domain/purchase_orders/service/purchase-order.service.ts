import { Injectable, Logger, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { PurchaseOrderRepository } from '../purchase-order.repository';
import { CreatePurchaseOrderDto } from '../dtos/create-purchase-order.dto';
import * as dotenv from 'dotenv';
import { UpdatePurchaseOrderDto } from '../dtos/update-purchase-order.dto';
import { PurchaseOrder } from '../entity/purchase-order.interface';
import { PurchaseOrderItem } from '../entity/purchase-order-item.interface';
import { UpdatePurchaseOrderItemDto } from '../dtos/update-purchase-order-item.dto';

dotenv.config();

@Injectable()
export class PurchaseOrderService {
  private readonly logger = new Logger(PurchaseOrderService.name);

  constructor(
    private readonly purchaseOrderRepository: PurchaseOrderRepository
  ) { }

  async create(createPurchaseOrderDto: CreatePurchaseOrderDto): Promise<PurchaseOrder> {
    try {
      // cria pedido
      const createdPurchaseOrder = await this.purchaseOrderRepository.create({ ...createPurchaseOrderDto });
      await createdPurchaseOrder.save();
      let totalSum = 0;

      // cria items do pedido
      const itemsPromises = createPurchaseOrderDto.items.map(async item => {
        const createdPurchaseOrderItem = await this.purchaseOrderRepository.createItems({
          ...item,
          companyId: createdPurchaseOrder.companyId,
          purchaseOrderId: createdPurchaseOrder._id as string
        });

        if(!createdPurchaseOrderItem){
          await this.delete(createdPurchaseOrder._id as string, createdPurchaseOrder.companyId);
          throw new NotFoundException('Items not created');
        }

        totalSum += createdPurchaseOrderItem.total;
      }
      );
      await Promise.all(itemsPromises);

      //atualiza o pedido com o total
      const updated = await this.purchaseOrderRepository.update(
        createdPurchaseOrder._id as string,
        { total: totalSum },
        createdPurchaseOrder.companyId
      );

      if (!updated) {
        await this.delete(createdPurchaseOrder._id as string, createdPurchaseOrder.companyId);
        throw new NotFoundException('PurchaseOrder not found');
      }
      return updated;
    } catch (error) {
      this.logger.error(`Error creating PurchaseOrder: ${error.message}`, error.stack);
      throw new UnprocessableEntityException('Erro ao cadastrar o pedido', error.message);
    }
  }


  async findAll(companyId: string): Promise<PurchaseOrder[]> {
    try {
      const foundPurchaseOrders = await this.purchaseOrderRepository.findAll(companyId);
      return foundPurchaseOrders;
    } catch (error) {
      this.logger.error(`Error finding all PurchaseOrders: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao buscar os pedidos', error.message);
    }
  }

  async findById(id: string, companyId: string): Promise<PurchaseOrder> {
    try {
      const foundPurchaseOrder = await this.purchaseOrderRepository.findById(id, companyId);
      return foundPurchaseOrder;
    } catch (error) {
      this.logger.error(`Error finding PurchaseOrder: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao buscar o pedido', error.message);
    }
  }

  async update(id: string, updatePurchaseOrderDto: UpdatePurchaseOrderDto, companyId: string): Promise<PurchaseOrder> {
    try {
      const updatedPurchaseOrder = await this.purchaseOrderRepository.update(id, updatePurchaseOrderDto, companyId);
      return updatedPurchaseOrder;
    } catch (error) {
      this.logger.error(`Error updating PurchaseOrder: ${error.message}`, error.stack);
      throw new UnprocessableEntityException('Erro ao atualizar o pedido', error.message);
    }
  }

  async delete(id: string, companyId: string): Promise<void> {
    try {
      await this.purchaseOrderRepository.delete(id, companyId);
      return;
    } catch (error) {
      this.logger.error(`Error deleting PurchaseOrder: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao remover o pedido', error.message);
    }
  }

  // Serviços de itens de pedidos

  async findAllItems(companyId: string, purchaseOrderId: string): Promise<PurchaseOrderItem[]> {
    try {
      const foundPurchaseOrders = await this.purchaseOrderRepository.findAllItems(purchaseOrderId, companyId);
      return foundPurchaseOrders;
    } catch (error) {
      this.logger.error(`Error finding all PurchaseOrders: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao buscar os pedidos', error.message);
    }
  }

  async findItemById(id: string, companyId: string): Promise<PurchaseOrderItem> {
    try {
      const foundPurchaseItemOrder = await this.purchaseOrderRepository.findItemById(id, companyId);
      return foundPurchaseItemOrder;
    } catch (error) {
      this.logger.error(`Error finding foundPurchaseItemOrder: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao buscar o item do pedido', error.message);
    }
  }

  async updateItem(id: string, updatePurchaseOrderItemDto: UpdatePurchaseOrderItemDto, companyId: string): Promise<PurchaseOrderItem> {
    try {
      const updatedPurchaseOrder = await this.purchaseOrderRepository.updateItem(id, updatePurchaseOrderItemDto, companyId);
      return updatedPurchaseOrder;
    } catch (error) {
      this.logger.error(`Error updating PurchaseOrder: ${error.message}`, error.stack);
      throw new UnprocessableEntityException('Erro ao atualizar o item do pedido', error.message);
    }
  }

  async deleteItem(id: string, companyId: string): Promise<void> {
    try {
      await this.purchaseOrderRepository.deleteItem(id, companyId);
      return;
    } catch (error) {
      this.logger.error(`Error deleting PurchaseOrder: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao remover o item do pedido', error.message);
    }
  }
};
