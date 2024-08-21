import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as basicAuth from 'express-basic-auth';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableVersioning();
  app.enableCors({
    origin: '*',
  });
  app.use(
    '/api/docs*',
    basicAuth({
      challenge: true,
      users: {
        admin: '123',
      },
    }),
  );
  const config = app.get<ConfigService>(ConfigService);
  const configSwagger = new DocumentBuilder()
    .setTitle('Task management')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(config.get('PORT'), () => {
    console.log(`server start http://localhost:${config.get('PORT')}`);
    console.log(`Api docs http://localhost:${config.get('PORT')}/api/docs`);
  });
}
bootstrap();
