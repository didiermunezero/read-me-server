import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './interfaces/course.interface';
import { CreateInput } from './inputs/create-course.input';
import {ApolloError} from 'apollo-server-express';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<Course>) {}

  async create(createDto: CreateInput): Promise<Course> {
    const createdCat = new this.userModel(createDto);
    return await createdCat.save();
  }

  async findAll(): Promise<Course[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<Course> {
      const user = await this.userModel.findOne({_id: id});
      if(!user){
          throw new ApolloError("Not found "+id,"NOT_FOUND");
      }
      return user;
  }

}
