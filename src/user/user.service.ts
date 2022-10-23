import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as _ from 'lodash';
import { getPaginatedItems } from '../common/helpers/pagination-array.helper';
import { MovieType, UserRepository, MovieRepository } from '../models';
import { GetTop100MoviesInput } from './dto/get-top-movies-movies.input';
import { RankMovieInput } from './dto/rank-movie.input';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private movieRepository: MovieRepository,
  ) {}

  async rankMovie(
    userId: string,
    movieId: string,
    rankMovieInput: RankMovieInput,
  ) {
    const { rank, imageUrl, description, title } = rankMovieInput;

    const movie = await this.movieRepository.getOne(movieId);

    if (!movie) {
      throw new NotFoundException('This movie did not exist');
    }

    const user = await this.userRepository.getOne(userId);

    const movies = user.top100Movies.map((movie) => ({
      ...movie,
      id: movie.id.toString(),
    }));

    const isMovieRanking = _.find(movies, { id: movieId });

    if (isMovieRanking) {
      throw new ConflictException('User rank this movie before');
    }

    const isRankTookIndex = _.findIndex(movies, { rank });

    const newMovie: MovieType = {
      id: movieId,
      rank,
      imageUrl,
      description,
      title,
    };

    if (isRankTookIndex !== -1) {
      movies[isRankTookIndex] = newMovie;
    } else {
      movies.push(newMovie);
    }

    await this.userRepository.updateOne(userId, {
      top100Movies: movies,
    });

    return {
      ...user,
      top100Movies: movies,
    };
  }

  async findTop100Movies(id: string, query: GetTop100MoviesInput) {
    const { limit, page, order, sortBy } = query;
    const user = await this.userRepository.getOne(id);

    const movies = _.orderBy(user.top100Movies, sortBy, [order]);

    return {
      ...user,
      top100Movies: getPaginatedItems(movies, page, limit),
    };
  }
}
