import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaDatabaseService } from 'src/config/database/database.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, PrismaDatabaseService],
})
export class TaskModule {}
