import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { SupplierProviders } from './service/supplier.provider';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './service/supplier.service';
import { SupplierRepository } from './supplier.repository';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { payloadService } from '../decode';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [SupplierController],
  providers: [
    SupplierService,
    SupplierRepository,
    JwtService,
    payloadService,
    ...SupplierProviders,
  ],
  exports: [SupplierService, SupplierRepository]
})
export class SupplierModule { }
