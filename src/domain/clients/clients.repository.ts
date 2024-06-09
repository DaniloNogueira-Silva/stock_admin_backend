import { Injectable, Inject, UnprocessableEntityException, NotFoundException } from '@nestjs/common';
import { CreateClientsDto } from './dtos/create-clients.dto';
import { UpdateClientsDto } from './dtos/update-clients.dto';
import { Clients } from './entity/clients.interface';
import mongoose from 'mongoose';

@Injectable()
export class ClientsRepository {
  constructor(@Inject('CLIENTS_MODEL') private clientsModel) { }

  async create(createClientsDto: CreateClientsDto): Promise<Clients> {
    const createdClients = new this.clientsModel(createClientsDto);
    return createdClients.save();
  }

  async findAll(companyId: string): Promise<Clients[]> {
    return this.clientsModel.find({
      companyId: companyId
    }).exec();
  }

  async findByName(name: string, companyId: string): Promise<Clients> {
    const clientss = await this.clientsModel.find({
      name: name,
      companyId: companyId
    }).exec();

    return clientss[0];
  }


  async update(id: string, updatedClientsDto: UpdateClientsDto, companyId: string): Promise<Clients> {

    const foundClients = await this.clientsModel.findOne({ companyId: companyId }).exec();

    if (!foundClients) {
      throw new NotFoundException('Clients not found');
    }

    const updatedClients = await this.clientsModel.findByIdAndUpdate(id, updatedClientsDto, { new: true }).exec();

    if (!updatedClients) {
      throw new Error('Clients not found');
    }

    return updatedClients;
  }

  async delete(id: string, companyId: string): Promise<void> {
    const foundClients = await this.clientsModel.findOne({ companyId: companyId }).exec();

    if (!foundClients) {
      throw new NotFoundException('Clients not found');
    }

    const result = await this.clientsModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new Error('Clients not found');
    }
  }

  async findById(id: string, companyId: string): Promise<Clients> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new UnprocessableEntityException('Invalid id');
    }
    const objectId = new mongoose.Types.ObjectId(id);
    const foundedClients = await this.clientsModel.findOne({ _id: objectId, companyId: companyId }).exec();
    return foundedClients;
  }
}
