import { Injectable, Inject, UnprocessableEntityException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entity/user.interface';
import mongoose from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(@Inject('USER_MODEL') private userModel) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(companyId: string): Promise<User[]> {
    return this.userModel.find({
      companyId: companyId
    }).exec();
  }

  async findOne(email: string): Promise<User> {
    const users = await this.userModel.find({
      email: email
    }).exec();

    return users[0];
  }

  async update(id: string, updatedUserDto: UpdateUserDto, companyId: string): Promise<User> {

    const foundUser = await this.userModel.findOne({ _id: id, companyId: companyId }).exec();

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(id, updatedUserDto, { new: true }).exec();

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser;
  }

  async delete(id: string, companyId: string): Promise<void> {
    const foundUser = await this.userModel.findOne({ _id: id, companyId: companyId }).exec();

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    const result = await this.userModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new Error('User not found');
    }
  }

  async findById(id: string, companyId: string): Promise<User> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new UnprocessableEntityException('Invalid id');
    }
    const objectId = new mongoose.Types.ObjectId(id);
    const foundedUser = await this.userModel.findOne({ _id: objectId, companyId: companyId }).exec();
    return foundedUser;
  }
}
