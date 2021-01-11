import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './interfaces/course.interface';
import { CreateInput } from './inputs/create-course.input';
import {ApolloError} from 'apollo-server-express';

@Injectable()
export class CourseService {
  constructor(@InjectModel('Course') private readonly courseModel: Model<Course>) {}

  async create(createDto: CreateInput): Promise<Course> {
    const createdCat = new this.courseModel(createDto);
    return await createdCat.save();
  }

  async findAll(): Promise<Course[]> {
    return await this.courseModel.find().exec();
  }

  async findOne(id: string): Promise<Course> {
      const user = await this.courseModel.findOne({_id: id});
      if(!user){
          throw new ApolloError("Not found "+id,"NOT_FOUND");
      }
      return user;
  }

}
