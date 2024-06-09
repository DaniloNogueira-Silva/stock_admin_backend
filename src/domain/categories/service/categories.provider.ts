import { CategorySchema } from "../schema/categories.schema";

export const CategoryProviders = [
  {
    provide: 'CATEGORY_MODEL',
    useFactory: (connection) => connection.model('Category', CategorySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];