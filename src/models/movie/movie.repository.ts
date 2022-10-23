import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Movie } from './movie.schema';
import { BaseRepository } from '../../common/interface';
import { GetAllMovieInput } from '../../movie/dto/get-all-movies.input';
import * as _ from 'lodash';

@Injectable()
export class MovieRepository implements Partial<BaseRepository> {
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: Model<Movie>,
  ) {}

  async create<Movie>(document: Movie): Promise<Document> {
    return this.movieModel.create(document);
  }

  async getOne<Movie>(_id: string): Promise<Document<Movie, any, any>> {
    return this.movieModel.findOne({ isDeleted: false, _id }).lean();
  }

  async getOneByTitle<Movie>(
    title: string,
  ): Promise<Document<Movie, any, any>> {
    return this.movieModel.findOne({ isDeleted: false, title }).lean();
  }

  async deleteOne<Movie>(_id: string): Promise<Document<Movie, any, any>> {
    return this.movieModel
      .findOneAndUpdate(
        { _id, isDeleted: false },
        { $set: { isDeleted: true } },
        { new: true },
      )
      .lean();
  }

  async updateOne<Movie>(
    _id: string,
    document: Movie,
  ): Promise<Document<Movie, any, any>> {
    return this.movieModel
      .findOneAndUpdate(
        { _id, isDeleted: false },
        { $set: document },
        { new: true },
      )
      .lean();
  }

  async findAll<Movie>(
    getAllMovieInput: GetAllMovieInput,
  ): Promise<Document<[Movie], any, any>> {
    const { limit, order, page, sortBy, adult } = getAllMovieInput;

    const query: { isDeleted: boolean; adult?: boolean } = { isDeleted: false };

    if (!_.isNil(adult)) {
      query.adult = adult;
    }

    return this.movieModel
      .find(query)
      .sort({ [sortBy]: order })
      .skip(page * limit - limit)
      .limit(limit)
      .lean();
  }

  async countMovies(args: any) {
    const { adult } = args;
    const query: { isDeleted: boolean; adult?: boolean } = { isDeleted: false };

    if (!_.isNil(adult)) {
      query.adult = adult;
    }

    return this.movieModel.countDocuments(query).lean();
  }
}
