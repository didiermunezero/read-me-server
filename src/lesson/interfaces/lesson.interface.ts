import { Document } from 'mongoose';

export interface Lesson extends Document {
  readonly name: string;
  readonly content: string;
  readonly author: [string];
  readonly course: string;
}
