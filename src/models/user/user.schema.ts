import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false, timestamps: false })
export class MovieType {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  })
  id: string;

  @Prop()
  rank: number;

  @Prop()
  title?: string;

  @Prop()
  description?: string;

  @Prop()
  imageUrl: string;
}

@Schema({ timestamps: true })
export class User {
  _id: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop([MovieType])
  top100Movies: MovieType[];

  @Prop({ default: false })
  isDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
