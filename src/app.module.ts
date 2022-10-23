import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: +process.env.THROTTLE_TTL || 1,
      limit: +process.env.THROTTLE_LIMIT || 6,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => {
        return {
          uri: process.env.DATABASE_URL,
        };
      },
    }),

    UserModule,

    MovieModule,
  ],
})
export class AppModule {}
