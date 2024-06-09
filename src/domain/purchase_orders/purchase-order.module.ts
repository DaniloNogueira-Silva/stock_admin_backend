import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { PurchaseOrderProviders } from './service/purchase-order.provider';
import { PurchaseOrderController } from './purchase-order.controller';
import { PurchaseOrderService } from './service/purchase-order.service';
import { PurchaseOrderRepository } from './purchase-order.repository';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { payloadService } from '../decode';
import { PurchaseOrderItemProviders } from './service/purchase-order-item.provider';
import { ProductProviders } from '../products/service/products.provider';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [PurchaseOrderController],
  providers: [
    PurchaseOrderService,
    PurchaseOrderRepository,
    JwtService,
    payloadService,
    ...PurchaseOrderProviders,
    ...PurchaseOrderItemProviders,
    ...ProductProviders
  ],
  exports: [PurchaseOrderService, PurchaseOrderRepository]
})
export class PurchaseOrderModule { }
