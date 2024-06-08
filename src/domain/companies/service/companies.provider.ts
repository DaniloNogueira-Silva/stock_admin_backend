import { CompanySchema } from "../schema/company.schema";

export const CompaniesProviders = [
    {
        provide: 'COMPANY_MODEL',
        useFactory: (connection) => connection.model('Company', CompanySchema),
        inject: ['DATABASE_CONNECTION'],
    },
];