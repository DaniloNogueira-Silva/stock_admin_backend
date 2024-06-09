import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { LocalizationProviders } from './service/localizations.provider';
import { LocalizationController } from './localizations.controller';
import { LocalizationService } from './service/localizations.service';
import { LocalizationRepository } from './localizations.repository';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { payloadService } from '../decode';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [LocalizationController],
  providers: [
    LocalizationService,
    LocalizationRepository,
    JwtService,
    payloadService,
    ...LocalizationProviders,
  ],
  exports: [LocalizationService, LocalizationRepository]
})
export class LocalizationModule { }
