import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { SalesOrderProviders } from './service/sales-order.provider';
import { SalesOrderController } from './sales-order.controller';
import { SalesOrderService } from './service/sales-order.service';
import { SalesOrderRepository } from './sales-order.repository';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { payloadService } from '../decode';
import { SalesOrderItemProviders } from './service/sales-order-item.provider';
import { ProductProviders } from '../products/service/products.provider';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [SalesOrderController],
  providers: [
    SalesOrderService,
    SalesOrderRepository,
    JwtService,
    payloadService,
    ...SalesOrderProviders,
    ...SalesOrderItemProviders,
    ...ProductProviders
  ],
  exports: [SalesOrderService, SalesOrderRepository]
})
export class SalesOrderModule { }
