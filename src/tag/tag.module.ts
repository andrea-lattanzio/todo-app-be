import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { PrismaMySqlService } from 'src/config/database/mysql.service';

@Module({
  controllers: [TagController],
  providers: [TagService, PrismaMySqlService],
})
export class TagModule {}
