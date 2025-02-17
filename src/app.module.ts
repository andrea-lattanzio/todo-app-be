import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TaskModule } from './task/task.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './identity/auth/auth.module';
import { UserModule } from './identity/user/user.module';
import { JwtGuard } from '../shared/guards/jwt.guard';
import { APP_GUARD } from '@nestjs/core';
import { join } from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: getEnvPath() }),
    DatabaseModule,
    TaskModule,
    CategoryModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtGuard }],
})
export class AppModule {}

function getEnvPath(): string {
  const configService = new ConfigService();
  const env: string = configService.get<string>('NODE_ENV') || 'development';
  return join(`.env.${env}`);
}
