import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CompaniesModule } from './domain/companies/companies.module';
import { UploadModule } from './domain/upload/uploads.module';
import { UserModule } from './domain/users/user.module';

@Module({
  imports: [DatabaseModule, CompaniesModule, UploadModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
