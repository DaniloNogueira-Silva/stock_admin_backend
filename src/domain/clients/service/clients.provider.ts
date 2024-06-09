import { ClientsSchema } from "../schema/clients.schema";

export const ClientsProviders = [
  {
    provide: 'CLIENTS_MODEL',
    useFactory: (connection) => connection.model('Clients', ClientsSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];