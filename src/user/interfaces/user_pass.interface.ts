import { Document } from 'mongoose';

export interface User_Pass extends Document {
  readonly username: string;
  readonly fname: string;
  readonly lname: string;
  readonly dob: string;
  readonly profile: string;
  readonly type: string;
  readonly password: string;
  readonly email: string;
}
