import * as faker from 'faker';
import * as mongoose from 'mongoose';
import { Movie } from '../../src/models';

export const generateMovie = () => {
  const movie = new Movie();

  movie._id = new mongoose.Types.ObjectId().toString();
  movie.posterPath = {
    url: faker.image.imageUrl(),
    description: faker.lorem.paragraph(),
    title: faker.lorem.text(),
  };

  movie.adult = faker.datatype.boolean();
  movie.overview = faker.lorem.words();
  movie.releaseDate = faker.date.future();
  movie.genreIds = [1, 2, 3];
  movie.originalTitle = faker.lorem.sentence();
  movie.originalLanguage = faker.lorem.word();
  movie.title = faker.lorem.word();

  movie.backdropPath = {
    url: faker.image.imageUrl(),
    description: faker.lorem.paragraph(),
    title: faker.lorem.text(),
  };

  movie.popularity = 5;
  movie.voteCount = 10;
  movie.video = faker.datatype.boolean();
  movie.voteAverage = 5.6;

  return movie;
};
