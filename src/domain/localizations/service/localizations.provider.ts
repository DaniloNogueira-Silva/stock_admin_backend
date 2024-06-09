import { LocalizationSchema } from "../schema/localizations.schema";

export const LocalizationProviders = [
  {
    provide: 'LOCALIZATION_MODEL',
    useFactory: (connection) => connection.model('Localization', LocalizationSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];