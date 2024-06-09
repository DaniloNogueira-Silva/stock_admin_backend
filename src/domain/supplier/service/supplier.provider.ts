import { SupplierSchema } from "../schema/supplier.schema";

export const SupplierProviders = [
  {
    provide: 'SUPPLIER_MODEL',
    useFactory: (connection) => connection.model('Supplier', SupplierSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];