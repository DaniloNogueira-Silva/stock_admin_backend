import { Injectable, Logger, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { ClientsRepository } from '../clients.repository';
import { CreateClientsDto } from '../dtos/create-clients.dto';
import * as dotenv from 'dotenv';
import { UpdateClientsDto } from '../dtos/update-clients.dto';
import { Clients } from '../entity/clients.interface';

dotenv.config();

@Injectable()
export class ClientsService {
  private readonly logger = new Logger(ClientsService.name);

  constructor(private readonly clientsRepository: ClientsRepository) { }

  async create(createClientsDto: CreateClientsDto): Promise<Clients> {
    try {
      const name = createClientsDto.name ? await this.clientsRepository.findByName(createClientsDto.name, createClientsDto.companyId) : null;

      if (name) {
        throw new Error('Clients already exists with this name');
      }

      const createdClients = await this.clientsRepository.create({ ...createClientsDto });

      return createdClients;
    } catch (error) {
      this.logger.error(`Error creating Clients: ${error.message}`, error.stack);
      throw new UnprocessableEntityException('Erro ao cadastrar o produto', error.message);
    }
  }

  async findAll(companyId: string): Promise<Clients[]> {
    try {
      const foundClientss = await this.clientsRepository.findAll(companyId);
      return foundClientss;
    } catch (error) {
      this.logger.error(`Error finding all Clientss: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao buscar os produtos', error.message);
    }
  }

  async findByName(name: string, companyId: string): Promise<Clients> {
    try {
      const foundClients = await this.clientsRepository.findByName(name, companyId);
      return foundClients;
    } catch (error) {
      this.logger.error(`Error finding Clients: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao buscar o produto', error.message);
    }
  }

  async findById(id: string, companyId: string): Promise<Clients> {
    try {
      const foundClients = await this.clientsRepository.findById(id, companyId);
      return foundClients;
    } catch (error) {
      this.logger.error(`Error finding Clients: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao buscar o produto', error.message);
    }
  }

  async update(id: string, updateClientsDto: UpdateClientsDto, companyId: string): Promise<Clients> {
    try {

      const name = updateClientsDto.name ? await this.clientsRepository.findByName(updateClientsDto.name, companyId) : null;

      if (name) {
        throw new Error('Clients already exists with this name');
      }

      const updatedClients = await this.clientsRepository.update(id, updateClientsDto, companyId);
      return updatedClients;
    } catch (error) {
      this.logger.error(`Error updating Clients: ${error.message}`, error.stack);
      throw new UnprocessableEntityException('Erro ao atualizar o produto', error.message);
    }
  }

  async delete(id: string, companyId: string): Promise<void> {
    try {
      await this.clientsRepository.delete(id, companyId);
      return;
    } catch (error) {
      this.logger.error(`Error deleting Clients: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao remover o produto', error.message);
    }
  }
};
