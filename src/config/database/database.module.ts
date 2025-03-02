import { Module } from '@nestjs/common';
import { PrismaDatabaseService } from './database.service';

@Module({
  providers: [PrismaDatabaseService],
  exports: [PrismaDatabaseService],
})
export class DatabaseModule {}
