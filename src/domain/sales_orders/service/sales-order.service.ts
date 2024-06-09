import { Injectable, Logger, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { SalesOrderRepository } from '../sales-order.repository';
import { CreateSalesOrderDto } from '../dtos/create-sales-order.dto';
import * as dotenv from 'dotenv';
import { UpdateSalesOrderDto } from '../dtos/update-sales-order.dto';
import { SalesOrder } from '../entity/sales-order.interface';
import { SalesOrderItem } from '../entity/sales-order-item.interface';
import { UpdateSalesOrderItemDto } from '../dtos/update-sales-order-item.dto';

dotenv.config();

@Injectable()
export class SalesOrderService {
  private readonly logger = new Logger(SalesOrderService.name);

  constructor(
    private readonly salesOrderRepository: SalesOrderRepository
  ) { }

  async create(createSalesOrderDto: CreateSalesOrderDto): Promise<SalesOrder> {
    try {
      // cria pedido
      const createdSalesOrder = await this.salesOrderRepository.create({ ...createSalesOrderDto });
      await createdSalesOrder.save();
      let totalSum = 0;

      // cria items do pedido
      const itemsPromises = createSalesOrderDto.items.map(async item => {
        const createdSalesOrderItem = await this.salesOrderRepository.createItems({
          ...item,
          companyId: createdSalesOrder.companyId,
          salesOrderId: createdSalesOrder._id as string
        });

        if(!createdSalesOrderItem){
          await this.delete(createdSalesOrder._id as string, createdSalesOrder.companyId);
          throw new NotFoundException('Items not created');
        }

        totalSum += createdSalesOrderItem.total;
      }
      );
      await Promise.all(itemsPromises);

      //atualiza o pedido com o total
      const updated = await this.salesOrderRepository.update(
        createdSalesOrder._id as string,
        { total: totalSum },
        createdSalesOrder.companyId
      );

      if (!updated) {
        await this.delete(createdSalesOrder._id as string, createdSalesOrder.companyId);
        throw new NotFoundException('SalesOrder not found');
      }
      return updated;
    } catch (error) {
      this.logger.error(`Error creating SalesOrder: ${error.message}`, error.stack);
      throw new UnprocessableEntityException('Erro ao cadastrar o pedido', error.message);
    }
  }


  async findAll(companyId: string): Promise<SalesOrder[]> {
    try {
      const foundSalesOrders = await this.salesOrderRepository.findAll(companyId);
      return foundSalesOrders;
    } catch (error) {
      this.logger.error(`Error finding all SalesOrders: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao buscar os pedidos', error.message);
    }
  }

  async findById(id: string, companyId: string): Promise<SalesOrder> {
    try {
      const foundSalesOrder = await this.salesOrderRepository.findById(id, companyId);
      return foundSalesOrder;
    } catch (error) {
      this.logger.error(`Error finding SalesOrder: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao buscar o pedido', error.message);
    }
  }

  async update(id: string, updateSalesOrderDto: UpdateSalesOrderDto, companyId: string): Promise<SalesOrder> {
    try {
      const updatedSalesOrder = await this.salesOrderRepository.update(id, updateSalesOrderDto, companyId);
      return updatedSalesOrder;
    } catch (error) {
      this.logger.error(`Error updating SalesOrder: ${error.message}`, error.stack);
      throw new UnprocessableEntityException('Erro ao atualizar o pedido', error.message);
    }
  }

  async delete(id: string, companyId: string): Promise<void> {
    try {
      await this.salesOrderRepository.delete(id, companyId);
      return;
    } catch (error) {
      this.logger.error(`Error deleting SalesOrder: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao remover o pedido', error.message);
    }
  }

  // Serviços de itens de pedidos

  async findAllItems(companyId: string, salesOrderId: string): Promise<SalesOrderItem[]> {
    try {
      const foundSalesOrders = await this.salesOrderRepository.findAllItems(salesOrderId, companyId);
      return foundSalesOrders;
    } catch (error) {
      this.logger.error(`Error finding all SalesOrders: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao buscar os pedidos', error.message);
    }
  }

  async findItemById(id: string, companyId: string): Promise<SalesOrderItem> {
    try {
      const foundSalesItemOrder = await this.salesOrderRepository.findItemById(id, companyId);
      return foundSalesItemOrder;
    } catch (error) {
      this.logger.error(`Error finding foundSalesItemOrder: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao buscar o item do pedido', error.message);
    }
  }

  async updateItem(id: string, updateSalesOrderItemDto: UpdateSalesOrderItemDto, companyId: string): Promise<SalesOrderItem> {
    try {
      const updatedSalesOrder = await this.salesOrderRepository.updateItem(id, updateSalesOrderItemDto, companyId);
      return updatedSalesOrder;
    } catch (error) {
      this.logger.error(`Error updating SalesOrder: ${error.message}`, error.stack);
      throw new UnprocessableEntityException('Erro ao atualizar o item do pedido', error.message);
    }
  }

  async deleteItem(id: string, companyId: string): Promise<void> {
    try {
      await this.salesOrderRepository.deleteItem(id, companyId);
      return;
    } catch (error) {
      this.logger.error(`Error deleting SalesOrder: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao remover o item do pedido', error.message);
    }
  }
};
