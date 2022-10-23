import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { BaseRepository } from '../../common/interface';

@Injectable()
export class UserRepository implements Partial<BaseRepository> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getOne(_id: string): Promise<any> {
    return this.userModel.findOne({ isDeleted: false, _id }).lean();
  }

  async updateOne<User>(
    _id: string,
    document: User,
  ): Promise<Document<User, any, any>> {
    return this.userModel
      .findOneAndUpdate(
        { isDeleted: false, _id },
        { $set: document },
        { new: true },
      )
      .lean();
  }

  create(document: any): Promise<Document<any, any, any>> {
    return this.userModel.create(document);
  }
}
