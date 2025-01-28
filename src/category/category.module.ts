import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaMySqlService } from 'src/config/database/mysql.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaMySqlService],
})
export class CategoryModule {}
