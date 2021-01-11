import { Document } from 'mongoose';

export interface User extends Document {
  readonly username: string;
  readonly fname: string;
  readonly lname: string;
  readonly dob: string;
  readonly profile: string;
  readonly type: string;
}

export interface loginOutPut extends Document {
    readonly token: string;
  }
