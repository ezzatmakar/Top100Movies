import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false, timestamps: false })
export class ImageType {
  @Prop()
  url: string;

  @Prop()
  title?: string;

  @Prop()
  description?: string;
}

@Schema({ timestamps: true })
export class Movie {
  _id: string;

  @Prop({ type: ImageType })
  posterPath: ImageType;

  @Prop()
  adult: boolean;

  @Prop()
  overview: string;

  @Prop({ type: Date })
  releaseDate: Date;

  @Prop([Number])
  genreIds: number[];

  @Prop()
  originalTitle: string;

  @Prop()
  originalLanguage: string;

  @Prop()
  title: string;

  @Prop({ type: ImageType })
  backdropPath: ImageType;

  @Prop()
  popularity: number;

  @Prop()
  voteCount: number;

  @Prop()
  video: boolean;

  @Prop()
  voteAverage: number;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
