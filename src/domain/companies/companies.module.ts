import { Module, forwardRef } from '@nestjs/common';
import { CompaniesService } from './service/companies.service';
import { CompaniesController } from './companies.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CompaniesRepository } from "./companies.repository";
import { CompaniesProviders } from './service/companies.provider';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => AuthModule)],
  controllers: [CompaniesController],
  providers: [
    CompaniesService,
    CompaniesRepository,
    JwtService,
    ...CompaniesProviders],
  exports: [CompaniesService]
})
export class CompaniesModule { }
