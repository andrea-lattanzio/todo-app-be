import { Module } from '@nestjs/common';
import { PrismaMySqlService } from './mysql.service';

@Module({
  providers: [PrismaMySqlService],
  exports: [PrismaMySqlService]
})
export class DatabaseModule {}
