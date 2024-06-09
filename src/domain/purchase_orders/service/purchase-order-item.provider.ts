import { PurchaseOrderItemSchema } from "../schema/purchase-order-item.schema";

export const PurchaseOrderItemProviders = [
  {
    provide: 'PURCHASE_ORDER_ITEM_MODEL',
    useFactory: (connection) => connection.model('PurchaseOrderItem', PurchaseOrderItemSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];