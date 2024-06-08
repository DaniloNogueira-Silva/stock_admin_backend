import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CompaniesModule } from './domain/companies/companies.module';
import { UploadModule } from './domain/upload/uploads.module';

@Module({
  imports: [DatabaseModule, CompaniesModule, UploadModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
