import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { ProductionPrismaExceptionFilter } from './config/database/prod.exception-filter';
import { PrismaExceptionFilter } from './config/database/dev.exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerConfig: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('Todo API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const swaggerDoc: OpenAPIObject = SwaggerModule.createDocument(
    app,
    swaggerConfig,
    {
      deepScanRoutes: true,
    },
  );
  SwaggerModule.setup('api/swagger', app, swaggerDoc);
  writeFileSync(
    './openapi/openapi.spec.json',
    JSON.stringify(swaggerDoc, null, 2),
    { encoding: 'utf8' },
  );

  app.use(helmet({ contentSecurityPolicy: false }));
  app.enableCors();

  const configService = new ConfigService();
  const production = configService.getOrThrow('NODE_ENV');
  if (production === 'production') {
    app.useGlobalFilters(new ProductionPrismaExceptionFilter());
  } else if (production === 'development') {
    app.useGlobalFilters(new PrismaExceptionFilter());
  }

  const port: number = configService.getOrThrow<number>('PORT');
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}/api`);
}
bootstrap();
