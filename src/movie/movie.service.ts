import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MovieRepository } from '../models';
import { CreateMovieInput } from './dto/create-movie.input';
import { GetAllMovieInput } from './dto/get-all-movies.input';
import { UpdateMovieInput } from './dto/update-movie.input';

@Injectable()
export class MovieService {
  constructor(private movieRepository: MovieRepository) {}

  async create(createMovieInput: CreateMovieInput) {
    const { title } = createMovieInput;
    const existMovie = await this.movieRepository.getOneByTitle(title);
    if (existMovie) {
      throw new ConflictException(
        `This - {${title}} - movie title already exist`,
      );
    }

    return this.movieRepository.create(createMovieInput);
  }

  async findAll(query: GetAllMovieInput) {
    const { page, limit, adult } = query;

    const total = await this.movieRepository.countMovies({ adult });
    const movies = await this.movieRepository.findAll(query);

    return {
      page,
      limit,
      total,
      total_pages: Math.ceil(total / limit),
      data: movies,
    };
  }

  async findOne(id: string) {
    const movie = await this.movieRepository.getOne(id);

    if (!movie) {
      throw new NotFoundException('This movie is not exists, or deleted');
    }

    return movie;
  }

  async update(id: string, updateMovieInput: UpdateMovieInput) {
    const movie = await this.movieRepository.getOne(id);

    if (!movie) {
      throw new NotFoundException('This movie is not exists, or deleted');
    }

    return this.movieRepository.updateOne(id, updateMovieInput);
  }

  async remove(id: string) {
    const movie = await this.movieRepository.deleteOne(id);

    if (!movie) {
      throw new NotFoundException('This movie is not exists, or deleted');
    }

    return movie;
  }
}
