import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaMySqlService } from 'src/config/database/mysql.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, PrismaMySqlService],
})
export class TaskModule {}
