import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { CompaniesRepository } from '../companies.repository';
import { NotFoundError } from 'rxjs';

@Injectable()
export class CompaniesService {

  constructor(
    private readonly companiesRepository: CompaniesRepository
  ) { }
  async create(createCompanyDto: CreateCompanyDto) {

    try {

      const foundedCompany = await this.companiesRepository.findOne(createCompanyDto.document);
      if (foundedCompany) {
        throw new ConflictException('Company already exists');
      }

      return await this.companiesRepository.create(createCompanyDto);
    } catch (error) {
      new BadRequestException(`Error in create company: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.companiesRepository.findAll();
    } catch (error) {
      new NotFoundError(`Error in find all companies: ${error.message}`);
    }
  }

  async findByDocument(document: string) {
    try {
      return this.companiesRepository.findOne(document);
    } catch (error) {
      new NotFoundError(`Error in find by document company: ${error.message}`);
    }
  }

  async findById(id: string) {
    try {
      return this.companiesRepository.findById(id);
    } catch (error) {
      new NotFoundError(`Error in find by id company: ${error.message}`);
    }
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    try {
      return await this.companiesRepository.update(id, updateCompanyDto);
    } catch (error) {
      new NotFoundError(`Error in update company: ${error.message}`);
    }
  }

  async remove(id: string) {
    try {
      return await this.companiesRepository.delete(id);
    } catch (error) {
      new NotFoundError(`Error in removie company: ${error.message}`);
    }
  }
}
