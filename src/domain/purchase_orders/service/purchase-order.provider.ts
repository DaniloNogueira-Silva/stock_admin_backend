import { PurchaseOrderSchema } from "../schema/purchase-order.schema";

export const PurchaseOrderProviders = [
  {
    provide: 'PURCHASE_ORDER_MODEL',
    useFactory: (connection) => connection.model('PurchaseOrder', PurchaseOrderSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];