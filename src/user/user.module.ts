import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {
  User,
  UserSchema,
  UserRepository,
  MovieRepository,
  Movie,
  MovieSchema,
} from '../models';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Movie.name,
        schema: MovieSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserService, UserRepository, MovieRepository],
  controllers: [UserController],
  exports: [UserService, UserRepository], // for dependence injection
})
export class UserModule {}
