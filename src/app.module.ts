import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CompaniesModule } from './domain/companies/companies.module';
import { UploadModule } from './domain/upload/uploads.module';
import { UserModule } from './domain/users/user.module';
import { ProductModule } from './domain/products/products.module';
import { CategoryModule } from './domain/categories/categories.module';
import { LocalizationModule } from './domain/localizations/localizations.module';
import { SupplierModule } from './domain/supplier/supplier.module';

@Module({
  imports: [
    DatabaseModule,
    CompaniesModule,
    UploadModule,
    UserModule,
    ProductModule,
    CategoryModule,
    LocalizationModule,
    SupplierModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
