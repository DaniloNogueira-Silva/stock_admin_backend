import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { ProductProviders } from './service/products.provider';
import { ProductController } from './products.controller';
import { ProductService } from './service/products.service';
import { ProductRepository } from './products.repository';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { payloadService } from '../decode';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepository,
    JwtService,
    payloadService,
    ...ProductProviders,
  ],
  exports: [ProductService, ProductRepository]
})
export class ProductModule { }
