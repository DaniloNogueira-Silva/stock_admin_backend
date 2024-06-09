import { SalesOrderItemSchema } from "../schema/sales-order-item.schema";

export const SalesOrderItemProviders = [
  {
    provide: 'SALES_ORDER_ITEM_MODEL',
    useFactory: (connection) => connection.model('SalesOrderItem', SalesOrderItemSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];