import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaDatabaseService } from 'src/config/database/database.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaDatabaseService],
})
export class CategoryModule {}
