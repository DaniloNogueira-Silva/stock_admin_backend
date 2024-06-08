import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { UserProviders } from './service/user.provider';
import { UserController } from './user.controller';
import { UserService } from './service/user.service';
import { UserRepository } from './user.repository';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { payloadService } from '../decode';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    JwtService,
    payloadService,
    ...UserProviders,
  ],
  exports: [UserService, UserRepository]
})
export class UserModule {}
