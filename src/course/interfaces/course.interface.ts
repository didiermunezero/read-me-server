import { Document } from 'mongoose';
import { User } from 'src/user/interfaces/user.interface';

export interface Course extends Document {
  readonly name: string;
  readonly author: [User];
}
