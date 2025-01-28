import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './task/task.module';
import { CategoryModule } from './category/category.module';
@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), DatabaseModule, TaskModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
