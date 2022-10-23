import * as faker from 'faker';
import * as mongoose from 'mongoose';
import { User } from '../../src/models';

export const generateUser = () => {
  const user = new User();

  user._id = new mongoose.Types.ObjectId().toString();
  user.firstName = faker.name.firstName();
  user.lastName = faker.name.lastName();
  user.top100Movies = [];

  return user;
};
