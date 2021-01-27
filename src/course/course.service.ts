import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './interfaces/course.interface';
import { CourseInput } from './inputs/course.input';
import { headers } from 'utils/headers.input';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class CourseService {
  constructor(@InjectModel('Course') private readonly courseModel: Model<Course>) {}

  async create(createCatDto: CourseInput,headers: headers): Promise<Course> {
    const exists = await this.courseModel.findOne({name: createCatDto.name});
    if(exists){
      throw new ApolloError("Name taken","ALREADY_EXISTS")
    }
    const createdCat = new this.courseModel({...createCatDto,createdby: headers.UserToken.userId});
    return await createdCat.save();
  }

  async findAll(): Promise<Course[]> {
    return await this.courseModel.find().populate('author').populate('createdby').exec();
  }
}
