import { Document } from 'mongoose';

export interface Lesson extends Document {
  readonly name: string;
  readonly author: [string];
}
