import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { ClientsProviders } from './service/clients.provider';
import { ClientsController } from './clients.controller';
import { ClientsService } from './service/clients.service';
import { ClientsRepository } from './clients.repository';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { payloadService } from '../decode';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [ClientsController],
  providers: [
    ClientsService,
    ClientsRepository,
    JwtService,
    payloadService,
    ...ClientsProviders,
  ],
  exports: [ClientsService, ClientsRepository]
})
export class ClientsModule { }
