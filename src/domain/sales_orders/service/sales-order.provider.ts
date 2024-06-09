import { SalesOrderSchema } from "../schema/sales-order.schema";

export const SalesOrderProviders = [
  {
    provide: 'SALES_ORDER_MODEL',
    useFactory: (connection) => connection.model('SalesOrder', SalesOrderSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];