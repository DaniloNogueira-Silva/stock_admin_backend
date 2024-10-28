import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { CompaniesRepository } from '../companies.repository';
import { Company } from '../entities/company.entity';

@Injectable()
export class CompaniesService {

  constructor(
    private readonly companiesRepository: CompaniesRepository
  ) { }

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    try {
      const foundedCompany = await this.companiesRepository.findOne(createCompanyDto.document);
      if (Array.isArray(foundedCompany) && foundedCompany.length > 0) {
        throw new ConflictException('Company already exists');
      }
      return await this.companiesRepository.create(createCompanyDto);
    } catch (error) {
      throw new BadRequestException(`Error in create company: ${error.message}`);
    }
  }

  async findAll(): Promise<Company[]> {
    try {
      return await this.companiesRepository.findAll();
    } catch (error) {
      throw new NotFoundException(`Error in find all companies: ${error.message}`);
    }
  }

  async findByDocument(document: string): Promise<Company | null> {
    try {
      return this.companiesRepository.findOne(document);
    } catch (error) {
      throw new NotFoundException(`Error in find by document company: ${error.message}`);
    }
  }

  async findById(id: string): Promise<Company | null> {
    try {
      return this.companiesRepository.findById(id);
    } catch (error) {
        throw new NotFoundException(`Error in find by id company: ${error.message}`);
    }
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    try {
      return await this.companiesRepository.update(id, updateCompanyDto);
    } catch (error) {
      throw new NotFoundException(`Error in update company: ${error.message}`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      return await this.companiesRepository.delete(id);
    } catch (error) {
      throw new NotFoundException(`Error in remove company: ${error.message}`);
    }
  }
}
