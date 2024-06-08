import { Injectable, Inject, UnprocessableEntityException } from '@nestjs/common';
import mongoose from 'mongoose';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './entities/company.entity';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesRepository {
    constructor(@Inject('COMPANY_MODEL') private companyModel) { }

    async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
        const createdCompany = new this.companyModel(createCompanyDto);
        console.log('createdCompany', createdCompany);
        return createdCompany.save();
    }

    async findAll(): Promise<Company[]> {
        return this.companyModel.find().exec();
    }

    async findOne(document: string): Promise<Company> {
        return await this.companyModel.find({
            document: document
        }).exec();
    }

    async update(id: string, updatedCompanyDto: UpdateCompanyDto): Promise<Company> {
        const updatedCompany = await this.companyModel.findByIdAndUpdate(id, updatedCompanyDto, { new: true }).exec();

        if (!updatedCompany) {
            throw new Error('Company not found');
        }

        return updatedCompany;
    }

    async delete(id: string): Promise<void> {
        const result = await this.companyModel.deleteOne({ _id: id }).exec();

        if (result.deletedCount === 0) {
            throw new Error('Company not found');
        }
    }

    async findById(id: string): Promise<Company> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new UnprocessableEntityException('Invalid id');
        }
        const objectId = new mongoose.Types.ObjectId(id);
        const foundedCompany = await this.companyModel.findOne({ _id: objectId }).exec();
        return foundedCompany;
    }
}
