import { INestApplication, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { Test, TestingModule } from '@nestjs/testing';
import * as cookieParser from 'cookie-parser';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import helmet from 'helmet';

import { rootMongooseTestModule } from '../mongo.connection';
import { MovieModule } from '../../src/movie/movie.module';
import { UserModule } from '../../src/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    rootMongooseTestModule(),
    MovieModule,
    UserModule,
  ],
})
export class AppModule {}

export const setupTestApp = async () => {
  const testBuilder = Test.createTestingModule({
    imports: [AppModule],
  });

  const moduleFixture: TestingModule = await testBuilder.compile();

  const app = moduleFixture.createNestApplication();

  function addAppMiddleware(app: INestApplication) {
    //validation for api endpoints
    app.useGlobalPipes(new ValidationPipe());

    //cookie parser for use http only cookie for JWT authentication
    app.use(cookieParser());
    app.use(helmet({ contentSecurityPolicy: false }));
    app.enableCors();
  }

  addAppMiddleware(app);

  return {
    app,
    moduleFixture,
    testBuilder,
    addAppMiddleware,
  };
};
