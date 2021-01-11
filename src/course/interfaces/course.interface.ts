import { Document } from 'mongoose';
import {User} from '../../user/interfaces/user.interface'

export interface Course extends Document {
  readonly username: string;
  readonly author: [User]
}