import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from '@fastify/helmet';

import { appConfig } from './config';

const openApiDocumentationSetup = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('NestJS Bootstrap Project')
    .setDescription('Bootstrap for quick setup in NestJS')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  openApiDocumentationSetup(app);

  //  global middlewares
  app.enableCors();
  app.register(helmet);

  await app.listen(appConfig.appPort);
}
bootstrap();
