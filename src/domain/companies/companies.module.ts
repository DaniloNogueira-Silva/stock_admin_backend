import { Module } from '@nestjs/common';
import { CompaniesService } from './service/companies.service';
import { CompaniesController } from './companies.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CompaniesRepository } from "./companies.repository";
import { CompaniesProviders } from './service/companies.provider';
@Module({
  imports: [DatabaseModule],
  controllers: [CompaniesController],
  providers: [CompaniesService, CompaniesRepository, ...CompaniesProviders],
  exports: [CompaniesService]
})
export class CompaniesModule { }
