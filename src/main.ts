import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { json, urlencoded } from 'body-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

function setupDocs(app, { name, description, version }) {
  const config = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //validation for api endpoints
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  //cookie parser for use http only cookie for JWT authentication
  app.use(cookieParser());
  app.use(helmet({ contentSecurityPolicy: false }));
  app.enableCors({ origin: '*' });
  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ limit: '100mb', extended: true }));

  setupDocs(app, {
    name: 'top 100 movies APIs',
    description: 'This is the top 100 movies APIs',
    version: '1.0',
  });

  await app.listen(process.env.PORT, () => {
    console.log(`Application is running on Port: ${process.env.PORT}`);
  });
}
bootstrap();
