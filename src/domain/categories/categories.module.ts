import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { CategoryProviders } from './service/categories.provider';
import { CategoryController } from './categories.controller';
import { CategoryService } from './service/categories.service';
import { CategoryRepository } from './categories.repository';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { payloadService } from '../decode';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    CategoryRepository,
    JwtService,
    payloadService,
    ...CategoryProviders,
  ],
  exports: [CategoryService, CategoryRepository]
})
export class CategoryModule { }
