import * as mongoose from 'mongoose';

export interface BaseRepository {
  create<T>(document: T): Promise<mongoose.Document<T>>;
  getOne<T>(id: string): Promise<mongoose.Document<T>>;
  deleteOne<T>(id: string): Promise<mongoose.Document<T>>;
  updateOne<T>(id: string, document: T): Promise<mongoose.Document<T>>;
  findAll<T>(query: T): Promise<mongoose.Document<[T]>>;
}
