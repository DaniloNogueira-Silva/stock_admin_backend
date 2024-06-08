import { Injectable, Logger, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entity/user.interface';

dotenv.config();

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const findUserExists = await this.userRepository.findOne(createUserDto.email);

      if (findUserExists) {
        throw new Error('User already exists');
      }

      const saltOrRounds = Number(process.env.SALT);

      const password = createUserDto.password;

      const hash = await bcrypt.hash(password, saltOrRounds);
      const createdUser = await this.userRepository.create({ ...createUserDto, password: hash });

      return createdUser;
    } catch (error) {
      this.logger.error(`Error creating User: ${error.message}`, error.stack);
      throw new UnprocessableEntityException('Erro ao cadastrar o usuário', error.message);
    }
  }

  async findAll(companyId: string): Promise<User[]> {
    try {
      const foundUsers = await this.userRepository.findAll(companyId);
      return foundUsers;
    } catch (error) {
      this.logger.error(`Error finding all Users: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao buscar os usuários', error.message);
    }
  }

  async findOne(email: string): Promise<User> {
    try {
      const foundUser = await this.userRepository.findOne(email);
      return foundUser;
    } catch (error) {
      this.logger.error(`Error finding User: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao buscar o usuário', error.message);
    }
  }

  async findById(id: string, companyId: string): Promise<User> {
    try {
      const foundUser = await this.userRepository.findById(id, companyId);
      return foundUser;
    } catch (error) {
      this.logger.error(`Error finding User: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao buscar o usuário', error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto, companyId: string): Promise<User> {
    try {
      const saltOrRounds = Number(process.env.SALT);

      const password = updateUserDto.password;

      const hash = await bcrypt.hash(password, saltOrRounds);
      const updatedUser = await this.userRepository.update(id, { ...updateUserDto, password: hash }, companyId);
      return updatedUser;
    } catch (error) {
      this.logger.error(`Error updating User: ${error.message}`, error.stack);
      throw new UnprocessableEntityException('Erro ao cadastrar o usuário', error.message);
    }
  }

  async delete(id: string, companyId: string): Promise<void> {
    try {
      await this.userRepository.delete(id, companyId);
      return;
    } catch (error) {
      this.logger.error(`Error deleting User: ${error.message}`, error.stack);
      throw new NotFoundException('Erro ao deletar o usuário', error.message);
    }
  }
};
