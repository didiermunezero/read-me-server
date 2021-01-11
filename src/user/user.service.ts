import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateInput } from './inputs/create.input';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createDto: CreateInput): Promise<User> {
    const createdCat = new this.userModel(createDto);
    return await createdCat.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
      const user = await this.userModel.findOne({_id: id});
      if(!user){
          throw new Error("Not found "+typeof id);
      }
      return user;
  }
}
