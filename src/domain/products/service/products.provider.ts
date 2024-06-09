import { ProductSchema } from "../schema/products.schema";

export const ProductProviders = [
  {
    provide: 'PRODUCT_MODEL',
    useFactory: (connection) => connection.model('Product', ProductSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];