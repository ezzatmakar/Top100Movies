import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema, MovieRepository } from '../models';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Movie.name,
        schema: MovieSchema,
      },
    ]),
  ],
  providers: [MovieService, MovieRepository],
  controllers: [MovieController],
  exports: [MovieService, MovieRepository], // for dependence injection
})
export class MovieModule {}
