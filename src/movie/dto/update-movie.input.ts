import { CreateMovieInput, CreateImageType } from './create-movie.input';
import { PartialType } from '@nestjs/swagger';

export class UpdateMovieInput extends PartialType(CreateMovieInput) {
  adult?: boolean;
  overview?: string;
  releaseDate?: Date;
  genreIds?: number[];
  originalTitle?: string;
  originalLanguage?: string;
  title?: string;
  popularity?: number;
  voteCount?: number;
  video?: boolean;
  voteAverage?: number;
  posterPath?: CreateImageType;
  backdropPath?: CreateImageType;
}
